const bcrypt = require('bcrypt');

module.exports = {
    saltHashPassword: async (password) => {
        let hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    },
    comparePassword: async (password, dbPassword) => {
        let matchPassword = await bcrypt.compare(password, dbPassword);
        return matchPassword;
    },
}