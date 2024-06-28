import express from "express"
import { getMessage, sendmessage } from "../controller/messagecontroller.js";
import protectRoute from "../middleware/protecteRoute.js";

const router = express.Router()
router.get("/:id", protectRoute, getMessage)
router.post("/send/:id", protectRoute, sendmessage)

export default router;