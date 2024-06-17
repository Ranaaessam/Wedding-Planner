import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CheckList from "./screens/CheckList";
import LoginScreen from "./screens/LoginScreen";
import SplashScreen from "./screens/splashScreen";
import OnboardingScreen from "./screens/onBoardingScreen";
import HomeScreen from "./screens/homeScreen";
import signUpScreen from "./screens/signUpScreen";
import Favourites from "./screens/favourites";
import { useFonts } from "expo-font";
import FavouriteCategoryScreen from "./screens/favouriteCategoryScreen";
import ComplaintForm from "./screens/ComplaintForm";
import Cart from "./screens/cartScreen"
import Settings from "./screens/Settings"

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="Settings">
          {/* Uncomment and add your other screens as needed */}
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={signUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CheckList"
            component={CheckList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Complaint"
            component={ComplaintForm}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ headerShown: false }}

          />
           <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerTintColor: "white",
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: styles.headerStyle,
            }}

          />
          <Stack.Screen
            name="Favourites"
            component={Favourites}
            options={{
              headerTintColor: "white",
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: styles.headerStyle,
            }}
          />
          <Stack.Screen
            name="FavouriteCategoryScreen"
            component={FavouriteCategoryScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: "#FF81AE",
    height: 100,
  },

  headerTitleStyle: {
    fontFamily: "Poppins",
    fontSize: 20,
    letterSpacing: 0.9,
  },

});
