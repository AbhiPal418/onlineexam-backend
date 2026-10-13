import { Router } from "express";
import { verifyJWTForStudent,verifyJWTForTeacher,verifyJWT } from "../middlewares/auth.middleware.js";
import { allExam, attemptedExams, attendExam, loginUser, logoutUser, myResults, registerUser, removeFromAttemptedExam, searchExams, submitExams, userDashboard } from "../controllers/student.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route('/logout').post(verifyJWT,logoutUser);
router.route('/dashboard').get(verifyJWT,userDashboard);
router.route('/all-exams').get(verifyJWT,verifyJWTForStudent,allExam)
router.route('/attend-exam/:examId').post(verifyJWT,verifyJWTForStudent,attendExam);
router.route('/attempted-exams').get(verifyJWT,verifyJWTForStudent,attemptedExams);
router.route('/remove-from-attempted-exams').post(verifyJWT,verifyJWTForStudent,removeFromAttemptedExam);
router.route('/submit-exam').post(verifyJWT,verifyJWTForStudent,submitExams);
router.route('/my-results').get(verifyJWT,verifyJWTForStudent,myResults);
router.route('/search-exams').get(verifyJWT,verifyJWTForStudent,searchExams);


export default router;

