const jwt = require('jsonwebtoken');

module.exports = function (tokenData) {
    const token = jwt.sign({
        expireDate: Date.now() + 10000,
        data: tokenData
    }, 'secret');

    const refreshToken = jwt.sign({
        expireDate: Date.now() + 10000000,
        data: tokenData
    }, 'secret');

    return {
        token : token,
        refreshToken : refreshToken
    }
};