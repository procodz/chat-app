import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        require: true,
    },
    username:{
        type: String,
        unique: true,
        require: true,
    },
    password:{
        type: String,
        minlength: 6,
        require: true,
    },
    gender:{
        type: String,
        require: true,
        enum: ["male", "female"],
    },
    profilepic:{
        type: String,
        default: "",
    }
});

const User = mongoose.model("User", userSchema);
export default User;