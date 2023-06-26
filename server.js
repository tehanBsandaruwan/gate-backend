const express = require('express');
const firebase = require('firebase');
const admin = require('firebase-admin');
import { initializeApp } from "firebase/app";


const app = express();
const port = 3000; 


const firebaseConfig = {
  apiKey: "AIzaSyDFVfcQ2pEqhJE54lSxIqJE3BzHc3Yrcbc",
  authDomain: "gatewatch-c324a.firebaseapp.com",
  projectId: "gatewatch-c324a",
  storageBucket: "gatewatch-c324a.appspot.com",
  messagingSenderId: "28545262383",
  appId: "1:28545262383:web:97f35dfced17c30718b7da"
};

firebase.initializeApp(firebaseConfig);

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.post('/api/users', (req, res) => {

  const { name, email } = req.body;

  res.status(200).json({ message: 'User created successfully' });
});


const serviceAccount = require("<path-to-service-account-json>");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "<firebasebase>"
});


app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;


  admin.auth().createUser({
    email: email,
    password: password,
  })
  .then((userRecord) => {
 
    const userId = userRecord.uid;


    admin.database().ref('users/' + userId).set({
      email: email,
    });

    res.status(200).json({ message: 'Signup successful' });
  })
  .catch((error) => {
  
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Signup failed' });
  });
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  
  admin.auth().getUserByEmail(email)
    .then((userRecord) => {
    
      res.status(200).json({ message: 'Login successful' });
    })
    .catch((error) => {
      
      console.error('Error logging in:', error);
      res.status(401).json({ error: 'Invalid credentials' });
    });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
