import { StyleSheet, Text, View, TextInput, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { GlobalStyles } from "../constants/Styles";
import { AppContext } from "../store/app-context";
import { Ionicons } from "@expo/vector-icons";
import chatbotService from "../src/services/chatbot.service";
import Header from "../components/home/head/Header";

const ExploreScreen = ({ navigation }) => {
  const appCtx = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleUserMessage = async () => {
    if (userInput.trim()) {
      // Add user's message to chat
      const newMessages = [...messages, { text: userInput, sender: "user" }];
      setMessages(newMessages);
      setUserInput("");
      setIsLoading(true); // Set loading to true when request is sent

      try {
        // Call the chat service to send the user's message and get the bot's response
        const response = await chatbotService.sendMessage(userInput);

        // Add bot's response to chat
        const botMessage = {
          text: response.response,
          sender: "bot",
          chat_id: response.chat_id,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setIsLoading(false); // Set loading to false once the response is received or in case of error
      }
    }
  };

  useEffect(() => {
    appCtx.setFetchingUsers(false);
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      {/* Separator Line Below Header */}
      <View style={styles.separator}></View>

      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Chat with the Bot UIT</Text>
      </View>

      <ScrollView style={styles.chatContainer}>
        {messages.map((message, index) => (
          <React.Fragment key={index}>
            {message.sender === "bot" && (
              <View style={styles.chatBubble}>
                <Image
                  source={require("../assets/uitLogo.png")}
                  style={styles.botImage}
                />
                <Text style={styles.botBubble}>{message.text}</Text>
              </View>
            )}
            {message.sender === "user" && (
              <View style={[styles.chatBubble, styles.userBubble]}>
                <Text style={styles.chatText}>{message.text}</Text>
              </View>
            )}
          </React.Fragment>
        ))}
      </ScrollView>

      {/* Show loading indicator if isLoading is true */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={userInput}
          onChangeText={setUserInput}
        />
        
        <View
          style={{
            backgroundColor: "rgba(122, 64, 248,0.5)",
            padding: 10,
            borderRadius: 50,
            marginLeft: 16,
          }}
        >
          <Ionicons
            onPress={handleUserMessage}
            name="send"
            color={"white"}
            size={25}
            marginLeft={8}
          />
        </View>
      </View>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
    justifyContent: "flex-start", 
    marginBottom: 65,
    marginTop: 23,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.5)",
    marginBottom: 10,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  chatContainer: {
    flex: 1,
    marginTop: 30,
    padding: 10,
  },
  chatBubble: {
    maxWidth: "80%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    flexDirection: "row", // Align image and text horizontally
    alignItems: "top", // Vertically align the image and text inside the bubble
  },
  userBubble: {
    backgroundColor: "rgba(0, 122, 255, 0.8)",
    alignSelf: "flex-end",
  },
  botBubble: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignSelf: "flex-start",
    padding: 10,
    borderRadius: 20,
    fontSize: 16,
  },
  chatText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10, // Space between the image and text
  },
  botImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Make the image circular
    marginRight: 10, // Space between image and text
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: GlobalStyles.colors.primary,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    borderRadius: 20,
    paddingLeft: 15,
    fontSize: 16,
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});
