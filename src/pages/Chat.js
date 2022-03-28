import { DownOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import Navbar from "../componentes/Navbar"
import { ModalChangeUser } from "../componentes/Profile/ModalChangeUser"
import { useAuth } from "../context/AuthContext"
import { Input } from "antd"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

const { TextArea } = Input

function Chat() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])

  const filterUsers = users.filter((u) => {
    return u.id !== user.currentUser.uid
  })

  useEffect(() => {
    const addUsersFriends = onSnapshot(collection(db, "users"), (snapshot) =>
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          user: doc.data(),
        }))
      )
    )
    return () => addUsersFriends()
  }, [])

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: "0",
        padding: "90px 0px 0px 0px",
        overflowX: "hidden",
      }}
    >
      <Navbar />

      <div class="row justify-content-center">
        <div
          class="col-3"
          style={{
            border: "1px solid rgb(0, 0, 0, 0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60px",
          }}
        >
          <ModalChangeUser
            name={
              <b
                style={{
                  color: "black",
                  marginRight: "5px",
                  fontSize: "16px",
                }}
              >
                {user.extrainfo
                  ? user.extrainfo.username
                  : user.currentUser.displayName}
              </b>
            }
          />
          <DownOutlined style={{ color: "black", fontSize: "16px" }} />
        </div>
        <div
          class="col-5"
          style={{
            border: "1px solid rgb(0, 0, 0, 0.2)",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: "30px",
          }}
        >
          <a href="">
            <img
              src="https://i.ibb.co/xLTxbSC/fondo-jean-2.png"
              alt="fondo-jean-2"
              border="0"
              style={{ height: "30px", width: "30px", borderRadius: "50%" }}
            />
          </a>
          <a href="" style={{ color: "black", marginLeft: "10px" }}>
            <b> Friend Name</b>
          </a>
        </div>
      </div>
      <div class="row justify-content-center">
        <div
          class="col-3"
          style={{
            border: "1px solid rgb(0,0,0,0.2)",
            height: "455px",
            overflowY: "scroll",
            padding: "0",
            display: "flex",
            flexDirection: "column",
            paddingTop: "10px",
          }}
        >
          {filterUsers.map((friend) => (
            <div
              key={friend.id}
              style={{
                padding: "10px",
                paddingLeft: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                height: "80px",
              }}
            >
              <a href="">
                <img
                  src={friend.user.imgProfile}
                  alt="fondo-jean-2"
                  border="0"
                  style={{ height: "60px", width: "60px", borderRadius: "50%" }}
                />
              </a>
              <a href="" style={{ color: "black", marginLeft: "10px" }}>
                {friend.user.username}
              </a>
            </div>
          ))}
        </div>
        <div
          class="col-5"
          style={{
            border: "1px solid rgb(0,0,0,0.2)",
            height: "455px",
            padding: "0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              // backgroundColor: "orange",
              maxHeight: "85%",
              height: "auto",
            }}
          >
            Chat
          </div>
          <div
            style={{
              // backgroundColor: "pink",
              minHeight: "15%",
              height: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "auto",
                width: "90%",
                backgroundColor: "white",
                borderRadius: "1.5rem",
                border: "1px solid rgb(0,0,0,0.5)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextArea
                placeholder="Escribe tu mensaje aqui..."
                autoSize
                rows={1}
                bordered={false}
                style={{ width: "90%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
