const jwt = require('jsonwebtoken');

module.exports = {
    signToken: (obj) => {
        let givenToken = jwt.sign(obj, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        return givenToken;
    },
    verifyToken: (token) => {
        let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        return verifiedToken;
    },
    decodeToken: (token) => {
        let decodedToken = jwt.decode(token, process.env.JWT_SECRET);
        return decodedToken;
    },
}