import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../components/progressBar";
import BudgetHistoryCard from "../components/budgetHistoryCard";
import { useTranslation } from "react-i18next";
import {
  fetchBudgetData,
  calculateTotalSpent,
  refundItem,
  getUserBudget,
} from "../StateManagement/slices/BudgetSlice";

const BudgetScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.user);
  const budgetHistory = userDetails.budget;
  const totalBudget = useSelector((state) => state.budget.totalBudget);
  const amountSpent = useSelector((state) => state.budget.amountSpent);
  const budgetLeft = totalBudget - amountSpent;

  useEffect(() => {
    dispatch(fetchBudgetData());
    dispatch(calculateTotalSpent());
  }, [dispatch]);

  const handleRefund = (id) => {
    dispatch(refundItem(id)).then(() => {
      dispatch(calculateTotalSpent());
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, textAlign: "left" }}>
        {t("Left to spend")}
      </Text>
      <Text style={styles.budget}>${budgetLeft}</Text>
      <ProgressBar progress={(amountSpent / totalBudget) * 100} height={25} />
      <View style={styles.progressRow}>
        <Text style={styles.progressBudget}>$0</Text>
        <Text style={styles.progressBudget}>${totalBudget}</Text>
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
        <Text style={styles.budgetSpent}>${amountSpent}</Text>
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
        data={budgetHistory}
        renderItem={({ item }) => (
          <BudgetHistoryCard
            id={item.id}
            image={item.image}
            type={item.type}
            name={item.name}
            price={item.price}
            navigation={navigation}
            onDelete={handleRefund}
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
