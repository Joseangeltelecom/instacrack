import React, { useEffect, useState } from 'react'
import { PostPreview } from '../componentes/home/PostPreview'
import SliderFriends from '../componentes/home/SliderFriends'
import { UserChange } from '../componentes/home/UserChange'
import { db } from '../firebase'
import '../styles/home/home.css'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import Navbar from '../componentes/navbar/Navbar'
import { GithubOutlined } from '@ant-design/icons'

function Home() {
  const [postPreview, setPostPreview] = useState([])

  useEffect(() => {
    const recentMessagesQuery = query(
      collection(db, 'postPreview'),
      orderBy('timestamp', 'desc'),
    )
    const unsubuscribe = onSnapshot(recentMessagesQuery, (snapshot) =>
      setPostPreview(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        })),
      ),
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
      <div className='user-info-container'>
        <UserChange />
        <div className='created-by-container'>
          <h6>Created By</h6>
          <div className='links-container'>
            <a href='https://github.com/JeanM-Pro' target='_blank'><GithubOutlined style={{fontSize:'20px'}} /> JeanM-Pro</a>
            <a href='https://github.com/Joseangeltelecom' target='_blank'><GithubOutlined style={{fontSize:'20px'}}/> Joseangeltelecom</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
