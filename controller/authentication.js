const userModel = require('../model/user');
const jwt = require('jsonwebtoken');


const Config = require('../config');
const secret = Config.secret;

exports.signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    userModel.findOne({email: email}, function (err, existingUser){
        if (err) return next(err);
        if (existingUser) return res.status(422).send({error: "Email already in use"});
        const user = new userModel({ email: email, password: password});
        user.save(function(err){
            if (err) return next(err);
            const token = jwt.sign({ sub: user.id }, secret);
            res.json({token: token});
        })
    });
}

exports.login = function (req, res, next) {
    const token = jwt.sign({ sub: req.user.id }, secret);
    res.json({token: token});
}
