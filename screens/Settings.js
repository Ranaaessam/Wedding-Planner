// SettingsScreen.js
import React, { useEffect, useState, useCallback } from "react";
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
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import ContactUs from "./ContactUs";
import ProfileScreen from "./profileScreen.js";
import storage from "../Storage/storage.js";
import { useTheme, themes } from "../ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { getWalletVal } from "../StateManagement/slices/SettingsSlice.js";
import { useFocusEffect } from "@react-navigation/native";

const SettingsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const balance = useSelector((state) => state.settings.wallet);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getWalletVal());
    }, [dispatch])
  );

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    setDropdownVisible(false);
    Alert.alert(
      t("languageChanged"),
      "",
      [
        {
          text: t("OK"),
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
          onPress: async () => {
            await storage.remove({ key: "accountId" });
            await storage.remove({ key: "userId" });
            await storage.remove({ key: "token" });
            navigation.navigate("Login");
          },
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
      onPress: () => toggleTheme(),
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
    <TouchableOpacity
      style={[styles.optionContainer, { backgroundColor: theme.card }]}
      onPress={item.onPress}>
      <Icon
        name={item.icon}
        type="font-awesome"
        color={theme.text}
        style={styles.icon}
      />
      <Text style={[styles.optionText, { color: theme.text }]}>
        {item.text}
      </Text>
      {item.balance && (
        <Text style={[styles.balanceText, { color: theme.text }]}>
          {item.balance}
        </Text>
      )}
      {item.id === "language" && (
        <Icon name="caret-down" type="font-awesome" color={theme.text} />
      )}
      {item.id === "darkMode" && (
        <Switch
          value={theme === themes.dark}
          onValueChange={toggleTheme}
          style={styles.switch}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Icon name="gear" type="font-awesome" size={24} color={theme.text} />
        <Text style={[styles.title, { color: theme.text }]}>
          {t("settings")}
        </Text>
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
        <View style={[styles.dropdown, { backgroundColor: theme.card }]}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => selectLanguage("en")}>
            <Text style={[styles.dropdownItemText, { color: theme.text }]}>
              ▫ {t("english")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => selectLanguage("ar")}>
            <Text style={[styles.dropdownItemText, { color: theme.text }]}>
              ▫ {t("arabic")}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    marginLeft: 10,
  },
  balanceText: {
    marginLeft: "auto",
    fontSize: 16,
  },
  switch: {
    marginLeft: "auto",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dropdown: {
    position: "absolute",
    top: "30%",
    left: "10%",
    right: "10%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
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
  },
});

export default SettingsScreen;
