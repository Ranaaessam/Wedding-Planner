import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import StackNav from "./navigators/stackNav";

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StackNav></StackNav>
        {/* <AdminNav></AdminNav> */}
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
