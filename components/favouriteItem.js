import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const FavouriteItem = ({ item }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <TouchableOpacity onPress={toggleLike} style={styles.iconContainer}>
        <Icon
          name={liked ? "heart" : "heart-o"}
          type="font-awesome"
          color={liked ? "red" : "grey"}
        />
      </TouchableOpacity>
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
