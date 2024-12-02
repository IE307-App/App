import { axiosInstance } from '../api/axios.config'; // Giả sử bạn đã cấu hình axiosInstance
import AsyncStorage from '@react-native-async-storage/async-storage';

const userService = {
    // Lấy thông tin người dùng theo ID
    async getUserById(userId) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get(`api/users/id/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Get user by ID error:", error.response?.data || error.message);
            throw error;
        }
    },
    async getAll() {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get('api/users');
            return response.data;
        } catch (error) {
            console.error("Get all users error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Lấy thông tin người dùng theo Username
    async getUserByUsername(username) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get(`api/users/username/${username}`);
            return response.data;
        } catch (error) {
            console.error("Get user by username error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Lấy thông tin profile của người dùng từ JWT
    async getUserProfile() {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get('api/users/profile');
            return response.data;
        } catch (error) {
            console.error("Get user profile error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Tìm kiếm người dùng
    async searchUser(query) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get(`api/users/search?query=${query}`);
            return response.data;
        } catch (error) {
            console.error("Search user error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Cập nhật thông tin người dùng
    async updateUserDetails(updatedUser) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.put('api/users/update', updatedUser);
            return response.data;
        } catch (error) {
            console.error("Update user details error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Follow người dùng
    async followUser(followUserId) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.put(`api/users/follow/${followUserId}`);
            return response.data;
        } catch (error) {
            console.error("Follow user error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Unfollow người dùng
    async unfollowUser(followUserId) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.put(`api/users/follow/${followUserId}`);
            return response.data;
        } catch (error) {
            console.error("Unfollow user error:", error.response?.data || error.message);
            throw error;
        }
    }
};

export default userService;
