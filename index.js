const express = require('express');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware/');
const user = require('./mock/');

const tokenGenerator = require('./utils/');

const app = express();


app.get('/', middleware.detectToken, function (req, res) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, 'secret', function (err, decoded) {
        if (err) {
            res.send('Wrong token')
        } else {
            if (decoded.expireDate < Date.now()) {
                res.send('TOKEN EXPIRED, MAKE REFRESH REQUEST')
            } else {
                res.send('SECRET DATA')
            }
        }
    });
});

app.get('/login', middleware.detectUserCredentials, middleware.compareUserCredentials, function (req, res) {

    const tokens = tokenGenerator(JSON.stringify(user));

    res.set('x-access-token', tokens.token);
    res.set('refresh-token', tokens.refreshToken);
    res.end('Login success')
});

app.get('/refresh', middleware.detectRefreshToken , function (req, res, next) {
    const refreshToken = req.headers['refresh-token'];

    jwt.verify(refreshToken, 'secret', function (err, decoded) {
        if (err) {
            res.send('Wrong token')
        } else {
            if (decoded.expireDate < Date.now()) {
                res.send('REFRESH TOKEN EXPIRED, YOU NEED LOGIN')
            } else {
                const tokens = tokenGenerator(JSON.stringify(user));
                res.set('x-access-token', tokens.token);
                res.set('refresh-token', tokens.refreshToken);
                res.end('Refresh success')
            }
        }
    });
});

app.use(function (err, req, res) {

    res.send(err.message ? err.message : err)
});

app.listen('8080');






