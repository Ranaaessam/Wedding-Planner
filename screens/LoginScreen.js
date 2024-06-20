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
import { useFonts } from "expo-font";

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  return (
    <View style={styles.background}>
      <View style={styles.main}>
        <Text style={styles.mainText}>Welcome back</Text>
      </View>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => Alert.alert("Submitted", JSON.stringify(values))}
      >
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
                onPress={togglePasswordVisibility}
              >
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
              onPress={() => navigation.navigate("MainApp")}
            >
              <Text style={styles.signUpText}>
                Not a user? Click here to sign up
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
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
    borderRadius: 30,
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
    width: "100%",
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
