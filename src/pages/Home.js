import React, { useEffect, useState } from "react"
import { PostPreview } from "../componentes/home/PostPreview"
import SliderFriends from "../componentes/home/SliderFriends"
import { UserChange } from "../componentes/home/UserChange"
import { db } from "../firebase"
import "../styles/home/home.css"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"
import Navbar from "../componentes/navbar/Navbar"

function Home() {
  const [postPreview, setPostPreview] = useState([])

  const { user } = useAuth()

  useEffect(() => {
    const recentMessagesQuery = query(
      collection(db, "postPreview"),
      orderBy("timestamp", "desc")
    )
    const unsubuscribe = onSnapshot(recentMessagesQuery, (snapshot) =>
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
          <PostPreview key={id} post={post} postId={id} />
        ))}
      </div>
      <div>
        <UserChange />
      </div>
    </div>
  )
}

export default Home
