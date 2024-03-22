import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMyProfile } from '../redux/userSlice';

export const useGetProfile = (id)=>{
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const fetchData = async () => {
      try {
        if (!id) {
          console.log("User is not logged in");
          return;
        }

        const res = await axios?.get(`${USER_API_END_POINT}/profile/${id}`,{
          withCredentials:true
        });
        
        if (res && res.data && res.data.user) {
          dispatch(getMyProfile(res.data.user));
        } else {
          console.log("Profile data not available");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  },[dispatch, id]);
};
