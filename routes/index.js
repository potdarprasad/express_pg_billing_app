var express = require('express');
var router = express.Router();
const pool = require('../config/db.config');
const isLoggedIn = require('../middleware/auth.middleware');

/* GET home page. */
router.get('/', async (req, res, next) => {
  if (req.session.userId) {
    if (req.session.userType === 'ADMIN') {
      return res.redirect('/admin/dashboard');
    } else {
      return res.redirect('/dashboard')
    }
  }
  return res.redirect('/auth/signin')
});

router.get('/admin/dashboard', isLoggedIn, async (req, res, next) => {
  res.send('admin dashboard');
});
router.get('/dashboard', isLoggedIn, async (req, res, next) => {
  res.send('user dashboard');
});

module.exports = router;
