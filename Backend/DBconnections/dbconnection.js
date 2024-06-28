import mongoose from "mongoose";

export const handledbconnections = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        (console.log("connected to mongoDB"))
    } catch (error) {
        console.log("Somthing went wrong ", error)
    }
}
export default handledbconnections

