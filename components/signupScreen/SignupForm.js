import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as yup from "yup";
import Validator from "email-validator";

import validateEmail from "../../utils/validateEmail";
import Button from "../Button";
import InputField from "../InputField";
import { GlobalStyles } from "../../constants/Styles";

const SignupForm = ({ navigation }) => {
  const SignupFormSchema = yup.object().shape({
    email: yup.string().email().required("Email address is required."),
    password: yup.string().min(8, "Password must have a tleast 8 chracters."),
    username: yup
      .string()
      .required()
      .min(2, "Username must contain at least 2 chracters."),
  });

  const onSignup = async (email, password, username, fullname) => {
    try {
      const isEmailValid = await validateEmail(email);
      if (!isEmailValid) {
        Alert.alert("Invalid Email", "Please enter a valid email!");
        return;
      }
      const formData = {
        fullName: fullname,
        username: username,
        email: email,
        password: password,
        picturePath: "",
        friends: [],
        occupation: "",
        bio: "Edit Bio",
      };
      navigation.replace("LoginScreen");
    } catch (error) {
      console.log("catch:", error.response.data);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ fullname: "", username: "", email: "", password: "" }}
        onSubmit={(values) => {
          onSignup(
            values.email,
            values.password,
            values.username,
            values.fullname
          );
        }}
        validationSchema={SignupFormSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          errors,
        }) => (
          <>
            <InputField
              placeholder="Full Name"
              keyboardType="default"
              textContentType="username"
              onChangeText={handleChange("fullname")}
              onBlur={handleBlur("fullname")}
              value={values.fullname}
              iconName="person-outline"
              inValid={
                values.fullname.length === 0 || values.fullname.length > 1
              }
              containerStyle={{
                margin: 10,
                marginTop: 0,
                backgroundColor: GlobalStyles.colors.white,
                borderColor: GlobalStyles.colors.gray200,
              }}
            />
            <InputField
              placeholder="Username"
              keyboardType="default"
              textContentType="username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              iconName="person-outline"
              inValid={
                values.username.length === 0 || values.username.length > 1
              }
              containerStyle={{
                margin: 10,
                marginTop: 5,
                backgroundColor: GlobalStyles.colors.white,
                borderColor: GlobalStyles.colors.gray200,
              }}
            />
            <InputField
              placeholder="Email"
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              iconName="mail-outline"
              inValid={
                values.email.length < 1 || Validator.validate(values.email)
              }
              containerStyle={{
                margin: 10,
                marginTop: 5,
                backgroundColor: GlobalStyles.colors.white,
                borderColor: GlobalStyles.colors.gray200,
              }}
            />
            <InputField
              placeholder="Password"
              keyboardType="default"
              textContentType="password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              iconName="lock-closed-outline"
              passwordToggle={true}
              inValid={
                values.password.length === 0 || values.password.length > 7
              }
              containerStyle={{
                margin: 10,
                marginTop: 5,
                backgroundColor: GlobalStyles.colors.white,
                borderColor: GlobalStyles.colors.gray200,
              }}
            />
            <View style={{ margin: 10, marginTop: 15 }}>
              <Button
                title="Sign up"
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </View>

            <View style={styles.signupContainer}>
              <Text style={{ color: GlobalStyles.colors.black, fontSize: 15 }}>
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Text style={{ color: "#6BB0F5", fontSize: 15 }}> Log in</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 20,
    marginRight: 20,
  },
  InputField: {
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
    borderWidth: 1,
  },
  signupContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 5,
  },
});
