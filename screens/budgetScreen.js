import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ProgressBar from "../components/progressBar";
import BudgetHistoryCard from "../components/budgetHistoryCard";
import { useTranslation } from "react-i18next";

const BudgetScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const budgetHistoryData = [
    {
      id: "1",
      image: "https://i.ytimg.com/vi/rBLXCpC23CM/maxresdefault.jpg",
      type: "Venue",
      name: "Marriott Zamalek Hotel Hall",
      price: 2000,
    },
    {
      id: "2",
      image:
        "https://images2.minutemediacdn.com/image/upload/c_crop,w_2500,h_1406,x_0,y_84/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/images/GettyImages/mmsport/90min_en_international_web/01hnwknt4jays1ea0nzr.jpg",
      type: "Photographer",
      name: "Martin Odegaard",
      price: 1500,
    },
    {
      id: "3",
      image: "https://i.ytimg.com/vi/rBLXCpC23CM/maxresdefault.jpg",
      type: "Venue",
      name: "Marriott Zamalek Hotel Hall",
      price: 2000,
    },
    {
      id: "4",
      image: "https://i.ytimg.com/vi/rBLXCpC23CM/maxresdefault.jpg",
      type: "Venue",
      name: "Marriott Zamalek Hotel Hall",
      price: 2000,
    },
    {
      id: "5",
      image: "https://i.ytimg.com/vi/rBLXCpC23CM/maxresdefault.jpg",
      type: "Venue",
      name: "Marriott Zamalek Hotel Hall",
      price: 2000,
    },
    {
      id: "6",
      image: "https://i.ytimg.com/vi/rBLXCpC23CM/maxresdefault.jpg",
      type: "Venue",
      name: "Marriott Zamalek Hotel Hall",
      price: 2000,
    },
    {
      id: "7",
      image: "https://i.ytimg.com/vi/rBLXCpC23CM/maxresdefault.jpg",
      type: "Venue",
      name: "Marriott Zamalek Hotel Hall",
      price: 2000,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, textAlign: "left" }}>
        {t("Left to spend")}
      </Text>
      <Text style={styles.budget}>$8000</Text>
      <ProgressBar progress={20} height={25} />
      <View style={styles.progressRow}>
        <Text style={styles.progressBudget}>$0</Text>
        <Text style={styles.progressBudget}>$10000</Text>
      </View>
      <View
        style={{ flexDirection: "row", paddingTop: 20, alignItems: "center" }}
      >
        <View
          style={{
            borderRadius: 60,
            height: 10,
            width: 10,
            backgroundColor: "#FF81AE",
            marginRight: 10,
          }}
        ></View>
        <Text style={{ textAlign: "left" }}>{t("Amount spent till now:")}</Text>
        <Text style={styles.budgetSpent}>$2000</Text>
      </View>
      <View style={{ paddingTop: 30 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "left" }}>
          {t("History")}
        </Text>
        <View
          style={{
            height: 2,
            width: 70,
            backgroundColor: "#FF81AE",
            marginBottom: 2,
            marginTop: 6,
          }}
        ></View>
      </View>
      <FlatList
        data={budgetHistoryData}
        renderItem={({ item }) => (
          <BudgetHistoryCard
            image={item.image}
            type={item.type}
            name={item.name}
            price={item.price}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    marginBottom: 20,
  },
  budget: {
    paddingVertical: 12,
    fontSize: 28,
    fontWeight: "700",
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  progressBudget: {
    fontSize: 15,
    fontWeight: "500",
  },
  budgetSpent: {
    fontSize: 15,
    fontWeight: "500",
  },
});

export default BudgetScreen;
