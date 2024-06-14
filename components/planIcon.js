import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Octicons";

const PlanIcon = ({ iconName, name }) => {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Icon name={iconName} size={25} color="#000" />
      </View>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 5,
    marginHorizontal: 9,
  },
  circle: {
    height: 50,
    width: 50,
    backgroundColor: "#FFDFEB",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PlanIcon;
