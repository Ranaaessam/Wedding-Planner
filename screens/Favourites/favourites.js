import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import FavouriteCategory from "../../components/Favourites/favouriteCategory";
import { useDispatch } from "react-redux";
import { getAllFavourites } from "../../StateManagement/slices/FavouritesSlice";

const categories = [
  "Venue",
  "Photographer",
  "Caterer",
  "Florist",
  "DJ",
  "Cake",
];

const Favourites = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFavourites());
  }, [dispatch]);
  return (
    <ScrollView style={styles.listStyle}>
      {categories.map((category, index) => (
        <FavouriteCategory key={index} category={category} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});

export default Favourites;
