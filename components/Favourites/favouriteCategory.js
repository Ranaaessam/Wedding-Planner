import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const FavouriteCategory = ({ category }) => {
  const navigate = useNavigation();
  const onArrowPress = () => {
    navigate.navigate("FavouriteCategoryScreen", {
      categoryName: category,
      favouritesList: [
        {
          title: "Title",
          description: "Description",
          image: require("../../assets/Images/hall.jpg"),
          price: 100,
        },
        {
          title: "Title",
          description: "Description",
          image: require("../../assets/Images/hall.jpg"),
          price: 100,
        },
        {
          title: "Title",
          description: "Description",
          image: require("../../assets/Images/hall.jpg"),
          price: 100,
        },
        {
          title: "Title",
          description: "Description",
          image: require("../../assets/Images/hall.jpg"),
          price: 100,
        },
        {
          title: "Title",
          description: "Description",
          image: require("../../assets/Images/hall.jpg"),
          price: 100,
        },
      ],
    });
  };
  return (
    <View style={styles.categoryItem}>
      <Text style={styles.categoryText}>{category}</Text>
      <TouchableOpacity onPress={onArrowPress}>
        <Icon name="arrow-forward" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 20,
    height: 65,
    borderRadius: 10,
    backgroundColor: "#FFDFEB",
    opacity: 0.8,
  },
  categoryText: {
    flex: 1,
    fontFamily: "Poppins",
    fontSize: 18,
  },
});

export default FavouriteCategory;
