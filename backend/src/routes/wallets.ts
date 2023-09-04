import express from 'express';
import * as walletController from '../controllers/walletController';

const router = express.Router();

router.get('/debit/:userId', walletController.getDebitBalance);
router.get('/credit/:userId', walletController.getCreditBalance);
router.post('/topup/debit', walletController.topUpDebitWallet);
router.post('/payoff/credit', walletController.payoffCreditBalance);
router.post('/transfer', walletController.transferMoney);


// Other wallet-related routes

export default router;
