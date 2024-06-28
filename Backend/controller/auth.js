import bcrypt from "bcryptjs";
import User from "../model/auth.user.js";
import generateTokenAndSetCookie from "../utills/genrateJwtToken.js"

export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmpassword, gender } = req.body;

        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        await newUser.save();

        // Generate JWT token and set cookie here
        generateTokenAndSetCookie(newUser._id, res);

        // Send response
        return res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });

    } catch (error) {
        console.log("Error in signup controller", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Generate JWT token and set cookie here
        generateTokenAndSetCookie(user._id, res);

        // Send response
        return res.status(200).json({
            _id: user._id,
            fullName: user.fullname,
            username: user.username,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const logout = (req, res) => {
    try {
        res.status(200).clearCookie("jwt", { maxage: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};