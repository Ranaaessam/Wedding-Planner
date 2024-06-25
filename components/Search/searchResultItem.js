import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SearchResultItem = ({
  name,
  category,
  location,
  image,
  navigation,
  supplierId,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("SupplierDetails", { supplierId: supplierId });
      }}
    >
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.category}>{category}</Text>
          <View style={styles.locationContainer}>
            <Icon
              name="location-outline"
              size={16}
              color="#aaa"
              style={styles.locationIcon}
            />
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
  category: {
    fontSize: 14,
    color: "#888",
    fontFamily: "PoppinsLight",
    marginTop: 5,
  },
  locationContainer: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    marginRight: 5,
  },
  location: {
    fontSize: 12,
    color: "#aaa",
    fontFamily: "PoppinsLight",
  },
});

export default SearchResultItem;
