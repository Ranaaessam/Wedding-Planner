import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import AvailabilityCalendar from "../components/availabilityCalendar";
import axios from "axios";

const ReservationScreen = ({ navigation, route }) => {
  const venueObj = route.params;
  const accountID = "66773bae194fe37a728f3716";

  const [selectedCake, setSelectedCake] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCaterer, setSelectedCaterer] = useState(null);

  const renderStars = () => {
    const filledStars = Math.floor(3);
    const halfStar = 3 - filledStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - filledStars - halfStar;

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<FontAwesome key={i} name="star" size={20} color="#FF81AE" />);
    }
    if (halfStar) {
      stars.push(
        <FontAwesome key="half" name="star-half" size={20} color="#FF81AE" />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesome
          key={`empty-${i}`}
          name="star-o"
          size={20}
          color="#FFDFEB"
        />
      );
    }
    return stars;
  };

  const availability = {
    "2024-06-22": {
      customStyles: {
        container: {
          backgroundColor: "red",
          borderRadius: 15,
        },
        text: {
          color: "white",
        },
      },
    },
    "2024-06-21": {
      customStyles: {
        container: {
          backgroundColor: "red",
          borderRadius: 15,
        },
        text: {
          color: "white",
        },
      },
    },
    "2024-06-23": {
      customStyles: {
        container: {
          backgroundColor: "red",
          borderRadius: 15,
        },
        text: {
          color: "white",
        },
      },
    },
    "2024-06-24": {
      customStyles: {
        container: {
          backgroundColor: "green",
          borderRadius: 15,
        },
        text: {
          color: "white",
        },
      },
    },
  };

  const handleTimeSelect = (day, time) => {
    console.log(`Selected time on ${day}: ${time}`);
    // Implement logic if needed for handling selected time
  };

  const cartNavigate = async () => {
    try {
      const data = {
        accountID: accountID,
        venue: venueObj,
        selectedCake: selectedCake,
        selectedCar: selectedCar,
        selectedCaterer: selectedCaterer,
      };

      const response = await axios.post(
        "http://192.168.1.2:3000/account/Cart",
        data
      );

      // Assuming response.data contains cart details or confirmation
      console.log("Cart response:", response.data);

      // Navigate to the Cart screen after successful submission
      navigation.navigate("Cart");
    } catch (error) {
      console.error("Error navigating to cart:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{venueObj.name}</Text>
          <View style={styles.ratingContainer}>{renderStars()}</View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.locationContainer}>
            <FontAwesome name="building" size={25} color="#FF81AE" />
            <Text style={styles.locationText}>{venueObj.location}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{venueObj.price}$</Text>
            <Text style={styles.unit}>/ hour</Text>
          </View>
        </View>
        <Image
          source={{ uri: venueObj.images[0] }}
          style={{
            width: "100%",
            height: 190,
            marginTop: 15,
            borderRadius: 20,
          }}
        />
        <Text style={styles.stepText}>Step 1: Choose your Date</Text>
        <View style={styles.calendarContainer}>
          <AvailabilityCalendar
            availability={availability}
            onTimeSelect={handleTimeSelect}
          />
        </View>
        <Text style={styles.stepText}>Step 2: Choose your Favourite Cake</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        >
          {venueObj.cakes.map((cake, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.item,
                selectedCake === cake.name && styles.selectedItem,
              ]}
              onPress={() => setSelectedCake(cake.name)}
            >
              <Image source={{ uri: cake.image }} style={styles.image} />
              <Text style={styles.itemName}>{cake.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.stepText}>Step 3: Choose your Wedding Car</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        >
          {venueObj.cars.map((car, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.item,
                selectedCar === car.name && styles.selectedItem,
              ]}
              onPress={() => setSelectedCar(car.name)}
            >
              <Image source={{ uri: car.image }} style={styles.image} />
              <Text style={styles.itemName}>{car.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.stepText}>Step 4: Choose your Caterer</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        >
          {venueObj.caterer.map((caterer, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.item,
                selectedCaterer === caterer.name && styles.selectedItem,
              ]}
              onPress={() => setSelectedCaterer(caterer.name)}
            >
              <Image source={{ uri: caterer.image }} style={styles.image} />
              <Text style={styles.itemName}>{caterer.name}</Text>
              <Text style={styles.description}>{caterer.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity onPress={cartNavigate}>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={{ fontSize: 16, fontWeight: "bold" }}
          >
            Next $90
          </Button>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0df",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
  },
  unit: {
    fontSize: 12,
    marginLeft: 5,
    marginTop: -2,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 10,
    color: "grey",
    fontSize: 13,
    fontWeight: "600",
  },
  listContainer: {
    marginTop: 10,
    marginBottom: 20,
    minHeight: 80,
  },
  item: {
    marginRight: 15,
    alignItems: "center",
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: "#FF81AE",
    borderRadius: 10,
    padding: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  stepText: {
    marginVertical: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: "#e0e0df",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#ffffff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF81AE",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    minWidth: "100%",
    alignSelf: "center",
    marginVertical: 20,
  },
  description: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 12,
    color: "#666666",
    width: 100,
  },
  itemName: {
    fontWeight: "bold",
    marginTop: 8,
  },
});


export default ReservationScreen;