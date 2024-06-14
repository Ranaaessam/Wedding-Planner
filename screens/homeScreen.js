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
          "https://www.fcbarcelona.com/photo-resources/2022/08/02/ae5252d1-b79b-4950-9e34-6e67fac09bb0/LeoMessi20092010_pic_fcb-arsenal62.jpg?width=1200&height=750"
        }
        name={"Mazen"}
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
