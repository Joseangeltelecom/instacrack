import React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth"
import { auth, db } from "../firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

const authContext = createContext()

export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) throw new Error("There is no Auth provider")
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signup = async (email, password, username, fullname) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    const userRef = doc(db, "users", user.uid)
    setDoc(userRef, { username: username, fullname: fullname }, { merge: true })
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }

  const logout = () => {
    signOut(auth)
    setUser(null)
  }

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email)

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid)
        const docSnap = await getDoc(docRef)
        setUser({ currentUser, extrainfo: docSnap.data() })
        setLoading(false)
      } else {
        setUser(null)
      }
    })
    return () => unsubuscribe() // Cuando el componente es desmontado que deje de escuchar.
  }, [])

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
