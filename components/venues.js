import React, { useState,useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import VenueCard from "./venueCard";
import axios from "axios";
import API_URL from "../constants";

const Venues = ({navigation}) => {
  const [venueData,setvenueData]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/suppliers/filter?type=venue`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setvenueData(data); 
      } catch (error) {
        console.error("Error fetching venue data:", error);
      }
    };

    fetchData();
  }, []);
  // const venueData = [
  //   {
  //     id: "1",
  //     name: "Kundalini",
  //     imageUri:
  //       "https://assets.cairo360.com/app/uploads/2023/05/02/Kundalini-768x512.jpeg",
  //   },
  //   {
  //     id: "2",
  //     name: "Al-Azhar Park",
  //     imageUri:
  //       "https://assets.cairo360.com/app/uploads/2023/05/02/Al-Azhar-Park-768x512.jpeg",
  //   },
  //   {
  //     id: "3",
  //     name: "Villa Makky",
  //     imageUri:
  //       "https://assets.cairo360.com/app/uploads/2023/05/02/Villa-Makky-768x768.jpeg",
  //   },
  //   {
  //     id: "4",
  //     name: "Nūt Boutique Farm Lodge",
  //     imageUri:
  //       "https://assets.cairo360.com/app/uploads/2023/05/02/Nu%CC%84t-Boutique-Farm-Lodge-768x512.jpeg",
  //   },
  //   {
  //     id: "5",
  //     name: "Muhammad Ali Pasha",
  //     imageUri:
  //       "https://assets.cairo360.com/app/uploads/2023/05/02/Image-via-Rowad-Modern-Engineering-768x512.jpeg",
  //   },
  //   {
  //     id: "6",
  //     name: "Fairmont Nile City Hotel",
  //     imageUri:
  //       "https://assets.cairo360.com/app/uploads/2023/05/02/fairmont_nile_city_hotel.png",
  //   },
  //   {
  //     id: "7",
  //     name: "Grand Nile Tower",
  //     imageUri:
  //       "https://assets.cairo360.com/app/uploads/2023/05/02/Weddings-640w.jpg",
  //   },
  // ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
    >
      {venueData.map((venue) => (
        <VenueCard key={venue._id} name={venue.name} imageUri={venue.images[0]} venueObj={venue} navigation={navigation}  />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Venues;
