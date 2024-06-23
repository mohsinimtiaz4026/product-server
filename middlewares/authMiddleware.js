// utils
const { jwtUtils } = require('../utils');
// factories
const { userErrors } = require('../factories');

module.exports.auth = (req, res, next) => {
    let token;
    try {
        token = req.headers['x-auth-token'];
        const isTokenVerified = jwtUtils.verifyToken(token);
        if (isTokenVerified) {
            next();
        }
    } catch (error) {
        return userErrors.noToken();
    }
}
