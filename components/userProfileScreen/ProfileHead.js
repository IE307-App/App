import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { GlobalStyles, DEFAULT_DP } from "../../constants/Styles.js";
import PressEffect from "../UI/PressEffect.js";
import { AuthContext } from "../../store/auth-context.js";
import postService from "../../src/services/post.service.js";
import userService from "../../src/services/user.service.js";

const ProfileHead = ({ viewMode }) => {
  const { userData: updatedUserData, updateUserData } = useContext(AuthContext); // Lấy userData từ context
  const [postCount, setPostCount] = useState(0); // Số bài viết
  const [followers, setFollowers] = useState(0);
  const [followings, setFollowings] = useState(0);
  const [profilePic, setProfilePic] = useState(
    updatedUserData?.imageURL || DEFAULT_DP // Sử dụng updatedUserData thay vì userData
  );

  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  // Hàm lấy số lượng followers và following của người dùng
  const fetchUserStats = async () => {
    try {
      const data = await userService.getUserStats();
      setFollowers(data.followersCount);
      setFollowings(data.followingCount);
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  // Hàm lấy số lượng bài viết của người dùng
  const fetchPostCount = async () => {
    try {
      const data = await postService.getAllPostByUserId();
      setPostCount(data.length);
    } catch (error) {
      console.error("Error fetching post count:", error);
    }
  };

  // Gọi các hàm khi component được mount hoặc khi updatedUserData thay đổi
  useEffect(() => {
    fetchPostCount();
    fetchUserStats();
  }, [updatedUserData]);

  // Sử dụng useFocusEffect để cập nhật khi màn hình được focus (quay lại từ các màn hình khác)
  useFocusEffect(
    React.useCallback(() => {
      fetchPostCount();
      fetchUserStats();
    }, [updatedUserData])
  );

  // Cập nhật ảnh đại diện khi userData thay đổi
  useEffect(() => {
    if (updatedUserData?.imageURL) {
      setProfilePic(updatedUserData.imageURL);
    }
  }, [updatedUserData]); // Khi updatedUserData thay đổi, cập nhật lại ảnh đại diện

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

  const handleEditPress = () => {
    if (viewMode) {
      // Nếu ở chế độ xem, chuyển hướng tới tin nhắn
      navigation.navigate("MessagesScreen");
    } else {
      // Nếu không ở chế độ xem, thực hiện logout
      logout();
      navigation.navigate("LoginScreen"); // Sau khi logout, chuyển hướng đến màn hình đăng nhập
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
        <ImageBackground
          style={{
            width: 150,
            height: 150,
            marginHorizontal: 10,
          }}
          imageStyle={{
            borderRadius: 100,
          }}
          source={{ uri: profilePic }}
        >
          <View
            style={{
              position: "absolute",
              right: 0,
              bottom: 5,
            }}
          >
            <PressEffect
              style={{
                backgroundColor: GlobalStyles.colors.primary300,
                padding: 10,
                borderRadius: 50,
              }}
            >
              <Pressable
                onPress={() => {
                  if (!viewMode) navigation.navigate("EditProfileScreen");
                }}
              >
                <Image
                  source={
                    viewMode
                      ? require("../../assets/add-friend.png")
                      : require("../../assets/edit.png")
                  }
                  style={{ width: 25, height: 25, tintColor: "white" }}
                />
              </Pressable>
            </PressEffect>
          </View>
          {viewMode && (
            <View
              style={{
                position: "absolute",
                left: 0,
                top: 5,
                transform: [{ rotateY: "180deg" }],
              }}
            >
              <PressEffect>
                <Pressable
                  onPress={() => {
                    navigation.navigate("MessagesScreen");
                  }}
                >
                  <Image
                    source={require("../../assets/chat-focused.png")}
                    style={{ width: 30, height: 30, tintColor: "white" }}
                  />
                </Pressable>
              </PressEffect>
            </View>
          )}
        </ImageBackground>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            color: "white",
          }}
        >
          {updatedUserData?.name}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          @{updatedUserData?.userName}
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
        <ProfileStat text={postCount} subText={"Posts"} />
        <ProfileStat text={followers} subText={"Followers"} />
        <ProfileStat text={followings} subText={"Followings"} />
      </View>
    </View>
  );
};

export default ProfileHead;

const styles = StyleSheet.create({});
