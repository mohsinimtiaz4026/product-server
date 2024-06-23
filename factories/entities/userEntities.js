const omit = require('lodash/omit');

module.exports = {
    cleanUserObject: ({ user }) => {
        const fieldsToOmit = ['_id', '__v', 'password', 'createdAt', 'updatedAt'];
        return omit({
            id: user._id,
            ...omit(user.toJSON(), fieldsToOmit),
        });
    },
    cleanUsersObjectArray: ({ users }) => {
        const fieldsToOmit = ['_id', '__v', 'password', 'createdAt', 'updatedAt'];
        let cleanUsersObjArray = [];
        users.map((user) => {
            cleanUsersObjArray.push(
                omit({
                    id: user._id,
                    ...omit(user.toJSON(), fieldsToOmit),
                })
            );
        });
        return cleanUsersObjArray;
    },
}