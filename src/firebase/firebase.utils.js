import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB_OFEf6Ohayz85Xh79R8YHhJdA1-glYms",
  authDomain: "tuckerbc-shop.firebaseapp.com",
  databaseURL: "https://tuckerbc-shop.firebaseio.com",
  projectId: "tuckerbc-shop",
  storageBucket: "tuckerbc-shop.appspot.com",
  messagingSenderId: "278154742922",
  appId: "1:278154742922:web:d5d5b865bba4fda0683173",
  measurementId: "G-DC3N35ZVZR"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef;
};  

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;