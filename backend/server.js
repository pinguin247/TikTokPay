const express = require('express');
const app = express();
const PORT = 3000;

const admin = require("firebase-admin");
const credential = require('./firebase_credentials.json')

// initialize firebase
admin.initializeApp({
    credential: admin.credential.cert(credential)
})

// initialize firestore
const db = admin.firestore();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

// post
app.post('/create', async (req, res) => {
    try{
        const id = req.body.email;
        const userJson = 
        {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
        const response = db.collection("users").add(userJson);
        res.send(response);
    }
    catch (error)
    {
        res.send(error);
    }
})

// read
app.get('/read/all', async (req, res)=>
{
    try
    {
        const usersRef = db.collection("users");
        const response = await usersRef.get();
        let responseArr = [];

        response.forEach(doc => {
            responseArr.push(doc.data());
        });

        res.send(responseArr);
    }
    catch (err)
    {
        res.send(error);
    }
})

// read one id
app.get('/read/:id', async (req, res) => {
    try
    {
        const usersRef = db.collection("users").doc(req.params.id);
        const response = await usersRef.get();
        res.send(response.data());
    }
    catch (err)
    {
        res.send(err);
    }
})

// update endpoint
app.post('/update', async(req, res) => {
    try
    {
        const id = req.body.id;
        const newFirstName = 'Thant'
        const usersRef = await db.collection("users").doc(id).update({
            firstName: newFirstName
        });
        const response = await usersRef.get();
        res.send(response);
    }
    catch (err)
    {
        res.send(err);
    }
})

// delete
app.delete('/delete/:id', async (req, res) => 
{
    try
    {
        const response = await db.collection("users").doc(req.params.id).delete();
        res.send(response);
    }
    catch (err)
    {
        res.send(err);
    }   
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
