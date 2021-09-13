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
        let arr7 = []
        let arr = []
        let dates = []
        let pref7 = []
        for (let i = 6; i < 13; i++) {
            dates.push(result[0][i])
        }
        for (let i = 1; i < result.length-1; i++) {
            let post7 = 0
            let arr2 = []
            for (let j = 6; j < 13; j++) {
                post7 += Number(result[i][j])
                arr2.push([result[0][j],Number(result[i][j])])
            }
            obj = {
                name:result[i][0],
                y:Number(result[i][4]),
                exParam:post7,
                drilldown:result[i][0]
            }
            arr7.push(obj)
            obj = {
                name:result[i][0],
                y:Number(result[i][5]),
                exParam:Number(result[i][12])
            }
            arr.push(obj)
            obj = {
                name:result[i][0],
                id:result[i][0],
                type:'bar',
                xAxis:1,
                data:arr2
            }
            pref7.push(obj)
        }
        // creating a chart
        console.log(pref7)
        const chart = Highcharts.chart('container', {
            chart: {
                accessibility: {
                    enabled: true
                },
                alignTicks: true,
                displayErrors: true,
            },
            title: {
                text: '人口１０万人あたりの感染者数（過去７日間）'
            },
            xAxis: [
                {
                    type: 'category',
                    title: {
                        text:null
                    },
                    showEmpty: false,
                    min:0,
                    max:9,
                    scrollbar: {
                        enabled: true
                    }
                },{
                    type: 'category',
                    title: {
                        text:null
                    },
                    showEmpty: false,
                    min:0,
                    max:6,
                    scrollbar: {
                        enabled: false
                    }
                }
            ],
            yAxis: {
                title: {
                    text: null
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y:,.2f}</b><br/>陽性者数: <b>{point.exParam}</b><br/>',
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
            series: [{
                type: 'bar',
                name: '過去7日間',
                xAxis:0,
                data: arr7
            },
            {
                type: 'line',
                name: '最新',
                data: arr
            }],
            drilldown:{
                series:pref7
            },
        });
        return chart
    });
  });