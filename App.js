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
import Cart from "./screens/cartScreen";
import PlanScreen from "./screens/planScreen";
import BudgetScreen from "./screens/budgetScreen";
import Checklist from "./screens/CheckList";
import CheckListScreen from "./screens/checklistScreen";
import ProfileScreen from "./screens/profileScreen";

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
        <Stack.Navigator initialRouteName="Profile">
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
            name="ComplaintForm"
            component={ComplaintForm}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ headerShown: false }}
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
          <Stack.Screen
            name="Plan"
            component={PlanScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Budget"
            component={BudgetScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Checklists"
            component={CheckListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
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
  cartheaderStyle: {
    backgroundColor: "white",
    height: 80,
  },

  cartheaderTitleStyle: {
    fontFamily: "Poppins",
    fontSize: 30,
    letterSpacing: 0.9,
    color: "#FF81AE",
    fontWeight: "bold",
  },
});
