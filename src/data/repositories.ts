// Repositories listed on the top page. Edit this file to add or remove entries.
//   name: GitHub repository name (linked to https://github.com/u-10bei/<name>)
//   app:  URL of the published app, if any
//   post: URL of the introduction post on this site, if any

/** Shown as two lines: English, then Japanese */
export interface Bilingual {
  en: string;
  ja: string;
}

export interface Repository {
  name: string;
  description: Bilingual;
  app?: string;
  post?: string;
}

export interface RepositoryGroup {
  title: Bilingual;
  /** Shown dimmed with an "アーカイブ" badge and this note */
  archived?: Bilingual;
  repositories: Repository[];
}

export const REPOSITORY_GROUPS: RepositoryGroup[] = [
  {
    title: { en: 'AI & LLM', ja: 'AI・LLM' },
    repositories: [
      {
        name: 'jp-culture-benchmark',
        description: {
          en: 'A benchmark that evaluates how well LLMs understand Japanese culture, on four axes',
          ja: 'LLM の日本文化理解力を4つの軸で評価するベンチマーク',
        },
      },
    ],
  },
  {
    title: { en: 'Sake, Horse Racing & Mahjong', ja: '日本酒・競馬・麻雀' },
    repositories: [
      {
        name: 'Sake_Map',
        description: {
          en: 'A map of the main sake I have ever drunk',
          ja: '今までに飲んだ主な日本酒の地図',
        },
        post: '/2022/02/jp_SakeMap.html',
      },
      {
        name: 'Pedigree_JPG1horses',
        description: {
          en: 'Sire lines of Japanese G1 winners',
          ja: '日本の G1 勝ち馬の父系図',
        },
        app: '/Pedigree_JPG1horses/',
        post: '/2022/09/jp_Pedigree_JPG1horses2.html',
      },
      {
        name: 'mleague-stats',
        description: {
          en: 'A Streamlit dashboard visualizing M.League match results',
          ja: 'Mリーグの対戦結果を可視化する Streamlit ダッシュボード',
        },
      },
    ],
  },
  {
    title: { en: 'Kitakyushu City Data', ja: '北九州市のデータ' },
    repositories: [
      {
        name: 'infectious-disease-outbreaks_KTQ',
        description: {
          en: 'A Streamlit app visualizing infectious disease trends (sentinel surveillance) in Kitakyushu',
          ja: '北九州市の感染症発生動向（定点報告）を可視化する Streamlit アプリ',
        },
        app: 'https://infectious-disease-outbreaks-ktq.streamlit.app/',
      },
      {
        name: 'emergency-transport_KTQ',
        description: {
          en: 'A Streamlit app showing ambulance activity in Kitakyushu since the city was founded',
          ja: '北九州市が発足して以降の救急活動の状況を表す Streamlit アプリ',
        },
        app: 'https://emergency-transport-ktq.streamlit.app/',
      },
      {
        name: 'Population-Projections-KTQ-2020',
        description: {
          en: 'Population projections for the seven wards of Kitakyushu (2020–2050, cohort component method)',
          ja: '北九州市7区の将来人口推計（2020〜2050年、コーホート要因法）',
        },
      },
    ],
  },
  {
    title: { en: 'Population Projections', ja: '人口推計' },
    repositories: [
      {
        name: 'Population_Projections_2020',
        description: {
          en: 'A population projection simulation based on IPSS \'Population Projections for Japan (2023)\'',
          ja: '「日本の将来推計人口（令和5年推計）」に基づく人口推計シミュレーション',
        },
      },
      {
        name: 'Population_Projections',
        description: {
          en: 'Population projections for Japan with R and Python',
          ja: 'R や Python による日本の人口推計',
        },
        post: '/2022/07/jp_Population_Projections.html',
      },
    ],
  },
  {
    title: { en: 'COVID-19', ja: '新型コロナウイルス' },
    archived: {
      en: 'Data updates ended in 2022. Kept as a record.',
      ja: 'データの更新は2022年に終了しました。記録として残しています。',
    },
    repositories: [
      {
        name: 'covid-19_JPdata',
        description: {
          en: 'Open data from MHLW and Kitakyushu City, processed for analysis',
          ja: '厚生労働省・北九州市のオープンデータを分析しやすい形に加工',
        },
        post: '/2021/08/jp_covid19jpdata.html',
      },
      {
        name: 'covid-19_JPchart',
        description: {
          en: 'Charts of new COVID-19 cases and more',
          ja: '新規陽性者数などのグラフ',
        },
        post: '/2021/09/jp_covid19jpchart.html',
      },
    ],
  },
];
