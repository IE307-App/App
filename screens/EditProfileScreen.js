import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { DEFAULT_DP, GlobalStyles } from "../constants/Styles";
import { Image } from "react-native";
import { AuthContext } from "../store/auth-context";
import CameraScreen from "./CameraScreen";
import { getFilename } from "../utils/helperFunctions";
import ProgressOverlay from "../components/ProgressOverlay";
import ErrorOverlay from "../components/ErrorOverlay";
import PressEffect from "../components/UI/PressEffect";
import userService from "../src/services/user.service";

const EditProfileScreen = ({ navigation, route }) => {
  const authCtx = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [userData, setUserData] = useState({
    name: authCtx.userData.name,
    userName: authCtx.userData.userName,
    bio: authCtx.userData.userbio,
    email: authCtx.userData.email,
    password: "",
    friends: "",
    picturePath: "",
    mobile: authCtx.userData.mobile,
  });

  const [uploading, setUploading] = useState({
    status: false,
    progress: 0,
    success: true,
  });

  async function updateBtnHandler() {
    const filenameData = getFilename(profilePic);

        const formData = {
            username: userData.userName,
            name: userData.name,
            email: userData.email,
            mobile: userData.mobile,
            userbio: userData.userbio,
        
        };

        if (!!profilePic) {
            formData.picture = {
                uri: profilePic,
                type: "image/" + filenameData.fileType,
                name: filenameData.name,
            };

            formData.imageURL = profilePic;
        }

        try {
            setUploading({ status: true, progress: 0, success: true });

            // Call the API to update user info
            await userService.updateUserInfo(formData);

            authCtx.updateUserData(formData);
          
            setTimeout(() => {
                setUploading({ status: false, progress: 0, success: true });
                navigation.goBack();
            }, 3000);
        } catch (error) {
            setUploading({ status: false, progress: 0, success: false });
            console.log(error.message);
        }

  }
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Edit Profile",
    });
  }, []);
  return (
    <View style={styles.container}>
      <CameraScreen
        showCamera={showCamera}
        setShowCamera={setShowCamera}
        getPost={setProfilePic}
        mode={"profilePic"}
      />
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 15,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View>
            <PressEffect>
              <Pressable
                onPress={() => {
                  setShowCamera(true);
                }}
              >
                <Image
                  source={{
                    uri: !!profilePic ? profilePic : DEFAULT_DP,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    resizeMode: "cover",
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    padding: 5,
                    backgroundColor: GlobalStyles.colors.primary500,
                    borderRadius: 50,
                  }}
                >
                  <Image
                    source={require("../assets/edit.png")}
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: "cover",
                      tintColor: "white",
                    }}
                  />
                </View>
              </Pressable>
            </PressEffect>
          </View>
        </View>
        <Text style={styles.title}>Full Name</Text>
        <InputField
          placeholder="Tan Anh"
          keyboardType="default"
          onChangeText={(text) => {
            setUserData((prevData) => {
              return { ...prevData, name: text };
            });
          }}
          value={userData.name}
          inValid={true}
        />

        <Text style={styles.title}>Username</Text>
        <InputField
          placeholder="username"
          keyboardType="default"
          onChangeText={(text) => {
            setUserData((prevData) => {
              return { ...prevData, userName: text };
            });
          }}
          value={userData.userName}
          inValid={true}
        />

        <Text style={styles.title}>Email</Text>
        <InputField
          placeholder="email@email.com"
          keyboardType="default"
          onChangeText={(text) => {
            setUserData((prevData) => {
              return { ...prevData, email: text };
            });
          }}
          value={userData.email}
          inValid={true}
        />

        {/* <Text style={styles.title}>Password</Text>
        <InputField
          placeholder="********"
          keyboardType="default"
          onChangeText={(text) => {
            setUserData((prevData) => {
              return { ...prevData, password: text };
            });
          }}
          value={userData.password}
          inValid={true}
        /> */}

        <Text style={styles.title}>Mobile</Text>
        <InputField
          placeholder="0388754761"
          keyboardType="default"
          onChangeText={(text) => {
            setUserData((prevData) => {
              return { ...prevData, mobile: text };
            });
          }}
          value={userData.mobile}
          inValid={true}
        />

        <Text style={styles.title}>Bio</Text>
        <InputField
          placeholder="Life is beautifull"
          keyboardType="default"
          onChangeText={(text) => {
            setUserData((prevData) => {
              return { ...prevData, userbio: text };
            });
          }}
          value={userData.userbio}
          inValid={true}
          multiline={true}
        />
      </ScrollView>
      <View style={{ margin: 10 }}>
        <Button title={"Update"} onPress={updateBtnHandler} />
      </View>
      {uploading.status && (
        <>
          {uploading.success ? (
            <ProgressOverlay
              title={"Uploading"}
              progress={uploading.progress}
            />
          ) : (
            <ErrorOverlay
              message={"Uploading Failed"}
              onClose={() => {
                setUploading({ status: false, progress: 0, success: true });
              }}
            />
          )}
        </>
      )}
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    margin: 15,
    marginBottom: 5,
  },
});
