// models
const User = require('../models/userModel');
// factories
const { userEntities } = require('../factories');
// utils
const { passwordUtils } = require('../utils');

module.exports = {
    createUser: async ({
        body: { username, fullname, email, password, phone, profile },
    }) => {
        try {
            const hashPassword = await passwordUtils.saltHashPassword(password);
            const user = await User.create({
                username,
                fullname,
                email,
                password: hashPassword,
                phone,
                profile
            });
            await user.save();
            if (user) {
                return {
                    success: true,
                    user: userEntities.cleanUserObject({ user }),
                }
            }
            else {
                return {
                    success: false,
                    user,
                }
            }
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    },
    getUserByEmail: async ({
        body: { email },
    }) => {
        try {
            const user = await User.findOne({ email });
            if (user) {
                return {
                    success: true,
                    user,
                }
            }
            else {
                return {
                    success: false,
                    user: userEntities.cleanUserObject({ user }),
                }
            }
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    },
    loginUserByEmailAndPassword: async ({
        body: { email, password },
    }) => {
        try {
            const user = await User.findOne({ email });
            let comparedPassword = await passwordUtils.comparePassword(password, user.password);
            if (comparedPassword) {
                return {
                    success: true,
                    user: userEntities.cleanUserObject({ user }),
                }
            }
            else {
                return {
                    success: false,
                    user,
                }
            }
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    },
    updateUserById: async ({
        body: { id, username, fullname, email, password, phone },
    }) => {
        try {
            const condition = {
                _id: id
            }
            const user = await User.findOneAndUpdate(condition, { username, fullname, email, password, phone }, { new: true });
            if (user) {
                return {
                    success: true,
                    user: userEntities.cleanUserObject({ user }),
                }
            }
            else {
                return {
                    success: false,
                    user,
                }
            }
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    },
    deleteUserById: async ({
        body: { id },
    }) => {
        try {
            const user = await User.findByIdAndDelete(id);
            if (user) {
                return {
                    success: true,
                    user,
                }
            }
            else {
                return {
                    success: false,
                    user,
                }
            }
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    },
    uploadUserProfileById: async (id,files) => {
        // console.log(files);
        // const updatedRecord = {
        //     profile: files.filename
        // }
        try {
            // const user = await User.findOneAndUpdate(id, updatedRecord, { new: true });
            // if (user) {
            //     return {
            //         success: true,
            //         user: `${files.filename}`
            //     }
            // } else {
            //     return {
            //         success: false,
            //         user,
            //     }
            // }
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    },
}