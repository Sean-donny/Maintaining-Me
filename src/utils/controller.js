import { arrayUnion, arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../FirebaseConfig';

export const diaryLogController = (
  values,
  userId,
  successCb,
  updateToday = null,
) => {
  try {
    const docRef = doc(db, 'users', userId);
    const createdAt = Date.now();
    const final = {
      createdAt,
      ...values,
    };
    if (updateToday) {
      const newDoc = {
        [`diaries.${updateToday}`]: { ...final, createdAt: updateToday },
      };
      updateDoc(docRef, newDoc)
        .then(() => {
          successCb();
        })
        .catch(error => {
          console.error('User not found', error);
        });
    } else {
      const newDoc = { [`diaries.${createdAt}`]: final };
      updateDoc(docRef, newDoc)
        .then(() => {
          successCb();
        })
        .catch(error => {
          console.error('User not found', error);
        });
    }
  } catch (error) {
    console.error('diary log error', error);
  }
};

export const setUserTargetController = (values, userId, successCb) => {
  try {
    const { target } = values;
    const docRef = doc(db, 'users', userId);
    updateDoc(docRef, { ['weight.target']: target })
      .then(() => {
        successCb();
      })
      .catch(error => {
        console.error('User not found', error);
      });
  } catch (error) {
    console.error('set user target error', error);
  }
};

export const setUserInfoController = (values, userId, successCb) => {
  try {
    const { dob, height, currentWeightTarget, gender } = values;
    const docRef = doc(db, 'users', userId);
    updateDoc(docRef, {
      ['weight.current']: currentWeightTarget,
      gender,
      height,
      dob,
    })
      .then(() => {
        successCb();
      })
      .catch(error => {
        console.error('User not found', error);
      });
  } catch (error) {
    console.error('set user target error', error);
  }
};
