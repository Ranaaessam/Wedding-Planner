import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import PlanIcon from "./planIcon";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";

const planIcons = [
  { id: "1", iconName: "checklist", name: "Checklist" },
  { id: "2", iconName: "credit-card", name: "Budget" },
  { id: "3", iconName: "person-add", name: "Guest" },
  { id: "4", iconName: "people", name: "Advice" },
  { id: "5", iconName: "gift", name: "Gift" },
];

const PlanList = ({ navigation }) => {
  const { t } = useTranslation();
  return (
    <FlatList
      style={{ marginLeft: 20 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={planIcons}
      renderItem={({ item }) => (
        <PlanIcon
          iconName={item.iconName}
          name={item.name}
          navigation={navigation}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({});

export default PlanList;
