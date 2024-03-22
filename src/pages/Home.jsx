import React, { useEffect } from 'react'
import LeftSidebar from './LeftSidebar'
import {Outlet, useNavigate} from 'react-router-dom'
import RightSidebar from './RightSidebar'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import useSuggestedUsers from '../hooks/useSuggestedUsers'
import { useGetPosts } from '../hooks/useGetPosts'

const Home = () => {
 const {user, otherUsers} = useSelector(store=>store.user);

 useSuggestedUsers(user?._id);
 useGetPosts(user?._id);
 const navigate = useNavigate()
  useEffect(()=>{
    if (!user) {
      navigate('/login')
    }
  },[])
  return (
    <>
    <section className="body-container">
      <Header/>
      <section className='container main-container'>
          <LeftSidebar/>
          <Outlet/>
          <RightSidebar otherUsers={otherUsers}/>
      </section>
    </section>
    </>
  )
}

export default Home;
