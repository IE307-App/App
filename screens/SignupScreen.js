import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import React from "react";
import SignupForm from "../components/signupScreen/SignupForm";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "../constants/Styles";

const BACK_IMG = require("../assets/SignupScreenImage.jpg");
const { height, width } = Dimensions.get("window");

const SignupScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          margin: 0,
          marginTop: GlobalStyles.styles.windowHeight * 0.13,
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
            // color: "black",
          }}
        >
          SIGN UP
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.6)",
            marginBottom: 5,
          }}
        >
          Create your account
        </Text>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <SignupForm navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.white,
  },
});
