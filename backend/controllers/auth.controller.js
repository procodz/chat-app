import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {

    try {
        const {fullname, username, password, confirmPassword, gender} = req.body;
        if (password !== confirmPassword) {
            res.status(400).json({ message: "enter matching password" })
        }
        const existingUserName = await User.findOne({username});
        if (existingUserName) {
            return res.status(400).json({ message: "username already exist" });
        }
        const hashPass = await bcrypt.hash(password,10);

        const user = new User({
            fullname,
            username,
            password: hashPass,
            gender,

        });
        await user.save();
        res.send("new user is created");

    } catch (error) {
        console.log("internal error in signup api");
        res.status(404).json({ message: "internal server error in signup API" })
    }
}