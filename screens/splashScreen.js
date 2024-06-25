import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Onboarding" }],
      });
    }, 5000);
    return () => clearTimeout(timeout); // Clear timeout on unmount
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/Lotties/lottie.json")}
        autoPlay
        loop={true}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFDFEB",
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
