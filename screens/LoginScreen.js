import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import LoginForm from "../components/loginScreen/LoginForm";
import { GlobalStyles } from "../constants/Styles";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          margin: 10,
          marginTop: GlobalStyles.styles.windowHeight * 0.19,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/Logo_UIT.png")}
          style={{
            width: 130,
            height: 130,
            resizeMode: "contain",
            marginTop: 5,
          }}
        />
        <Text
          style={{
            fontSize: 30,
            // fontWeight: "bold",
            color: "#3A5FCD",
          }}
        >
          LOG IN
        </Text>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <LoginForm navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
    // paddingTop: 50,
    // paddingHorizontal: 12,
  },
});
