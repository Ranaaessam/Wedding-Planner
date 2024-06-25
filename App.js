import React, { useEffect } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import StackNav from "./navigators/stackNav";
import AdminNav from "./navigators/adminNav";
import { Provider } from "react-redux";
import store from "./StateManagement/store";
import BottomNav from "./navigators/bottomNav";
import DeepLinking from "react-native-deep-linking";
import API_URL from "./constants";

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });

  // useEffect(() => {
  //   // Handle initial URL if app was opened with a deep link
  //   const handleInitialUrl = async () => {
  //     const url = await Linking.getInitialURL();
  //     if (url) {
  //       Linking.openURL(url);
  //     }
  //   };

  //   handleInitialUrl();

  //   // Add event listener to handle incoming URLs
  //   Linking.addEventListener('url', (event) => {
  //     Linking.openURL(event.url);
  //   });

  //   // Clean up event listener
  //   return () => {
  //     Linking.removeAllListeners('url');
  //   };
  // }, []);

  // const linking = {
  //   prefixes: [Linking.createURL('/')],
  //   config: {
  //     screens: {
  //       SignUp: 'users/Registration',
  //       // Add other screens if necessary
  //     },
  //   },
  // };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container}>
          {/* <StackNav /> */}
          <AdminNav />
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
