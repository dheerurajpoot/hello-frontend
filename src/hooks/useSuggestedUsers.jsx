import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getOtherUsers } from '../redux/userSlice';

const useSuggestedUsers = (id)=>{
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetchSuggestedUsers = async()=>{

    try {
      const res = await axios.get(`${USER_API_END_POINT}/suggested/${id}`,{
        withCredentials:true
      });
      dispatch(getOtherUsers(res.data.otherUser));
    } catch (error) {
      console.log(error);
    }
  }
  fetchSuggestedUsers()
  },[]);

};
export default useSuggestedUsers;