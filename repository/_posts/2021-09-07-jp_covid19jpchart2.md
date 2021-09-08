---
layout: post
title:  "covid-19_JP_patient_per100Kについて"
subtitle:   "リポジトリ「covid-19_JPchart」の紹介２"
date:   2021-09-07 00:00:00 +0900
categories: repository
background: '/img/posts/04.jpg'
chart: /assets/user/covid-19_JP_patient_per100K.js
pagination: 
  enabled: true
  category: repository
  paginate_path: '/jekyll/:num/pagination-plugin/'
---

## リポジトリ「covid-19_JPchart」の紹介２
- こちらでは、国勢調査、ＮＨＫのデータを基に、
- javascript、Highchartsを使い、過去１週間の人口１０万人あたりの陽性者数（都道府県別）を棒グラフにしています。
- 毎朝５時にデータを更新しています。

<div id="container" style="width:100%; height:1000px;"></div>

---
- ### Data source<br>（データ取得元）
  - **新型コロナ関連の情報提供:NHK**
  [https://www3.nhk.or.jp/news/special/coronavirus/data/](https://www3.nhk.or.jp/news/special/coronavirus/data/)

- プログラムの中身を知りたい方は[**こちら**](https://github.com/u-10bei/covid-19_JPchart)
