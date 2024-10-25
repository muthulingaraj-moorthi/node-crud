import express from 'express';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';
import User from './UserSchema.js';
import ErrorEntity from '../utilities/Error.js';

const random_uuid = uuidv4();

// Getting the list of users from the mock database
router.get('/', async (req, res) => {
    const userList = await User.find().collation({ locale: "en" });
    res.status(200).json({
        status: "success",
        message: "User created successfully",
        data: userList
    });

})

router.post('/', async (req, res) => {

    try {
        const user = new User(req.body);
        user._id = user.sub = random_uuid;

        const saveUser = await user.save();
        res.status(200).json({
            status: "success",
            message: "User created successfully",
            data: saveUser
        });
    }
    catch (error) {
        res.send(error);
    }
});

/**
 * Get By ID
 */

router.get("/:id", async (req, res) => {
    const user = await User.findOne({ "_id": req.params.id });
    res.status(200).json({
        status: "success",
        message: "User created successfully",
        data: user
    });
});

/**
 * Update User
 */

router.put("/update/:sub", async (req, res) => {
    try{
        var  check_user = await User.findOne({
            "sub": req.params.sub
        });
        if (!check_user) {
            ErrorEntity.data = false;
            ErrorEntity.status = "invalid_request";
            ErrorEntity.message = "user does not exists";

            throw ErrorEntity;
        }

        check_user.name =  req.body.name;
        check_user.email = req.body.email;
        check_user.phone = req.body.mobile;

        check_user = await check_user.save();
        ErrorEntity.data = check_user;
        ErrorEntity.status = "success";
        ErrorEntity.message ="user updated successfully";
        res.status(200).json(ErrorEntity)
    }
    catch(error){
        res.status(400).json(error)
    }
})


/**
 * Get By ID
 */

router.delete("/:id", async (req, res) => {
    try {
        const check_user = await User.findOne({
            "sub": req.params.id
        });
        if (!check_user) {
            ErrorEntity.data = false;
            ErrorEntity.status = "invalid_request";
            ErrorEntity.message = "user does not exists";

            throw ErrorEntity;
        }

        const user = await User.deleteOne({ sub: req.params.id });
        res.status(200).json({
            status: "success",
            message: "User deleted successfully",
            data: true
        });
    }
    catch (error) {
        res.status(400).json(error)
    }
});

export default router;