import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Path, Svg } from "react-native-svg";
import { GlobalStyles } from "../../constants/Styles";
import EMOJIS from "../../data/EMOJIS";

const LENGTH = 9; // Số lượng emoji
const ITEM_SIZE = GlobalStyles.styles.windowWidth / LENGTH;
const INPUT_HEIGHT = 14 + 20;
const WIDTH = GlobalStyles.styles.windowWidth;

const EmojiInput = ({ opacity = 1 }) => {
  const [text, setText] = useState("");
  const HEIGHT = ITEM_SIZE + INPUT_HEIGHT;

  const path = `
    M0,20
    Q${WIDTH * 0.4},0 ${WIDTH / 2},0
    Q${WIDTH * 0.6},0 ${WIDTH},20
    V${HEIGHT}
    H0
  Z
  `;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1 }}>
        {/* Nền SVG */}
        {/* <Svg
          style={{ position: "absolute", bottom: 0 }}
          width={WIDTH}
          height={HEIGHT}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        ></Svg> */}

        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            {Array.from({ length: LENGTH }).map((_, index) => (
              <View
                key={index}
                style={{
                  width: ITEM_SIZE,
                  height: ITEM_SIZE,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: ITEM_SIZE / 1.5 }}>
                  {EMOJIS[index]}
                </Text>
              </View>
            ))}
          </View>

          {/* Input Text */}
          <TextInput
            style={{
              color: "white",
              backgroundColor: GlobalStyles.colors.primary700,
              borderRadius: 23,
              borderWidth: 0.8, // Độ dày của viền
              borderColor: GlobalStyles.colors.gray,
              padding: 10,
              fontSize: 18,
              marginBottom: 20,
              paddingLeft: 20,
            }}
            placeholderTextColor="#bdbdbd"
            autoCapitalize="none"
            placeholder={"Send Message"}
            onChangeText={setText}
            value={text}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EmojiInput;

const styles = StyleSheet.create({});
