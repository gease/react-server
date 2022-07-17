const passport = require('passport');

const Authentication = require('./controller/authentication');
const passportService = require('./service/passport');

module.exports = function(app) {
    app.get('/', passport.authenticate('jwt', {session: false}), function (req, res, next) {
        res.send(['one', 'two', 'three']);
    });
    app.get('/login', passport.authenticate('local', {session: false}), Authentication.login);
    app.post('/signup', Authentication.signup);
}
