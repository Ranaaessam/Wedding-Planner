import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../components/progressBar";
import BudgetHistoryCard from "../components/budgetHistoryCard";
import { useTranslation } from "react-i18next";
import {
  fetchBudgetData,
  calculateTotalSpent,
  refundItem,
} from "../StateManagement/slices/BudgetSlice";
import { getUserProfile } from "../StateManagement/slices/ProfileSlice";
import storage from "../Storage/storage";
import { useTheme, themes } from "../ThemeContext";
import LoaderComponent from "../components/loader";

const BudgetScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.user);
  const budgetHistory = useSelector((state) => state.budget.budgetHistory);
  const totalBudget = userDetails?.budget;
  const amountSpent = useSelector((state) => state.budget.amountSpent);
  const budgetLeft = totalBudget - amountSpent;
  const { theme, toggleTheme } = useTheme();

  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = await storage.load({ key: "userId" });
        await dispatch(getUserProfile(userId));
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true before fetching data
        await dispatch(fetchBudgetData());
        await dispatch(calculateTotalSpent());
      } catch (error) {
        console.error("Error fetching budget data:", error);
      } finally {
        setLoading(false); // Set loading state to false after data is fetched
      }
    };

    fetchData();
  }, [dispatch]);

  const handleRefund = async (id) => {
    try {
      // Optimistic update: remove item from local state first
      const updatedBudgetHistory = budgetHistory.filter(
        (item) => item._id !== id
      );
      dispatch({
        type: "budget/setBudgetHistory",
        payload: updatedBudgetHistory,
      });

      // Make API call to perform refund
      await dispatch(refundItem(id));

      // Fetch updated data
      await dispatch(fetchBudgetData());
      await dispatch(calculateTotalSpent());
    } catch (error) {
      console.error("Error refunding item:", error);

      // Revert local state on error
      await dispatch(fetchBudgetData());
      await dispatch(calculateTotalSpent());
    }
  };

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ fontSize: 20, textAlign: "left", color: theme.text }}>
        {t("Left to spend")}
      </Text>
      <Text style={[styles.budget, { color: theme.text }]}>${budgetLeft}</Text>
      <ProgressBar progress={(amountSpent / totalBudget) * 100} height={25} />

      <View style={styles.progressRow}>
        <Text style={[styles.progressBudget, { color: theme.text }]}>$0</Text>
        <Text style={[styles.progressBudget, { color: theme.text }]}>
          ${totalBudget}
        </Text>
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
        />
        <Text style={{ textAlign: "left", color: theme.text }}>
          {t("Amount spent till now:")}
        </Text>
        <Text style={[styles.budgetSpent, { color: theme.text }]}>
          ${amountSpent}
        </Text>
      </View>
      <View style={{ paddingTop: 30 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "left",
            color: theme.text,
          }}
        >
          {t("History")}
        </Text>
        <View
          style={{
            height: 2,
            width: 70,
            backgroundColor: theme.extra,
            marginBottom: 2,
            marginTop: 6,
          }}
        />
      </View>
      <FlatList
        data={budgetHistory}
        renderItem={({ item }) => (
          <BudgetHistoryCard
            id={item._id}
            image={item.images[0]}
            type={item.type}
            name={item.name}
            price={item.price}
            navigation={navigation}
            onDelete={() => handleRefund(item._id)}
          />
        )}
        keyExtractor={(item) => item._id}
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
    height: "100%",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
