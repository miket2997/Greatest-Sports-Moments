const express = require("express");
const commentsRouter = express.Router();
const Comment = require('../models/commentModel.js');
const User = require("../models/userModel.js");
const Moment = require("../models/momentModel.js");

// Get all commnents
commentsRouter.get("/", (req, res, next) => {
    Comment.find()
    .then(comments => {
        return res.status(200).send(comments)
    })
    .catch(err => {
        res.status(500)
        return next(err)
    })
});


// Add a comment
commentsRouter.post("/:momentId", (req, res, next) => {
    const userId = req.auth._id;
    req.body.user = userId;
    req.body.moment = req.params.momentId;
    const newComment = new Comment(req.body);
    newComment.save()
    .then(savedComment => {
        return User.findOneAndUpdate({ _id: userId }, { $push: { comments: savedComment._id }}, { new: true })
        .then(() => {
            return Moment.findOneAndUpdate({ _id: req.params.momentId }, { $push: { comments: savedComment._id }}, { new: true })
            .then(() => {
                return res.status(201).send(savedComment)
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

// Delete a comment
commentsRouter.delete("/:commentId", (req, res, next) => {
    const userId = req.auth._id;
    req.body.user = userId;
    Comment.findOneAndDelete({ _id: req.params.commentId })
    .then(deletedComment => {
        return User.updateOne({ _id: deletedComment.user._id },{ $pull : { comments: deletedComment._id }})
        .then(() => {
            return Moment.updateOne({_id: deletedComment.moment._id }, { $pull: { comments: deletedComment._id }})
            .then(() => {
                return res.status(200).send(`Successfully deleted ${deletedComment.text}`)
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

// Edit comment
commentsRouter.put("/:commentId", (req, res, next) => {
    const userId = req.auth._id;
    req.body.user = userId;
    Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        req.body,
        { new: true }
    )
    .then(updatedComment => {
        return res.status(201).send(updatedComment)
    })
    .catch(err => {
        res.status(500)
        return next(err)
    })
});

// Like a comment
commentsRouter.post("/:commentId/like", (req, res, next) => {
    const userId = req.auth._id;
    req.body.user = userId;
    Comment.findOne({ _id: req.params.commentId })
    .then(comment => {
        if(comment.likes.includes(userId)){
            comment.likes.pull(userId)
        } else {
            comment.likes.push(userId)
        }
        comment.save()
        .then(() => {
            return res.status(201).send("Successfully liked/unliked comment")
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


module.exports = commentsRouter;

