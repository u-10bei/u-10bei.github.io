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

# covid-19_NHKdata
Acquisition of open data from the NHK<br>
Data is updated daily after 5am.<br>
厚生労働省、北九州市のオープンデータを取得します。<br>
毎日５時過ぎにデータを更新します。

## R script

|||||
|:---:|:---:|:---:|:---:|
|**Name**|**Version**|**Library**|**memo**|
|**（名前）**|**（バージョン）**|**（ライブラリ）**|**（備考）**|
|CreateData.R|4.0.5|tidyverse|pipe %>%|
|CreateData410.R|4.1.2|readr,dplyr|pipe \|>|
|CreateNHK.R|4.1.2|readr,dplyr,tidyr|pipe \|>|NHK

## Data source<br>（データ取得元）
**Ministry of Health, Labour and Welfare（厚生労働省）**<br>[https://covid19.mhlw.go.jp/extensions/public/index.html](https://covid19.mhlw.go.jp/extensions/public/index.html) <br>
**Kitakyushu City（北九州市）**<br>[https://ckan.open-governmentdata.org/organization/kitakyushu-city](https://ckan.open-governmentdata.org/organization/kitakyushu-city)<br>
**NHK**<br>[https://www3.nhk.or.jp/news/special/coronavirus/data/](https://www3.nhk.or.jp/news/special/coronavirus/data/)<br>
**population（人口）**<br>[https://www.e-stat.go.jp/dbview?sid=0003445078](https://www.e-stat.go.jp/dbview?sid=0003445078)


## Output data<br>（出力データ）
[**National data（全国データ）**：COVID-19_JP.csv](https://github.com/u-10bei/covid-19_JPdata/blob/main/data/COVID-19_JP.csv)<br>
[**Prefectural data（各県データ）**：COVID-19_PREF.csv](https://github.com/u-10bei/covid-19_JPdata/blob/main/data/COVID-19_PREF.csv)<br>
[**Kitakyushu City Data（北九州市データ）**：COVID-19_KTQ.csv](https://github.com/u-10bei/covid-19_JPdata/blob/main/data/COVID-19_KTQ.csv)<br>
[**NHK**：COVID-19_NHK.csv](https://github.com/u-10bei/covid-19_JPdata/blob/main/data/COVID-19_NHK.csv)