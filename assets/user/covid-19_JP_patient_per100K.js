const INPUT_ADDRESS = 'https://raw.githubusercontent.com/u-10bei/covid-19_JPdata/main/data/COVID-19_NHK.csv'
const NET_ERROR = '正常にリクエストを処理できませんでした。'
const CATCH_ERROR = 'エラーが発生しました。'

const output_csv_el = document.querySelector('#output_csv');

// read CSV
function import_csv(csv_path)
{
    return fetch(csv_path)
    .then(res => {
        if(!res.ok) {
            console.log(NET_ERROR);
        }
        return res.text();
    })
    .then(csv_data => {
        // convert text to array
        let data_array = [];
        const data_string = csv_data.split('\n');
        for (let i = 0; i < data_string.length; i++) {
            data_array[i] = data_string[i].split(',');
        }
        return data_array;
    })
    .catch(error => {console.log(CATCH_ERROR,error);
    })
}

document.addEventListener('DOMContentLoaded', function () {
    import_csv(INPUT_ADDRESS)
    .then(result => {
        let arr = []
        let cats = []
        for (let i = 1; i < result.length-1; i++) {
            arr.push(Number(result[i][3]))
            cats.push(result[i][0])
        }
        // set data
        let datas = [{name:"都道府県別データ",data:arr}]
        // creating a chart
        const chart = Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: '人口１０万人あたりの感染者数（過去７日間）'
            },
            xAxis: {
                categories: cats,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '直近1週間の人口10万人あたりの感染者数',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                pointFormat: "{point.y:,.2f}"
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        formatter: function () {return Highcharts.numberFormat(this.y, 2)}
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: datas
        });
        return chart
    });
  });