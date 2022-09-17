var nodes = null;
var edges = null;
var network = null;

// const NODE_ADDRESS = '/datas/node.json'
// const LINK_ADDRESS = '/datas/link.json'
const NODE_ADDRESS = 'https://labo.u10bei.net/PHP/nodeall.php'
const LINK_ADDRESS = 'https://labo.u10bei.net/PHP/linkall.php'
const urls = [NODE_ADDRESS,LINK_ADDRESS];

const CATCH_ERROR = 'エラーが発生しました。'

// read json
function import_json(json_path) {
    return Promise.all(
        json_path.map(url => axios.get(url))
    )
    .then(([nodedata,linkdata]) => {
        return [nodedata.data,linkdata.data]
    })
    .catch(error => {console.log(CATCH_ERROR,error);
    })
};

window.addEventListener('load', () => {
    import_json(urls)
    .then(result => {
        var container = document.getElementById("network")
        var data = {
            nodes: result[0],
            edges: result[1]
        };
        var options = {
            nodes: {
                shape: "dot",
                scaling: {
                    label: {
                        min: 1,
                        max: 150,
                    },
                },
            },
            layout: {
                improvedLayout:false,
                hierarchical: {
                    enabled:true,
                    sortMethod: 'directed',  // hubsize, directed
                    shakeTowards: 'leaves'  // roots, leaves
                  }
            }
        };
        network = new vis.Network(container, data, options);
    })
});