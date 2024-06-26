import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import SearchBar from "../../components/Search/searchBar";
import SearchCard from "../../components/Search/searchCard";
import { useTranslation } from "react-i18next";
const VenueTypes = [
  {
    id: 1,
    title: "Venue",
    imageUrl:
      "https://media.istockphoto.com/id/175559502/photo/classy-wedding-setting.jpg?s=1024x1024&w=is&k=20&c=516lnkUiHkwK4YVRRgcj7fu6ZiViyLTh2pDsRd-nZss=",
  },
  {
    id: 2,
    title: "Photographer",
    imageUrl:
      "https://media.istockphoto.com/id/485818676/photo/holding-a-full-frame-camera.webp?b=1&s=170667a&w=0&k=20&c=zypw-ho8ME1kwi5gbqqVw9GWdyNAYQ6IX6ZNMLqLmTU=",
  },
  {
    id: 3,
    title: "Make-up Artist",
    imageUrl:
      "https://media.istockphoto.com/id/624945444/photo/young-bridesmaid-holding-the-palette-of-blusher.webp?b=1&s=170667a&w=0&k=20&c=E0kIPTru_H08vPNU8EqsZ7WeSnEnrRWTodORh7fOJIU=",
  },
];

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const{t}= useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <SearchBar></SearchBar>
        {/* <Text style={styles.headerStyle}> Explore Popular Suppliers </Text> */}
        <Text style={styles.headerStyle}>{t("Explore Popular Suppliers")}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.venueTypes}>
          {VenueTypes.map((venue) => (
            <SearchCard
              key={venue.id}
              // title={venue.title}
              title={t(`${venue.title}`)}
              imageUrl={venue.imageUrl}
              navigation={navigation}></SearchCard>
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
    marginVertical: 20,
    marginLeft: 30,
  },
});

export default SearchScreen;
