import { initializeApp } from "firebase/app";
import {getFirestore, collection, setDoc, doc} from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from './toast';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8Ya-Z55XPZ_iIQBhdAZbFvz6DQYZBlJM",

  authDomain: "shopventory-84d92.firebaseapp.com",

  projectId: "shopventory-84d92",

  storageBucket: "shopventory-84d92.firebasestorage.app",

  messagingSenderId: "520070728307",

  appId: "1:520070728307:web:4fbf6f2dfa7510b5d1f806",
  
  measurementId: "G-BH5TN8ENJ8"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize firestoreDB

const db = getFirestore(app)

// Export Firestore database so you can use it in other pages
export { db };

// Collection reference

//const colRef = collection(db) This need to be fixed

// Function to log in the user
export async function loginUser(username: string, password: string): Promise<boolean> {
  const email = `${username}@codedamn.com`; // Construct email format
  try {
    const auth = getAuth(); // Initialize Firebase Auth
    const res = await signInWithEmailAndPassword(auth, email, password); // Sign in user
    
    console.log("User logged in:", res); // Optional: Log response for debugging
    return true;
  } catch (error: any) {
    toast(error.message, 4000); // Show error message to the user via toast
    return false; // Indicate failure
  }
}

// Function to register a new user
export async function registerUser(username: string, password: string): Promise<boolean> {
  const email = `${username}@codedamn.com`; // Construct email format
  try {
    const auth = getAuth(); // Initialize Firebase Auth
    const res = await createUserWithEmailAndPassword(auth, email, password); // Register new user
    const uid = res.user.uid //UID is unique user ID and this will get for each registered user

    //This will create for each user their own collection
    const userCollectionRef = doc (db, "user", uid); //This will refer to user's document
    await setDoc(userCollectionRef, { createdAt: new Date(), username}); //This will initial data
    
    console.log("User registered and Firestore collection created:", res); // Optional: Log response for debugging
    return true;
  } catch (error: any) {
    toast(error.message, 4000); // Show error message to the user via toast
    return false; // Indicate failure
  }
}

    

