import express from 'express';
import userRoutes from './users';
import transactionRoutes from './transactions';
import walletRoutes from './wallets';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/transaction', transactionRoutes);
router.use('/wallet', walletRoutes);

export default router;
