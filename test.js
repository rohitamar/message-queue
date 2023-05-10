const WebSocket = require('ws');

const socket = new WebSocket('wss://ws.finnhub.io?token=chc7irhr01quf0103vn0chc7irhr01quf0103vng');

// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'MSFT'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'META'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'VDC'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'NFLX'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'TGT'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'GOOGL'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AMZN'}))
});

// Listen for messages
socket.addEventListener('message', function (event) {
    var tmp = JSON.parse(event.data);
    if(tmp['data'] != null && tmp['data'].length > 0) {
        tmp['data'].forEach(e => {
            console.log(e['s'] + ' ' + e['p']);
        });  
    }
});

// Unsubscribe
 var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}