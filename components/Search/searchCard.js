import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";

const SearchCard = ({ title, imageUrl,navigation }) => {
  return (
    <TouchableOpacity onPress={()=>{navigation.navigate('SupplierDetails')}}>
    <View style={styles.card}>
      <ImageBackground source={{ uri: imageUrl }} style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </ImageBackground>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginRight: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    height: 150,
    padding: 10,
  },
  title: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "white",
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
  },
});

export default SearchCard;
