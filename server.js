const express = require("express");
const app = express();
const morgan = require("morgan");
const { expressjwt } = require("express-jwt");
const mongoose = require("mongoose");
require("dotenv").config();
//const path = require("path");


app.use(express.json());
app.use(morgan("dev"));
//app.use(express.static(path.join(__dirname, "client", "build")));



mongoose.connect(`mongodb+srv://miket2997:${process.env.PASSWORD}@cluster0.wawrkog.mongodb.net/sportsMoments?retryWrites=true&w=majority`)
.then(() => console.log("Connected to DB"))
.catch(err => console.log(err))


// Routes
app.use("/auth", require("./routes/authRouter.js"));
app.use("/api", expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] }));
app.use("/api/favorites", require("./routes/favoritesRouter.js"));
app.use("/api/moments", require("./routes/momentsRouter.js"));
app.use("/api/comments", require("./routes/commentsRouter.js"));


// Error handling
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
});


// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

//const port = process.env.PORT || 9000
app.listen(9000, () => {
    console.log(`App is running on port 9000`)
})

