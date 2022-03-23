import React, { useEffect, useState } from "react"
import { PostPreview } from "../componentes/home/PostPreview"
import SliderFriends from "../componentes/home/SliderFriends"
import { UserChange } from "../componentes/home/UserChange"
import Navbar from "../componentes/Navbar"
import { db } from "../firebase"
import "../styles/home/home.css"
import { collection, getDocs } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"

function Home() {
  const [postPreview, setPostPreview] = useState([])

  const { user } = useAuth()
  console.log(user)

  useEffect(() => {
    const PostFunction = async () => {
      const array = []
      const querySnapshot = await getDocs(collection(db, "postPreview"))
      querySnapshot.forEach((doc) => {
        array.push(doc)
        setPostPreview(
          array.map((d) => {
            return {
              id: d.id,
              post: d.data(),
            }
          })
        )
      })
    }
    PostFunction()
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
