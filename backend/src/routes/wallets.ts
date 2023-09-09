import express from 'express';
import * as walletController from '../controllers/walletController';

export default (router: express.Router) => {
    router.get('/debit/:userId', walletController.getDebitWalletBalance);
    router.get('/credit/:userId', walletController.getCreditWalletBalance);
    // router.post('/topup/debit', walletController.topUpDebitWallet);
    // router.post('/payoff/credit', walletController.payoffCreditBalance);
    router.post('/internal_transfer', walletController.internalTransfer);
};
