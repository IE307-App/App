import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  FlatList,
  Text,
  ImageBackground,
  Animated,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { USERS } from "../../../data/users";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../../constants/Styles";
import ImageStory from "../../story/ImageStory";
import { Ionicons } from "@expo/vector-icons";
import PressEffect from "../../UI/PressEffect";

const data = [
  {
    user_id: 0,
    user_image:
      "https://p16.tiktokcdn.com/tos-maliva-avt-0068/2f134ee6b5d3a1340aeb0337beb48f2d~c5_720x720.jpeg",
    user_name: "Ajmal",
    active: false,
    stories: [
      {
        story_id: 1,
        story_image:
          "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg",
      },
    ],
  },
  {
    user_id: 1,
    user_image: "https://randomuser.me/api/portraits/women/2.jpg",
    user_name: "Ajmal",
    active: false,
    stories: [
      {
        story_id: 1,
        story_image:
          "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg",
      },
    ],
  },
  {
    user_id: 2,
    user_image: "https://randomuser.me/api/portraits/women/5.jpg",
    user_name: "Ajmal",
    stories: [
      {
        story_id: 1,
        story_image:
          "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg",
      },
    ],
  },
  {
    user_id: 3,
    user_image: "https://randomuser.me/api/portraits/women/8.jpg",
    user_name: "Ajmal",
    active: true,

    stories: [
      {
        story_id: 1,
        story_image:
          "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg",
      },
    ],
  },
  {
    user_id: 4,
    user_image: "https://randomuser.me/api/portraits/women/10.jpg",
    user_name: "Ajmal",
    active: false,

    stories: [
      {
        story_id: 1,
        story_image:
          "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg",
      },
    ],
  },
  {
    user_id: 5,
    user_image: "https://randomuser.me/api/portraits/women/25.jpg",
    user_name: "Ajmal",
    active: false,

    stories: [
      {
        story_id: 1,
        story_image:
          "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg",
      },
    ],
  },
  {
    user_id: 6,
    user_image: "https://randomuser.me/api/portraits/women/52.jpg",
    user_name: "Ajmal",
    active: false,
    stories: [
      {
        story_id: 1,
        story_image:
          "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg",
      },
    ],
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const ITEM_SIZE = 82;
const ITEMS_TO_SHOW = 5;
const CONTAINER_WIDTH = ITEM_SIZE * ITEMS_TO_SHOW;
export const CONTAINER_HEIGHT = ITEM_SIZE + 10;

const Stories = ({ followingsData }) => {
  const storiesRef = useRef(null);
  const [showStory, setShowStory] = useState(false);
  const ScrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: 10 }}>
      <Animated.FlatList
        keyExtractor={(data, index) => index.toString()}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          height: CONTAINER_HEIGHT + 5,
          addingHorizontal: 20,
          alignItems: "flex-start",
        }}
        snapToInterval={ITEM_SIZE}
        decelerationRate={"fast"}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: ScrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
            (index + 2) * ITEM_SIZE,
          ];
          const scale = ScrollX.interpolate({
            inputRange,
            outputRange: [0.9, 0.9, 0.9, 0.9, 0.9],
          });
          const translateY = ScrollX.interpolate({
            inputRange,
            outputRange: [0, 0, 0, 0, 0],
          });

          return (
            <PressEffect>
              <Pressable
                onPress={() => {
                  if (item.user_id == 0) {
                    navigation.navigate("AddStoryScreen");
                  } else {
                    navigation.navigate("ViewStoryScreen");
                  }
                }}
              >
                <Animated.View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    transform: [{ translateY }, { scale }],
                    width: ITEM_SIZE,
                    height: ITEM_SIZE,
                    marginVertical: 5,
                  }}
                >
                  <ImageBackground
                    source={{ uri: item.user_image }}
                    style={{
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    imageStyle={[
                      {
                        resizeMode: "cover",
                        borderRadius: 50,
                        backgroundColor: GlobalStyles.colors.gray,
                      },

                      item.user_id == 0
                        ? {} // Nếu là người đầu tiên, không có viền
                        : {
                            borderWidth: 3,
                            borderColor: GlobalStyles.colors.blue100,
                          },
                    ]}
                  >
                    <View
                      style={{
                        position: "absolute",
                        bottom: 5,
                        right: 5,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* {item.user_id == 0 && (
                        <Ionicons
                          name="add-circle"
                          size={25}
                          color={GlobalStyles.colors.magenta}
                        />
                      )} */}

                      {/* dấu hoạt động */}
                      {/* {item.active && (
                        <Ionicons
                          name="ellipse"
                          size={15}
                          color={GlobalStyles.colors.greenLight}
                        />
                      )} */}
                    </View>

                    {/* Dấu cộng nếu là story đầu tiên */}
                    {index === 0 && (
                      <View
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 8,
                          backgroundColor: "white",
                          borderRadius: 50,
                          padding: 0,
                        }}
                      >
                        <Ionicons name="add" size={20} color="black" />
                      </View>
                    )}
                  </ImageBackground>
                </Animated.View>
              </Pressable>
            </PressEffect>
          );
        }}
      />

      {showStory && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showStory}
          statusBarTranslucent={true}
          onRequestClose={() => {
            setShowStory(!showStory);
          }}
        >
          <ImageStory setShowStory={setShowStory} stories={data?.stories} />
        </Modal>
      )}
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: GlobalStyles.colors.cyan,
  },
});
