import { StyleSheet, Dimensions, Pressable, View, Modal } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import RemoteImage from "./RemoteImage";
import MainPost from "../home/body/Post";

const { height, width } = Dimensions.get("window");

const Post = ({ postData }) => {
  const navigation = useNavigation();
  const [showPost, setShowPost] = useState(false);

  return (
    <View style={styles.container}>
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
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <MainPost post={postData} />
          </View>
        </Pressable>
      </Modal>

      <Pressable
        onPress={() => {
          setShowPost(true);
        }}
        style={styles.pressablePost}
      >
        <RemoteImage imageUri={postData.picturePath} />
      </Pressable>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  pressablePost: {
    borderRadius: 0,
    overflow: "hidden",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 0,
    padding: 10,
  },
});
