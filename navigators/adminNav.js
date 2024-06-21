// navigation/AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AdminDashboard from "../screens/Admin/Dashboard";

import UsersManagement from "../screens/Admin/UsersManagement";
import OrdersManagement from "../screens/Admin/OrdersManagement";
import SettingsManagement from "../screens/Admin/SettingsManagement";
import ComplaintsManagement from "../screens/Admin/ComplaintsManagement";

const Stack = createStackNavigator();

const AdminNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Users Management" component={UsersManagement} />
      <Stack.Screen name="OrdersManagement" component={OrdersManagement} />
      <Stack.Screen name="SettingsManagement" component={SettingsManagement} />
      <Stack.Screen
        name="ComplaintsManagement"
        component={ComplaintsManagement}
      />
    </Stack.Navigator>
  );
};

export default AdminNav;
