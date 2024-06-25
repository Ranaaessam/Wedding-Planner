import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import ContactUs from "./ContactUs";
import ProfileScreen from "./profileScreen.js";
import { useTranslation } from "react-i18next";
import i18n from "../i18n.js";

const SettingsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  // Default language
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [balance, setBalance] = useState(1234.56); // Mock balance

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    setDropdownVisible(false);
    Alert.alert(
      t("languageChanged"),
      "",
      [
        {
          text: t("OK"), // Custom text for the OK button
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: false }
    );
  };

  const handleLoggedOut = () => {
    Alert.alert(
      t("Logged out successfully!"),
      "",
      [
        {
          text: t("OK"), // Custom text for the OK button
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: false }
    );
    navigation.navigate("Home");
  };

  const data = [
    {
      id: "profile",
      icon: "user",
      text: t("profile"),
      onPress: () => {
        navigation.navigate("Profile");
      },
    },
    {
      id: "favorites",
      icon: "heart",
      text: t("favorites"),
      onPress: () => navigation.navigate("Favourites"),
    },
    {
      id: "wallet",
      icon: "money",
      text: t("My Wallet"),
      balance: `$${balance.toFixed(2)}`,
      onPress: () => navigation.navigate("Wallet"),
    },
    {
      id: "language",
      icon: "globe",
      text: selectedLanguage === "en" ? t("english") : t("arabic"),
      onPress: () => setDropdownVisible(!isDropdownVisible),
    },
    {
      id: "contactUs",
      icon: "envelope",
      text: t("contactUs"),
      onPress: () => navigation.navigate("ContactUs"),
    },
    {
      id: "complaints",
      icon: "exclamation-triangle",
      text: t("complaints"),
      onPress: () => navigation.navigate("Complaint"),
    },
    {
      id: "darkMode",
      icon: "adjust",
      text: t("darkMode"),
      onPress: () => setIsDarkMode((prev) => !prev),
    },
    {
      id: "logout",
      icon: "share",
      text: t("logout"),
      onPress: () => {
        handleLoggedOut();
      },
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.optionContainer} onPress={item.onPress}>
      <Icon name={item.icon} type="font-awesome" style={styles.icon} />
      <Text style={styles.optionText}>{item.text}</Text>
      {item.balance && <Text style={styles.balanceText}>{item.balance}</Text>}
      {item.id === "language" && <Icon name="caret-down" type="font-awesome" />}
      {item.id === "darkMode" && (
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode((x) => !x)}
          style={styles.switch}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="gear" type="font-awesome" size={24} />
        <Text style={styles.title}>{t("settings")}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDropdownVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => selectLanguage("en")}>
            <Text style={styles.dropdownItemText}>▫ {t("english")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => selectLanguage("ar")}>
            <Text style={styles.dropdownItemText}>▫ {t("arabic")}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 26,
    marginBottom: 18,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 24,
    color: "#4C134E",
    flex: 1,
    textAlign: "left",
  },
  balanceText: {
    fontSize: 18,
    color: "#4C134E",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdown: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    top: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
  },
  dropdownItemText: {
    fontSize: 18,
    color: "#4C134E",
  },
});

export default SettingsScreen;
