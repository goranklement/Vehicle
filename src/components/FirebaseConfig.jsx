import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBj9IPUD1YJwFKiWN0De3ADvkJWsv-a-LU",
  authDomain: "vehicle-f16e4.firebaseapp.com",
  projectId: "vehicle-f16e4",
  storageBucket: "vehicle-f16e4.appspot.com",
  messagingSenderId: "150171324824",
  appId: "1:150171324824:web:400522e55497a65944dbed",
  measurementId: "G-L01LJHNDYB",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
