import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    _id: {
        type: String,
        unique: true
    },

    sub: {
        type: String,
        unique: true,
    },
    username: {
        type: String
    },
    password: {
        type: String
    },

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        unique: true
    },
    address:{
        type: Object
    },
    createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model('User', UserSchema);

export default User;