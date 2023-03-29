const express = require("express");
const momentsRouter = express.Router();
const Moment = require("../models/momentModel.js");
const User = require("../models/userModel.js");
const Comment = require("../models/commentModel.js");

// Get all moments
momentsRouter.get("/", (req, res, next) => {
    Moment.find({})
    .populate("comments")
    .populate({
        path: "comments",
        populate: {
            path: "user",
            model: "User"
        }
    })
    .populate("user")
    .then(moments => {
        return res.status(200).send(moments)
    })
    .catch(err => {
        res.status(500)
        return next(err)
    })
});


// Post a moment
momentsRouter.post("/", (req, res, next) => {
    const userId = req.auth._id;
    req.body.user = userId;
    const newMoment = new Moment(req.body);
    newMoment.save()
    .then(savedMoment => {
        return User.findOneAndUpdate({ _id: userId }, { $push: { moments: savedMoment._id } }, { new: true })
        .then(() => {
            res.status(201).send(savedMoment)
        })
        .catch(err => {
            res.status(500)
            return next(err)
        })
    })
    .catch(err => {
        res.status(500)
        return next(err)
    })
});


// Delete a moment 
momentsRouter.delete("/:momentId", (req, res, next) => {
    const userId = req.auth._id;
    req.body.user = userId;
    Moment.findOneAndDelete({ _id: req.params.momentId })
    .then(deletdMoment => {
        Comment.deleteMany({ moment: req.params.momentId })
        .then(() => {
            return User.updateOne({ _id: userId }, { $pull: { moments: deletdMoment._id }})
            .then(() => {
                return res.status(200).send(`Successfully deleted ${deletdMoment.title}`)
            })
            .catch(err => {
                res.status(500)
                return next(err)
            })
        })
        .catch(err => {
            res.status(500)
            return next(err)
        })
    })
    .catch(err => {
        res.status(500)
        return next(err)
    })
});

// Edit a moment
momentsRouter.put("/:momentId", (req, res, next) => {
    const userId = req.auth._id;
    req.body.user = userId;
    Moment.findOneAndUpdate(
        { _id: req.params.momentId },
        req.body,
        { new: true }
    )
    .then(updatedMoment => {
        return res.status(201).send(updatedMoment)
    })
    .catch(err => {
        res.status(500)
        return next(err)
    })
})

// Add a like to the moment
momentsRouter.post("/:momentId/like", (req, res, next) => {
    const userId = req.auth._id;
    req.body.user = userId;
    Moment.findOne({ _id: req.params.momentId })
    .then(moment => {
        if(moment.likes.includes(userId)){
            moment.likes.pull(userId)
        } else {
            moment.likes.push(userId)
        }
        moment.save()
        .then(() => {
            return res.status(201).send("Successfully liked/unliked moment")
        })
        .catch(err => {
            res.status(500)
            return next(err)
        })
    })
    .catch(err => {
        res.status(500)
        return next(err)
    })
})

module.exports = momentsRouter

