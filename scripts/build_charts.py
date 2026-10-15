"""Generate the charts and maps embedded in the site.

Run before `astro build` (``npm run charts`` does this):

    uv run python scripts/build_charts.py

Outputs (both git-ignored, regenerated on every build):
  - src/generated/charts/<name>.html : Plotly fragments inlined by <Chart>
  - public/charts/<name>.html        : standalone pages (folium maps) shown in an iframe
  - public/charts/plotly.min.js      : the plotly.js bundle matching the installed plotly
"""

from __future__ import annotations

import json
from html import escape
from pathlib import Path

import folium
import pandas as pd
import plotly.graph_objects as go
from plotly.offline import get_plotlyjs
from branca.element import MacroElement
from folium.plugins import MarkerCluster
from jinja2 import Template

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "public" / "datas"
FRAGMENTS = ROOT / "src" / "generated" / "charts"
PAGES = ROOT / "public" / "charts"

# Single-series charts use one hue throughout (categorical slot 1).
SERIES = "#2a78d6"
TEXT = "#0b0b0b"
TEXT_MUTED = "#52514e"
GRID = "#e4e3df"
SURFACE = "#ffffff"
FONT = '"Noto Sans JP", "Hiragino Sans", "Yu Gothic", Meiryo, sans-serif'

PLOTLY_CONFIG = {
    "responsive": True,
    "displaylogo": False,
    "modeBarButtonsToRemove": ["select2d", "lasso2d", "autoScale2d"],
}

DATE_RANGE_BUTTONS = [
    {"count": 3, "label": "3か月", "step": "month", "stepmode": "backward"},
    {"count": 6, "label": "6か月", "step": "month", "stepmode": "backward"},
    {"count": 1, "label": "1年", "step": "year", "stepmode": "backward"},
    {"label": "全期間", "step": "all"},
]


def base_layout(title: str, **kwargs) -> dict:
    layout = {
        "title": {"text": title, "x": 0, "xanchor": "left", "font": {"size": 18, "color": TEXT}},
        "font": {"family": FONT, "color": TEXT_MUTED, "size": 13},
        "paper_bgcolor": SURFACE,
        "plot_bgcolor": SURFACE,
        "margin": {"l": 60, "r": 20, "t": 70, "b": 40},
        "hoverlabel": {"bgcolor": SURFACE, "bordercolor": GRID, "font": {"color": TEXT, "family": FONT}},
        "showlegend": False,
    }
    layout.update(kwargs)
    return layout


def axis(**kwargs) -> dict:
    return {
        "gridcolor": GRID,
        "linecolor": GRID,
        "zeroline": False,
        "tickfont": {"color": TEXT_MUTED},
        **kwargs,
    }


def write_fragment(name: str, fig: go.Figure) -> None:
    html = fig.to_html(
        full_html=False,
        include_plotlyjs=False,  # served once from /charts/plotly.min.js
        config=PLOTLY_CONFIG,
        div_id=f"chart-{name}",
        default_width="100%",
    )
    (FRAGMENTS / f"{name}.html").write_text(html, encoding="utf-8")
    print(f"  chart  {name}")


def read_dated_csv(path: Path) -> pd.DataFrame:
    df = pd.read_csv(path)
    df["Date"] = pd.to_datetime(df["Date"], format="%Y/%m/%d")
    return df


def timeseries(name: str, df: pd.DataFrame, column: str, title: str, label: str) -> None:
    fig = go.Figure(
        go.Scatter(
            x=df["Date"],
            y=df[column],
            mode="lines",
            line={"color": SERIES, "width": 2},
            name=label,
            hovertemplate=f"%{{x|%Y/%m/%d}}<br>{label}: <b>%{{y:,}}</b><extra></extra>",
        )
    )
    fig.update_layout(
        base_layout(title, height=480, hovermode="x"),
        xaxis=axis(
            type="date",
            tickformat="%Y/%m",
            rangeselector={"buttons": DATE_RANGE_BUTTONS, "x": 0, "y": 1.02},
            rangeslider={"visible": True, "thickness": 0.08},
            showspikes=True,
            spikemode="across",
            spikecolor=TEXT_MUTED,
            spikethickness=1,
            spikedash="dot",
        ),
        yaxis=axis(title={"text": label}, tickformat=",", rangemode="tozero"),
    )
    write_fragment(name, fig)


def covid19_jp() -> None:
    df = read_dated_csv(DATA / "COVID-19_JP.csv")
    timeseries("covid19_jp", df, "Positive", "全国の新規陽性者数（日別）", "陽性者数")


def covid19_ktq() -> None:
    df = read_dated_csv(DATA / "COVID-19_KTQ.csv")
    timeseries("covid19_ktq", df, "Positive", "北九州市の新規陽性者数（日別）", "陽性者数")


