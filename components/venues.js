import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import VenueCard from "./venueCard";
import { useSelector } from "react-redux";

const Venues = ({ navigation }) => {
  const venueData = useSelector((state) => state.home.venues);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}>
      {venueData.map((venue) => (
        <VenueCard
          key={venue._id}
          name={venue.name}
          imageUri={venue.imageUri}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Venues;
