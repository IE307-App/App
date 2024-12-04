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
// https://github.com/birdwingo/react-native-instagram-stories?tab=readme-ov-file

const data = [
  {
    user_id: 0,
    user_image:
      "https://i.pinimg.com/474x/4d/7b/64/4d7b649354f648c90c75f0db9a8fb572.jpg",
    user_name: "Pham Vu",
    active: false,
    stories: [
      {
        story_id: 1,
        story_image:
          "https://i.pinimg.com/474x/4d/7b/64/4d7b649354f648c90c75f0db9a8fb572.jpg",
      },
    ],
  },
  {
    user_id: 1,
    user_image:
      "https://i.pinimg.com/474x/71/2a/72/712a725ea92a2ba21a81f98adfc95bd3.jpg",
    user_name: "Tan Anh",
    active: false,
    stories: [
      {
        story_id: 1,
        story_image:
          "https://i.pinimg.com/474x/03/f5/90/03f59014283e2544f0a4fc9425e81dc4.jpg",
      },
    ],
  },
  {
    user_id: 2,
    user_image:
      "https://i.pinimg.com/474x/37/d1/f4/37d1f41e1b6beb4b2d4a98c86514680b.jpg",
    user_name: "Ctuong",
    stories: [
      {
        story_id: 1,
        story_image:
          "https://i.pinimg.com/474x/22/bb/b4/22bbb4a05f032051d24f372b6c48bf0f.jpg",
      },
    ],
  },
  {
    user_id: 3,
    user_image:
      "https://i.pinimg.com/474x/0c/53/d5/0c53d5e9f9b6e6074a60956c58edf143.jpg",
    user_name: "Ttrang",
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
    user_image:
      "https://i.pinimg.com/474x/ff/6a/4e/ff6a4e588f337e5d45c999f826d85e16.jpg",
    user_name: "Ajmal",
    active: false,

    stories: [
      {
        story_id: 1,
        story_image:
          "https://i.pinimg.com/474x/40/12/16/4012166bf8090f0b2d3ae455b23cde84.jpg",
      },
    ],
  },
  {
    user_id: 5,
    user_image:
      "https://i.pinimg.com/474x/22/bb/b4/22bbb4a05f032051d24f372b6c48bf0f.jpg",
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
    user_image:
      "https://i.pinimg.com/474x/22/bb/b4/22bbb4a05f032051d24f372b6c48bf0f.jpg",
    user_name: "Ajmal",
    active: false,
    stories: [
      {
        story_id: 1,
        story_image:
          "https://i.pinimg.com/474x/22/bb/b4/22bbb4a05f032051d24f372b6c48bf0f.jpg",
      },
    ],
  },
];
const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const ITEM_SIZE = SCREEN_WIDTH / 5;
const TRANSLATE_VALUE = ITEM_SIZE / 2;
export const CONTAINER_HEIGHT = ITEM_SIZE + TRANSLATE_VALUE + 10;

const Stories = ({ followingsData }) => {
  const storiesRef = useRef(null);
  const [showStory, setShowStory] = useState(false);
  const ScrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  return (
    <View>
      <Animated.FlatList
        keyExtractor={(data, index) => index.toString()}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          height: CONTAINER_HEIGHT + 20,
          paddingHorizontal: SCREEN_WIDTH / 2 - ITEM_SIZE / 2,
        }}
        snapToInterval={ITEM_SIZE}
        decelerationRate={"fast"}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: ScrollX } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / ITEM_SIZE
          );
        }}
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
            outputRange: [0.8, 0.8, 1, 0.8, 0.8],
          });
          const translateY = ScrollX.interpolate({
            inputRange,
            outputRange: [
              0,
              TRANSLATE_VALUE / 2,
              TRANSLATE_VALUE,
              TRANSLATE_VALUE / 2,
              0,
            ],
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
                  // onPress={() => {
                  //   setShowStory(true);
                  // }}
                >
                  <ImageBackground
                    source={{ uri: item.user_image }}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    imageStyle={[
                      {
                        resizeMode: "cover",
                        borderRadius: 60,
                        backgroundColor: GlobalStyles.colors.gray,
                      },
                      item.user_id == 0 && {
                        borderWidth: 2,
                        borderColor: GlobalStyles.colors.magenta,
                      },
                    ]}
                  >
                    <View
                      style={{
                        width: "100%",
                        height: "100%",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                      }}
                    >
                      {item.user_id == 0 && (
                        <Ionicons
                          style={{}}
                          name="add-circle"
                          size={25}
                          color={GlobalStyles.colors.magenta}
                        />
                      )}
                      {item.active && (
                        <Ionicons
                          style={{ right: 3, bottom: 5 }}
                          name="ellipse"
                          size={15}
                          color={GlobalStyles.colors.greenLight}
                        />
                      )}
                    </View>
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
