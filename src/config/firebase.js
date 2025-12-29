// Firebase Configuration - Production
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyAE896yjhi23qQWtd6O9o83C64s2_qEUdA",
    authDomain: "total-go.firebaseapp.com",
    projectId: "total-go",
    storageBucket: "total-go.firebasestorage.app",
    messagingSenderId: "456043468194",
    appId: "1:456043468194:web:89a5494c2f3e46684f4efb",
    measurementId: "G-05XTDYSC8L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize Analytics only if supported (client-side)
export const initAnalytics = async () => {
    if (await isSupported()) {
        return getAnalytics(app);
    }
    return null;
};

export default app;
