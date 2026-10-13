import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        // required: true,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
    },
    rollNumber: {
        type: String,
        // required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
    },
    attemptedExams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
    }],
    createdExams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
    }],
    refreshToken: {
        type: String,
    },
},{
    timestamps: true,
});

userSchema.pre("save",async function() {
    
    if(!this.isModified("password")) return ;
    this.password = await bcrypt.hash(this.password,10);
    // next();
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password);
}


userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            username:this.fullName,
            email:this.email,
            role:this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model('User', userSchema);