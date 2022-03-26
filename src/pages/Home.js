import React, { useEffect, useState } from "react"
import { PostPreview } from "../componentes/home/PostPreview"
import SliderFriends from "../componentes/home/SliderFriends"
import { UserChange } from "../componentes/home/UserChange"
import Navbar from "../componentes/Navbar"
import { db } from "../firebase"
import "../styles/home/home.css"
import { collection, onSnapshot } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"

function Home() {
  const [postPreview, setPostPreview] = useState([])
  const { user } = useAuth()

  console.log("user.displayName", user.currentUser)

  useEffect(() => {
    const unsubuscribe = onSnapshot(collection(db, "postPreview"), (snapshot) =>
      setPostPreview(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      )
    )
    return () => unsubuscribe()
  }, [])

  return (
    <div className="home-container">
      <Navbar />
      <div className="post">
        <SliderFriends />
        {postPreview.map(({ id, post }) => (
          <PostPreview key={id} {...post} />
        ))}
      </div>
      <div>
        <UserChange />
      </div>
    </div>
  )
}

export default Home
