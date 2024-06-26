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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { registerUser } from "../StateManagement/slices/SignUpSlice";
import { Snackbar } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const SignUp = ({ navigation }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true);
  const [passwordShape, setPasswordShape] = useState("eye");
  const [confirmPasswordShape, setConfirmPasswordShape] = useState("eye");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date, setFieldValue) => {
    const formattedDate = date.toISOString().split("T")[0];
    setFieldValue("weddingDate", formattedDate);
    hideDatePicker();
  };

  const signUpValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
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
      email: values.email,
      password: values.password,
      budget: values.budget,
      weddingDate: values.weddingDate,
      location: values.location,
    };
    dispatch(registerUser(userInfo));
    setSnackbarVisible(true);
    setTimeout(() => {
      navigation.navigate("Login", { isRegistrationSuccess: true });
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#4C134E" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlayContainer}
      >
        <Text style={styles.title}>Sign Up</Text>
        <Formik
          initialValues={{
            name: "",
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
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <ScrollView style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <FontAwesome
                  name="user"
                  size={24}
                  color="gray"
                  style={styles.inputIcon}
                />
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
                <FontAwesome
                  name="envelope"
                  size={24}
                  color="gray"
                  style={styles.inputIcon}
                />
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
                <FontAwesome
                  name="money"
                  size={24}
                  color="gray"
                  style={styles.inputIcon}
                />
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
                <TouchableOpacity onPress={showDatePicker}>
                  <FontAwesome
                    name="calendar"
                    size={24}
                    color="gray"
                    style={styles.inputIcon}
                  />
                </TouchableOpacity>

                <TextInput
                  style={styles.inputs}
                  placeholder="Wedding Date"
                  onFocus={showDatePicker}
                  value={values.weddingDate}
                  onChangeText={handleChange("weddingDate")}
                  onBlur={handleBlur("weddingDate")}
                />
              </View>
              {errors.weddingDate && touched.weddingDate && (
                <Text style={styles.errorText}>{errors.weddingDate}</Text>
              )}
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date) => handleConfirm(date, setFieldValue)}
                onCancel={hideDatePicker}
              />
              <View style={styles.inputContainer}>
                <FontAwesome
                  name="map-marker"
                  size={24}
                  color="gray"
                  style={styles.inputIcon}
                />
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
                <FontAwesome
                  name="lock"
                  size={24}
                  color="gray"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.inputs}
                  placeholder="Password"
                  secureTextEntry={passwordVisibility}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <FontAwesome
                    name={passwordShape}
                    size={24}
                    color="gray"
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <View style={styles.inputContainer}>
                <FontAwesome
                  name="lock"
                  size={24}
                  color="gray"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.inputs}
                  placeholder="Confirm Password"
                  secureTextEntry={confirmPasswordVisibility}
                  onChangeText={handleChange("repeatPassword")}
                  onBlur={handleBlur("repeatPassword")}
                  value={values.repeatPassword}
                />
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                  <FontAwesome
                    name={confirmPasswordShape}
                    size={24}
                    color="gray"
                    style={styles.eyeIcon}
                  />
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
                <Text style={styles.loginRedirectText}>
                  Already have an account?{" "}
                  <Text
                    style={{
                      color: "#ff81ae",
                      fontSize: 15,
                      textDecorationLine: "underline",
                    }}
                  >
                    Login now{" "}
                  </Text>
                </Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </Formik>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: 8,
            padding: "16px",
            fontFamily: "poppins",
            width: "80%",
            alignSelf: "center",
          }}
        >
          Registration successful
        </Snackbar>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4C134E",
    alignItems: "center",
  },
  overlayContainer: {
    width: "90%",
    height: "95%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 20,
    fontFamily: "Poppins",
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
    marginVertical: 10,
    shadowColor: "#808080",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputs: {
    fontFamily: "Poppins",
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
    fontFamily: "Poppins",
  },
  signUpButton: {
    backgroundColor: "#4C134E",
    shadowColor: "#808080",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19,
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
  },
  signUpText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginRedirectButton: {
    backgroundColor: "transparent",
    height: 100,
  },
  loginRedirectText: {
    color: "#4C134E",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 30,
    fontFamily: "Poppins",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    marginTop: -6,
    textAlign: "left",
    marginLeft: 15,
    fontFamily: "Poppins",
  },
});

export default SignUp;
