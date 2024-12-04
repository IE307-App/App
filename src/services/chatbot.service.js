import axios from 'axios';
import FormData from 'form-data';  // Import FormData để gửi dữ liệu dạng form

const chatbotService = {
  async sendMessage(text) {
    try {
      const formData = new FormData();
      formData.append('text', text);  // Gửi dữ liệu text dưới dạng form field

      const response = await axios.post('http://10.0.2.2:8080/engine/chat', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  
        },
      });
      console.log("chatbot: ", response.data);
      return response.data;
    } catch (error) {
      console.error('Send message error:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default chatbotService;
