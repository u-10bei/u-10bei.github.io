const input_address = 'https://raw.githubusercontent.com/u-10bei/covid-19_JPdata/main/data/COVID-19_JP.csv'

const output_csv_el = document.querySelector('#output_csv');

// CSVの読み込み
function import_csv(csv_path)
{
    return fetch(csv_path)
    .then(res => {
        if(!res.ok) {
            console.log('正常にリクエストを処理できませんでした。');
        }
        return res.text();
    })
    .then(csv_data => {
        // テキストデータを配列に変換
        let data_array = [];
        const data_string = csv_data.split('\n');
        for (let i = 0; i < data_string.length; i++) {
            data_array[i] = data_string[i].split(',');
        }
        return data_array;
    })
    .catch(error => {console.log('エラーが発生しました。',error);
    })
}

document.addEventListener('DOMContentLoaded', function () {
    import_csv(input_address)
    .then(result => {
        let x = []
        let d = []
        for (let i = 1; i < result.length; i++) {
            x.push(result[i][0]);
            d.push(Number(result[i][2]));
        }
        const chart = Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'covid-19_JPdata'
            },
            xAxis: {
                categories: x
            },
            yAxis: {
                title: {
                    text: 'number'
                }
            },
            series: [{
                name: result[0][2],
                data: d
            }]
        })
        return chart
    });
  });