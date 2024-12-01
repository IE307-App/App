import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as yup from "yup";
import Validator from "email-validator";
import axios from 'axios';
import Button from "../Button";
import InputField from "../InputField";
import { GlobalStyles } from "../../constants/Styles";
import { AuthContext } from "../../store/auth-context";
import { serverLink } from "../../constants/server";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApiUrl = serverLink;

const LoginForm = ({ navigation }) => {
  const authCtx = useContext(AuthContext);

  const LoginFormSchema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email address is required."),
    password: yup.string().min(5, "Password must have at least 5 characters.").required("Password is required."),
  });

  async function onLogin(email, password) {
    try {
      const response = await axios.post(ApiUrl + "/auth/signin", {
        email,
        password,
      });
  
      if (response.data.status) {
        const jwt = response.data.jwt;
        await AsyncStorage.setItem("token", jwt);
        const responseUserData = await axios.get(ApiUrl + "/api/users/profile", {
          headers: {
            Authorization: `Bearer ${jwt}`, // Thêm JWT vào header
          }
        });
        // Đăng nhập thành công
        authCtx.authenticate(responseUserData.data); 
        console.log("Response data:", responseUserData.data);
        console.log("Login success with token:", jwt);
      } else {
        Alert.alert("Login failed", "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("ERROR", error.response ? error.response.data.msg : "An error occurred");
    }
  }

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={LoginFormSchema}
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
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Email"
              keyboardType="email-address"
              textContentType="emailAddress"
              inValid={values.email.length < 1 || Validator.validate(values.email)}
              containerStyle={{ margin: 10 }}
            />
            {/* Hiển thị lỗi nếu có */}
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <InputField
              textContentType="password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Password"
              keyboardType="default"
              inValid={values.password.length === 0 || values.password.length > 7}
              containerStyle={{ margin: 10 }}
            />
            {/* Hiển thị lỗi nếu có */}
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity>
              <Text
                style={{
                  color: GlobalStyles.colors.blue100,
                  fontSize: 18,
                  textAlign: "center",
                  marginVertical: 15,
                }}
              >
                FORGOT PASSWORD?
              </Text>
            </TouchableOpacity>
            <View style={{ margin: 10, marginBottom: 0 }}>
              <Button
                title="Log in"
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </View>

            <View style={styles.signupContainer}>
              <Text style={{ color: GlobalStyles.colors.gray }}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignupScreen")}
              >
                <Text style={{ color: "#6BB0F5" }}> Sign up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // marginTop: 50,
  },
  inputField: {
    borderRadius: 4,
    borderColor: "gray",
    padding: 8,
    backgroundColor: "FAFAFA",
    marginBottom: 10,
    borderWidth: 1,
  },
  signupContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 22,
  },
});

export default LoginForm;
