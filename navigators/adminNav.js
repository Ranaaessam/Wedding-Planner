// navigation/AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AdminDashboard from "../screens/Admin/Dashboard";

import UsersManagement from "../screens/Admin/UsersManagement";
import OrdersManagement from "../screens/Admin/OrdersManagement";
import SuppliersManagement from "../screens/Admin/SuppliersManagement";
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
      <Stack.Screen name="Orders Management" component={OrdersManagement} />
      <Stack.Screen
        name="Suppliers Management"
        component={SuppliersManagement}
      />
      <Stack.Screen
        name="Complaints Management"
        component={ComplaintsManagement}
      />
    </Stack.Navigator>
  );
};

export default AdminNav;
