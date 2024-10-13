const express = require('express');
const router = express.Router();
const Middleware = require('../middleware/validationMiddleware');
const validations = require('../validation');
const verifyjsontoken = require('../middleware/authmiddleware')
const controller = require('../controller/Authentication');

router.route('/login').post(Middleware(validations.log_in),controller.login);
router.route('/signup').post(Middleware(validations.sign_up),controller.signup);
router.route('/user').get(verifyjsontoken,controller.user);
router.route('/del').delete(controller.del);
module.exports = router;