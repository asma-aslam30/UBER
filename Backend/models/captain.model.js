const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const captainSchema = new mongoose.Schema({
  fullnName: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "first name should be atleast 3 characters"],
    },
    lastname: {
      type: String,
      // required:false,
      minlength: [3, "last name should be atleast 3 characters"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "please enter a validemail"],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [6, "password should be atleast 6 characters"],
  },
    socketId: {
        type: String,
        //  required:false
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,"color should be atleast 3 characters"]
        },
        // model:{
        //     type:String,
        //     required:true,
        //     minlength:[3,"model should be atleast 3 characters"]
        // },  
        plate:{
            type:String,
            required:true,
            minlength:[3,"plate should be atleast 3 characters"]
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,"capacity should be atleast 1"]
        },
        vehicleType:{
            type:String,
            enum:['car','auto','motorcycle'],
            required:true
        },

    },
   locayion:{
    lat:{
        type:Number,
        
    },
    lng:{
        type:Number,
    }
}});

captainSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};


captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


captainSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const captainModel= mongoose.model("captain", captainSchema);

module.exports = captainModel;