import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "../screens/homeScreen";
import Cart from "../screens/Cart";
import Settings from "../screens/Settings";
import PlanScreen from "../screens/planScreen";
import Icon from "react-native-vector-icons/Ionicons";
import SearchScreen from "../screens/Search/searchScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNav from "./stackNav";
import { useTranslation } from "react-i18next";
import storage from "../Storage/storage";
import { useTheme ,themes} from "../ThemeContext";


const Tab = createBottomTabNavigator();

const BottomNav = () => {
  const [userId, setUserId] = useState(null);
  const [accountID, setAccountID] = useState(null);
  const { theme, toggleTheme } = useTheme();


  useEffect(() => {
    const fetchIDs = async () => {
      try {
        const fetchedUserId = await storage.load({ key: "userId" });
        const fetchedAccountID = await storage.load({ key: "accountId" });
        setUserId(fetchedUserId);
        setAccountID(fetchedAccountID);
      } catch (error) {
        console.error("Error loading IDs:", error);
      }
    };
    fetchIDs();
  }, []);

  const { t } = useTranslation();

  if (userId === null || accountID === null) {
    // Optionally, you can return a loading screen here until the IDs are loaded.
    return (
      // <View style={styles.loadingContainer}>
      //   <Text>Loading...</Text>
      // </View>
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.text }}>Loading...</Text>
    </View>
    );
  }

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
              <Text style={{ color: theme.extra, fontFamily: "Poppins" }}>
                  {t(route.name)}
                </Text>
              )}
            </View>
          );
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: theme.text,
        tabBarInactiveT9iintColor: theme.cart,
        tabBarStyle: {
          backgroundColor: theme.extra,
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 15,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Plan" component={PlanScreen} />
      <Tab.Screen
        name="Cart"
        component={Cart}
        initialParams={{ userId, accountID }} // Pass the IDs here
      />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomNav;
