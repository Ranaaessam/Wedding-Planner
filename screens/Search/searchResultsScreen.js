import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import SearchCategories from "../../components/Search/searchCategories";
import SearchResultItem from "../../components/Search/searchResultItem";
import { filterResultsByCategory } from "../../StateManagement/slices/SearchSlice";

const SearchResultsScreen = ({ navigation }) => {
  const { filteredResults, status } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Initial dispatch for category: venue");
    dispatch(filterResultsByCategory({ category: "venue" }));
  }, [dispatch]);

  const hasResults = filteredResults.length > 0;

  return (
    <View style={styles.container}>
      <SearchCategories />
      {status === "loading" && <Text>Loading...</Text>}
      {!hasResults && (
        <View style={styles.noResultsContainer}>
          <Image
            source={require("../../assets/Images/EmptyList.png")}
            style={styles.noResultsImage}
          />
          <Text style={styles.noResultsText}>No results found</Text>
        </View>
      )}
      {hasResults && (
        <ScrollView>
          {filteredResults.map((result, index) => (
            <SearchResultItem
              key={index}
              supplierId={result._id}
              name={result.name}
              category={result.type}
              location={result.location}
              image={result.images[0]} // Ensure there's at least one image
              navigation={navigation}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  noResultsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsImage: {
    width: "100%",
    height: "70%",
    marginBottom: 20,
  },
  noResultsText: {
    fontSize: 24,
    fontFamily: "PoppinsBold",
    color: "#aaa",
    letterSpacing: 1,
  },
});

export default SearchResultsScreen;
