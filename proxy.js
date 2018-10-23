let express = require('express');
let proxy = require('http-proxy-middleware');
let cors = require('cors');

let app = express();

// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use('*',function (req, res, next) {
    console.log(res);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials',true);
    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});
app.use(proxy({target: 'https://firestore.googleapis.com', changeOrigin: true}));

app.listen(3000);