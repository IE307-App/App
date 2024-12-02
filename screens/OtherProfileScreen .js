import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import ProfileHead from "../components/userProfileScreen/ProfileHead";
import ProfileBody from "../components/userProfileScreen/ProfileBody";
import { GlobalStyles } from "../constants/Styles";
import Header from "../components/userProfileScreen/Header";
import HeaderSvg from "../components/userProfileScreen/HeaderSVG";
import OtherProfileHead from "../components/userProfileScreen/OtherProfileHead";
const OtherProfileScreen = ({ navigation, route  }) => {
  const { user } = route.params; 
  useEffect(() => {
    console.log("User data", user);
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={styles.container}>
      {/* <HeaderSvg /> */}
      <Header />
      <OtherProfileHead userData={user} />
      <ProfileBody />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
  },
});

export default OtherProfileScreen;
