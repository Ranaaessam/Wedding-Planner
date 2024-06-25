import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { filterFavouritesByType } from "../../StateManagement/slices/FavouritesSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const FavouriteCategory = ({ category }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const onArrowPress = () => {
    dispatch(filterFavouritesByType({ category }));
    navigate.navigate("FavouriteCategoryScreen", {
      categoryName: category,
    });
  };
  return (
    <TouchableOpacity onPress={onArrowPress}>
      <View style={styles.categoryItem}>
        <Text style={styles.categoryText}>{t(category)}</Text>
        <Icon name="arrow-forward" size={20} color="#000" />
      </View>
    </TouchableOpacity>
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
    textAlign: "left",
  },
});

export default FavouriteCategory;
