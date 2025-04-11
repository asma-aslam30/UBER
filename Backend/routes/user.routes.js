const express = require('express');
const router = express.Router();
const { check, body, validationResult } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
router.post('/register',
    [
        body('fullnName.firstname')
            .isLength({ min: 3 })
            .withMessage('First name should be at least 3 characters'),
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password')
            .isLength({ min: 5 })
            .withMessage('Password should be at least 5 characters'),
    ],
    userController.registerUser // ✅ User creation ke liye controller call karo
);

router.post('/login',
    [
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password')
            .isLength({ min: 5 })
            .withMessage('Password should be at least 5 characters'),
    ],
    userController.loginUser // ✅ User login ke liye controller call karo
);

router.get('/profile', authMiddleware.authUser,userController.getUserProfile);

module.exports = router;


router.get('/logout', authMiddleware.authUser, userController.logoutUser);