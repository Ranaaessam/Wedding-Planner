import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordShape, setPasswordShape] = useState(
    "https://tse1.mm.bing.net/th?id=OIP.PQmBVQC52i6lgjwMc1UyrAHaHa&pid=Api&P=0&h=220"
  );

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
    setPasswordShape((prevShape) =>
      prevShape ===
      "https://tse1.mm.bing.net/th?id=OIP.PQmBVQC52i6lgjwMc1UyrAHaHa&pid=Api&P=0&h=220"
        ? "https://tse4.mm.bing.net/th?id=OIP.nipf4cFT4fgxndi3gL1WXAAAAA&pid=Api&P=0&h=220"
        : "https://tse1.mm.bing.net/th?id=OIP.PQmBVQC52i6lgjwMc1UyrAHaHa&pid=Api&P=0&h=220"
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
  });

  const handleSignUp = (values) => {
    Alert.alert("Form Data", JSON.stringify(values, null, 2));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#DCDCDC" />
      <Image
        style={styles.bgImage}
        source={{
          uri: "https://images.unsplash.com/photo-1550005809-91ad75fb315f?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
      />
      <View style={styles.overlayContainer}>
        <Formik
          initialValues={{
            name: "",
            brideName: "",
            email: "",
            password: "",
            repeatPassword: "",
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
                <TextInput
                  style={styles.inputs}
                  placeholder="User name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                <Image
                  style={styles.inputIcon}
                  source={{
                    uri: "https://www.pngall.com/wp-content/uploads/15/Man-In-Suit-Transparent.png",
                  }}
                />
              </View>
              {errors.name && touched.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Bride name"
                  onChangeText={handleChange("brideName")}
                  onBlur={handleBlur("brideName")}
                  value={values.brideName}
                />
                <Image
                  style={styles.inputIcon}
                  source={{
                    uri: "https://pngimg.com/uploads/bride/bride_PNG19563.png",
                  }}
                />
              </View>
              {errors.brideName && touched.brideName && (
                <Text style={styles.errorText}>{errors.brideName}</Text>
              )}

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                <Image
                  style={styles.inputIcon}
                  source={{
                    uri: "https://img.icons8.com/flat_round/40/000000/secured-letter.png",
                  }}
                />
              </View>
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Password"
                  secureTextEntry={passwordVisibility}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Image
                    style={styles.inputIcon}
                    source={{ uri: passwordShape }}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Repeat Password"
                  secureTextEntry={passwordVisibility}
                  onChangeText={handleChange("repeatPassword")}
                  onBlur={handleBlur("repeatPassword")}
                  value={values.repeatPassword}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Image
                    style={styles.inputIcon}
                    source={{ uri: passwordShape }}
                  />
                </TouchableOpacity>
              </View>
              {errors.repeatPassword && touched.repeatPassword && (
                <Text style={styles.errorText}>{errors.repeatPassword}</Text>
              )}

              {/* <TouchableOpacity
                style={styles.btnByRegister}
                onPress={() => Alert.alert("Alert", "Button pressed")}
              >
                <Text style={styles.textByRegister}>
                  By registering on this App you confirm that you have read and
                  accept our policy
                </Text>
              </TouchableOpacity> */}

              <TouchableOpacity
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.loginText}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => Alert.alert("Alert", "Button pressed")}
              >
                <Text style={styles.btnText}>Have an account?</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
  },
  bgImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 20,
    marginTop: 200,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: "100%",
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  btnByRegister: {
    height: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
    backgroundColor: "transparent",
  },
  loginButton: {
    width: 270,
    marginHorizontal: "auto",
    backgroundColor: "#00b5ec",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19,
  },
  loginText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  textByRegister: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  errorText: {
    color: "red",
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
});
export default SignUp;
