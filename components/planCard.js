import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const PlanCard = ({ icon, name, value, navigation }) => {
  const { t } = useTranslation();
  let valueText = "";

  switch (name.toLowerCase()) {
    case "budget":
      valueText = `${value}% ${t("Spent")}`;
      break;
    case "guest list":
      valueText = `${value} ${t("Guests")}`;
      break;
    case "favorites":
      valueText = `${value} ${t("Saved")}`;
      break;
    case "booked":
      valueText = `${value} ${t("Suppliers")}`;
      break;
    case "to-do list":
      valueText = "";
      break;
    case "scrapbook":
      valueText = `${value} ${t("Notes")}`;
      break;
    default:
      valueText = `${value}`;
  }

  const handlePress = () => {
    switch (name.toLowerCase()) {
      case "budget":
        navigation.navigate("Budget");
        break;
      case "guest list":
        navigation.navigate("Guestlist");
        break;
      case "favorites":
        navigation.navigate("Favourites");
        break;
      case "booked":
        navigation.navigate("Cart");
        break;
      case "to-do list":
        navigation.navigate("CheckList")
        break;
      case "scrapbook":
        Alert.alert(
          t("Upcoming feature"),
          t("Look out for new scrapbook notes coming in our next update!"),
          [
            {
              text: t("OK"), // Custom text for the OK button
              onPress: () => console.log("OK Pressed"),
            },
          ],
          { cancelable: false }
        );
        break;
      default:
        break;
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.planCard}>
        <Icon name={icon} size={32} />

        <Text style={styles.text}>{t(name)}</Text>
        <Text style={styles.text2}>{valueText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  planCard: {
    height: "90%",
    width: 90,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    marginHorizontal: 15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
  },
  text2: {
    fontSize: 10,
  },
});

export default PlanCard;
