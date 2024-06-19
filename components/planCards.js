import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import PlanCard from "../components/planCard"; // Ensure the correct import path

const planCards = [
  { id: 1, icon: "creditcard", name: "Budget", value: 0 },
  { id: 2, icon: "addusergroup", name: "Guest list", value: 0 },
  { id: 3, icon: "hearto", name: "Favorites", value: 0 },
  { id: 4, icon: "like2", name: "Booked", value: 0 },
  { id: 5, icon: "profile", name: "Advice", value: 0 },
  { id: 6, icon: "book", name: "Scrapbook", value: 0 },
];

const PlanCards = () => {
  return (
    <View style={{ marginTop: -90 }}>
      <FlatList
        data={planCards}
        renderItem={({ item }) => (
          <PlanCard icon={item.icon} name={item.name} value={item.value} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    height: "60%",
    paddingVertical: 90,
  },
});

export default PlanCards;
