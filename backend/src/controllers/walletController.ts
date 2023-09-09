import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { db } from '../utils/firebase';
// import stripe from 'stripe';  // Need to read Stripe doc

// const stripeClient = new stripe('YOUR_STRIPE_SECRET_KEY');  // Replace with .env key

export const getDebitWalletBalance = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userRef = db.collection('users').doc(userId);
  
  try {
      const doc = await userRef.get();
      if (!doc.exists) {
          return res.status(404).json({ message: 'User not found' });
      } else {
          const userData = doc.data();
          console.log(userData);
          return res.json({ debitBalance: userData?.debitBalance || 0 });
      }
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};

export const getCreditWalletBalance = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userRef = db.collection('users').doc(userId);

  try {
      const doc = await userRef.get();
      if (!doc.exists) {
          return res.status(404).json({ message: 'User not found' });
      } else {
          const userData = doc.data();
          return res.json({ creditBalance: userData?.creditBalance || 0 });
      }
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};

// export const topUpDebitWallet = async (req: Request, res: Response) => {
//   const userId = req.params.userId;
//   const { amount, paymentMethod } = req.body; // 'paymentMethod' can be 'stripe', 'paypal', etc.

//   if (paymentMethod === 'stripe') {
//       try {
//           // Assume a Stripe token is sent with the request.
//           // Frontend operations to obtain this token.
//           const token = req.body.token; 
//           const charge = await stripeClient.charges.create({
//               amount: amount * 100, // Stripe uses cents as unit
//               currency: 'sgd',
//               description: `Top up for user ${userId}`,
//               source: token
//           });

//           if (charge.paid) {
//               const userRef = db.collection('users').doc(userId);
//               const user = await userRef.get();
//               if (user.exists) {
//                   await userRef.update({
//                       debitBalance: admin.firestore.FieldValue.increment(amount)
//                   });
//               }
//               return res.status(200).json({ message: 'Top up successful' });
//           } else {
//               return res.status(400).json({ message: 'Charge unsuccessful' });
//           }
//       } catch (error) {
//           return res.status(500).json({ error: error.message });
//       }
//   }

//   // Implement logic for PayPal and other payment methods
// };

// export const payOffCreditWalletBalance = async (req: Request, res: Response) => {
//   const userId = req.params.userId;
//   const { amount, paymentMethod } = req.body; 

//   try {
//       const userRef = db.collection('users').doc(userId);
//       const user = await userRef.get();

//       if (!user.exists) {
//           return res.status(404).json({ message: 'User not found' });
//       }

//       if (paymentMethod === 'debit') {
//           if (user.data()?.debitBalance < amount) {
//               return res.status(400).json({ message: 'Insufficient debit balance' });
//           }
//           await userRef.update({
//               creditBalance: admin.firestore.FieldValue.increment(-amount),
//               debitBalance: admin.firestore.FieldValue.increment(-amount)
//           });
//       } else if (paymentMethod === 'stripe') {
//         try {
//           // Assume a Stripe token is sent with the request.
//           // Frontend operations to obtain this token.
//           const token = req.body.token; 
//           const charge = await stripeClient.charges.create({
//               amount: amount * 100, // Stripe uses cents as unit
//               currency: 'sgd',
//               description: `Top up for user ${userId}`,
//               source: token
//           });
//         } catch (error) {
//           return res.status(500).json({ error: error.message });
//         }
//           // After successful payment:
//           await userRef.update({
//               creditBalance: admin.firestore.FieldValue.increment(-amount)
//           });
//       }
//       return res.status(200).json({ message: 'Credit balance paid successfully' });
//   } catch (error) {
//       return res.status(500).json({ error: error.message });
//   }
// };

export const internalTransfer = async (req: Request, res: Response) => {
  const { senderId, receiverId, amount } = req.body;

  const db = admin.firestore();
  const senderRef = db.collection('users').doc(senderId);
  const receiverRef = db.collection('users').doc(receiverId);

  try {
      const sender = await senderRef.get();
      const receiver = await receiverRef.get();

      if (!sender.exists || !receiver.exists) {
          return res.status(404).json({ message: 'User(s) not found' });
      }

      if (sender.data()?.debitBalance < amount) {
          return res.status(400).json({ message: 'Insufficient funds in sender account' });
      }

      // Update balances
      await db.runTransaction(async (t) => {
          t.update(senderRef, { debitBalance: admin.firestore.FieldValue.increment(-amount) });
          t.update(receiverRef, { debitBalance: admin.firestore.FieldValue.increment(amount) });
      });

      return res.status(200).json({ message: 'Transfer successful' });

  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};

// export const externalTransfer = async (req: Request, res: Response) => {
//   const userId = req.params.userId;
//   const { amount } = req.body;

//   try {
//       const userRef = db.collection('users').doc(userId);
//       const user = await userRef.get();

//       if (!user.exists) {
//           return res.status(404).json({ message: 'User not found' });
//       }

//       if (user.data()?.debitBalance < amount) {
//           return res.status(400).json({ message: 'Insufficient funds' });
//       }
//       // This assumes that the user has a connected and verified Stripe account to receive the payout
//       // Need to check Strip Doc for more details

//       const payout = await stripeClient.payouts.create({
//           amount: amount * 100, 
//           currency: 'sgd',
//           // Other necessary details based on the Stripe account linked...
//       });

//       if (payout.status === 'succeeded') {
//           await userRef.update({
//               debitBalance: admin.firestore.FieldValue.increment(-amount)
//           });
//           return res.status(200).json({ message: 'External transfer successful' });
//       } else {
//           return res.status(400).json({ message: 'Transfer failed' });
//       }
//   } catch (error) {
//       return res.status(500).json({ error: error.message });
//   }
// };

// debitpayment for external purchase, using visa/mastercard

// creditpayment for external purchase, using visa/mastercard