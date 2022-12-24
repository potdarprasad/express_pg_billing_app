module.exports = (req, res, next) => {
    const urlPath = req.originalUrl;

    if (!req.session.userId) {
        return res.redirect('/');
    }

    if (req.session.userType === 'APPUSER' && urlPath.includes('/admin/')) {
        return res.redirect('/');
    } else {
        return next();
    }
}