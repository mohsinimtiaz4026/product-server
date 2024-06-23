// utils
const { jwtUtils } = require('../utils');
// factories
const { userErrors } = require('../factories');

module.exports.refresh = (req, res, next) => {
    let token;
    try {
        token = req.headers['x-auth-token'];
        const decodedToken = jwtUtils.decodeToken(token);
        let newTokenValues = {
            id: decodedToken.id,
            email: decodedToken.email
        }
        if (decodedToken) {
            let token = jwtUtils.signToken({ ...newTokenValues });
            res.set({ ['x-auth-token']: token });
            next();
        }
    } catch (error) {
        return userErrors.noToken();
    }
}
