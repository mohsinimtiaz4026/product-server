// services
const { userServices } = require('../services');
// schemas
const { userSchema } = require('../schemas');
// utils
const { jwtUtils } = require('../utils');
// factories
const { userErrors, userResponses } = require('../factories');

module.exports = {
    createRequest: async (req, res) => {
        try {
            const { body } = req;
            const { error } = await userSchema.validateCreateRequest({ body });

            if (error) {
                return res.status(userErrors.registerSchemaFields.status).send(userErrors.registerSchemaFields.message);
            } else {
                const { success } = await userServices.getUserByEmail({ body });
                if (success) {
                    return res.status(userErrors.userAlreadyExist.status).send(userErrors.userAlreadyExist.message);
                } else {
                    const { success: createSuccess, error, user } = await userServices.createUser({ body });
                    if (createSuccess) {
                        const token = jwtUtils.signToken({
                            id: user._id,
                            email: user.email,
                        });
                        res.set({ ['x-auth-token']: token });
                        return res.status(userResponses.createUser.status).send({ ...userResponses.createUser, user });
                    } else {
                        return res.status(400).send(error);
                    }
                }
            }

        } catch (error) {
            return res
                .status(userErrors.internalServerError.status)
                .send(userErrors.internalServerError.message);
        }
    },
    loginRequest: async (req, res) => {
        try {
            const { body } = req;
            const { error } = await userSchema.validateLoginRequest({ body });

            if (error) {
                return res.status(userErrors.loginSchemaFields.status).send(userErrors.loginSchemaFields.message);
            } else {
                const { success, error, user } = await userServices.loginUserByEmailAndPassword({ body });
                if (success) {
                    return res.status(userResponses.loginUser.status).send({ ...userResponses.loginUser, user });
                } else {
                    return res.status(userErrors.wrongCredentails.status).send({ ...userErrors.wrongCredentails });
                }
            }

        } catch (error) {
            return res
                .status(userErrors.internalServerError.status)
                .send(userErrors.internalServerError.message);
        }
    },
    updateUserRequest: async (req, res) => {
        try {
            const { body } = req;
            const { error } = await userSchema.validateUserUpdateRequest({ body });

            if (error) {
                return res.status(userErrors.updateSchemaFields.status).send(userErrors.updateSchemaFields.message);
            } else {
                const { success, user } = await userServices.updateUserById({ body });
                if (success) {
                    return res.status(userResponses.UpdateUser.status).send({ ...userResponses.UpdateUser, user });
                } else {
                    return res.status(userErrors.noUsers.status).send({ ...userErrors.noUsers });
                }
            }

        } catch (error) {
            return res
                .status(userErrors.internalServerError.status)
                .send(userErrors.internalServerError.message);
        }
    },
    deleteUserRequest: async (req, res) => {
        try {
            const { body } = req;
            const { error } = await userSchema.validateUserDeleteRequest({ body });
            if (error) {
                return res.status(userErrors.deleteSchemasFields.status).send(userErrors.deleteSchemasFields.message);
            } else {
                const { success } = await userServices.deleteUserById({ body });
                if (success) {
                    return res.status(userResponses.DeleteUser.status).send({ ...userResponses.DeleteUser });
                } else {
                    return res.status(userErrors.noUsers.status).send({ ...userErrors.noUsers });
                }
            }

        } catch (error) {
            return res
                .status(userErrors.internalServerError.status)
                .send(userErrors.internalServerError.message);
        }
    },
    uploadUserProfileRequest: async (req, res) => {
        try {
            const files = req.files;
            console.log(files.filename);
            var data = [];
            files.forEach((f) => {
                data.push(`${process.env.SERVER_URL}/uploads/${f.filename}`);
            })
            return res.status(200).send({ msg: "Uploaded Files", data: data });
        } catch (error) {

        }
    },
}