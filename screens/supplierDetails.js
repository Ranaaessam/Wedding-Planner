import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ImageCarousel from "../components/imageCarousel";
import ReviewCard from "../components/reviewCard";

const { width: screenWidth } = Dimensions.get("window");
const reviews = [
  {
    id: 1,
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "John Doe",
    date: "June 18, 2024",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget justo sed elit pharetra interdum consectetur adipiscing elit.",
    rating: 4.5,
  },
  {
    id: 2,
    avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Jane Smith",
    date: "June 19, 2024",
    review:
      "Suspendisse malesuada libero vel lorem facilisis, id interdum justo dapibus. Donec iaculis tempor mauris non lacinia.",
    rating: 5,
  },
  {
    id: 3,
    avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Mike Johnson",
    date: "June 20, 2024",
    review:
      "Vestibulum euismod, purus id efficitur tristique, mauris ligula consequat elit, id vestibulum ante ex eget enim.",
    rating: 4,
  },
  {
    id: 4,
    avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Emily Brown",
    date: "June 21, 2024",
    review:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam erat volutpat.",
    rating: 4.5,
  },
  {
    id: 5,
    avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "David Wilson",
    date: "June 22, 2024",
    review:
      "Curabitur in sem sed tortor vestibulum sodales eu sed lorem. Maecenas nec ex non mauris pellentesque scelerisque.",
    rating: 5,
  },
];

const images = [
  {
    uri: "https://assets.entrepreneur.com/content/3x2/2000/20191009140007-GettyImages-1053962188.jpeg?format=pjeg&auto=webp&crop=4:3",
  },
  {
    uri: "https://media.istockphoto.com/id/610259354/photo/young-woman-using-dslr-camera.jpg?s=612x612&w=0&k=20&c=gjAR4JiqA8lkGQzssSrXxo3yl-cwr5j7Hy47cy-10c4=",
  },
  {
    uri: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?cs=srgb&dl=pexels-andre-furtado-43594-1264210.jpg&fm=jpg",
  },
];

const SupplierDetails = () => {
  const handleBookPress = () => {
    // Handle booking action
    console.log("Book button pressed");
  };

  const handleFavoritePress = () => {
    // Handle add to favorites action
    console.log("Add to favorites button pressed");
  };

  const renderReviewCard = ({ item }) => (
    <ReviewCard
      avatarUrl={item.avatarUrl}
      name={item.name}
      date={item.date}
      review={item.review}
      rating={item.rating}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <ImageCarousel images={images} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Supplier Name</Text>
        </View>
        <View style={styles.locationContainer}>
          <FontAwesome name="map-marker" size={16} color="#666" />
          <Text style={styles.location}>Supplier Location</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.bookButton]}
            onPress={handleBookPress}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.favoriteButton]}
            onPress={handleFavoritePress}>
            <Text style={styles.buttonText}>Add to Favorites</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.socialIconsContainer}>
          <Text>Visit Website</Text>
          <View style={{ flexDirection: "row", marginLeft: 140 }}>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="globe" size={24} color="#2196f3" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="facebook-square" size={24} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="instagram" size={24} color="#e4405f" />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={reviews}
          renderItem={renderReviewCard}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.reviews}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
  },
  carouselContainer: {
    width: "100%",
    height: screenWidth * 0.75,
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 50,
  },
  infoContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  nameContainer: {
    marginBottom: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  location: {
    fontSize: 18,
    color: "#666",
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    elevation: 2,
    backgroundColor: "#2196f3",
  },
  buttonText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "black",
    textTransform: "uppercase",
  },
  bookButton: {
    backgroundColor: "#FFDFEB",
    marginRight: 26,
  },
  favoriteButton: {
    backgroundColor: "#FFDFEB",
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconButton: {
    marginHorizontal: 8,
  },
  reviews: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: "#f0f0f0",
  },
});

export default SupplierDetails;
