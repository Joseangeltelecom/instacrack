import { collection, onSnapshot } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../Navbar"
import { HeaderProfileOthers } from "./HeaderProfileOthers"
import { db } from "../../firebase"
import { PostProfileOthers } from "./PostProfileOthers"
import { NavbarProfileOthers } from "./NavbarProfileOthers"

export const ProfileOthers = () => {
  const [postPreview, setPostPreview] = useState([])
  const [users, setUsers] = useState([])
  // const { user } = useAuth()
  const { username } = useParams()

  const filterUsers = users.filter((u) => {
    return u.username == username
  })

  const filteredPosts = postPreview.filter((p) => {
    return p.username == username
  })

  useEffect(() => {
    const unsubuscribe = onSnapshot(collection(db, "postPreview"), (snapshot) =>
      setPostPreview(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
    )
    return () => unsubuscribe()
  }, [])

  useEffect(() => {
    const addUsersFriends = onSnapshot(collection(db, "users"), (snapshot) =>
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
    )
    return () => addUsersFriends()
  }, [])

  return (
    <div
      style={{
        // backgroundColor: "green",
        height: "100vh",
        width: "100vw",
        margin: "0",
        padding: "90px 0px 0px 0px",
        overflowX: "hidden",
      }}
    >
      <Navbar />
      <HeaderProfileOthers {...filterUsers[0]} />
      {/* <NavbarProfileOthers /> */}
      <PostProfileOthers {...filteredPosts[0]} />
    </div>
  )
}
