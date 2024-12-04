import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { DEFAULT_DP, GlobalStyles } from "../../../constants/Styles";
import CommentSheet from "../../Comments/CommentSheet";
import { timeDifference } from "../../../utils/helperFunctions";
import { AuthContext } from "../../../store/auth-context";
import PressEffect from "../../UI/PressEffect";
import { LinearGradient } from "expo-linear-gradient";
const { height, width } = Dimensions.get("window");
import postService from "../../../src/services/post.service";
function PostAdvance({ post }) {
  useEffect(() => {
    console.log("Post Advance", post.id);
  }, []);

  function Avatar() {
    const navigation = useNavigation();
    const [profilePic, setProfilePic] = React.useState(
      post.user && post.user.imageURL ? post.user.imageURL : DEFAULT_DP
    );

    return (
      <View style={{ flexDirection: "row" }}>
        <PressEffect>
          <Pressable
            style={{ flexDirection: "row" }}
            onPress={() => {
              navigation.navigate("UserProfileScreen", {
                backWhite: true,
                ViewUser: true,
              });
            }}
          >
            <Image
              source={
                profilePic
                  ? { uri: post.user.imageURL }
                  : {
                      uri: "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
                    }
              }
              style={styles.story}
            />
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                {post.user && post.user.userName ? post.user.userName : "Username"}
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              >
                {timeDifference(post.createAt || new Date())}
              </Text>
            </View>
          </Pressable>
        </PressEffect>
      </View>
    );
  }

  function PostFotter() {
    const [showCaptions, setShowCaptions] = useState(false);

    return (
      <View style={{ marginHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="location"
              size={15}
              color={GlobalStyles.colors.gray}
            />
            <Text style={{ color: GlobalStyles.colors.gray, paddingHorizontal: 5 }}>
              {post.location || "Location not available"}
            </Text>
          </View>
          <Text style={{ color: GlobalStyles.colors.gray, paddingHorizontal: 5 }}>
            {post.createdAt ? timeDifference(post.createdAt) : "Unknown Date"}
          </Text>
        </View>
        <Text
          onPress={() => setShowCaptions(!showCaptions)}
          numberOfLines={showCaptions ? undefined : 1}
          style={{
            color: "white",
            padding: 5,
            paddingBottom: 10,
            width: showCaptions ? undefined : "90%",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              color: GlobalStyles.colors.purple,
            }}
          >
            Post Title:{" "}
          </Text>
          {post.caption || "No caption available"}
        </Text>
      </View>
    );
  }

  function PostImage({ children }) {
    const [resizeModeCover, setResizeModeCover] = useState(true);
    const [ratio, setRatio] = useState(1);

    useEffect(() => {
      Image.getSize(post.image, (width, height) => {
        const imageRatio = width / height;
        if (imageRatio < 0.9) {
          setRatio(1);
        } else {
          setRatio(imageRatio);
        }
      });
    }, [post]);

    return (
      <Pressable
        style={{
          borderRadius: 30,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: GlobalStyles.colors.primary600,
        }}
        onPress={() => {
          setResizeModeCover(!resizeModeCover);
          console.log("object");
        }}
      >
        <ImageBackground
          source={{ uri: post.image || DEFAULT_DP }} // Default image if post.Image is missing
          style={{
            width: "100%",
            aspectRatio: ratio,
            backgroundColor: GlobalStyles.colors.primary500,
          }}
          imageStyle={{
            resizeMode: resizeModeCover ? "cover" : "contain",
          }}
        >
          <LinearGradient
            colors={["rgba(0,0,0,.5)", "transparent"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={{
              bottom: 0,
              height: 40 + 50,
              width: "100%",
              position: "absolute",
            }}
          />
          {children}
        </ImageBackground>
      </Pressable>
    );
  }

  function PostStats() {
    const [liked, setLiked] = useState(false);

    const [totalLikes, setTotalLikes] = useState(post.likeByUser.length || 0); 
    const [totalComments, setTotalcomments] = useState(post.comments.length || 0); 

    const [showComments, setShowComments] = useState(false);

    const handleLike = async (postId) => {
      setLiked(!liked);
      try {
        await postService.likePost(postId);
        const post  = await postService.getPostById(postId);
        setTotalLikes(post.likeByUser.length);
        console.log("Thích bài đăng thành công");
        
      } catch (err) {
        console.error('Lỗi khi thích bài đăng:', err);
      }
    };

    function FooterButton({ icon, number, onPress, color = "white" }) {
      return (
        <View style={{ zIndex: 10 }}>
          <Pressable style={[styles.footerIcon]} onPress={onPress}>
            <PressEffect>
              <View
                style={{
                  backgroundColor: GlobalStyles.colors.primary,
                  padding: 10,
                  borderRadius: 50,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  style={{
                    paddingHorizontal: 5,
                  }}
                  name={icon}
                  size={20}
                  color={color}
                />
                <Text style={{ color: "white", fontWeight: "600" }}>
                  {number}
                </Text>
              </View>
            </PressEffect>
          </Pressable>
        </View>
      );
    }

    return (
      <>
        <CommentSheet postId={post.id} visible={showComments} setVisible={setShowComments} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <Avatar />
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <FooterButton onPress={() => handleLike(post.id)}
              icon={liked ? "heart" : "heart-outline"}
              number={totalLikes}
              // onPress={handleLike(post.id)}
              color={GlobalStyles.colors.greenLight}
            />
            <FooterButton
              icon={"chatbubble-ellipses"}
              number={post.comments.length || 0}
              onPress={() => {
                setShowComments(true);
              }}
            />
            <FooterButton icon={"arrow-redo"} onPress={() => {}} left={20} />
          </View>
        </View>
      </>
    );
  }

  return (
    <View
      style={{
        backgroundColor: GlobalStyles.colors.primary300,
        borderRadius: 30,
        marginHorizontal: 10,
      }}
    >
      <PostImage>
        <PostStats />
      </PostImage>
      <PostFotter />
    </View>
  );
}

export default PostAdvance;

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  footerIcon: {
    padding: 5,
  },
});
