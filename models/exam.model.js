import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
const examSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    }],
    timeLimit: {
        type: Number,
        default:0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    password:{
        type:String,
        required:true
    },
    totalQuestion:{
        type:Number,
        default:0
    },
    totalAttempts:{
        type:Number,
        default:0
    },
    rankings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Result"
        }
    ],
    status:{
        type:String,
        default:"Active"
    }
},{
    timestamps: true,
});

examSchema.pre("save",async function() {
    
    if(!this.isModified("password")) return ;
    this.password = await bcrypt.hash(this.password,10);
    // next();
})

examSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password);
}



export const Exam = mongoose.model('Exam', examSchema);
