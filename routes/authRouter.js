const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js")


// User sign up
authRouter.post("/signup", (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() })
    .then(user => {
        if(user){
            res.status(403)
            return next(new Error("Username is already taken"))
        }
        const newUser = new User(req.body);
        newUser.save()
        .then(savedUser => {
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET);
            return res.status(201).send({ token, user: savedUser.withoutPassword() })
        })
        .catch(err => {
            console.log(err)
            res.status(500)
            return next(err)
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500)
        return next(err)
    })
});


authRouter.post("/login", (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() })
    .then(user => {
        if(!user){
            res.status(403)
            return next(new Error("Username or password are incorrect"))
        }
        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err){
                res.status(403)
                return next(new Error("Username or password are incorrect"))
            }
            if(!isMatch){
                res.status(403)
                return next(new Error("Username or password are incorrect"))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(201).send({ token, user: user.withoutPassword() })
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500)
        return next(err)
    })
});





module.exports = authRouter

