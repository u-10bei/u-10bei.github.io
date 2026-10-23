// Repositories listed on the top page. Edit this file to add or remove entries.
//   name: GitHub repository name (linked to https://github.com/u-10bei/<name>)
//   app:  URL of the published app, if any
//   post: URL of the introduction post on this site, if any

export interface Repository {
  name: string;
  description: string;
  app?: string;
  post?: string;
}

export interface RepositoryGroup {
  title: string;
  repositories: Repository[];
}

export const REPOSITORY_GROUPS: RepositoryGroup[] = [
  {
    title: '北九州市のデータ',
    repositories: [
      {
        name: 'infectious-disease-outbreaks_KTQ',
        description: '北九州市の感染症発生動向（定点報告）を可視化する Streamlit アプリ',
        app: 'https://infectious-disease-outbreaks-ktq.streamlit.app/',
      },
      {
        name: 'emergency-transport_KTQ',
        description: '北九州市が発足して以降の救急活動の状況を表す Streamlit アプリ',
        app: 'https://emergency-transport-ktq.streamlit.app/',
      },
      {
        name: 'Population-Projections-KTQ-2020',
        description: '北九州市7区の将来人口推計（2020〜2050年、コーホート要因法）',
      },
    ],
  },
  {
    title: '人口推計',
    repositories: [
      {
        name: 'Population_Projections_2020',
        description: '「日本の将来推計人口（令和5年推計）」に基づく人口推計シミュレーション',
      },
      {
        name: 'Population_Projections',
        description: 'R や Python による日本の人口推計',
        post: '/2022/07/jp_Population_Projections.html',
      },
    ],
  },
  {
    title: '新型コロナウイルス',
    repositories: [
      {
        name: 'covid-19_JPdata',
        description: '厚生労働省・北九州市のオープンデータを分析しやすい形に加工（2022年11月で更新終了）',
        post: '/2021/08/jp_covid19jpdata.html',
      },
      {
        name: 'covid-19_JPchart',
        description: '新規陽性者数などのグラフ',
        post: '/2021/09/jp_covid19jpchart.html',
      },
    ],
  },
  {
    title: '日本酒・競馬・麻雀',
    repositories: [
      {
        name: 'Sake_Map',
        description: '今までに飲んだ主な日本酒の地図',
        post: '/2022/02/jp_SakeMap.html',
      },
      {
        name: 'Pedigree_JPG1horses',
        description: '日本の G1 勝ち馬の父系図',
        app: '/Pedigree_JPG1horses/',
        post: '/2022/09/jp_Pedigree_JPG1horses2.html',
      },
      {
        name: 'mleague-stats',
        description: 'Mリーグの対戦結果を可視化する Streamlit ダッシュボード',
      },
    ],
  },
  {
    title: 'AI・LLM',
    repositories: [
      {
        name: 'jp-culture-benchmark',
        description: 'LLM の日本文化理解力を4つの軸で評価するベンチマーク',
      },
    ],
  },
];
