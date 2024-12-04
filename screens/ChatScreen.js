import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ChatCard from "../components/messagesScreen/ChatCard";
import InputField from "../components/InputField";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/Styles";
import userService from "../src/services/user.service";
import chatService from "../src/services/chat.service";
import moment from "moment";
import { AuthContext } from "../store/auth-context";

const ChatScreen = ({ navigation, route }) => {
  const { userId } = route.params;  // Nhận userId từ route params
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userChat, setUserChat] = useState(null);
  const [chatId, setChatId] = useState(0); 
  const authCtx = useContext(AuthContext);
  const userData = authCtx.userData;
  const currentUserName = userData.name; 
  const formatTimestamp = (timestamp) => {
    return moment(timestamp).format('MMM D, YYYY h:mm A'); // Định dạng thời gian theo tháng/ngày/năm giờ:phút
  };
  
  // hàm get user theo id
  async function getUserById(userId) {
    try {
      const user = await userService.getUserById(userId);  
      setUserChat(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  // hàm get chat id sau đó từ chat id get tin nhắn
  async function getMessagesByChatId(userId) {
    try {
      const chatId = await chatService.getChatByUserId(userId); 
      if (chatId > 0) {
        setChatId(chatId); 
        const messages = await chatService.getMessagesByChatId(chatId);
        setMessages(messages);
      } else {
        const newChat = await chatService.createSingleChat(userId);
        setChatId(newChat.id); 
        
        const messages = await chatService.getMessagesByChatId(newChat.id);
        setMessages(messages);
      }
    } catch (error) {
      console.error("Error fetching chat or messages:", error);
    }
  }
  useEffect(() => {
    
    getUserById(userId);
    getMessagesByChatId(userId);
  }, [userId]);

  useEffect(() => {
 
    if (userChat) {
      navigation.setOptions({
        headerShown: true,
        title: userChat.name || "John Doe",  
      });
    }
  }, [userChat]);

  // Hàm gửi tin nhắn
  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        chatId, // ID của đoạn chat
        content: message, // Nội dung tin nhắn
      };
  
      try {
        // Gửi tin nhắn lên server
        const sentMessage = await chatService.sendMessage(newMessage);
        // Cập nhật tin nhắn trong state
        if (sentMessage && sentMessage.user) {
          setMessages((prevMessages) => [
            ...prevMessages,sentMessage
            
            
          ]);
       
        } else {
          console.error("User information missing in sent message");
        }
        
  
        // Xóa nội dung trong ô nhập tin nhắn
        setMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <ChatCard sender={item.user.name} message={item.content}  imageURL={item.user.imageURL} timestamp={formatTimestamp(item.timestamp)} currentUserName={currentUserName} />
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <View style={{ flex: 1 }}>
          <InputField
            onChangeText={setMessage}
            value={message}
            placeholder="Type something"
            keyboardType="default"
            inValid={message.trim().length === 0}
          />
        </View>
        <Pressable onPress={handleSendMessage} style={styles.sendButton}>
          <Ionicons name="send" color={"white"} size={30} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: GlobalStyles.colors.primary },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  sendButton: {
    backgroundColor: "rgba(122, 64, 248,0.5)",
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
});

export default ChatScreen;
