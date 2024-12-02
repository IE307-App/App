import { axiosInstance } from '../api/axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { serverLink } from "../../constants/server";
// const axiosInstance = serverLink;
const postService = {
    
    async getAllPost() {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get("api/post/all");
            return response.data;
        } catch (error) {
            console.error("Get post error:", error.response?.data || error.message);
            throw error;
        }
    },
    async getPostById(postId) {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get(`api/post/${postId}`);
            return response.data;
        } catch (error) {
            console.error("Get post error:", error.response?.data || error.message);
            throw error;
        }
    },

    async getAllPostByUserId() {
        try {
            const token = await AsyncStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get("api/post/all/mypost");
            console.log("Get all post by user id response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Get post error:", error.response?.data || error.message);
            throw error;
        }
    },

    async createPost(postDto) {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log("Token is null");
            }
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.post("api/post/create", postDto);
            return response;
        } catch (error) {
            console.error("Create post error:", error.response?.data || error.message);
            throw error;
        }
    },

    async likePost(postid) {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("Token:", token);
            const response = await axiosInstance.put(`api/post/like/${postid}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Like post response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Like post error:", error.response?.data || error.message);
            throw error;
        }
    }
};

export default postService;
