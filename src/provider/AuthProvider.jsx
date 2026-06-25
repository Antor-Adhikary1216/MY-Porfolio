import { useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "../firebase/firebase.config";
import AuthContext from "./auth-context";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!auth) return undefined;

    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isFirebaseConfigured,
      login: (email, password) => {
        if (!auth) throw new Error("Firebase Authentication is not configured.");
        return signInWithEmailAndPassword(auth, email, password);
      },
      googleLogin: () => {
        if (!auth) throw new Error("Firebase Authentication is not configured.");
        return signInWithPopup(auth, new GoogleAuthProvider());
      },
      logout: () => (auth ? signOut(auth) : Promise.resolve()),
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
