import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import PlanIcon from "./planIcon";

const planIcons = [
  { id: "1", iconName: "checklist", name: "Checklist" },
  { id: "2", iconName: "credit-card", name: "Budget" },
  { id: "3", iconName: "person-add", name: "Guest" },
  { id: "4", iconName: "people", name: "Advice" },
  { id: "5", iconName: "gift", name: "Gift" },
];

const PlanList = () => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={planIcons}
      renderItem={({ item }) => (
        <PlanIcon iconName={item.iconName} name={item.name} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({});

export default PlanList;
