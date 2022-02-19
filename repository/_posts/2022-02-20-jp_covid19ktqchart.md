---
layout: post
title:  "covid-19_KTQ_patient_per100Kについて"
subtitle:   "リポジトリ「covid-19_JPchart」の紹介３"
date:   2022-02-20 00:00:00 +0900
categories: repository
background: '/img/posts/04.jpg'
chart: /assets/user/covid-19_KTQ_patient_per100K.js
pagination: 
  enabled: true
  category: repository
  paginate_path: '/jekyll/:num/pagination-plugin/'
---

## リポジトリ「covid-19_JPchart」の紹介３
- こちらでは、北九州市発表のオープンデータを基に、
- javascript、Highchartsを使い、過去１週間の人口１０万人あたりの陽性者数を棒グラフにしています。
- 平日の夜２３時にデータを更新しています。

<div id="container" style="width:100%; height:500px;"></div>

---
- ### Data source<br>（データ取得元）
  - **新型コロナ関連の情報提供:北九州市（オープンデータ）**
  [https://ckan.open-governmentdata.org/organization/kitakyushu-city/](https://ckan.open-governmentdata.org/organization/kitakyushu-city/)

- プログラムの中身を知りたい方は[**こちら**](https://github.com/u-10bei/covid-19_JPchart)
