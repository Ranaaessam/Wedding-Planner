import React, { useEffect } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import FavouriteItem from "../../components/Favourites/favouriteItem";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAllFavourites } from "../../StateManagement/slices/FavouritesSlice";

const FavouriteCategoryScreen = ({ route }) => {
  const filteredFavourites = useSelector(
    (state) => state.favourites.filteredFavourites
  );
  const category = route.params.categoryName;

  const renderItem = ({ item }) => <FavouriteItem item={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.categoryText}>{category}s</Text>
      {filteredFavourites.length === 0 ? (
        <View style={styles.noFavouritesContainer}>
          <Text style={styles.noFavouritesText}>No Favourites Here</Text>
        </View>
      ) : (
        <FlatList
          data={filteredFavourites}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  categoryText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4C134E",
    marginBottom: 20,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  noFavouritesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noFavouritesText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4C134E",
    textAlign: "center",
  },
});

export default FavouriteCategoryScreen;
