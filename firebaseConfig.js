import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDeLj1YZxrB0eSCK7UGfem9DESRVIVXfzc",
  authDomain: "dermavision-aad34.firebaseapp.com",
  projectId: "dermavision-aad34",
  storageBucket: "dermavision-aad34.appspot.com",
  messagingSenderId: "352803986891",
  appId: "1:352803986891:web:5981c76189b675cf726a4e",
  measurementId: "G-0B7LPWG9GM",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firebaseAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// export const firebaseAuth = getAuth(app);
