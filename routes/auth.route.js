const router = require('express').Router();
const authService = require('../services/auth.service');

router.get('/signin', authService.renderSignInPage);
router.post('/signin', authService.signInUser);

router.route('/signup')
    .get(authService.renderSignUpPage)
    .post(authService.createNewUser);

module.exports = router;