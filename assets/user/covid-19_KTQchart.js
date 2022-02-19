const INPUT_ADDRESS = 'https://raw.githubusercontent.com/u-10bei/covid-19_JPdata/main/data/COVID-19_KTQ.csv'
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
        for (let i = 1; i < result.length; i++) {
            arr.push(new Array(
                //change JST to UTC
                Date.parse(result[i][0] + ' 09:00:00'),Number(result[i][3])
                )
            );
        }
        // set data
        let datas = [{name:result[0][3],data:arr}]
        // creating a chart
        const chart = Highcharts.chart('container', {
            chart: {
                zoomType: 'x'
            },
            series: datas,
            tooltip: {
                dateTimeLabelFormats:{
                    day: '%Y/%b/%e'
                }
            },
            title: {
                text: 'covid-19_KTQdata'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },            
            xAxis: {
                type: 'datetime',
                tickInterval: 30 * 24 * 36e5
            },
            yAxis: {
                title: {
                    text: 'number'
                }
            }
        })
        return chart
    });
  });