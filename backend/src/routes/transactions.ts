import express from 'express';
import * as transactionController from '../controllers/transactionController';

export default (router: express.Router) => {
    router.post('/transaction', transactionController.createTransaction);
    router.get('/transaction/:userId', transactionController.getTransactions);
};
