import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import FavouriteItem from "../components/favouriteItem";
import { useRoute } from "@react-navigation/native";

const FavouriteCategoryScreen = () => {
  const route = useRoute();
  const { favouritesList = [] } = route.params;

  const renderItem = ({ item }) => <FavouriteItem item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={favouritesList}
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
