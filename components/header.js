// Header.js
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import { useTheme, themes } from "../ThemeContext";

const Header = ({ imageUri, name1, name2 }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    // <View style={styles.headerContainer}>
    <View style={[styles.headerContainer, { backgroundColor: theme.extra }]}>
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.avatar}
        />
      </View>
      <Text style={[styles.name, { color: theme.text }]}>
        {name1} & {name2}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    // backgroundColor: "#FFDFEB",
    backgroundColor: themes.extra,
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: "#D3D3D3",
    borderRadius: 30,
    overflow: "hidden",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: themes.cart,
  },
  settingsIcon: {
    marginLeft: "auto",
  },
});

export default Header;
