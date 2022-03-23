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
  const [username, setUsername] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, async (currentUser) => {
      //   console.log(currentUser.uid)
      setLoading(false)

      setUser(currentUser)
    })
    return () => unsubuscribe() // Cuando el componente es desmontado que deje de escuchar.
  }, [])

  const signup = async (email, password, username) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    const userRef = doc(db, "users", user.uid)
    setDoc(userRef, { username: username }, { merge: true })
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }

  const logout = () => signOut(auth)

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email)

  console.log("username", user)

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