def covid19_per100k() -> None:
    df = pd.read_csv(DATA / "COVID-19_NHK.csv")
    days = [c for c in df.columns if c[:2] == "20"]
    df = df.sort_values("per100K7", ascending=True)  # largest at the top of a horizontal bar chart
    customdata = df[["Pos7", "per100K", "Pos"]].to_numpy()
    fig = go.Figure(
        go.Bar(
            x=df["per100K7"],
            y=df["Pref"],
            orientation="h",
            marker={"color": SERIES},
            customdata=customdata,
            text=df["per100K7"].map("{:.1f}".format),
            textposition="outside",
            textfont={"color": TEXT_MUTED, "size": 11},
            cliponaxis=False,
            hovertemplate=(
                "<b>%{y}</b><br>"
                "10万人あたり（7日間）: <b>%{x:.2f}</b><br>"
                "陽性者数（7日間）: %{customdata[0]:,}<br>"
                f"10万人あたり（{days[-1]}）: %{{customdata[1]:.2f}}<br>"
                f"陽性者数（{days[-1]}）: %{{customdata[2]:,}}"
                "<extra></extra>"
            ),
        )
    )
    fig.update_layout(
        base_layout(
            f"人口10万人あたりの新規陽性者数（{days[0]}〜{days[-1]} の7日間）",
            height=24 * len(df) + 110,
            bargap=0.25,
            barcornerradius=4,
            margin={"l": 70, "r": 50, "t": 70, "b": 40},
        ),
        xaxis=axis(side="top", title=None),
        yaxis=axis(showgrid=False, tickfont={"color": TEXT}),
    )
    write_fragment("covid19_per100k", fig)


GSI_ATTR = "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"
GSI_TILES = {
    "地理院地図 標準": "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
    "地理院地図 淡色": "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
    "地理院写真": "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
}


def _num(value: float | None) -> str:
    return f"{value:g}"


def sake_popup(p: dict) -> str:
    rows = [("銘柄（商品名）", f"{escape(p['Brand'])}<br>（{escape(p['Sub_Brand'] or '')}）")]
    if p.get("Specific_n"):
        rows.append(("特定名称", escape(p["Specific_n"])))
    rows.append(("蔵元", escape(p["Brewery"])))
    if p.get("Rice"):
        rows.append(("使用米", escape(p["Rice"])))
    if p.get("Ratio") is not None:
        rows.append(("精米歩合", f"{_num(p['Ratio'])}%"))
    if p.get("Yeast"):
        rows.append(("使用酵母", escape(p["Yeast"])))
    if p.get("Alcohol_de") is not None:
        rows.append(("アルコール度数", f"{_num(p['Alcohol_de'])}%"))
    if p.get("Sake_de") is not None:
        rows.append(("日本酒度", f"{p['Sake_de']:+g}"))
    if p.get("BY") is not None:
        rows.append(("酒造年度", f"{int(p['BY'])}"))
    if p.get("Impression"):
        rows.append(("感想", escape(p["Impression"])))
    if p.get("Image"):
        rows.append(("画像", f'<img src="/img/sake/{escape(p["Image"])}" alt="" style="max-width:200px">'))
    body = "".join(f'<tr><th scope="row" style="text-align:left;padding-right:8px;white-space:nowrap">{k}</th><td>{v}</td></tr>' for k, v in rows)
    return f'<table style="font-size:13px">{body}</table>'


class MetricScale(MacroElement):
    """Scale bar in metric units only (folium's control_scale also shows miles)."""

    _template = Template(
        "{% macro script(this, kwargs) %}"
        "L.control.scale({imperial: false}).addTo({{ this._parent.get_name() }});"
        "{% endmacro %}"
    )


def sake_map() -> None:
    geo = json.loads((DATA / "Sake_Map.geojson").read_text(encoding="utf-8"))
    m = folium.Map(location=[36.1, 138.75], zoom_start=5, min_zoom=4, max_zoom=18, tiles=None)
    for i, (name, url) in enumerate(GSI_TILES.items()):
        folium.TileLayer(url, name=name, attr=GSI_ATTR, overlay=False, show=i == 0).add_to(m)
    cluster = MarkerCluster(
        options={"showCoverageOnHover": False, "spiderfyOnMaxZoom": True, "disableClusteringAtZoom": 19}
    ).add_to(m)
    for feature in geo["features"]:
        p = feature["properties"]
        lon, lat = feature["geometry"]["coordinates"]
        folium.Marker(
            [lat, lon],
            tooltip=f"{p['Brewery']}「{p['Brand']}」",
            popup=folium.Popup(sake_popup(p), max_width=360, max_height=400),
        ).add_to(cluster)
    folium.LayerControl().add_to(m)
    m.add_child(MetricScale())
    m.save(PAGES / "sake_map.html")
    print("  map    sake_map")


BUILDERS = [covid19_jp, covid19_ktq, covid19_per100k, sake_map]


def copy_plotlyjs() -> None:
    (PAGES / "plotly.min.js").write_text(get_plotlyjs(), encoding="utf-8")


def main() -> None:
    FRAGMENTS.mkdir(parents=True, exist_ok=True)
    PAGES.mkdir(parents=True, exist_ok=True)
    copy_plotlyjs()
    print("Building charts:")
    for build in BUILDERS:
        build()


if __name__ == "__main__":
    main()
