// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const dotenv = require('dotenv');
dotenv.config();
// Your Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FireBase_API_KEY,
    authDomain: "databaseproject-8582c.firebaseapp.com",
    projectId: "databaseproject-8582c",
    storageBucket: "databaseproject-8582c.appspot.com",
    messagingSenderId: "699007955888",
    appId: "1:699007955888:web:7f76e1a01eeac2dd1edc75",
    measurementId: "G-LLQX6B47B6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Initialize analytics (for web apps)
const analytics = getAnalytics(app);

export { app, analytics };
