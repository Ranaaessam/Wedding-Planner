import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const FavouriteItem = ({ item }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    console.log(item);
  }, [item]);

  const toggleLike = () => {
    setLiked(!liked);
  };

  if (!item) {
    return null;
  }

  const imageUrl =
    item.images && item.images.length > 0 ? item.images[0] : null;
  const name = item.name || "No name available";
  const rate = item.rate || "No rate available";
  const price = item.price || "No price available";

  return (
    <View style={styles.card}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text>No Image</Text>
        </View>
      )}
      <View style={styles.details}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>⭐ : {rate}.0</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
    color: "#4C134E",
  },
  description: {
    fontSize: 14,
    color: "#4C134E",
    fontFamily: "PoppinsLight",
  },
  price: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: "#4C134E",
  },
  iconContainer: {
    alignItems: "center",
    padding: 10,
  },
});

export default FavouriteItem;
