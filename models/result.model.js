import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true,
    },
    scoreObtained: {
        type: Number,
        required: true,
    },
    totalScore: {
        type: Number,
        required: true,
    },
    attemptedQuestions:{
        type:Number,
        default:0
    }
},{
    timestamps: true,
});

export const Result = mongoose.model('Result', resultSchema);