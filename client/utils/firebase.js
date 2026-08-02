
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "datasraw.firebaseapp.com",
    projectId: "datasraw",
    storageBucket: "datasraw.firebasestorage.app",
    messagingSenderId: "142022456232",
    appId: "1:142022456232:web:a842ec4cca453ea08ee39d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider }