import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDZI7JabLOIcryRWVagohqqtWtZpMKRQR0",
  authDomain: "finedge-73e5d.firebaseapp.com",
  databaseURL:
    "https://finedge-73e5d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "finedge-73e5d",
  storageBucket: "finedge-73e5d.firebasestorage.app",
  messagingSenderId: "38591418883",
  appId: "1:38591418883:web:bf8fe1fb61d710ce5df436",
  measurementId: "G-2V7YGYDLFW",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export { ref, set, get, push, onValue };
