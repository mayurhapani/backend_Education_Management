import { Router } from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getEnrolledCourses,
} from "../controllers/course.controller.js";
import { isAuth } from "../middlewares/isAuth.middleware.js";
import { authorize } from "../middlewares/rbac.middleware.js";

const courseRouter = Router();

courseRouter.post("/createCourse", isAuth, authorize("admin"), createCourse);
courseRouter.get("/getAllCourses", isAuth, getCourses);
courseRouter.get("/getCourse/:id", isAuth, getCourseById);
courseRouter.patch("/update/:id", isAuth, authorize("admin"), updateCourse);
courseRouter.delete("/delete/:id", isAuth, authorize("admin"), deleteCourse);
courseRouter.get("/enrolled", isAuth, authorize("student"), getEnrolledCourses);

export { courseRouter };
