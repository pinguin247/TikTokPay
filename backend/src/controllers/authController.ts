import { auth, db } from "../utils/firebase";
import * as admin from 'firebase-admin';
import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51NoJ9OLdCXzE0KvEeqQtuTSGbGS0h3CGUR3htCExSz6Xsl6nBF5I0hshkD4jB2iKfGrG7R1x7dNXyFOwaCXlNIQp00GhQweKrE', {
    apiVersion: '2023-08-16',
  });

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
