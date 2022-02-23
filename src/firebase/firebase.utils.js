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

// Method to store data in Firebase
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

// Method to convert collections snapshot to collections objects
export const convertCollectionToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });
    
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    },{});
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Google authentication provider
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ promt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
