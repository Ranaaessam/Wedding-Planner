import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const BudgetHistoryCard = ({ image, type, name, price }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.price}>${price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#e0e0df",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  type: {
    fontWeight: "bold",
    fontSize: 18,
  },
  name: {
    color: "grey",
    fontSize: 12,
  },
  price: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default BudgetHistoryCard;
