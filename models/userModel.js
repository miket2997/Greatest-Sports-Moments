const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        default: Date.now
    },
    phoneNumber: {
        type: Number
    },
    favoriteLeagues: {
        type: [String],
        default: []
    },
    favoriteTeams: {
        type: [String],
        default: []
    },
    moments: [{
        type: Schema.Types.ObjectId,
        ref: "Moment"
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    memberSince: {
        type: Date,
        default: Date.now
    }
});

// Encrpyt password
userSchema.pre("save", function(next){
    const user = this
    if(!user.isModified("password")) return next()
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return next()
        user.password = hash
        next()
    })
});

// Compare password to make sure it is correct
userSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) return callback(err)
        return callback(null, isMatch)
    })
}

// Remove password from response
userSchema.methods.withoutPassword = function(){
    const user = this.toObject();
    delete user.password
    return user
}




module.exports = mongoose.model("User", userSchema)

