import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "../screens/homeScreen";
import Cart from "../screens/cartScreen";
import Settings from "../screens/Settings";
import PlanScreen from "../screens/planScreen";
import Icon from "react-native-vector-icons/Ionicons";
import SearchScreen from "../screens/Search/searchScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNav from "./stackNav";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Search") {
            iconName = "search-outline";
          } else if (route.name === "Plan") {
            iconName = "calendar-outline";
          } else if (route.name === "Cart") {
            iconName = "cart-outline";
          } else if (route.name === "Settings") {
            iconName = "settings-outline";
          }
          return (
            <View style={{ alignItems: "center" }}>
              <Icon name={iconName} color={color} size={size} />
              {focused && (
                <Text style={{ color: "#FF81AE", fontFamily: "Poppins" }}>
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
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Plan" component={PlanScreen} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default BottomNav;
