import { Image, Pressable, StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import { DEFAULT_DP, GlobalStyles } from "../../constants/Styles";

const ListCard = ({ userData, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        Platform.OS === "ios" && pressed ? styles.pressedIOS : {}
      }
      android_ripple={{
        color: "rgba(86, 86, 202,0.5)",
        foreground: true,
      }}
    >
      <View style={styles.cardContainer}>
        <Image
          style={styles.image}
          source={{
            uri: userData.imageURL || DEFAULT_DP,
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{userData.name}</Text>
          {/* Hiển thị một thông tin khác nếu cần, ví dụ như "bio" hoặc "location" */}
          <Text style={styles.secondaryText}>
            {userData.userbio || "No bio available"}
          </Text>
        </View>
      </View>
      <View style={styles.separator} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressedIOS: {
    opacity: 0.5,
  },
  cardContainer: {
    backgroundColor: GlobalStyles.colors.primary300,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderRadius: 30,
  },
  textContainer: {
    marginLeft: 10,
  },
  nameText: {
    fontWeight: "bold",
    color: "white",
  },
  secondaryText: {
    color: "rgba(255,255,255,0.6)",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: GlobalStyles.colors.primary,
  },
});

export default ListCard;
