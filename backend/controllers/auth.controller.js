import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genrateTokenAndSetCookie from "../utils/genrate.jwt.token.js";

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      res.status(400).json({ message: "enter matching password" });
    }
    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return res.status(400).json({ message: "username already exist" });
    }
    const hashPass = await bcrypt.hash(password, 10);

    const user = new User({
      fullname,
      username,
      password: hashPass,
      gender,
    });
    if (user) {
      genrateTokenAndSetCookie(user._id, res);
      await user.save();
      res.send("new user is created");
    } else {
      res.status(400).json({ error: "invalid Inputs..." });
    }
  } catch (error) {
    console.log("internal error in signup api");
    res.status(404).json({ message: "internal server error in signup API" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const inputPassword = await bcrypt.compare(password, user.password);
    if (!user || !inputPassword) {
      return res.status(500).json({ message: "invalide credentials" });
    }
    genrateTokenAndSetCookie(user._id, res);
    res.status(201).json({ message: "login successfull" });
  } catch (error) {
    console.log("internal error in login api");
    res.status(404).json({ message: "internal server error" });
  }
};

export const logout = async (req,res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(201).json({message: "logout successfull"});
    } catch (error) {
        console.log("internal error in login api");
        res.status(404).json({ message: "internal server error" }); 
    }
};
