import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Venues from "../components/venues";
import Suppliers from "../components/suppliers";
import Header from "../components/header";
import PlanList from "../components/planList";
import BudgetScreen from "./budgetScreen";

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <SafeAreaView>
        <Header
          imageUri={
            "https://img.freepik.com/premium-vector/avatar-wedding-couple_24911-14448.jpg"
          }
          name={"Mr & Mrs"}
        />
        <View style={styles.container}>
          <Text style={styles.header}>Explore Venues near you</Text>
          <Venues navigation={navigation} />
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.header}>Suppliers</Text>
            <Suppliers navigation={navigation} />
          </View>
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.header}>Plan</Text>
            <PlanList navigation={navigation}></PlanList>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
