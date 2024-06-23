module.exports = {
    userAlreadyExist: {
        status: 400,
        message: 'Email Already Exist!!!',
    },
    noToken: {
        status: 404,
        message: "No Token Attached with Header",
    },
    registerSchemaFields: {
        status: 404,
        message: "Plese fill all fields",
    },
    internalServerError: {
        status: 500,
        message: "Internal Server Error",
    },
    noUsers: {
        status: 404,
        message: "No Users Found!",
    },
    allUsersSchemaErr: {
        status: 404,
        message: "Something went wrong!",
    },
    wrongCredentails: {
        status: 404,
        message: "Wrong Credentials!",
    },
    loginSchemaFields: {
        status: 404,
        message: "Plese fill all fields",
    },
    updateSchemaFields: {
        status: 404,
        message: "Plese fill all fields",
    },
    deleteSchemasFields: {
        status: 404,
        message: "Plese fill all fields",
    },
    somethingWentWrong: {
        status: 203,
        message: "Something Went Wrong!!!",
    },
}