import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Venues from "../components/venues";
import Suppliers from "../components/suppliers";
import Header from "../components/header";
import PlanIcon from "../components/planIcon";
import PlanList from "../components/planList";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Header
        imageUri={
          "https://img.freepik.com/premium-vector/avatar-wedding-couple_24911-14448.jpg"
        }
        name={"Mr & Mrs"}
      />
      <View style={styles.container}>
        <Text style={styles.header}>Explore Venues near you</Text>
        <Venues />
        <View style={{ paddingTop: 20 }}>
          <Text style={styles.header}>Suppliers</Text>
          <Suppliers />
        </View>
        <View style={{ paddingTop: 20 }}>
          <Text style={styles.header}>Plan</Text>
          <PlanList></PlanList>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  header: {
    padding: 5,
    fontWeight: "600",
  },
});

export default HomeScreen;