import { axiosInstance } from '../api/axios.config'; // Giả sử bạn đã cấu hình axiosInstance
import AsyncStorage from '@react-native-async-storage/async-storage';

const chatService = {
    // Tạo chat đơn (Single Chat)
    async createSingleChat(userId) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.post(`api/chat/createSingle/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Create single chat error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Tạo chat nhóm (Group Chat)
    async createGroupChat(request) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.post('api/chat/createGroup', request);
            return response.data;
        } catch (error) {
            console.error("Create group chat error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Lấy thông tin chat theo ID
    async getChatByUserId(userId) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get(`api/chat/getChatId/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Get chat by ID error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Lấy tất cả các cuộc trò chuyện của người dùng
    async getChatsByUser() {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get('api/chat/user');
            return response.data;
        } catch (error) {
            console.error("Get chats by user error:", error.response?.data || error.message);
            throw error;
        }
    },
    //lấy tin nhắn theo chat id
    async getMessagesByChatId(chatId) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get(`api/message/chat/${chatId}`);
            return response.data;
        } catch (error) {
            console.error("Get messages by chat id error:", error.response?.data || error.message);
            throw error;
        }
    },

    // gửi tin nhắn
    async sendMessage(message) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   
            const response = await axiosInstance.post('api/message/send', message);
            return response.data;
        } catch (error) {
            console.error("Send message error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Thêm người dùng vào nhóm
    async addUserToGroupChat(chatId, userId) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.post(`api/chat/${chatId}/add/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Add user to group chat error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Xóa người dùng khỏi nhóm
    async removeUserFromGroupChat(chatId, userId) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.put(`api/chat/${chatId}/add/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Remove user from group chat error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Xóa nhóm chat
    async deleteGroupChat(chatId) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.delete(`api/chat/delete/${chatId}`);
            return response.data;
        } catch (error) {
            console.error("Delete group chat error:", error.response?.data || error.message);
            throw error;
        }
    }
};

export default chatService;
