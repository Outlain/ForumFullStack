// routes/auth.routes.js

const { Router } = require('express');
const router = new Router();

const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const User = require('../models/User.model');

const { isLoggedIn, isLoggedOut } = require('../middleware/routeguard')

// GET route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));
// POST route ==> to process form data
router.post('/signup', (req, res, next) => {
    // console.log("The form data: ", req.body);

    const { username, email, password } = req.body;

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            return User.create({
                // username: username
                username,
                email,
                // passwordHash => this is the key from the User model
                //     ^
                //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
                passwordHash: hashedPassword
            });
        })
        .then(userFromDB => {
            // console.log('Newly created user is: ', userFromDB);
            res.redirect('/userProfile');

        })
        .catch(error => next(error));
});

// GET route ==> to display the login form to users
router.get('/login', isLoggedOut, (req, res) => res.render('auth/login'));
// POST login route ==> to process form data
router.post('/login', isLoggedOut, (req, res, next) => {
    console.log('SESSION =====> ', req.session);
    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.render('auth/login', {
            errorMessage: 'Please enter both, email and password to login.'
        });
        return;
    }

    User.findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
                return;
            } else if (bcryptjs.compareSync(password, user.passwordHash)) {
                // res.render('users/user-profile', { user });
                req.session.currentUser = user;
                console.log(req.session)
                res.redirect('/userProfile');
            } else {
                res.render('auth/login', { errorMessage: 'Incorrect password.' });
            }
        })
        .catch(error => next(error));
});

// userProfile route and the module export stay unchanged

router.get('/userProfile', isLoggedIn, (req, res) => {
    res.render('users/user-profile', { userInSession: req.session.currentUser });
});
router.get('/logout', isLoggedIn, (req, res, next) => {
    console.log(req.session, 'hey1');
    req.session.destroy((err) => {
        if (err) next(err);
        console.log(req.session, 'hey2');
        res.redirect('/');
    });
});


module.exports = router;