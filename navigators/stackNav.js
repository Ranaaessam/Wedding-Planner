import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CheckList from "../screens/CheckList";
import SplashScreen from "../screens/splashScreen";
import OnboardingScreen from "../screens/onBoardingScreen";
import Home from "../screens/homeScreen";
import SignUp from "../screens/signUpScreen";
import Favourites from "../screens/Favourites/favourites";
import FavouriteCategoryScreen from "../screens/Favourites/favouriteCategoryScreen";
import ComplaintForm from "../screens/ComplaintForm";
import Cart from "../screens/Cart";
import ContactUs from "../screens/ContactUs";
import Settings from "../screens/Settings";
import ListviewSuppliers from "../screens/listviewSuppliers";
import SupplierDetails from "../screens/supplierDetails";
import PlanScreen from "../screens/planScreen";
import BudgetScreen from "../screens/budgetScreen";
import CheckListScreen from "../screens/checklistScreen";
import ProfileScreen from "../screens/profileScreen";
import ReservationScreen from "../screens/reservationScreen";
import SearchScreen from "../screens/Search/searchScreen";
import SearchResultsScreen from "../screens/Search/searchResultsScreen";
import GuestListScreen from "../screens/guestListScreen";
import ReviewScreen from "../screens/reviewScreen";
import LoginScreen from "../screens/LoginScreen";
import BottomNav from "./bottomNav";
import VenueCard from "../components/venueCard";
import WalletScreen from "../screens/Wallet";
import OTPScreen from "../screens/OTP";
import AdminNav from "../navigators/adminNav";
import { StyleSheet } from "react-native";
import ChatBot from "../screens/chatbot";

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
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
        name="OTP"
        component={OTPScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeBottomNav"
        component={BottomNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Complaint"
        component={ComplaintForm}
        options={{
          headerShown: false,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerTintColor: "#FF69B4", // Light pink back arrow
          headerStyle: { backgroundColor: "#FFDFEB" },
        }}
      />
      <Stack.Screen
        name="CheckList"
        component={CheckList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FavouriteCategoryScreen"
        component={FavouriteCategoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListViewSuppliers"
        component={ListviewSuppliers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SupplierDetails"
        component={SupplierDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Plan"
        component={PlanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VenueCard"
        component={VenueCard}
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
        name="Guestlist"
        component={GuestListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Reservation"
        component={ReservationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Review"
        component={ReviewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatBot"
        component={ChatBot}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Admin"
        component={AdminNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerStyle: {
    backgroundColor: "#f4511e",
  },
});

export default StackNav;
