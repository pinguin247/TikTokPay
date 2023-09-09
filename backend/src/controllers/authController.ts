import { auth, db } from "../utils/firebase";
import * as admin from 'firebase-admin';
import express from 'express';

// user register
// TODO: save the uid and email in db
export const signupByEmail = async (req: express.Request, res: express.Response) => {
    try {
        const authResponse = await auth.createUser({
            email: req.body.email,
            password: req.body.password,
            emailVerified: false,
            disabled: false
        });
        res.status(200).json(authResponse);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
}
