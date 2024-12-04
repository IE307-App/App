import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { AuthContext } from "../../store/auth-context";


const SettingsIcon = ({ color = "white", onPress }) => {
  const rotation = useSharedValue(0);

  const { logout } = useContext(AuthContext); 

  const rotateIcon = () => {
    rotation.value = withTiming(rotation.value + 360, { duration: 500 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const handlePress = () => {
    rotateIcon();
    logout();  
    onPress(); 
  };

  return (
    <Animated.View onTouchEnd={handlePress} style={[animatedStyle]}>
      <Ionicons name="log-out-outline" color={color} size={30} />
    </Animated.View>
  );
};

export default SettingsIcon;

const styles = StyleSheet.create({});
