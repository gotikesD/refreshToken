const user = require('../mock/index');

module.exports = {
    detectToken : function (req,res,next) {
        if(!req.headers['x-access-token']) {
            next(new Error('Login required'))
        } else {
            next()
        }
    },
    compareUserCredentials : function (req,res,next) {
        const rule = req.query.name === user.name && req.query.password === user.password;

        if(!rule) {
            next(new Error('Wrong user credentials'))
        } else {
            next()
        }
    },
    detectUserCredentials : function (req,res,next) {
        if(!req.query.name || !req.query.password) {
            next(new Error('User name and password required'))
        } else {
            next()
        }
    },
    detectRefreshToken : function (req, res, next) {
        if(!req.headers['refresh-token']) {
            next(new Error('Refresh token required'))
        } else {
            next()
        }
    }
}

