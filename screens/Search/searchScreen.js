import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import SearchBar from "../../components/Search/searchBar";
import SearchCard from "../../components/Search/searchCard";
const VenueTypes = [
  {
    id: 1,
    title: "Hotel",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1682089297123-85459da8036b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Outdoor",
    imageUrl:
      "https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Outdoor",
    imageUrl:
      "https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <SearchBar></SearchBar>
        <Text style={styles.headerStyle}> Popular Venue Types </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator="false"
          style={styles.venueTypes}
        >
          {VenueTypes.map((venue) => (
            <SearchCard
              key={venue.id}
              title={venue.title}
              imageUrl={venue.imageUrl}
            ></SearchCard>
          ))}
        </ScrollView>
        <Text style={styles.headerStyle}> Explore Popular Suppliers </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator="false"
          style={styles.venueTypes}
        >
          {VenueTypes.map((venue) => (
            <SearchCard
              key={venue.id}
              title={venue.title}
              imageUrl={venue.imageUrl}
            ></SearchCard>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 182, 193, 0.1)",
  },
  headerStyle: {
    fontFamily: "Poppins",
    fontSize: 19,
    letterSpacing: 1,
    width: "88%",
    marginHorizontal: 25,
    marginTop: "10%",
    color: "#4C134E",
  },
  venueTypes: {
    marginVertical: 10,
    marginLeft: 30,
  },
});

export default SearchScreen;
