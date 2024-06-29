import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Venues from "../components/venues";
import Suppliers from "../components/suppliers";
import Header from "../components/header";
import PlanList from "../components/planList";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getNames,
  getVenuesNearLocation,
} from "../StateManagement/slices/HomeSlice";
import storage from "../Storage/storage";
import { getUserProfile } from "../StateManagement/slices/ProfileSlice";
import { useTheme, themes } from "../ThemeContext";

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();

  const names = useSelector((state) => state.home.names);
  useEffect(() => {
    dispatch(getVenuesNearLocation());
    dispatch(getNames());
  });

  const data = [
    { key: "header" },
    { key: "venues" },
    { key: "suppliers" },
    { key: "plan" },
  ];
  //-----------------------------------
  const userDetails = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = await storage.load({ key: "userId" });
      dispatch(getUserProfile(userId));
    };
    fetchUserProfile();
  }, [dispatch]);
  const renderItem = ({ item }) => {
    switch (item.key) {
      case "header":
        return (
          <Header
            imageUri={userDetails?.image}
            name1={names["user1Name"]}
            name2={names["user2Name"]}
            navigation={navigation}
          />
        );
      case "venues":
        return (
          <View style={styles.section}>
            <Text style={[styles.header, { color: theme.text }]}>
              {t("Explore Venues near you")}
            </Text>

            <Venues navigation={navigation} />
          </View>
        );
      case "suppliers":
        return (
          <View style={styles.section}>
            <Text style={[styles.header, { color: theme.text }]}>
              {t("Suppliers")}
            </Text>
            <Suppliers navigation={navigation} />
          </View>
        );
      case "plan":
        return (
          <View style={styles.section}>
            <Text style={[styles.header, { color: theme.text }]}>
              {t("Plan")}
            </Text>
            <PlanList navigation={navigation} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        ListHeaderComponent={
          <View>
            {/* You can add additional header components here if needed */}
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: themes.cart,
  },
  container: {
    margin: 10,
  },
  header: {
    fontFamily: "Poppins",
    padding: 5,
    fontWeight: "600",
    fontSize: 18,
    textAlign: "left",
  },
  section: {
    paddingVertical: 8,
    paddingLeft: 10,
  },
});

export default HomeScreen;
