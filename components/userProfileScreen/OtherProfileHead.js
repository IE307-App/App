import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';  // Import icon library
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles, DEFAULT_DP } from "../../constants/Styles.js";
import PressEffect from "../UI/PressEffect.js";
import { AuthContext } from "../../store/auth-context.js";
import userService from "../../src/services/user.service.js";

const OtherProfileHead = ({ userData, viewMode }) => {

  const [profilePic, setProfilePic] = React.useState(
    userData && userData.imageURL ? userData.imageURL : DEFAULT_DP
  );
  const [isFollowed, setIsFollowed] = React.useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    setIsFollowed(userService.checkFollowUser(userData._id));
  }, []);
  function ProfileStat({ text, subText, onPress }) {
    return (
      <Pressable style={{ alignItems: "center" }} onPress={onPress}>
        <Text style={{ fontWeight: "400", fontSize: 25, color: "white" }}>
          {text}
        </Text>
        <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
          {subText}
        </Text>
      </Pressable>
    );
  }
  const handleChat = () => {
    if (viewMode) {
      navigation.navigate("MessagesScreen");
    } else {
      navigation.navigate("LoginScreen"); // Sau khi logout, chuyển hướng đến màn hình đăng nhập
    }
  };
  const handleFollow = (userData) => {
    try {
      const response = userService.followUser(userData._id);
      if (response.status === 200) {
        setIsFollowed(userService.checkFollowUser(userData._id));
      } else {
        console.error("Loi khi theo dõi người dùng:");
      }
    } catch (error) {
      console.error("Lỗi khi theo dõi người dùng:");
    }

    
  };


  return (
    <View>
      <View
        style={{
          alignItems: "center",
          margin: 10,
        }}
      >
        {/* Follow Button */}
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Pressable onPress={handleFollow}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: isFollowed
                  ? GlobalStyles.colors.secondary300
                  : GlobalStyles.colors.primary300,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 20,
              }}
            >
              <Ionicons
                name={isFollowed ? "user-following" : "user-follow"}  // Chọn icon tương ứng
                size={20}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {isFollowed ? "Unfollow" : "Follow"}
              </Text>
            </View>
          </Pressable>
        </View>

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            color: "white",
          }}
        >
          {userData.userName}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          @{userData.userName}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: 20,
          backgroundColor: GlobalStyles.colors.primary200,
          borderRadius: 20,
          marginHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        <ProfileStat text={"255"} subText={"Posts"} />
        <ProfileStat text={"14.6k"} subText={"Followers"} />
        <ProfileStat text={"378"} subText={"Followings"} />
      </View>
    </View>
  );
};

export default OtherProfileHead;

const styles = StyleSheet.create({});
