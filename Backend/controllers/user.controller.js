const userModel = require('../models/user.model');  
const userServices = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistedTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log('Request Body:', req.body);
        const { fullnName, email, password } = req.body;

        const isUserAlreadyExist = await userModel.findOne({    email });
        if (isUserAlreadyExist) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashPassword = await userModel.hashPassword(password);

        const user = await userServices.createUser({
            firstname: fullnName.firstname,
            lastname: fullnName.lastname,
            email,
            password: hashPassword
        });

        if (!user) {
            return res.status(500).json({ message: 'User not created' });
        }

        // ✅ Ensure `user` has `generateAuthToken` method
        let token;
        if (user.generateAuthToken) {
            token = user.generateAuthToken();
        } else {
            console.error('generateAuthToken is not a function on user');
            return res.status(500).json({ message: 'Token generation failed' });
        }

        // ✅ Secure response (password removed)
        return res.status(201).json({
            message: 'User created successfully!',
            submittedData: { fullnName, email }, // ❌ Password removed for security
            createdUser: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            },  
            token
        });

    } catch (error) {
        console.error('Error in registerUser:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports.loginUser = async (req, res, next) => {  
    const error=validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password').exec();



    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }   
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    let token;
    if (user.generateAuthToken) {
        token = user.generateAuthToken();
        }
        response = res.cookie('token', token );
        
        // ✅ Secure response (password removed)
        return res.status(200).json({
            message: 'User logged in successfully!',
            submittedData: { email }, // ❌ Password removed for security
            createdUser: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            },
            token
            });
        }
// const token = user.generateAuthToken();
// return res.status(200).json({
//     token,user
// });
// }

module.exports.getUserProfile = async (req, res, next) => {
    const user = await userModel.findById(req.user._id).select('-password').exec();
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ user });
}


module.exports.logoutUser = async (req, res, next) => {
   res.clearCookie('token');
   const token=req.cookies.token || req.headers.authorization.split(' ')[1];
   await blacklistedTokenModel.create({token});
   return res.status(200).json({ message: 'User logged out successfully' });
}
 