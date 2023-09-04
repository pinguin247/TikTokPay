import db from '../utils/firebase';
import { Request, Response } from 'express';

export const createUser = async (req: any, res: any) => {
  try {
    const userRef = db.collection('users');
    const newUser = {
      email: req.body.email,
      password: req.body.password // Need hashing here
    };
    
    const addedUser = await userRef.add(newUser);
    res.status(201).json({ id: addedUser.id, ...newUser });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};


export const getUser = async (req: Request, res: Response) => {
  try {
      const { userId } = req.params;
      const userDoc = await db.collection('users').doc(userId).get();

      if (!userDoc.exists) {
          return res.status(404).send('User not found');
      }

      return res.status(200).send({ id: userDoc.id, ...userDoc.data() });
  } catch (error) {
      return res.status(500).send(error.message);
  }
};