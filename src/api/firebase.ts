import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'hammertimer-pomodoro-app.firebaseapp.com',
  projectId: 'hammertimer-pomodoro-app',
  storageBucket: 'hammertimer-pomodoro-app.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Get a Firestore instance
const db = getFirestore(app)

export { db }
