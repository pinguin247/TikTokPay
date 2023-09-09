import { auth, db } from "../utils/firebase";
import * as admin from 'firebase-admin';
import express from 'express';

// user register
export const signupByEmail = async (req: express.Request, res: express.Response) => {
    try {
        const authResponse = await auth.createUser({
            email: req.body.email,
            password: req.body.password,
            emailVerified: false,
            disabled: false
        });

        // Save user information to Firestore database
        const userRef = db.collection('users');
        const newUser = {
            email: req.body.email,
            debitBalance: 0,
            creditBalance: 0
        };
        await userRef.doc(authResponse.uid).set(newUser);

        // Return combined response to the client
        const combinedResponse = {
            ...authResponse,
            ...newUser
        };
        res.status(200).json(combinedResponse);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
}
