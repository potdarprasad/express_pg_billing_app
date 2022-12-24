const router = require('express').Router();

router.get('/dashboard', (req, res)=>{
    res.render('admin/dashboard');
});

module.exports = router;