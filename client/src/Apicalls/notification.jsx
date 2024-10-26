import { axiosInstance } from "./axiosinstance";

// add the notification

export const AddNotification = async(data)=>{
    try {
        const reesponse = await axiosInstance.post('/api/notifications/notify',data)
        return reesponse.data;
    } catch (error) {
        return error.response.data;
    }
}

// get all notification by user

export const getAllNotifications = async ()=>{
    try {
        const response = await axiosInstance.get('/api/notifications/get-all-notifications');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// delete all notificationsby users

export const deleteAllNotifications=async (id)=>{
    try {
        const response = await axiosInstance.delete(`/api/notifications/delete-notification/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


// delete all notificationsby users

export const readAllNotifications=async ()=>{
    try {
        const response = await axiosInstance.put('/api/notifications/read-all-notifications');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}