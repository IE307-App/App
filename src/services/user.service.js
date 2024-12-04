import { axiosInstance } from '../api/axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userService = {
    
    // Lấy thông tin người dùng hiện tại
    async getUserInfo() {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token is missing');
            }
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get('/api/users/profile');
            return response.data;
        } catch (error) {
            console.error("Get user info error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Lấy số lượng followers và following của người dùng
    async getUserStats() {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token is missing');
            }
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get('api/users/stats');
            return response.data;
        } catch (error) {
            console.error("Get user stats error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Cập nhật thông tin người dùng
    async updateUserInfo(userDto) {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token is missing');
            }
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.put('api/users/update', userDto);
            console.log("Update user info response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Update user info error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Lấy tất cả các followers của người dùng
    async getUserFollowers() {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token is missing');
            }
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get('api/users/followers');
            return response.data;
        } catch (error) {
            console.error("Get user followers error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Lấy tất cả những người mà người dùng đang follow
    async getUserFollowing() {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token is missing');
            }
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get('api/users/following');
            return response.data;
        } catch (error) {
            console.error("Get user following error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Follow một người dùng
    async followUser(userId) {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token is missing');
            }
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.put(`api/users/follow/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Follow user error:", error.response?.data || error.message);
            throw error;
        }
    },
    // kiểm tra đã follow chưa
    async checkFollowUser(userId) {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token is missing');
            }
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get(`api/users/follow/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Follow user error:", error.response?.data || error.message);
            throw error;
        }
    },

    // // Unfollow một người dùng
    // async unfollowUser(userId) {
    //     try {
    //         const token = await AsyncStorage.getItem('token');
    //         if (!token) {
    //             throw new Error('Token is missing');
    //         }
    //         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //         const response = await axiosInstance.put(`api/users/unfollow/${userId}`);
    //         return response.data;
    //     } catch (error) {
    //         console.error("Unfollow user error:", error.response?.data || error.message);
    //         throw error;
    //     }
    // },
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
    }
};

export default userService;
