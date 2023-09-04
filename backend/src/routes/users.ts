import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/:userId', userController.getUser);

// ... other user-related routes ...

export default router;
