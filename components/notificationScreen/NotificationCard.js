import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GlobalStyles } from "../../constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import Button from "../Button";
import notificationService from "../../src/services/notification.service";
import NotificationDto from "../../src/types/dto/notification.dto";
import { AuthContext } from "../../store/auth-context";

function NotificationCard({mode = "FOLLOW"}) {
  const [listNotificationFollower, setListNotificationFollower] = useState([]);
  const { userData: updatedUserData, updateUserData } = useContext(AuthContext); // Lấy userData từ context
  const [isFollowed, setIsFollowed] = useState(false);
  const [userData, setUserData]  = useState({});
  useEffect(() => {
    getAllNotificationFollow();  // Lấy danh sách thông báo khi component được mount
    setUserData()
  }, []);
  // Hàm lấy tất cả thông báo của người dùng
  const getAllNotificationFollow = async () => {
    try {
      const notifications = await notificationService.getNotificationsByUser();
      setListNotificationFollower(notifications);  
    } catch (error) {
      console.error("Lỗi khi lấy thông báo:", error);
    }
  };
  const handleFollow =  () => {
    try {
      const newFollowStatus = !isFollowed; 
       userService.followUser(userData.id, newFollowStatus); 
      setIsFollowed(newFollowStatus);  
       AsyncStorage.setItem(`followed-${userData.id}`, JSON.stringify(newFollowStatus));
      console.log(newFollowStatus ? "Followed user" : "Unfollowed user");
      console.log(updatedUserData.id )

      if (newFollowStatus) {
        sendNotification();  // Gửi thông báo khi follow thành công
        console.log("Success ---------------------");

      }
    } catch (error) {
      console.error("Lỗi khi theo dõi người dùng:", error);
    }
  };
  const sendNotification = () => {
    const notificationDto = new NotificationDto(
      "You have a new follower by " + updatedUserData.name  ,
      "FOLLOW",
      false,
      updatedUserData.id,
      userData.id
    );
    notificationService.createNotification(notificationDto);
  };

  

  return (
    <View>
      {listNotificationFollower.map((notification) => {
        const { message, type, userGui, userNhan, createdAt } = notification;

        return (
          <View key={notification.id} style={styles.container}>
            <View style={{ flexDirection: "row", width: "70%" }}>
              <Image
                source={{ uri: userGui.imageURL }}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: "cover",
                  borderRadius: 50,
                }}
              />
              <View style={{ marginHorizontal: 20, justifyContent: "space-between" }}>
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
                    {userGui.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: GlobalStyles.colors.purple }}>
                    {type === "LIKE" && "liked your photo"}
                    {type === "COMMENT" && "commented on your photo"}
                    {type === "FOLLOW" && `starts following you`}
                  </Text>
                </View>

                <Text style={{ fontSize: 12, color: "gray" }}>
                  {createdAt ? createdAt : "Just Now"}
                </Text>
              </View>
            </View>

            {type === "LIKE" || type === "COMMENT" ? (
              <View style={{ width: "20%", height: 80 }}>
                <Image
                  source={{ uri: userGui.imageURL }}  // Thêm ảnh người gửi vào hình thumbnail
                  style={{
                    flex: 1,
                    resizeMode: "cover",
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 50,
                    padding: 3,
                    position: "absolute",
                    right: -5,
                    top: -5,
                  }}
                >
                  <Ionicons
                    name={type === "LIKE" ? "heart" : "chatbubble-ellipses"}
                    size={12}
                    color={GlobalStyles.colors.blue}
                  />
                </View>
              </View>
            ) : type === "FOLLOW" && (
              <View>
                {/* <Button
                  title={"Follow Back"}
                  secondary={true}
                  titleStyle={{ fontSize: 12, padding: 10 }}
                  onPress={() => console.log(`Follow back ${userGui.name}`)}  // Logic follow back
                /> */}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

export default NotificationCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
