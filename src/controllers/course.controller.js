import { courseModel } from "../models/course.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import redisClient from "../config/redis.js";

const createCourse = asyncHandler(async (req, res) => {
  const { title, description, teacher } = req.body;

  const course = await courseModel.create({
    title,
    description,
    teacher,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, course, "Course created successfully"));
});

const getCourses = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sort = "asc" } = req.query;
  const cacheKey = `courses:${page}:${limit}:${sort}`;

  const cachedCourses = await redisClient.get(cacheKey);
  if (cachedCourses) {
    return res
      .status(200)
      .json(new ApiResponse(200, JSON.parse(cachedCourses), "Courses fetched successfully from cache"));
  }

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort: { title: sort === "asc" ? 1 : -1 },
  };

  const courses = await courseModel.aggregatePaginate({}, options);

  await redisClient.set(cacheKey, JSON.stringify(courses), { EX: 60 * 10 }); // Cache for 10 minutes

  return res
    .status(200)
    .json(new ApiResponse(200, courses, "Courses fetched successfully"));
});

const getCourseById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const course = await courseModel.findById(id).populate("teacher students");

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, course, "Course fetched successfully"));
});

const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, teacher, students, assignments } = req.body;

  const course = await courseModel.findByIdAndUpdate(
    id,
    { title, description, teacher, students, assignments },
    { new: true }
  );

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, course, "Course updated successfully"));
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const course = await courseModel.findByIdAndDelete(id);

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, course, "Course deleted successfully"));
});

export { createCourse, getCourses, getCourseById, updateCourse, deleteCourse };
