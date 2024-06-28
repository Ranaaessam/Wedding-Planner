import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme ,themes} from "../ThemeContext";


const { width: screenWidth } = Dimensions.get("window");


const WalletScreen = () => {
  const { t } = useTranslation();
const { theme, toggleTheme } = useTheme();
  
  const [balance, setBalance] = useState(1234.56);

  return (
    // <View style={styles.container}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("Wallet")}</Text>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>{t("Current Balance")}</Text>
        <Text style={styles.balanceValue}>${balance.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f0f0f0",
    backgroundColor:themes.cart,
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    width: "100%",
    height: 60,
    backgroundColor: "#4C134E",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  balanceContainer: {
    backgroundColor: "white",
    width: screenWidth * 0.9,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
    elevation: 5,
  },
  balanceLabel: {
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4C134E",
  },
  addButton: {
    backgroundColor: "#4C134E",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    elevation: 3,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WalletScreen;
