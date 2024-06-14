import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";

const VenueCard = ({ name, imageUri }) => {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.name}>{name}</Text>
        </View>
        <Icon name="heart" size={18} color="purple" style={styles.heartIcon} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    width: Dimensions.get("window").width * 0.29,
    height: Dimensions.get("window").height * 0.14,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  name: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "start",
    padding: 5,
    width: "70%",
  },
  heartIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

export default VenueCard;
