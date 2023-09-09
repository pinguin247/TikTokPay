import { db } from '../utils/firebase';
import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

export const createTransaction = async (req: any, res: any) => {
  try {
    const { senderId, receiverId, amount, category, type } = req.body;
    const transaction = {
      senderId,
      receiverId,
      amount,
      category,
      type,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    const transactionRef = db.collection('transactions');
    const newTransaction = await transactionRef.add(transaction);

    res.status(201).json({ id: newTransaction.id, ...transaction });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
      const { userId } = req.params;
      const transactionsSnapshot = await db.collection('transactions').where('senderId', '==', userId).get();
      
      const transactions: any[] = [];
      transactionsSnapshot.forEach(doc => {
          transactions.push({ id: doc.id, ...doc.data() });
      });

      return res.status(200).send(transactions);
  } catch (error) {
      return res.status(500).send(error.message);
  }
};

// createWalletTransaction
// createExternalTransaction