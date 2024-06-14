import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import VenueCard from "./venueCard";

const Venues = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <VenueCard
        name="Awesome Venue"
        imageUri="https://www.fcbarcelona.com/photo-resources/2022/08/02/ae5252d1-b79b-4950-9e34-6e67fac09bb0/LeoMessi20092010_pic_fcb-arsenal62.jpg?width=1200&height=750"
      />
      <VenueCard
        name="Another Venue"
        imageUri="https://www.fcbarcelona.com/photo-resources/2022/08/02/ae5252d1-b79b-4950-9e34-6e67fac09bb0/LeoMessi20092010_pic_fcb-arsenal62.jpg?width=1200&height=750"
      />
      <VenueCard
        name="Another Venue"
        imageUri="https://www.fcbarcelona.com/photo-resources/2022/08/02/ae5252d1-b79b-4950-9e34-6e67fac09bb0/LeoMessi20092010_pic_fcb-arsenal62.jpg?width=1200&height=750"
      />
      <VenueCard
        name="Another Venue"
        imageUri="https://www.fcbarcelona.com/photo-resources/2022/08/02/ae5252d1-b79b-4950-9e34-6e67fac09bb0/LeoMessi20092010_pic_fcb-arsenal62.jpg?width=1200&height=750"
      />
      <VenueCard
        name="Another Venue"
        imageUri="https://www.fcbarcelona.com/photo-resources/2022/08/02/ae5252d1-b79b-4950-9e34-6e67fac09bb0/LeoMessi20092010_pic_fcb-arsenal62.jpg?width=1200&height=750"
      />
      <VenueCard
        name="Another Venue"
        imageUri="https://www.fcbarcelona.com/photo-resources/2022/08/02/ae5252d1-b79b-4950-9e34-6e67fac09bb0/LeoMessi20092010_pic_fcb-arsenal62.jpg?width=1200&height=750"
      />
      <VenueCard
        name="Another Venue"
        imageUri="https://www.fcbarcelona.com/photo-resources/2022/08/02/ae5252d1-b79b-4950-9e34-6e67fac09bb0/LeoMessi20092010_pic_fcb-arsenal62.jpg?width=1200&height=750"
      />
      {/* Add more VenueCard components as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Venues;
