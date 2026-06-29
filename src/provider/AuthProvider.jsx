import { useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import axiosPublic from "../api/axiosPublic";
import { auth, googleProvider, isFirebaseConfigured } from "../firebase/firebase.config";
import AuthContext from "./auth-context";

async function syncAuthenticatedUser(credential) {
  const token = await credential.user.getIdToken();
  await axiosPublic.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return credential;
}

async function signInAndSync(signIn) {
  const credential = await signIn();

  try {
    return await syncAuthenticatedUser(credential);
  } catch (error) {
    await signOut(auth);
    throw error;
  }
}

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
        return signInAndSync(() => signInWithEmailAndPassword(auth, email, password));
      },
      googleLogin: () => {
        if (!auth || !googleProvider) {
          throw new Error("Firebase Authentication is not configured.");
        }
        return signInAndSync(() => signInWithPopup(auth, googleProvider));
      },
      logout: () => (auth ? signOut(auth) : Promise.resolve()),
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
