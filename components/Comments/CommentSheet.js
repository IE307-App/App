import React, { useRef, useEffect, useState, useContext } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { Ionicons } from "@expo/vector-icons";
import CommentCard from "./CommentCard";
import { GlobalStyles } from "../../constants/Styles";
import { FlatList } from "react-native-gesture-handler";
import commentService from "../../src/services/comment.service";
import { AuthContext } from "../../store/auth-context";

function CommentSheet({ postId, visible, setVisible }) {
  const [comment, setComment] = useState("");
  const [listComments, setComments] = useState([]);
  const { handleAddComment, addComment } = useContext(AuthContext);

  const actionSheetRef = useRef(null);

  useEffect(() => {
    if (visible) {
      fetchComments();
      actionSheetRef.current?.setModalVisible(true);
    } else {
      actionSheetRef.current?.setModalVisible(false);
    }
  }, [visible, postId]); // Theo dõi sự thay đổi của addComment

  const fetchComments = async () => {
    try {
      const response = await commentService.getAllCommentsByPost(postId);
      setComments(response);
    } catch (error) {
      console.error("Error fetching comments: ", error);
    }
  };

  const handleComment = async () => {
    if (comment.trim() === "") {
      return;
    }

    const newComment = {
      content: comment,
    };

    try {
      const response = await commentService.createComment(postId, newComment);
      if (response) {
        // Cập nhật lại danh sách comment sau khi thêm comment mới
        setComments((prevComments) => [response, ...prevComments]);
        setComment(""); // Xóa nội dung nhập vào
        handleAddComment(); // Gọi handleAddComment để làm mới danh sách
      }
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          backgroundColor: GlobalStyles.colors.primary,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
        indicatorStyle={{
          width: 50,
          marginVertical: 10,
          backgroundColor: "white",
        }}
        gestureEnabled={true}
        onClose={() => {
          setVisible(false);
        }}
      >
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={listComments}
          renderItem={({ item, index }) => <CommentCard comment={item} />}
        />

        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginHorizontal: 10 }}>
          <View style={{ flex: 1, marginVertical: 10 }}>
            <TextInput
              value={comment}
              onChangeText={(text) => {
                setComment(text);
              }}
              placeholder="InputText"
              placeholderTextColor="rgba(255,255,255,0.5)"
              style={{
                color: "white",
                borderWidth: 1,
                borderColor: "gray",
                padding: 10,
                borderRadius: 5,
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "rgba(122, 64, 248,0.5)",
              padding: 10,
              borderRadius: 50,
              marginLeft: 20,
            }}
          >
            <Ionicons onPress={handleComment} name="send" color={"white"} size={30} marginLeft={18} />
          </View>
        </View>
      </ActionSheet>
    </View>
  );
}

export default CommentSheet;
