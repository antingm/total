// Firebase Configuration for Manicure Beauty
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgwbzRJ4dL8MXDl7i4zYzMyCJ8cj04HWk",
    authDomain: "manicure-beauty.firebaseapp.com",
    projectId: "manicure-beauty",
    storageBucket: "manicure-beauty.firebasestorage.app",
    messagingSenderId: "682955872942",
    appId: "1:682955872942:web:577d7f51f8f83386502b3f",
    measurementId: "G-Z9RK1B75MM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

export { app, analytics };
