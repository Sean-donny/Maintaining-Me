import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../FirebaseConfig';

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub;

    setLoading(true);

    onAuthStateChanged(auth, res => {
      if (res) {
        const docRef = doc(db, 'users', res.uid);

        unsub = onSnapshot(docRef, result => {
          setUser({ ...result.data(), id: res.uid });
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsub && unsub();
    };
  }, []);

  return { user, loading };
};
