import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../Apicalls/users";
import { Avatar, Badge, message } from "antd";
import { useNavigate } from "react-router-dom";
import { FiUserCheck } from 'react-icons/fi';
import { TbLogout } from 'react-icons/tb';
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/LoadersSlice";
import { SetUser } from "../redux/usersSlice";
import {MdNotificationsActive} from 'react-icons/md'
import Notification from "./Notification";
import { getAllNotifications, readAllNotifications } from "../Apicalls/notification";




const ProtectedPage = ({ children }) => {
  const [notification, setnotification] = useState(null);
  const [showNotifications, setshowNotifications] =useState(false);
  const {user} = useSelector(state => state.users)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const validateToken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      if (response.success) {
      dispatch(SetLoader(false));
        // setuser(response.data);
        dispatch(SetUser(response.data))
      } else {
        navigate("/login");
        // console.log(response.message);
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      navigate("/login");
      // console.log(error.message);
      message.error(error.message);
    }
  };

  const getnotification =async()=>{
      try {
          const response = await getAllNotifications();
          if(response.success){
            setnotification(response.data);
          }else{
            throw new Error(response.message);
          }
      } catch (error) {
        message.error(error.message);
      }
  }
  
  const readNotification= async ()=>{
    try {
        const response = await readAllNotifications();
        if(response.success) {
          getnotification()
        }else{
          throw new Error(response.error)
        }
    } catch (error) {
      message.error(error.message);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
      getnotification();
    } else {
      navigate("/login");
    }
  }, []);
 // console.log(user.role)
  return (
    user && (
      <div>
        <div className="flex justify-between items-center bg-primary p-5">
          <h1 className="text-2xl text-white cursor-pointer" onClick={()=> navigate('/')}>
          DealPlus
          </h1>
         <div className="bg-white py-2 px-5 rounded flex gap-1 items-center">
          <FiUserCheck size={22} className="mr-2"/>

          <span className="cursor-pointer uppercase" 
          onClick={()=> {
            if(user.role==='user'){
              navigate('/profile')
            }else{
              navigate('/admin')
            }
          }}
          >
            {user.name}
          </span>
          
          <Badge count={
            notification?.filter((notification)=>!notification.read).length
          }
          onClick={()=>{
            readNotification()
            setshowNotifications(true)
          }}
          className="items-center ml-2 cursor-pointer">
            <Avatar shape="circle" size="medium" icon={<MdNotificationsActive size={20} className="mt-1 text-black"/>}/>
          </Badge>

          <TbLogout size={22} className="ml-5 cursor-pointer" 
          onClick={()=>{
            localStorage.removeItem('token');
            navigate('/login')
          }}
          />
         </div>
        </div>
        <div className="p-5">{children}</div>
        {<Notification
           notification={notification}
           reloadNotifications={getnotification}
           showNotifications={showNotifications}
           setshowNotifications={setshowNotifications}
        />}
      </div>
    )
  );
};

export default ProtectedPage;
