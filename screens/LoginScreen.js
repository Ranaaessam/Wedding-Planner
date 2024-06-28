import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../StateManagement/slices/ProfileSlice";
import { Snackbar } from "react-native-paper";

import storage from "../Storage/storage";
import API_URL from "../constants";
import { CommonActions } from "@react-navigation/native";

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(`${API_URL}/users/Login`, values);
      if (response.status === 200) {
        const userId = response.data.userId;
        const accountId = response.data.accountId;
        dispatch(getUserProfile(userId));
        storage.save({
          key: "token",
          data: response.headers["x-auth-token"],
        });
        storage.save({
          key: "userId",
          data: userId,
        });
        storage.save({
          key: "accountId",
          data: accountId,
        });

        // Navigate to home
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "HomeBottomNav" }],
          })
        );
      } else {
        console.log("Login Failed", response.data.message);
        Alert.alert("Invalid email or password");

        setVisible(true);
      }
    } catch (error) {
      console.log("Error", "An error occurred during login");
      console.log(error);

      setVisible(true);
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.main}>
        <Text style={styles.mainText}>Welcome back</Text>
      </View>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleLogin(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#aaaaaa"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#aaaaaa"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={togglePasswordVisibility}>
                <Icon
                  name={passwordVisible ? "eye-off" : "eye"}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signUpLink}
              onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signUpText}>
                Not a user? Click here to sign up
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <Snackbar
        style={{
          backgroundColor: "red",
          bottom: "10%",
        }}
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={Snackbar.DURATION_SHORT}
        action={{
          label: "Close",
          onPress: () => setVisible(false),
        }}>
        Invalid email or password. Please try again.
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#4C134E",
  },
  main: {
    flex: 1,
    backgroundColor: "#4C134E",
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    color: "white",
    fontSize: 35,
    fontFamily: "PoppinsSemiBold",
    marginTop: 20,
    letterSpacing: 2,
  },
  form: {
    flex: 2,
    backgroundColor: "#FFDFEB",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  input: {
    width: "100%",
    height: 60,
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
  button: {
    backgroundColor: "#4C134E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: "15%",
    width: "90%",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
    letterSpacing: 1.5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  signUpLink: {
    marginTop: 20,
  },
  signUpText: {
    color: "#4C134E",
    marginTop: 10,
    fontFamily: "PoppinsLight",
    fontSize: 14,
    letterSpacing: 1,
  },
});

export default LoginScreen;
