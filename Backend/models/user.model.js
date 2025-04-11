const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema=new mongoose.Schema({

    fullnName:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"first name should be atleast 3 characters"]
        },
        lastname:{
            type:String,
            // required:false,
            minlength:[3,"last name should be atleast 3 characters"]

        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[10,"email should be atleast 3 characters"]
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[6,"password should be atleast 6 characters"]
    },
    socketId:{
        type:String,
        //  required:false
    }

}
);

userSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
    
}

userSchema.statics.hashPassword = async (password)=>{
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
