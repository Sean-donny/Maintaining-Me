import { auth, db } from '../FirebaseConfig';
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from './localStorage';

export const signUpController = (userData, successCb) => {
  const {
    name,
    email,
    password,
    dob,
    height,
    startingWeight,
    targetWeight,
    gender,
  } = userData;
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      setDoc(doc(db, 'users', userCredential.user.uid), {
        name: name,
        email: email,
        diaries: {},
        dob,
        height,
        weight: {
          starting: startingWeight,
          target: targetWeight,
          current: startingWeight,
        },
        gender,
      })
        .then(res => {
          addUserToLocalStorage({ name, email });
          successCb();
        })
        .catch(error => {
          console.error('Sign up error', error);
        });
    })
    .catch(error => {
      console.error('Sign up error', error);
    });
};

export const signOutController = async successCb => {
  try {
    await signOut(auth);
    removeUserFromLocalStorage();
    successCb();
  } catch (error) {
    console.error(error);
  }
};

export const signInController = (userData, successCb) => {
  const { email, password } = userData;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const userId = userCredential.user.uid;
      const docRef = doc(db, 'users', userId);
      getDoc(docRef)
        .then(res => {
          addUserToLocalStorage(res.data());
          successCb();
        })
        .catch(error => {
          console.error('Sign in error', error);
        });
    })
    .catch(error => {
      console.error('Sign in error', error);
    });
};
