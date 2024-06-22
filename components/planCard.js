import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
        Alert.alert(
          "Upcoming feature",
          "Look out for new advice tips coming in our next update!"
        );

        break;
      case "scrapbook":
        Alert.alert(
          "Upcoming feature",
          "Look out for new scrapbook notes coming in our next update!"
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

        <Text style={styles.text}>{name}</Text>
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
