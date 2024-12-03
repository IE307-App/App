import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as yup from "yup";
import Validator from "email-validator";
import axios from 'axios';
import Button from "../Button";
import InputField from "../InputField";
import { GlobalStyles } from "../../constants/Styles";
import { serverLink } from "../../constants/server";

const SignupForm = ({ navigation }) => {
  // Custom email validation for the @gm.uit.edu.vn domain
  const emailValidation = yup
    .string()
    .email()
    .matches(/^[a-zA-Z0-9._%+-]+@gm\.uit\.edu\.vn$/, "Must be in the format: 'example@gm.uit.edu.vn'")
    .required("Email address is required.");

  const SignupFormSchema = yup.object().shape({
    email: emailValidation,
    password: yup.string().min(5, "Password must have at least 5 characters.").required("Password is required."),
    username: yup
      .string()
      .required("Username is required.")
      .min(2, "Username must contain at least 2 characters."),
    fullname: yup
      .string()
      .required("Full name is required.")
      .min(2, "Full name must contain at least 2 characters."),
  });

  const onSignup = async (email, password, username, fullname) => {
    try {
      const formData = {
        email: email,
        password: password,
        username: username,
        name: fullname, 
        imageURL: 'https://i.pinimg.com/236x/b1/13/a0/b113a01118e0286ce985ee01543422aa.jpg', 
        moblie: '', 
        userbio: 'Edit Bio',
        gender: '', 
      };
  
      const response = await axios.post(serverLink + "/auth/signup", formData);
      
      if (response.status === 201) {
        Alert.alert("Success", "You have successfully signed up!");
        navigation.replace("LoginScreen");
      }
    } catch (error) {
      console.log("Error during signup:", error.response?.data || error.message);
      Alert.alert("Signup failed", "Something went wrong. Please try again.");
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
          touched,
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
            {touched.fullname && errors.fullname && (
              <Text style={styles.errorText}>{errors.fullname}</Text>
            )}
            
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
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

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
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

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
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 22,
  },
});
