import { StyleSheet, FlatList, Text, View, RefreshControl, Alert } from "react-native";
import { GlobalStyles } from "../../../constants/Styles";
import { useSharedValue } from "react-native-reanimated";
import PostAdvance from "./PostAdvance";
import postService from "../../../src/services/post.service";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

const Feed = ({ StoryTranslate }) => {
  const [posts, setPosts] = useState([]); // State to store posts
  const [refreshing, setRefreshing] = useState(false); // State for refreshing status
  const lastScrollY = useSharedValue(0);
  const [like, setLike] = useState(false);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getAllPost(); // Get all posts
        setPosts(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching posts:", error);
        Alert.alert("Lỗi", "Không thể tải bài viết."); // Improved error message
      }
    };

    fetchPosts();
  }, []); // This will run once when the component mounts
  
  useFocusEffect( 
    React.useCallback(() => {
      const fetchPosts = async () => {
        try {
          const postsData = await postService.getAllPost();
          setPosts(postsData);
        } catch (error) {
          console.error('Lỗi khi lấy bài đăng:', error);
        }
      };

      fetchPosts();

      return () => {
      };
    }, [])
  );


  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true); // Start refreshing
    try {
      const data = await postService.getAllPost(); // Refresh posts
      setPosts(data); // Update state with refreshed data
    } catch (error) {
      console.error("Error refreshing posts:", error);
      Alert.alert("Lỗi", "Không thể tải lại bài viết."); // Improved error message
    }
    setRefreshing(false); // End refreshing
  };

  return (
    <View style={{ flex: 1, backgroundColor: GlobalStyles.colors.primary }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: GlobalStyles.styles.tabBarPadding,
          gap: 20,
        }}
        onMomentumScrollBegin={(event) => {
          const scrollY = event.nativeEvent.contentOffset.y;
          if (scrollY > lastScrollY.value) StoryTranslate.value = true;
          else {
            StoryTranslate.value = false;
          }
        }}
        onMomentumScrollEnd={(event) => {
          const scrollY = event.nativeEvent.contentOffset.y;
          lastScrollY.value = scrollY;
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()} // Ensure each post has a unique ID
        data={posts} // Use fetched posts data
        renderItem={({ item }) => {
          return (
            <View>
              <PostAdvance post={item} /> 
            </View>
          );
        }}
      />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  // Add any styles you need here
});
