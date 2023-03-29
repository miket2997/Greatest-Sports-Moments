const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const momentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    year: {
        type: Number,
        required: true
    },
    videoUrl: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});



module.exports = mongoose.model("Moment", momentSchema);

