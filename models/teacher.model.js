import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { 
         type: String,
        required: true,
    },
    createdExams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
    }],
    role:{
        type:String,
        required:true,
    }
},{
    timestamps: true,
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;