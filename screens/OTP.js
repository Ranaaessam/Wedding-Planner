import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP, resetOTPState } from "../StateManagement/slices/OTPSlice";

const OTPScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const dispatch = useDispatch();
  const { loading, error, otpVerified } = useSelector((state) => state.otp);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < otp.length - 1) {
      const nextInput = refs[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join("");
    dispatch(verifyOTP({ userId, otp: enteredOTP }));
  };

  React.useEffect(() => {
    if (otpVerified) {
      dispatch(resetOTPState());
      navigation.navigate("Login");
    }
  }, [otpVerified, dispatch, navigation]);

  const refs = otp.map(() => React.createRef());

  return (
    <View style={styles.container}>
      <Modal transparent={true} animationType="none" visible={loading}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={loading}
              size="large"
              color="#0000ff"
            />
          </View>
        </View>
      </Modal>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/11338/11338141.png",
        }}
        style={styles.img}
      />
      <Text style={styles.desc}>
        A 6 digit code has been sent to your registered email
      </Text>
      <Text style={styles.title}>Enter code to verify</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(input) => (refs[index] = input)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
            autoFocus={index === 0}
          />
        ))}
      </View>
      {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={styles.txt}>Didn't receive?</Text>
        <TouchableOpacity>
          <Text style={styles.resend}>Resend</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  img: {
    height: 150,
    width: 150,
    marginBottom: 30,
    marginRight: 25,
  },
  desc: {
    color: "grey",
    textAlign: "center",
    width: "80%",
  },
  txt: {
    color: "grey",
    marginRight: 10,
  },
  resend: {
    color: "#FF81AE",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderColor: "#999",
    borderBottomWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    color: "#333",
  },
  button: {
    backgroundColor: "#FF81AE",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OTPScreen;
