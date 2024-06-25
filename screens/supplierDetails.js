import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  Image,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ImageCarousel from "../components/imageCarousel";
import axios from "axios";
import ReviewCard from "../components/reviewCard";
import API_URL from "../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  getAllFavourites,
  removeFromFavorites,
} from "../StateManagement/slices/FavouritesSlice";
import { addToCart } from "../StateManagement/slices/CartSlice";
import ReviewScreen from "./reviewScreen";
import storage from "../Storage/storage";
import { getReviewsBySupplierID } from "../Backend/controllers/reviewsController";
import { getReviews } from "../StateManagement/slices/ReviewSlice";

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
      date: "June 18, 2024",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget justo sed elit pharetra interdum consectetur adipiscing elit.",
      rating: 4.0,
    },
    {
      id: 3,
      avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Bob Johnson",
      date: "June 18, 2024",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget justo sed elit pharetra interdum consectetur adipiscing elit.",
      rating: 3.5,
    },
    {
      id: 4,
      avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "Emily Davis",
      date: "June 18, 2024",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget justo sed elit pharetra interdum consectetur adipiscing elit.",
      rating: 5.0,
    },
    {
      id: 5,
      avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg",
      name: "Michael Brown",
      date: "June 18, 2024",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget justo sed elit pharetra interdum consectetur adipiscing elit.",
      rating: 3.0,
    },
    {
      id: 6,
      avatarUrl: "https://randomuser.me/api/portraits/women/6.jpg",
      name: "Olivia Taylor",
      date: "June 18, 2024",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget justo sed elit pharetra interdum consectetur adipiscing elit.",
      rating: 4.5,
    },
    // ... other reviews
  ];
  const { supplierId } = route.params;
  const [supplier, setSupplier] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const allReviews = useSelector((state) => state.review.review);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favourites.favourites);
  const bookedItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(getAllFavourites());
  }, []);

  useEffect(() => {
    const fetchSupplierDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/suppliers/${supplierId}`);
        setSupplier(response.data);
        setIsFavorite(favorites.some((item) => item._id === supplierId));
      } catch (error) {
        console.error("Error fetching supplier details:", error);
      }
    };

    fetchSupplierDetails();
  }, [supplierId, favorites]);
  //-------------------------------------------
  useEffect(() => {
    const fetchSupplierReviews = async () => {
      try {
        dispatch(getReviews(supplierId));
      } catch (error) {
        console.error("Error fetching supplier details:", error);
      }
    };

    fetchSupplierReviews();
  }, []);

  const handleBookPress = () => {
    if (bookedItems.some((item) => item._id === supplier.id)) {
      setModalMessage("Already booked!");
    } else {
      dispatch(addToCart({ cartItem: supplier, accountId: "yourAccountId" }));
      setModalMessage("Booked successfully!");
    }
    setBookingModalVisible(true);
    setTimeout(() => setBookingModalVisible(false), 1500);
  };

  const handleFavoritePress = async () => {
    try {
      const accountId = await storage.load({ key: "accountId" });
      if (isFavorite) {
        dispatch(removeFromFavorites(supplier._id));
        setIsFavorite(false);
      } else {
        dispatch(
          addToFavorites({ favouriteItem: supplier, accountId: accountId })
        );
        setIsFavorite(true);
        setModalVisible(true);
        setTimeout(() => setModalVisible(false), 1500);
      }
      dispatch(getAllFavourites());
    } catch (error) {
      console.error("Error loading account ID or updating favorites:", error);
    }
  };

  const renderReviewCard = ({ item }) => (
    <ReviewCard
      avatarUrl="https://media.istockphoto.com/id/1494104649/photo/ai-chatbot-artificial-intelligence-digital-concept.jpg?s=612x612&w=0&k=20&c=1Zq2sj3W0tWcpc-n1fVt4dQQOBGhtwcAk1H2eQ5MAbI="
      // name={item.name}
      // date={item.date}
      review={item.review}
      rating={item.rate}
    />
  );

  const renderImageItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.carouselImage} />
  );

  if (!supplier) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const handleReview = () => {
    setReviewModalVisible(true);
  };

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
            <TouchableOpacity
              style={[styles.button, styles.bookButton]}
              onPress={handleBookPress}
            >
              <Text style={styles.buttonText}>Book Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                isFavorite
                  ? styles.removeFavoriteButton
                  : styles.favoriteButton,
              ]}
              onPress={handleFavoritePress}
            >
              <Text
                style={[
                  styles.buttonText,
                  isFavorite ? { color: "white" } : { color: "black" },
                ]}
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.socialIconsContainer}>
            <Text>Visit Website</Text>
            <View style={{ flexDirection: "row", marginLeft: 140 }}>
              <TouchableOpacity style={styles.iconButton}>
                <FontAwesome name="pinterest" size={24} color="#2196f3" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <FontAwesome name="facebook-square" size={24} color="#3b5998" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <FontAwesome name="instagram" size={24} color="#e4405f" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              styles.socialIconsContainer,
              {
                justifyContent: "space-between",
                marginTop: 20,
              },
            ]}
          >
            <Text>Reviews</Text>
            <View style={{ flexDirection: "row", marginLeft: 140 }}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleReview}
              >
                <MaterialIcons name="rate-review" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={allReviews}
            renderItem={renderReviewCard}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.reviews}
          />
        </View>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Added to favorites</Text>
          </View>
        </View>
      </Modal>
      <Modal
        visible={bookingModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setBookingModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.bookingModalContent}>
            <Text style={styles.bookingModalText}>{modalMessage}</Text>
          </View>
        </View>
      </Modal>
      <ReviewScreen
        visible={reviewModalVisible}
        onClose={() => setReviewModalVisible(false)}
        supplierId={supplierId}
      />
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
  removeFavoriteButton: {
    backgroundColor: "#4C134E",
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
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookingModalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  bookingModalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4C134E",
  },
});

export default SupplierDetails;
