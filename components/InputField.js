import {
  Dimensions,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Validator from "email-validator";
import React, { useRef, useState } from "react";
import { GlobalStyles } from "../constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import PressEffect from "./UI/PressEffect";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

const InputField = ({
  onChangeText,
  onBlur,
  onFocus,
  value,
  placeholder,
  keyboardType,
  textContentType,
  inValid,
  search,
  autoFocus,
  multiline,
  containerStyle,
  iconName,
  iconColor = "#bdbdbd",
  passwordToggle,
}) => {
  const txtRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setSecureText((prev) => !prev);
  };

  return (
    <View
      style={[
        styles.inputField,
        {
          borderColor: inValid
            ? GlobalStyles.colors.primary500
            : GlobalStyles.colors.red,
        },
        containerStyle,
        isFocused && {
          borderWidth: 1,
          borderColor: GlobalStyles.colors.purple,
        },
      ]}
    >
      {/* Hiển thị icon nếu có iconName */}
      {iconName && (
        <View style={{ marginHorizontal: 5 }}>
          <Ionicons name={iconName} size={25} color={iconColor} />
        </View>
      )}

      {search && (
        <View style={{ marginHorizontal: 5 }}>
          <Ionicons
            name="search-outline"
            size={25}
            color={GlobalStyles.colors.purple}
          />
        </View>
      )}
      <View style={{ flex: 1 }}>
        <TextInput
          style={{ color: "black", marginLeft: 5 }}
          ref={txtRef}
          placeholderTextColor="#bdbdbd"
          autoCapitalize="none"
          placeholder={placeholder}
          keyboardType={keyboardType}
          textContentType={textContentType}
          secureTextEntry={passwordToggle && !isPasswordVisible}
          onChangeText={onChangeText}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus && onFocus(e);
          }}
          value={value}
          autoFocus={autoFocus}
          multiline={multiline}
        />
      </View>

      {search && isFocused && (
        <PressEffect>
          <Animated.View
            entering={ZoomIn}
            exiting={ZoomOut}
            onTouchEnd={() => {
              onChangeText("");
              if (txtRef.current) {
                txtRef.current.blur();
              }
            }}
            style={{
              marginHorizontal: 5,
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Ionicons
              name="close"
              size={25}
              color={GlobalStyles.colors.purple}
            />
          </Animated.View>
        </PressEffect>
      )}
      {passwordToggle && (
        <Pressable
          onPress={togglePasswordVisibility}
          style={{ marginHorizontal: 5 }}
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={25}
            color={GlobalStyles.colors.gray200}
          />
        </Pressable>
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary500,
    padding: 15,
  },
});
