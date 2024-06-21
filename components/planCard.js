import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const PlanCard = ({ icon, name, value, navigation }) => {
  let valueText = "";

  switch (name.toLowerCase()) {
    case "budget":
      valueText = `${value}% Spent`;
      break;
    case "guest list":
      valueText = `${value} Guests`;
      break;
    case "favorites":
      valueText = `${value} Saved`;
      break;
    case "booked":
      valueText = `${value} Suppliers`;
      break;
    case "advice":
      valueText = `${value} Saved`;
      break;
    case "scrapbook":
      valueText = `${value} Notes`;
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
      case "advice":
        () => {};

        break;
      case "scrapbook":
        () => {};
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.planCard}>
      <TouchableOpacity onPress={handlePress}>
        <Icon name={icon} size={32} />
      </TouchableOpacity>

      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text2}>{valueText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  planCard: {
    height: "100%",
    width: "25%",
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
