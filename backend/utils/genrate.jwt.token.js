import jwt from "jsonwebtoken";

const genrateTokenAndSetCookie = (userID, res) =>{
    const token = jwt.sign({userID}, process.env.SECRET_KEY, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",

    });
}

export default genrateTokenAndSetCookie;