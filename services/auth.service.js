const pool = require('../config/db.config');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

class AuthService {
    renderSignInPage(req, res) {
        res.render('auth/signin.ejs');
    }

    async signInUser(req, res) {
        const { email, password } = req.body;
        const user = (await pool.query('SELECT * FROM users WHERE email = $1', [email])).rows[0];

        if (!user) {
            return res.render('error', { message: 'Invalid Username or password', error: { status: '' } })
        }

        const isPasswordMatches = await bcrypt.compare(password, user.password);

        if (!isPasswordMatches) {
            return res.render('error', { message: 'Invalid Username or password', error: { status: '' } })
        }

        req.session.userType = user.user_type;
        req.session.userId = user.id;
        req.session.email = user.email;

        res.redirect('/');
    }

    renderSignUpPage(req, res) {
        res.render('auth/signup.ejs');
    }

    async createNewUser(req, res) {
        const { firstName, lastName, email } = req.body;
        let { password } = req.body;
        password = await bcrypt.hash(password, SALT_ROUNDS);

        await pool.query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)', [firstName, lastName, email, password]);
        res.redirect('/auth/signin');
    }
}

module.exports = new AuthService();