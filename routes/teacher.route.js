import { Router } from "express";
import { verifyJWTForStudent,verifyJWTForTeacher,verifyJWT } from "../middlewares/auth.middleware.js";
import {loginUser, registerUser, userDashboard } from "../controllers/student.controller.js";
import {  createExams,getAllCreatedExams,getResultsForExam,logoutUser } from "../controllers/teacher.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route('/logout').post(verifyJWT,logoutUser);
router.route('/dashboard').get(verifyJWT,userDashboard);
router.route('/create-exam').post(verifyJWT,verifyJWTForTeacher,createExams)
router.route('/created-exams').get(verifyJWT,verifyJWTForTeacher,getAllCreatedExams)
router.route('/result-for/:examId').get(verifyJWT,verifyJWTForTeacher,getResultsForExam)



export default router;

