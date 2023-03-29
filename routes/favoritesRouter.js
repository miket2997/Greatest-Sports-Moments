const express = require("express");
const favoritesRouter = express.Router();
const User = require("../models/userModel.js");

// Add favorite leagues
favoritesRouter.post("/leagues", (req, res, next) => {
    const userId = req.auth._id;
    const leagueNames = req.body.favoriteLeagues;
    User.findByIdAndUpdate(
        userId,
        { $addToSet: { favoriteLeagues: leagueNames } },
        { new: true }
    )
    .then(user => {
        if(!user){
           return res.status(404).send("User not found")
        }
        user.save()
        .then(() => {
            return res.status(201).send("Successfully updated favorite leagues")
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

// Get favorite leagues
favoritesRouter.get("/leagues", (req, res, next) => {
    const userId = req.auth._id;
    req.body.user = userId
    User.findById(userId)
      .then(user => {
        if (!user) {
          return res.status(404).send("User not found");
        }
        return res.status(200).send(user.favoriteLeagues);
      })
      .catch(err => {
        res.status(500);
        return next(err);
      });
  });
  

// Add favorite teams
favoritesRouter.post("/teams", (req, res, next) => {
    const userId = req.auth._id;
    const teamNames = req.body.favoriteTeams;
    User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { favoriteTeams: teamNames } },
        { new: true }
    )
    .then(user => {
        if(!user){
            return res.status(404).send("User not found")
        } 
        user.save()
        .then(() => {
            return res.status(201).send(`Successfully updated favorite teams`)
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

// Get favorite teams
favoritesRouter.get("/teams", (req, res, next) => {
    const userId = req.auth._id;
    req.body.user = userId;
    User.findById(userId)
    .then(user => {
        if(!user){
            return res.status(404).send("User not found")
        }
        return res.status(200).send(user.favoriteTeams)
    })
    .catch(err => {
        res.status(500)
        return next(err)
    })
});



module.exports = favoritesRouter;

