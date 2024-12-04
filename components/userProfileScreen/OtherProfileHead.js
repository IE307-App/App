import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';  
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles, DEFAULT_DP } from "../../constants/Styles.js";
import PressEffect from "../UI/PressEffect.js";
import { AuthContext } from "../../store/auth-context.js";
import userService from "../../src/services/user.service.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

const OtherProfileHead = ({ userData, viewMode }) => {
  const [profilePic, setProfilePic] = useState(userData && userData.imageURL ? userData.imageURL : DEFAULT_DP);
  const [isFollowed, setIsFollowed] = useState(false);
  const navigation = useNavigation();

  const getFollowStatus = useCallback(async () => {
    try {
      // Kiểm tra trạng thái follow từ userService (server)
      const followStatus = await userService.checkFollowUser(userData.id);
      setIsFollowed(followStatus);  // Cập nhật trạng thái follow
      console.log(followStatus ? "Followed" : "Not Followed");
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái follow:", error);
    }
  }, [userData]);

  useEffect(() => {
    getFollowStatus();  // Lấy trạng thái follow khi component được load
  }, [getFollowStatus]);

  useFocusEffect(
    useCallback(() => {
      getFollowStatus();  // Lấy lại trạng thái follow khi quay lại màn hình
    }, [getFollowStatus])
  );

  const handleChat = () => {
    if (viewMode) {
      navigation.navigate("MessagesScreen");
    } else {
      navigation.navigate("LoginScreen");
    }
  };

  const handleFollow = async () => {
    try {
      const newFollowStatus = !isFollowed;  // Đảo trạng thái follow
      await userService.followUser(userData.id, newFollowStatus); // Gọi API để follow/unfollow
      setIsFollowed(newFollowStatus);  // Cập nhật trạng thái local
      await AsyncStorage.setItem(`followed-${userData.id}`, JSON.stringify(newFollowStatus));
      console.log(newFollowStatus ? "Followed user" : "Unfollowed user");
    } catch (error) {
      console.error("Lỗi khi theo dõi người dùng:", error);
    }
  };

  function ProfileStat({ text, subText }) {
    return (
      <Pressable style={{ alignItems: "center" }}>
        <Text style={{ fontWeight: "400", fontSize: 25, color: "white" }}>
          {text}
        </Text>
        <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
          {subText}
        </Text>
      </Pressable>
    );
  }

  return (
    <View>
      <View style={{ alignItems: "center", margin: 10 }}>
        <ImageBackground
          style={{ width: 150, height: 150, marginHorizontal: 10 }}
          imageStyle={{ borderRadius: 100 }}
          source={{ uri: profilePic }}
        >
          <View style={{ position: "absolute", right: 0, bottom: 5 }}>
            <PressEffect style={{ backgroundColor: GlobalStyles.colors.primary300, padding: 10, borderRadius: 50 }}>
              <Pressable onPress={() => !viewMode && navigation.navigate("EditProfileScreen")}>
                <Image
                  source={viewMode ? require("../../assets/add-friend.png") : require("../../assets/edit.png")}
                  style={{ width: 25, height: 25, tintColor: "white" }}
                />
              </Pressable>
            </PressEffect>
          </View>

          {viewMode && (
            <View style={{ position: "absolute", left: 0, top: 5, transform: [{ rotateY: "180deg" }] }}>
              <PressEffect>
                <Pressable onPress={() => navigation.navigate("MessagesScreen")}>
                  <Image
                    source={require("../../assets/chat-focused.png")}
                    style={{ width: 30, height: 30, tintColor: "white" }}
                  />
                </Pressable>
              </PressEffect>
            </View>
          )}
        </ImageBackground>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
          {/* Follow Button */}
          <Pressable onPress={handleFollow}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: isFollowed ? GlobalStyles.colors.secondary300 : GlobalStyles.colors.primary300,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 20,
                marginRight: 15,
              }}
            >
              <Ionicons
                name={isFollowed ? "checkmark-done-outline" : "person-add-outline"}
                size={20}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                {isFollowed ? "UnFollow" : "Follow"}
              </Text>
            </View>
          </Pressable>

          {/* Chat Button */}
          <Pressable onPress={handleChat}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: GlobalStyles.colors.primary300,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={20} color="white" style={{ marginRight: 8 }} />
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Chat</Text>
            </View>
          </Pressable>
        </View>

        <Text style={{ fontWeight: "bold", fontSize: 25, color: "white" }}>
          {userData.name}
        </Text>
        <Text style={{ fontSize: 15, color: "rgba(255,255,255,0.6)" }}>
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
        <ProfileStat text="255" subText="Posts" />
        <ProfileStat text="14.6k" subText="Followers" />
        <ProfileStat text="378" subText="Followings" />
      </View>
    </View>
  );
};

export default OtherProfileHead;
