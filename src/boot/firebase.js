import { defineBoot } from '#q-app'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBMHjC9PmbiO0dwYnkt_ZPh0F0acB7GtbM',
  authDomain: 'mi-primer-proyecto-8eb9c.firebaseapp.com',
  projectId: 'mi-primer-proyecto-8eb9c',
  storageBucket: 'mi-primer-proyecto-8eb9c.firebasestorage.app',
  messagingSenderId: '446788383706',
  appId: '1:446788383706:web:f7f9dbe366cc2992b486e3',
  measurementId: 'G-LFB1WFC916',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot(async (/* { app, router, ... } */) => {
  // something to do
})

export { app, db }
