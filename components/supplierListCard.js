import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SupplierCard = ({ image, name, location, rate }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.overlay}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.locationContainer}>
            <Image
              source={{
                uri: "https://img.icons8.com/ios-filled/50/ffffff/marker.png",
              }}
              style={styles.locationIcon}
            />
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
        <View style={styles.rateContainer}>
          <Ionicons name="star" size={16} color="grey" />
          <Text style={styles.rate}>{rate}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 300,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    height: "26%",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  location: {
    fontSize: 15,
    color: "lightgrey",
  },
  rateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rate: {
    fontSize: 16,
    color: "lightgrey",
    marginLeft: 5,
  },
});

export default SupplierCard;
