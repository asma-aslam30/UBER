const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');
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
        body('vehicle.color')
            .isLength({ min: 3 })
            .withMessage('Color should be at least 3 characters'),
        body('vehicle.model')
            .isLength({ min: 3 })
            .withMessage('Model should be at least 3 characters'),
        body('vehicle.plate')
            .isLength({ min: 3 })
            .withMessage('Plate should be at least 3 characters'),
        body('vehicle.capacity')
            .isNumeric()
            .withMessage('Capacity should be a number'),
        body('vehicle.vehicleType').isIn(['car', 'bike', 'truck']).withMessage('Invalid vehicle type')
    ],
    captainController.registerCaptain
);


router.post('/login',
    [
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').isLength({ min: 5 }).withMessage('Password should be at least 5 characters'),
    ],
    captainController.loginCaptain
);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;