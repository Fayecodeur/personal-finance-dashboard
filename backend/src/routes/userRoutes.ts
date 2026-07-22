import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/userController";

const router = Router();

router.use(protect);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.put("/change-password", changePassword);

export default router;
