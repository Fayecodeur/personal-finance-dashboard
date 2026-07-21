import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { getProfile, updateProfile } from "../controllers/userController";

const router = Router();

router.use(protect);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

export default router;
