import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/Styles";
import { USERS } from "../../data/users";
import moment from "moment";
function CommentCard({comment}) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: comment.userDto.imageURL }}
          style={{
            width: 50,
            height: 50,
            resizeMode: "cover",
            borderRadius: 50,
          }}
        />
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "white", marginBottom: 10 }}>
            {comment.userDto.name}
          </Text>
          <Text style={{  fontSize: 14, color: "white" }}>
            {comment.content}
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.6)",
              alignSelf: "flex-end",
            }}
          >
            {moment(comment.createdAt).format("HH:mm, DD/MM/YYYY")}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default CommentCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary300,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
