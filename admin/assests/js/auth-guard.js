// --- assets/js/firebase-config.js ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your NexaPay Real Firebase Keys
const firebaseConfig = {
    apiKey: "AIzaSyCHoR7wojkpTZZPR-gcfDnPW8aOTuoiaAU",
    authDomain: "nexapay-342d0.firebaseapp.com",
    databaseURL: "https://nexapay-342d0-default-rtdb.firebaseio.com",
    projectId: "nexapay-342d0",
    storageBucket: "nexapay-342d0.firebasestorage.app",
    messagingSenderId: "305096071099",
    appId: "1:305096071099:web:3db1e75a2669adbcae569e",
    measurementId: "G-9S068TQ2CS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export db so other scripts can use it
export { db };