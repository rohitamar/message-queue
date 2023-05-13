const WebSocket = require('ws');

require('dotenv').config();

const API_URL = 'wss://ws.finnhub.io?token=' + process.env.API_KEY;

const socket = new WebSocket(API_URL);

socket.addEventListener('open', function (event) {
    changeStockStream('subscribe', 'AAPL')
    changeStockStream('subscribe', 'MSFT')
    changeStockStream('subscribe', 'META')
    changeStockStream('subscribe', 'VDC')
    changeStockStream('subscribe', 'NFLX')
    changeStockStream('subscribe', 'TGT')
    changeStockStream('subscribe', 'GOOGL')
    changeStockStream('subscribe', 'AMZN')
});

socket.addEventListener('message', function (event) {
    var tmp = JSON.parse(event.data);
    if(tmp['data'] != null && tmp['data'].length > 0) {
        tmp['data'].forEach(e => {
            console.log(e['s'] + ' ' + e['p']);
        });  
    }
});

var changeStockStream = function(option, symbol) {
    socket.send(JSON.stringify({
        'type': option,
        'symbol': symbol
    }));
}