import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import CheckList from "./screens/CheckList";
import Login from "./screens/LoginScreen";
import SplashScreen from "./screens/splashScreen";
import OnboardingScreen from "./screens/onBoardingScreen";
import Home from "./screens/homeScreen";
import SignUp from "./screens/signUpScreen";
import Favourites from "./screens/Favourites/favourites";
import FavouriteCategoryScreen from "./screens/Favourites/favouriteCategoryScreen";
import ComplaintForm from "./screens/ComplaintForm";
import Cart from "./screens/cartScreen";
import ContactUs from "./screens/ContactUs";
import Settings from "./screens/Settings";
import ListviewSuppliers from "./screens/listviewSuppliers";
import SupplierDetails from "./screens/supplierDetails";
import PlanScreen from "./screens/planScreen";
import BudgetScreen from "./screens/budgetScreen";
import CheckListScreen from "./screens/checklistScreen";
import ProfileScreen from "./screens/profileScreen";
import Icon from "react-native-vector-icons/Ionicons";
import ReservationScreen from "./screens/reservationScreen";
import SearchScreen from "./screens/Search/searchScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchResultsScreen from "./screens/Search/searchResultsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      initialRouteName="Splash"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Search') {
            iconName = 'search-outline';
          } else if (route.name === 'Plan') {
            iconName = 'calendar-outline';
          } else if (route.name === 'Cart') {
            iconName = 'cart-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }
          return (
            <View style={{ alignItems: 'center' }}> 
              <Icon name={iconName} color={color} size={size} />
              {focused && (
                <Text style={{ color: '#FF81AE',fontFamily:'Poppins'}}>
                  {route.name}
                </Text>
              )}
            </View>
          );
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: "#FF81AE",
        tabBarInactiveTintColor: "#808080",
        tabBarStyle: {
          backgroundColor: "#FFDFEB",
          borderTopWidth: 0,
          height: 50,
          paddingBottom: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Plan" component={PlanScreen} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

});
