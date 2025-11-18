import { meta } from "@eslint/js";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

export function firebaseAuthTest(){
 return app
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const MOVIES_REF = 'Favourites'

/*export async function getMovies(db = database) {
  const moviesCol = collection(db, MOVIES_REF)
  const movieSnapshot = await getDocs(moviesCol)
  const moviesList = movieSnapshot.docs.map(doc => doc.data())
  return moviesList
}*/

