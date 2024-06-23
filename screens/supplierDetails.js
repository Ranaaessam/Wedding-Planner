import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, ScrollView, FlatList, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ImageCarousel from "../components/imageCarousel";
import axios from "axios";
import ReviewCard from "../components/reviewCard";

const { width: screenWidth } = Dimensions.get("window");

const SupplierDetails = ({ navigation, route }) => {
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

  const { supplierId } = route.params;
  const [supplier, setSupplier] = useState(null); 

  useEffect(() => {
    const fetchSupplierDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.1.2:3000/suppliers/${supplierId}`);
        console.log(response.data.images);
        setSupplier(response.data);
      } catch (error) {
        console.error("Error fetching supplier details:", error);
      }
    };

    fetchSupplierDetails();
  }, [supplierId]); 

  const handleBookPress = () => {
    // Handle booking action
    navigation.navigate('Cart');
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

  const renderImageItem = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={styles.carouselImage}
    />
  );

  if (!supplier) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    ); 
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.carouselContainer}>
          <ImageCarousel
            images={supplier.images}
            renderItem={renderImageItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{supplier.name}</Text>
          </View>
          <View style={styles.locationContainer}>
            <FontAwesome name="map-marker" size={16} color="#666" />
            <Text style={styles.location}>{supplier.location}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.bookButton]} onPress={handleBookPress}>
              <Text style={styles.buttonText}>Book Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.favoriteButton]} onPress={handleFavoritePress}>
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
    </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselContainer: {
    width: "100%",
    height: screenWidth * 0.75,
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 50,
  },
  carouselImage: {
    width: screenWidth,
    height: screenWidth * 0.75,
    resizeMode: "cover",
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
