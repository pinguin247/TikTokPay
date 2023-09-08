import express from 'express';
import users from './users';
import transactions from './transactions';
import wallets from './wallets';

const router = express.Router();

export default (): express.Router => {
    users(router);
    transactions(router);
    return router;
}
