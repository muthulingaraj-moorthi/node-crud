import mongoose from "mongoose";

const ProfileScheme = new mongoose.Schema({
    user_id:{
        type : String,
    },

    profile_pic:{
        type: String
    }
});

const Profile = await mongoose.model("Profile", ProfileScheme);

export default Profile;