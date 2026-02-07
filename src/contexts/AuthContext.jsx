import React, { useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login() {
    try {
      // Try popup first
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      // If popup fails (blocked or closed), fall back to redirect
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
        console.log("Popup blocked, using redirect...");
        return signInWithRedirect(auth, googleProvider);
      }
      throw error;
    }
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    // Check for redirect result on mount
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // User successfully signed in after redirect
          console.log("Login successful after redirect:", result.user);
          setCurrentUser(result.user);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user ? user.email : "No user");
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
