import React, { useEffect, useRef, useState } from "react"
import { DownOutlined, SendOutlined } from "@ant-design/icons"
import moment from "moment"
import { Button, Input } from "antd"
import Navbar from "../componentes/Navbar"
import { ModalChangeUser } from "../componentes/Profile/ModalChangeUser"
import { useAuth } from "../context/AuthContext"
import "../styles/app.css"
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import { db, storage } from "../firebase"
import { Link, useParams } from "react-router-dom"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import Message from "../componentes/Chat/Message"
import MessageForm from "../componentes/Chat/MessageForm"
import User from "../componentes/Chat/User"

const { TextArea } = Input

export function Chat2() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [chat, setChat] = useState("")
  const [text, setText] = useState("")
  const [img, setImg] = useState("")
  const [msgs, setMsgs] = useState([])

  const chatRef = useRef()
  const user1 = user.currentUser.uid
  const { uid } = useParams()

  console.log("user1", user1)
  console.log("users", users)

  useEffect(() => {
    const usersRef = collection(db, "users")
    // create query object
    const q = query(usersRef, where("uid", "not-in", [user1]))
    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      console.log(querySnapshot)
      let users = []
      querySnapshot.forEach((doc) => {
        users.push(doc.data())
      })
      setUsers(users)
    })
    return () => unsub()
  }, [])

  const selectUser = async (user) => {
    setChat(user)

    const user2 = user.uid
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

    const msgsRef = collection(db, "messages", id, "chat")
    const q = query(msgsRef, orderBy("createdAt", "asc"))

    onSnapshot(q, (querySnapshot) => {
      let msgs = []
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data())
      })
      setMsgs(msgs)
    })

    // get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(db, "lastMsg", id))
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data().from !== user1) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, "lastMsg", id), { unread: false })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user2 = chat.uid

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

    let url
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      )
      const snap = await uploadBytes(imgRef, img)
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
      url = dlUrl
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    })

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    })

    setText("")
    setImg("")
  }

  return (
    <>
      <Navbar />
      <div className="home_container">
        <div className="users_container">
          {users.map((user) => (
            <User
              key={user.uid}
              user={user}
              selectUser={selectUser}
              user1={user1}
              chat={chat}
            />
          ))}
        </div>
        <div className="messages_container">
          {chat ? (
            <>
              <div className="messages_user">
                <h3>{chat.name}</h3>
              </div>
              <div className="messages">
                {msgs.length
                  ? msgs.map((msg, i) => (
                      <Message key={i} msg={msg} user1={user1} />
                    ))
                  : null}
              </div>
              <MessageForm
                handleSubmit={handleSubmit}
                text={text}
                setText={setText}
                setImg={setImg}
              />
            </>
          ) : (
            <h3 className="no_conv">Select a user to start conversation</h3>
          )}
        </div>
      </div>
    </>
  )
}
