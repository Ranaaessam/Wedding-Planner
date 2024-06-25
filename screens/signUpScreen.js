import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { registerUser } from "../StateManagement/slices/SignUpSlice";

const SignUp = ({ navigation }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true);
  const [passwordShape, setPasswordShape] = useState("eye");
  const [confirmPasswordShape, setConfirmPasswordShape] = useState("eye");

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
    setPasswordShape((prevShape) =>
      prevShape === "eye" ? "eye-slash" : "eye"
    );
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
    setConfirmPasswordShape((prevShape) =>
      prevShape === "eye" ? "eye-slash" : "eye"
    );
  };

  const signUpValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    brideName: Yup.string().required("Bride name is required"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Repeat password is required"),
    budget: Yup.number()
      .min(15000, "Budget must be greater than 15000 Egyptian pounds")
      .required("Budget is required"),
    weddingDate: Yup.string().required("Wedding date is required"),
    location: Yup.string().required("Location is required"),
  });

  const dispatch = useDispatch();
  const handleSignUp = (values) => {
    const userInfo = {
      name: values.name,
      brideName: values.brideName,
      email: values.email,
      password: values.password,
      budget: values.budget,
      weddingDate: values.weddingDate,
      location: values.location,
    };
    dispatch(registerUser(userInfo));
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#4C134E" />
      <View style={styles.overlayContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Formik
          initialValues={{
            name: "",
            brideName: "",
            email: "",
            password: "",
            repeatPassword: "",
            budget: "",
            weddingDate: "",
            location: "",
          }}
          validationSchema={signUpValidationSchema}
          onSubmit={handleSignUp}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <ScrollView style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <FontAwesome name="user" size={24} color="gray" style={styles.inputIcon} />
                <TextInput
                  style={styles.inputs}
                  placeholder="Full Name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
              </View>
              {errors.name && touched.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
              <View style={styles.inputContainer}>
                <FontAwesome name="envelope" size={24} color="gray" style={styles.inputIcon} />
                <TextInput
                  style={styles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <View style={styles.inputContainer}>
                <FontAwesome name="money" size={24} color="gray" style={styles.inputIcon} />
                <TextInput
                  style={styles.inputs}
                  placeholder="Budget"
                  onChangeText={handleChange("budget")}
                  onBlur={handleBlur("budget")}
                  value={values.budget}
                />
              </View>
              {errors.budget && touched.budget && (
                <Text style={styles.errorText}>{errors.budget}</Text>
              )}
              <View style={styles.inputContainer}>
                <FontAwesome name="calendar" size={24} color="gray" style={styles.inputIcon} />
                <TextInput
                  style={styles.inputs}
                  placeholder="Wedding Date"
                  onChangeText={handleChange("weddingDate")}
                  onBlur={handleBlur("weddingDate")}
                  value={values.weddingDate}
                />
              </View>
              {errors.weddingDate && touched.weddingDate && (
                <Text style={styles.errorText}>{errors.weddingDate}</Text>
              )}
              <View style={styles.inputContainer}>
                <FontAwesome name="map-marker" size={24} color="gray" style={styles.inputIcon} />
                <TextInput
                  style={styles.inputs}
                  placeholder="Location"
                  onChangeText={handleChange("location")}
                  onBlur={handleBlur("location")}
                  value={values.location}
                />
              </View>
              {errors.location && touched.location && (
                <Text style={styles.errorText}>{errors.location}</Text>
              )}
              <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={24} color="gray" style={styles.inputIcon} />
                <TextInput
                  style={styles.inputs}
                  placeholder="Password"
                  secureTextEntry={passwordVisibility}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <FontAwesome name={passwordShape} size={24} color="gray" style={styles.eyeIcon} />
                </TouchableOpacity>
              </View>
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={24} color="gray" style={styles.inputIcon} />
                <TextInput
                  style={styles.inputs}
                  placeholder="Confirm Password"
                  secureTextEntry={confirmPasswordVisibility}
                  onChangeText={handleChange("repeatPassword")}
                  onBlur={handleBlur("repeatPassword")}
                  value={values.repeatPassword}
                />
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                  <FontAwesome name={confirmPasswordShape} size={24} color="gray" style={styles.eyeIcon} />
                </TouchableOpacity>
              </View>
              {errors.repeatPassword && touched.repeatPassword && (
                <Text style={styles.errorText}>{errors.repeatPassword}</Text>
              )}
              <TouchableOpacity
                style={[styles.buttonContainer, styles.signUpButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.loginRedirectButton]}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.loginRedirectText}>Already have an account?</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4C134E",
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 20,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#FFDFEB",
    borderRadius: 20,
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
    shadowColor: "#808080",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputs: {
    height: 45,
    flex: 1,
    marginLeft: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  eyeIcon: {
    right: 10,
  },
  buttonContainer: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 30,
  },
  signUpButton: {
    backgroundColor: "#4C134E",
    shadowColor: "#808080",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19,
  },
  signUpText: {
    color: "white",
    fontSize: 18,
    fontWeight:"bold"
  },
  loginRedirectButton: {
    backgroundColor: "transparent",
  },
  loginRedirectText: {
    color: "#FFF",
    fontSize:18,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom:30
  },
  errorText: {
    color: "red",
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default SignUp;
