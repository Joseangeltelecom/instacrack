// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDholOTXx105haIrcJNfA6iPndRk1qdMYA",
  authDomain: "instacrack-7d380.firebaseapp.com",
  projectId: "instacrack-7d380",
  storageBucket: "instacrack-7d380.appspot.com",
  messagingSenderId: "984760331549",
  appId: "1:984760331549:web:61d66d07fa7587395005f4",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore()
const storage = getStorage()

export { app, auth, db, storage }
