const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const captainModel = require('../models/captain.model');



module.exports.authUser = async (req, res, next) => {
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Please authenticate' });
    }

    const isBlacklisted = await userModel.findOne({ token:token});
    if(isBlacklisted){
        return res.status(401).json({ message: 'Please authenticate' });
    }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userModel.findById({ _id: decoded._id, 'tokens.token': token });
    
            if (!user) {
                throw new Error();
            }
    
            req.token = token;
            req.user = user;
            return next();
        } catch (error) {
            console.error('Error in authUser:', error);
            return res.status(401).json({ message: 'Please authenticate' });
        }
    }


module.exports.authCaptain = async (req, res, next) => {
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Please authenticate' });
    }

    const isBlacklisted = await userModel.findOne({ token:token});
    if(isBlacklisted){
        return res.status(401).json({ message: 'Please authenticate' });
    }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const captain = await captainModel.findById({ _id: decoded._id, 'tokens.token': token });
    
            if (!captain) {
                throw new Error();
            }
    
            req.token = token;
            req.captain = captain;
            return next();
        } catch (error) {
            console.error('Error in authCaptain:', error);
            return res.status(401).json({ message: 'Please authenticate' });
        }
    }