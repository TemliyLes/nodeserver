const express = require('express');
const app = express();
require('express-ws')(app);

// import { WebSocketServer } from 'ws';
const port = 1313;

let iter = 1;

const webSockets = [];

app.use(function (req, res, next) {
    // console.log('middleware');
    req.testing = 'testing';
    return next();
});

app.get('/', function (req, res, next) {
    console.log('get route', req.testing);
    res.end();
});

app.ws('/', function (ws, req) {
    console.log('connected');
    const userID = iter;
    iter++;
    webSockets.push(ws);

    console.log(webSockets.length, ' -- sock length');
    ws.on('message', (msg) => {
        const obj = JSON.parse(msg);
        console.log('obj', obj.type)
        // if (obj.type === 'register') {
        //     if (!users.includes(obj.body)) {
        //         users.push(obj.body);
        //     }
        //     console.log('users', users);
        // }

        if (obj.type === 'alarm') {
            ws.send()
        }

    });
    ws.on('close', (reasonCode, description) => {
        // console.log((new Date()) + ' Peer ' + ws.remoteAddress + ' disconnected.');
        const remIndex = webSockets.indexOf(ws);
        console.log(remIndex, 'index')

        if (remIndex > -1) {
            webSockets.splice(remIndex, 1)
        }


        console.log(webSockets.length, ' -- sock length');
    });
});

app.listen(port);