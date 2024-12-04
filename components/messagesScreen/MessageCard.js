import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/Styles";
import { useNavigation } from "@react-navigation/native";

const MessageCard = ({ item }) => {
  const navigation = useNavigation();
  
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
      onPress={() => {
        // Chuyển đến màn hình ChatScreen và truyền dữ liệu người dùng qua route params
        navigation.navigate("ChatScreen", { userId: item.id });
      }}
      android_ripple={{
        color: "rgba(122, 64, 248,0.1)",
        foreground: true,
      }}
    >
      <Image
        source={{ uri: item.imageURL }} // Lấy ảnh từ dữ liệu người dùng
        style={{ width: 70, height: 70, borderRadius: 50 }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginHorizontal: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
            {item.name} {/* Hiển thị tên người dùng */}
          </Text>
          <Text style={{ fontSize: 14, color: GlobalStyles.colors.gray }}>
            {item.lastMessage} {/* Hiển thị tin nhắn gần đây */}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "space-around",
          }}
        >
          <Text style={{ fontSize: 10, color: GlobalStyles.colors.gray }}>
            {item.timeAgo} {/* Hiển thị thời gian tin nhắn */}
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 20,
              height: 20,
              borderRadius: 50,
              backgroundColor: GlobalStyles.colors.blue,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {item.unreadMessages} {/* Số tin nhắn chưa đọc */}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default MessageCard;

const styles = StyleSheet.create({});
