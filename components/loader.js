import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

const LoaderComponent = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF81AE" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: 30,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoaderComponent;
