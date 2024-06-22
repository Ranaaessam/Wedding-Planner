import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";

const SupplierCard = ({ name, imageUri , navigation }) => {
  return (
    <TouchableOpacity onPress={()=>{navigation.navigate('ListViewSuppliers')}}>
    <Card containerStyle={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
    </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    width: Dimensions.get("window").width * 0.29,
    height: Dimensions.get("window").height * 0.1,
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
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  name: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "start",
    padding: 5,
    width:"100%"

  },
  heartIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

export default SupplierCard;
