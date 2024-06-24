import React, { useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Venues from "../components/venues";
import Suppliers from "../components/suppliers";
import Header from "../components/header";
import PlanList from "../components/planList";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { getVenuesNearLocation } from "../StateManagement/slices/HomeSlice";

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVenuesNearLocation());
  }, [dispatch]);

  const data = [
    { key: "header" },
    { key: "venues" },
    { key: "suppliers" },
    { key: "plan" },
  ];

  const renderItem = ({ item }) => {
    switch (item.key) {
      case "header":
        return (
          <Header
            imageUri={
              "https://i.pinimg.com/564x/aa/10/8b/aa108b7ea07eab894954153872bf4863.jpg"
            }
            name={t("Mr & Mrs")}
            navigation={navigation}
          />
        );
      case "venues":
        return (
          <View style={styles.section}>
            <Text style={styles.header}>{t("Explore Venues near you")}</Text>
            <Venues navigation={navigation} />
          </View>
        );
      case "suppliers":
        return (
          <View style={styles.section}>
            <Text style={styles.header}>{t("Suppliers")}</Text>
            <Suppliers navigation={navigation} />
          </View>
        );
      case "plan":
        return (
          <View style={styles.section}>
            <Text style={styles.header}>{t("Plan")}</Text>
            <PlanList navigation={navigation} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
  },
  container: {
    margin: 10,
  },
  header: {
    padding: 5,
    fontWeight: "600",
    fontSize: 18,
  },
  section: {
    paddingVertical: 10,
  },
});

export default HomeScreen;
