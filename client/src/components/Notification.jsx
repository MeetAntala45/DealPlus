import { Divider, Modal, message } from 'antd'
import React from 'react'
import { MdDeleteSweep } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import moment from 'moment';
import { SetLoader } from '../redux/LoadersSlice';
import { deleteAllNotifications } from '../Apicalls/notification';
import { useDispatch } from 'react-redux';

const Notification = ({
    notification,
    reloadNotifications,
    showNotifications,
    setshowNotifications,
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const deleteNotification =async(id)=>{
       try {
        // console.log('delete notification',id);
           const response = await deleteAllNotifications(id);
           if(response.success) {
            message.success(response.message);
            reloadNotifications();
            setshowNotifications(true)
           }else{
            throw new Error(response.message);
           }
       } catch (error) {
          message.error(error.message);
       }
    }
  return (
    <Modal
    title="Notifications"
    open={showNotifications}
    onCancel={()=>setshowNotifications(false)}
    footer={null}
    centered
    width={1000}
    >
        <div className='flex flex-col gap-2 '>
           {notification?.map((notification)=>(
             <div className='flex flex-col gap-2 border border-solid border-gray-400 rounded p-2 cursor-pointer'
             key={notification._id}
             >
                <div className='flex justify-between items-center gap-2'
                 
                >
                    <div
                    onClick={()=>{
                        navigate(notification.onClick)
                        setshowNotifications(false)
                     }}
                    >
                    <h1>{notification.title}</h1> 
                    <span>{notification.message}</span>
                    <h1 className='text-sm text-gray-400'>{moment(notification.createdAt).fromNow()}</h1>
                    </div>
                    <MdDeleteSweep size={43} className='mr-2 text-orange-800' onClick={()=>{
                        deleteNotification(notification._id);
                    }}/>
                </div>
             </div>
           ))}
        </div>
    </Modal>
  )
}

export default Notification