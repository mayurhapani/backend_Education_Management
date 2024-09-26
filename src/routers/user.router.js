import { Router } from "express";
import {
  registerUser,
  deleteUser,
  updateUser,
  login,
  logout,
  getUser,
  getAllUsers,
} from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.middleware.js";
import { authorize } from "../middlewares/rbac.middleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.delete("/delete/:_id", isAuth, authorize("admin"), deleteUser);
userRouter.patch("/update/:_id", isAuth, authorize("admin", "teacher"), updateUser);

userRouter.post("/login", login);
userRouter.get("/logout", isAuth, logout);

userRouter.get("/getUser", isAuth, getUser);
userRouter.get("/getAllUsers", isAuth, authorize("admin"), getAllUsers);

export { userRouter };
