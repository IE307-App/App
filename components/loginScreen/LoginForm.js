import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as yup from "yup";
import Validator from "email-validator";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../Button";
import InputField from "../InputField";
import { GlobalStyles } from "../../constants/Styles";
import { AuthContext } from "../../store/auth-context";

const LoginForm = ({ navigation }) => {
  const authCtx = useContext(AuthContext);

  const LoginFormSchema = yup.object().shape({
    email: yup.string().email().required("Email address is required."),
    password: yup.string().min(8, "Password must have a tleast 8 chracters."),
  });

  async function onLogin(email, password) {
    try {
      authCtx.authenticate();
      console.log("Response data:", response.data);
    } catch (error) {
      Alert.alert("ERROR", error.response.data.msg);
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
              inValid={
                values.email.length < 1 || Validator.validate(values.email)
              }
              iconName="mail-outline"
              containerStyle={{
                margin: 10,

                backgroundColor: GlobalStyles.colors.white,
                borderColor: GlobalStyles.colors.gray200,
              }}
            />

            <InputField
              textContentType="password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Password"
              keyboardType="default"
              passwordToggle={true}
              inValid={
                values.password.length === 0 || values.password.length > 7
              }
              iconName="lock-closed-outline"
              containerStyle={{
                margin: 10,
                marginTop: 5,
                backgroundColor: GlobalStyles.colors.white,
                borderColor: GlobalStyles.colors.gray200,
                color: GlobalStyles.colors.black,
              }}
            />
            <TouchableOpacity>
              <Text
                style={{
                  color: GlobalStyles.colors.blue100,
                  fontSize: 15,
                  textAlign: "right",
                  marginVertical: 10,
                  marginRight: 15,
                  marginTop: 2,
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <View
              style={{
                margin: 10,
                marginBottom: 5,
                color: GlobalStyles.colors.white,
              }}
            >
              <Button
                title="Log in"
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </View>
            {/* <Text style={{color: 'red'}}>{errors.password}</Text>
                <Text style={{color: 'red'}}>{errors.email}</Text> */}

            <View style={styles.signupContainer}>
              <Text style={{ color: GlobalStyles.colors.black, fontSize: 15 }}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignupScreen")}
              >
                <Text style={{ color: "#6BB0F5", fontSize: 15 }}> Sign up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  wrapper: {
    // marginTop: 50,
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
