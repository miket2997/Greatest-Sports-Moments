const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    moment: {
        type: Schema.Types.ObjectId,
        ref: "Moment",
        required: true
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
})

module.exports = mongoose.model("Comment", commentSchema)