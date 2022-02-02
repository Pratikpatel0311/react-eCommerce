import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyDf_3Y0c6810hLcYHveTo4baWuztLhczr4",
  authDomain: "react-e-commerce-fe9e5.firebaseapp.com",
  projectId: "react-e-commerce-fe9e5",
  storageBucket: "react-e-commerce-fe9e5.appspot.com",
  messagingSenderId: "212870049482",
  appId: "1:212870049482:web:a9b722402cb2d5f0ef0e33",
};

//Save user data in firebase DB
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    
    //Using QueryReference to get data
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    //Check if the user exists in DB
    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        //creating object to store into users collection
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating a new user',error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Google authentication provider
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
