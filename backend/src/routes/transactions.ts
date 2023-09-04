import express from 'express';
import * as transactionController from '../controllers/transactionController';

const router = express.Router();

router.post('/', transactionController.createTransaction);
router.get('/:userId', transactionController.getTransactions);


export default router;
