import axios from 'axios'
import { POST_API_END_POINT} from '../utils/constant';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/postSlice';

export const useGetPosts = (id)=>{
  const dispatch = useDispatch();
  const {refresh} = useSelector(store=>store.post)

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await axios?.get(`${POST_API_END_POINT}/allposts/${id}`,{
          withCredentials:true
        });
        if (res && res.data && res.data.posts) {
          dispatch(getAllPosts(res.data.posts));
        } else {
          console.log("Profile data not available");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  },[refresh]);
};
