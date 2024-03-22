import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import Post from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { POST_API_END_POINT } from '../utils/constant';
import { setRefresh } from '../redux/postSlice';
import { toast } from 'react-toastify';

const Main = () => {
  const {posts} = useSelector(store =>store.post)
  const [description, setDescription] = useState("");
  const {user} = useSelector(store=>store?.user)
  const dispatch = useDispatch()

  const postSubmitHandler = async()=>{
    try {
      const res = await axios.post(`${POST_API_END_POINT}/create`, {description, id:user?._id}, {
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
      dispatch(setRefresh())
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setDescription("")
  }
  
  // post formate according to time and users 

  const sortedPosts = Array.isArray(posts) ? [...posts].sort((a, b) => {
    const aUserRole = a.user?.role || '';
    const bUserRole = b.user?.role || '';

    if (aUserRole === 'admin' && bUserRole !== 'admin') return -1;
    if (aUserRole !== 'admin' && bUserRole === 'admin') return 1;

    return new Date(b.createdAt) - new Date(a.createdAt);
  }) : [];

  return (
    <>
      <section className='main-section'>
        <div className="create-post-section">
          <div className="create-post">
            <Link to={`/profile/${user?._id}`} className="sidebar-profile-img">
              <Avatar src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" size="50" round={true} />
            </Link>
            <div className="post-input">
              <input value={description} onChange={(e)=>setDescription(e.target.value)} type="text" placeholder='What&#x27;s in your mind!' />
            </div>
          </div>
            <div className='post-elements'>
              <div className="choose-img">
                  <input type="file" name="create-post-img" id="create-post-img" />
              </div>
              <div>
                <button type='submit' onClick={postSubmitHandler} className='submit-post'>Post</button>
              </div>
            </div>
        </div>
        {sortedPosts?.map((post)=><Post key={post?._id} post={post}/>)}
      </section>
    </>
  )
}

export default Main;