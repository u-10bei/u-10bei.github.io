---
layout: page
title: covid-19_JPdata
background: '/img/bg-index.jpg'
---

# covid-19_JPdata
Acquisition of open data from the mhlw.go.jp and city.kitakyushu.jp<br>
Data is updated daily after 11pm.<br>
厚生労働省、北九州市のオープンデータを取得します。<br>
毎日２３時過ぎにデータを更新します。

## CreateData.R and CreateData410.R

|||||
|:---:|:---:|:---:|:---:|
|**Name**|**Version**|**Library**|**memo**|
|**（名前）**|**（バージョン）**|**（ライブラリ）**|**（備考）**|
|CreateData.R|4.0.5|tidyverse|pipe %>%|
|CreateData410.R|4.1.0|readr,dplyr|pipe \|>|

## Data source<br>（データ取得元）
**Ministry of Health, Labour and Welfare（厚生労働省）**<br>[https://www.mhlw.go.jp/stf/covid-19/open-data.html](https://www.mhlw.go.jp/stf/covid-19/open-data.html) <br>
**Kitakyushu City（北九州市）**<br>[https://ckan.open-governmentdata.org/organization/kitakyushu-city](https://ckan.open-governmentdata.org/organization/kitakyushu-city)

## Output data<br>（出力データ）
[**National data（全国データ）**：COVID-19_JP.csv](https://github.com/u-10bei/covid-19_JPdata/blob/main/data/COVID-19_JP.csv)<br>
[**Prefectural data（各県データ）**：COVID-19_PREF.csv](https://github.com/u-10bei/covid-19_JPdata/blob/main//data/COVID-19_PREF.csv)<br>
[**Kitakyushu City Data（北九州市データ）**：COVID-19_KTQ.csv](https://github.com/u-10bei/covid-19_JPdata/blob/main/data/COVID-19_KTQ.csv)<br>