import { axiosInstance } from '../api/axios.config'; // Giả sử bạn đã cấu hình axiosInstance
import AsyncStorage from '@react-native-async-storage/async-storage';

const commentService = {
    // Tạo bình luận
    async createComment(postId, comment) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.post(`api/comment/create/${postId}`, comment);
            return response.data;
        } catch (error) {
            console.error("Create comment error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Cập nhật bình luận
    async updateComment(commentId, comment) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.put(`api/comment/update/${commentId}`, comment);
            return response.data;
        } catch (error) {
            console.error("Update comment error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Xóa bình luận
    async deleteComment(commentId) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.delete(`api/comment/delete/${commentId}`);
            return response.data;
        } catch (error) {
            console.error("Delete comment error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Thích bình luận
    async likeComment(commentId) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.put(`api/comment/like/${commentId}`);
            return response.data;
        } catch (error) {
            console.error("Like comment error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Bỏ thích bình luận
    async unlikeComment(commentId) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.put(`api/comment/unlike/${commentId}`);
            return response.data;
        } catch (error) {
            console.error("Unlike comment error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Lấy tất cả bình luận của một bài viết
    async getAllCommentsByPost(postId) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get(`api/comment/all/${postId}`);
            console.log('comment----------',response);
            return response.data;
        } catch (error) {
            console.error("Get all comments by post error:", error.response?.data || error.message);
            throw error;
        }
    },

    // Lấy bình luận theo ID
    async getCommentById(commentId) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get(`api/comment/${commentId}`);
            return response.data;
        } catch (error) {
            console.error("Get comment by ID error:", error.response?.data || error.message);
            throw error;
        }
    }
};

export default commentService;
