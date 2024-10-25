import express from 'express';

const router = express.Router();

import User from './UserSchema.js';
import Profile from './ProfilrSchema.js';



/**
 * Creaste Profile Pic
 */

router.post("/:user_id", async (req, res) => {
    try {
        const user_info = await User.findOne({
            "_id": req.params.user_id
        });

        if (!user_info) {
            throw new Error("This user not exists")
        }

        var profile_scheme = new Profile();
        profile_scheme.user_id = user_info._id;
        profile_scheme.profile_pic = req.body.img;

        await profile_scheme.save();
        res.send(true)
    }
    catch (error) {
        res.send(error.message)
    }
});

export default router;
