import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { Exam } from "../models/exam.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {Question} from "../models/question.model.js"
import {User} from "../models/user.model.js"
import { Result } from "../models/result.model.js"
// import {User} from "../models/user.model.js"

const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "Logged Out"))
})

const createExams = asyncHandler(async (req, res) => {

    const { examData,questions} = req.body
    const teacher = req.user
    // console.log("hello",teacher._id);
    if (!examData.title) {
        throw new ApiError(404, "Title is required");
    }
    if (!examData.password) {
        throw new ApiError(404, "password is required");
    }

    const existedExam = await Exam.findOne({ title:examData.title,createdBy: teacher._id });
    if (existedExam) {
        // console.log("hello");
        throw new ApiError(404, `Exam created by ${teacher.fullName} and with this title already existed`);
    }


    const exam = await Exam.create({
        title:examData?.title,
        timeLimit: examData?.timeLimit || 0,
        questions:[],
        password:examData?.password,
        createdBy: teacher,
        totalQuestion:questions.length
    })
    const createdexamI = await Exam.findById(exam._id)

    for(let i = 0;i < questions.length;i++){
        const question = questions[i];
        const quest = await Question.create({
            question:question.question,
            options:question.options,
            correctAnswer:question.options[question.correctAnswer],
        })
        // console.log(quest._id)
        createdexamI.questions.push(quest._id);
    }
    await createdexamI.save();
    const user = await User.findById(req.user._id)
    user.createdExams.push(exam._id);
    // console.log(user)
    await user.save()
    const createdexam = await Exam.findById(exam._id).select("-password")
    // console.log(createdexam)
    if (!createdexam) {
        throw new ApiError(404, "Something Went wrong");
    }
    return res
        .status(200)
        .json(new ApiResponse(201, createdexam, "Exam created successfully"));
})

const getAllCreatedExams = asyncHandler(async(req,res)=>{

    const allExams = await Exam.find({createdBy:req.user._id}).limit(9).select("-password").populate("rankings")

    return res
    .status(200)
    .json(new ApiResponse(200,allExams,"successfully fetched All exams"))
})

const getResultsForExam = asyncHandler(async(req,res)=>{

    const {examId} = req.params
    // console.log(examId)
    const result = await Result.find({exam:examId})
    // console.log(result)
    return res
    .status(200)
    .json(new ApiResponse(200,result,"Successfully fetched all results"))


})


export {
    createExams,
    logoutUser,
    getAllCreatedExams,
    getResultsForExam
}