const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const {validationResult} = require('express-validator');
const blacklistedTokenModel = require('../models/blacklistToken.model');
module.exports.registerCaptain= async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullnName,email,password,vehicle}=req.body;
    const {firstname,lastname}=fullnName;
    const {color,plate,capacity,vehicleType}=vehicle;

    const isCatainAlreadyExist=await captainModel.findOne({email});
    if(isCatainAlreadyExist){
        return res.status(400).json({message:'Captain already exist'});
    }

    const hashPassword=await captainModel.hashPassword(password);

    const captain=await captainService.createCaptain({
        firstname:fullnName.firstname,
        lastname:fullnName.lastname,
        email,
        password:hashPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });
    const token=captain.generateAuthToken();
    res.status(201).json({captain,capitanToken:token});
}


module.exports.loginCaptain = async (req, res,next) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(404).json({ message: 'Captain not found' });
    }
    const isPasswordMatch = await captain.comparePassword(password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = captain.generateAuthToken();
    res.cookie('token', token);
    res.json({ captain, captainToken: token });
}

module.exports.getCaptainProfile = async (req, res) => {
    res.json(req.captain);
}

module.exports.logoutCaptain = async (req, res) => {
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistedTokenModel.create({token});
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
}