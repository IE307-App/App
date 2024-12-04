import { axiosInstance } from '../api/axios.config'; // Giả sử bạn đã cấu hình axiosInstance
import AsyncStorage from '@react-native-async-storage/async-storage';

const notificationService = {
    // Tạo thông báo mới
    async createNotification(notificationDto) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.post('api/notifications/create', notificationDto);
            return response.data;
        } catch (error) {
            console.error("Create notification error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Lấy tất cả thông báo của người dùng
    async getNotificationsByUser() {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get('api/notifications');
            return response.data;
        } catch (error) {
            console.error("Get notifications error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Lấy thông báo chưa đọc của người dùng
    async getUnreadNotifications(userId) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get(`api/notifications/unread/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Get unread notifications error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Đánh dấu thông báo là đã đọc
    async markAsRead(notificationId) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.put(`api/notifications/read/${notificationId}`);
            return response.data;
        } catch (error) {
            console.error("Mark as read error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Xóa thông báo
    async deleteNotification(notificationId) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.delete(`api/notifications/${notificationId}`);
            return response.data;
        } catch (error) {
            console.error("Delete notification error:", error.response?.data || error.message);
            throw error;
        }
    }
};

export default notificationService;
