import React, { useEffect, useRef, useState } from "react";
import { DownOutlined, SendOutlined } from "@ant-design/icons";
import Moment from "react-moment";
import { Button, Input } from "antd";
import Navbar from "../componentes/Navbar";
import { ModalChangeUser } from "../componentes/Profile/ModalChangeUser";
import { useAuth } from "../context/AuthContext";
import "../styles/app.css";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

const { TextArea } = Input;
function Chat() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [messageToSave, setMessageToSave] = useState("");
  const chatRef = useRef();

  const filterUsers = users.filter((u) => {
    return u.id !== user.currentUser.uid;
  });

  useEffect(() => {
    const addUsersFriends = onSnapshot(collection(db, "users"), (snapshot) =>
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          user: doc.data(),
        }))
      )
    );

    getChatHistory();
    return () => addUsersFriends();
  }, []);

  // MENSAJES
  // saving message
  const sendMessage = async (from, message) => {
    try {
      if (message === "") return;
      const docRef = await addDoc(collection(db, "ChatDevApp"), {
        from: from,
        time: Date.now(),
        message: message,
      });
    } catch (error) {
      console.error("error sending message", error);
    }
  };

  const getChatHistory = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ChatDevApp"));
      let tempChatData = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          tempChatData.push({ id: doc.id, ...doc.data() });
        }
      });
      setChatData([...tempChatData]);
    } catch (error) {
      console.log("error al obtener mensaje", error);
    }
  };

  const updateChatHistory = () => {
    const q = query(collection(db, "ChatDevApp"));
    onSnapshot(q, (querySnapshot) => {
      let tempChatData = [];
      querySnapshot.forEach((doc) => {
        tempChatData.push({ id: doc.id, ...doc.data() });
        setChatData([...tempChatData]);
      });
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = user.extrainfo.username;
    setMessageToSave("");
    await sendMessage(userName, messageToSave);
    updateChatHistory();
  };

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
              className="amigos-chat"
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
            ref={chatRef}
            style={{
              height: "auto",
              overflowY: "scroll",
            }}
          >
            {/* Usuario chat */}
            {chatData
              .sort((a, b) => a.time - b.time)
              .map((c) =>
                c.from === user.extrainfo.username ? (
                  <div className="chat-div-user" key={c.time}>
                    <div id="chat-info">
                      <b>
                        {c.from} on
                        <span>
                          {" "}
                          <Moment format="MMMM DD, YYYY HH:mm">{c.time}</Moment>
                        </span>
                      </b>
                      <br />
                    </div>
                    {c.message}
                  </div>
                ) : (
                  <div className="chat-div-sender" key={c.time}>
                    <div id="chat-info">
                      <b>
                        {c.from} on{" "}
                        <span>
                          <Moment format="MMMM DD, YYYY HH:mm">{c.time}</Moment>
                        </span>
                      </b>
                      <br />
                    </div>
                    {c.message}
                  </div>
                )
              )}
          </div>
          <div
            style={{
              minHeight: "15%",
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
                borderRadius: "1.5rem",
                border: "1px solid rgb(0,0,0,0.5)",
                alignItems: "center",
                justifyContent: "center",
                padding: "5px",
              }}
            >
              <form
                style={{
                  width: "95%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onSubmit={handleSubmit}
              >
                <TextArea
                  placeholder="Escribe tu mensaje aqui..."
                  autoSize
                  rows={1}
                  bordered={false}
                  value={messageToSave}
                  onChange={(e) => {
                    setMessageToSave(e.target.value);
                  }}
                  style={{ width: "90%" }}
                />
                <Button
                  type="default"
                  shape="circle"
                  icon={
                    <SendOutlined
                      style={{
                        color: "rgb(0,0,0,0.4)",
                      }}
                    />
                  }
                  htmlType="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
