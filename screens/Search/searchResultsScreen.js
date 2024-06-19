import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SearchCategories from "../../components/Search/searchCategories";
import SearchResultItem from "../../components/Search/searchResultItem";

const SearchResultsScreen = () => {
  const route = useRoute();
  const { searchQuery } = route.params;
  const results = [
    {
      name: "Venue 1",
      category: "Venue",
      location: "Haram, Al Jizah",
      image:
        "https://plus.unsplash.com/premium_photo-1673626578328-d72e1e75202b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Venue 2",
      category: "Venue",
      location: "Haram, Al Jizah",
      image:
        "https://plus.unsplash.com/premium_photo-1673626578328-d72e1e75202b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Photographer 1",
      category: "Photographer",
      location: "Haram, Al Jizah",
      image:
        "https://plus.unsplash.com/premium_photo-1673626578328-d72e1e75202b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Caterer 1",
      category: "Caterer",
      location: "Haram, Al Jizah",
      image:
        "https://plus.unsplash.com/premium_photo-1673626578328-d72e1e75202b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "DJ 1",
      category: "DJ",
      location: "Haram, Al Jizah",
      image:
        "https://plus.unsplash.com/premium_photo-1673626578328-d72e1e75202b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Makeup Artist 1",
      category: "Makeup Artist",
      location: "Haram, Al Jizah",
      image:
        "https://plus.unsplash.com/premium_photo-1673626578328-d72e1e75202b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const hasResults = results.length > 0;

  return (
    <View style={styles.container}>
      <SearchCategories />
      {hasResults ? (
        <ScrollView>
          {results.map((result, index) => (
            <SearchResultItem
              key={index}
              name={result.name}
              category={result.category}
              location={result.location}
              image={result.image}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noResultsContainer}>
          <Image
            source={require("../../assets/Images/EmptyList.png")}
            style={styles.noResultsImage}
          />
          <Text style={styles.noResultsText}>No results found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  noResultsContainer: {
    flex: 1,
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
