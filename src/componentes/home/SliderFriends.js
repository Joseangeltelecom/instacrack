import React, { useEffect, useState } from "react"
import "../../styles/home/sliderfriends.css"
import "antd/dist/antd.css"
import Glider from "react-glider"
import "glider-js/glider.min.css"
import { collection, onSnapshot } from "firebase/firestore"
import { useAuth } from "../../context/AuthContext"
import { db } from "../../firebase"
import { Link, useParams } from "react-router-dom"

function SliderFriends() {
  const [users, setUsers] = useState([])
  const { user } = useAuth()
  const filterUsers = users.filter((u) => {
    return u.id !== user.currentUser.uid
  })

  const params = useParams()
  console.log(params)

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
    <>
      <div className="carrusel">
        <Glider
          hasArrows
          slidesToShow={5}
          slidesToScroll={3}
          scrollLock
          duration={3}
          // className="d-flex"
        >
          {filterUsers.map((friend) => {
            return (
              <div className="image-container">
                <Link to={`/profile/${friend.user.username}`} href="#">
                  <img
                    src={friend.user.imgProfile}
                    alt="Tengen Uzui bien papi"
                  />

                  <span>{friend.user.username}</span>
                </Link>
              </div>
            )
          })}
        </Glider>
      </div>

      <div className="carrusel-indicators"></div>
    </>
  )
}

export default SliderFriends
