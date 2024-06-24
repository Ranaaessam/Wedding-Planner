import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import FavouriteItem from "../../components/Favourites/favouriteItem";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const FavouriteCategoryScreen = () => {
  const filteredFavourites = useSelector(
    (state) => state.favourites.filteredFavourites
  );

  const renderItem = ({ item }) => <FavouriteItem item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredFavourites}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default FavouriteCategoryScreen;
