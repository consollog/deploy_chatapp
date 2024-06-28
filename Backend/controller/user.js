import User from "../model/auth.user.js";

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const alluser = await User.find({ _id: { $ne: loggedInUser } }).select("-password")


        res.status(200).json(alluser)

    } catch (error) {
        console.log("Error in getUserForSidebar", error.message)
        res.status(500).json("Internal server error")
    }
}
