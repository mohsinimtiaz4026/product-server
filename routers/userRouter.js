const route = require('express').Router();
// multer
const multer = require('multer');
// middlewares
const { authMiddleware, refreshMiddleware } = require('../middlewares');
// controllers
const { userController } = require('../controllers');

const UPLOAD_FILES_DIR = "./uploads/";
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, UPLOAD_FILES_DIR);
    },
    // in case you want to change the names of your files)
    filename(req, file = {}, cb) {
        file.mimetype = "audio/webm";
        // console.log(req)
        const { originalname } = file;
        const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
        cb(null, `${Date.now()}${fileExtension}`);
    }
});

const upload = multer({ storage });

route.post('/user-login', userController.loginRequest);
route.post('/user-register', userController.createRequest);
route.put('/user-update', userController.updateUserRequest);
route.delete('/user-delete', userController.deleteUserRequest);
route.post('/all-users', (req, res) => { });
route.post('/upload-image', upload.single('files'),userController.uploadUserProfileRequest );

module.exports = route;