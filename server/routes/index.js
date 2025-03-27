import express from 'express';
import userRoutes from './userRoutes.js';
import vehicleRoutes from './vehicleRoutes.js';

const router = express.Router();
router.use('/users', userRoutes);
router.use('/vehicles', vehicleRoutes);

module.exports = router;