import React, { useEffect, useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { ModalChangeUser } from '../componentes/Profile/ModalChangeUser'
import { useAuth } from '../context/AuthContext'
import '../styles/app.css'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db, storage } from '../firebase'
import { NavLink } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import Message from '../componentes/Chat/Message'
import MessageForm from '../componentes/Chat/MessageForm'
import User from '../componentes/Chat/User'
import Navbar from '../componentes/navbar/Navbar'

export function Chat2() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [chat, setChat] = useState('')
  const [text, setText] = useState('')
  const [img, setImg] = useState('')
  const [msgs, setMsgs] = useState([])
  const [focus, setFocus] = useState(false)

  const user1 = user.currentUser.uid

  useEffect(() => {
    const usersRef = collection(db, 'users')
    // create query object
    const q = query(usersRef, where('uid', 'not-in', [user1]))
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

    const msgsRef = collection(db, 'messages', id, 'chat')
    const q = query(msgsRef, orderBy('createdAt', 'asc'))

    onSnapshot(q, (querySnapshot) => {
      let msgs = []
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data())
      })
      setMsgs(msgs)
    })

    // get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(db, 'lastMsg', id))
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data().from !== user1) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, 'lastMsg', id), { unread: false })
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
        `images/${new Date().getTime()} - ${img.name}`,
      )
      const snap = await uploadBytes(imgRef, img)
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
      url = dlUrl
    }

    await addDoc(collection(db, 'messages', id, 'chat'), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || '',
    })

    await setDoc(doc(db, 'lastMsg', id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || '',
      unread: true,
    })

    setText('')
    setImg('')
  }

  return (
    <div className="chat_container">
      <Navbar />

      <div class="row justify-content-center">
        <div className="usuario-nombre" class="col-3 usuario-nombre">
          <div className="div-modal">
            <ModalChangeUser
              name={
                <b
                  style={{
                    color: 'black',
                    marginRight: '5px',
                    fontSize: '16px',
                  }}
                >
                  {user.extrainfo
                    ? user.extrainfo.username
                    : user.currentUser.displayName}
                </b>
              }
            />
            <DownOutlined style={{ color: 'black', fontSize: '16px' }} />
          </div>
          <div className="friends-container" class="col-3 friends-container">
            {users.map((user) => (
              <User
                key={user.uid}
                user={user}
                selectUser={selectUser}
                user1={user1}
                chat={chat}
                text={text}
                focus={focus}
              />
            ))}
          </div>
        </div>
        <div className="chat-container col-5">
          {chat ? (
            <>
              <div className="usuario-nombre-container">
                <div className="messages_user">
                  <img
                    src={chat.imgProfile}
                    alt="Imagen de perfil"
                    className="img-amigo"
                  />
                  <NavLink
                    to={`/profile/${chat.username}`}
                    className="link-friend"
                  >
                    {chat.username}
                  </NavLink>
                </div>
              </div>
              <div className="chat-container-inner">
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
                  setFocus={setFocus}
                />
              </div>
            </>
          ) : (
            <>
              <div className="header-chat">
                <img
                  src="https://png.pngtree.com/png-vector/20190926/ourlarge/pngtree-message-icon-png-image_1747347.jpg"
                  className="no_conv"
                />
                <h5 className="texto-mensaje">Tus Mensajes</h5>
                <h6 className="texto-mensaje">
                  Toca sobre uno de tus amigos para iniciar una conversación.
                </h6>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
