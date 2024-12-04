import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/Styles";

const ChatCard = ({ sender, message, timestamp, imageURL, currentUserName }) => {
  // Kiểm tra nếu tên người gửi khớp với tên người dùng hiện tại
  const isSender = String(sender).trim() === String(currentUserName).trim();

  return (
    <View
      style={[
        { 
          margin: 10, 
          marginHorizontal: 15, 
          flexDirection: "row",  // Sử dụng row để sắp xếp tin nhắn và ảnh trên cùng một dòng
          alignItems: "center",  // Căn giữa theo chiều dọc để ảnh và tin nhắn thẳng hàng
        },
        isSender && { flexDirection: "row-reverse" }, // Đổi hướng tin nhắn khi người gửi là người dùng hiện tại
      ]}
    >
      {/* Hiển thị ảnh đại diện nếu người gửi không phải người dùng hiện tại */}
      {!isSender && (
        <Image
          source={{ uri: imageURL }}  // Lấy ảnh đại diện từ thông tin người gửi
          style={{ width: 30, height: 30, borderRadius: 50, marginRight: 10 }}
        />
      )}

      {/* Hiển thị nội dung tin nhắn */}
      <View
        style={[
          styles.container,
          isSender ? styles.senderContainer : styles.receiverContainer, // Áp dụng kiểu dáng tùy thuộc vào người gửi hoặc nhận
        ]}
      >
        {/* Nội dung tin nhắn */}
        <Text style={{ color: "white" }}>{message}</Text>

        {/* Thời gian tin nhắn */}
        <Text
          style={{
            color: GlobalStyles.colors.gray,
            fontSize: 10,
            textAlign: isSender ? "right" : "left", // Đặt thời gian căn theo hướng của tin nhắn
            paddingTop: 2,
          }}
        >
          {timestamp}
        </Text>
      </View>
    </View>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(122, 64, 248,0.5)", // Màu nền của tin nhắn
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
    width: "70%", // Đảm bảo tin nhắn không quá rộng
  },
  senderContainer: {
    backgroundColor: "#6666FF", // Màu nền cho tin nhắn của người gửi
    borderBottomLeftRadius: 0,
    alignSelf: "flex-end", // Tin nhắn của người gửi nằm ở phía phải
    borderBottomRightRadius: 0,
  },
  receiverContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Màu nền cho tin nhắn của người nhận
    borderBottomRightRadius: 0,
    alignSelf: "flex-start", // Tin nhắn của người nhận nằm ở phía trái
  },
});
