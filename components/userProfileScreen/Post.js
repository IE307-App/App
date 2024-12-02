import { StyleSheet, Dimensions, Pressable, View, Modal } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import RemoteImage from "./RemoteImage";
import MainPost from "../home/body/PostAdvance";

const { height, width } = Dimensions.get("window");

const Post = ({ postData }) => {
  console.log("PostData", postData);
  const navigation = useNavigation();
  const [showPost, setShowPost] = useState(false);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showPost}
        statusBarTranslucent
        onRequestClose={() => {
          setShowPost(false);
        }}
      >
        <Pressable
          onPress={() => setShowPost(false)}
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View>
            <MainPost post={postData} />
          </View>
        </Pressable>
      </Modal>

      <Pressable
        onPress={() => {
          setShowPost(true);
        }}
        style={{ margin: 5 }}
      >
        <RemoteImage imageUri={postData.image} />
      </Pressable>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({});
