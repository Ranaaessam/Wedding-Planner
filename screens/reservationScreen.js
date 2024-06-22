import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import AvailabilityCalendar from "../components/availabilityCalendar";

const ReservationScreen = ({ navigation }) => {
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
    // Add more availability data here
  };

  const handleTimeSelect = (day, time) => {
    console.log(`Selected time on ${day}: ${time}`);
  };

  const cakes = [
    {
      id: "1",
      image: {
        uri: "https://scientificallysweet.com/wp-content/uploads/2020/09/IMG_4087-feature-2.jpg",
      },
      name: "Chocolate Cake",
    },
    {
      id: "2",
      image: {
        uri: "https://thescranline.com/wp-content/uploads/2021/03/Vanilla-Cake.jpg",
      },
      name: "Vanilla Cake",
    },
    {
      id: "3",
      image: {
        uri: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2004/1/23/1/ss1d26_red_velvet_cake.jpg.rend.hgtvcom.1280.960.suffix/1371584132020.jpeg",
      },
      name: "Red Velvet Cake",
    },
    {
      id: "4",
      image: {
        uri: "https://theloopywhisk.com/wp-content/uploads/2021/05/White-Chocolate-Cheesecake_730px-featured.jpg",
      },
      name: "Cheesecake",
    },
  ];

  const cars = [
    {
      id: "1",
      image: {
        uri: "https://www.usnews.com/cmsmedia/98/f5/a877088e411ea7c093f1d2622cdb/2023-honda-cr-v-hybrid-1.jpg",
      },
      name: "SUV",
    },
    {
      id: "2",
      image: {
        uri: "https://www.usnews.com/cmsmedia/12/be/5c7f3dfb4a12ab0795a9ba8144b5/2023-acura-integra-a-spec-2.jpg",
      },
      name: "Sedan",
    },
    {
      id: "3",
      image: {
        uri: "https://www.cnet.com/a/img/resize/91a72b98f2e2fa37a1e87041fd5a01cdb9c8e5aa/hub/2020/06/11/851281c9-bcfd-45c0-bded-cb16e4b8b469/2021-porsche-911-turbo-s-cabriolet-009.jpg?auto=webp&width=1920",
      },
      name: "Convertible",
    },
    {
      id: "4",
      image: {
        uri: "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/2017-Volkswagen-Golf-110TSI-Highline-R-Line-hatchback-yellow-press-image-why-a-hatchback-is-the-smartest-car-you-can-buy-1200x800p.jpg",
      },
      name: "Hatchback",
    },
  ];

  const caterers = [
    {
      id: "1",
      image: {
        uri: "https://joyfoodsunshine.com/wp-content/uploads/2022/06/chicken-kebabs-recipe-1.jpg",
      },
      name: "Caterer A",
      description: "Exquisite dishes tailored to your wedding theme.",
    },
    {
      id: "2",
      image: {
        uri: "https://i.pinimg.com/236x/db/00/d7/db00d7767863913492c207c27378d943.jpg",
      },
      name: "Caterer B",
      description: "Specializes in gourmet cuisine with a twist.",
    },
    {
      id: "3",
      image: {
        uri: "https://cdn.pixabay.com/photo/2017/05/07/08/56/pancakes-2291908_960_720.jpg",
      },
      name: "Caterer C",
      description: "Offers a wide range of international flavors.",
    },
  ];

  const renderCakeItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, selectedCake === item.id && styles.selectedItem]}
      onPress={() => setSelectedCake(item.id)}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.itemName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCarItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, selectedCar === item.id && styles.selectedItem]}
      onPress={() => setSelectedCar(item.id)}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.itemName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCatererItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, selectedCaterer === item.id && styles.selectedItem]}
      onPress={() => setSelectedCaterer(item.id)}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={[{ key: "content" }]}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Marriott Zamalek</Text>
            <View style={styles.ratingContainer}>{renderStars()}</View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.locationContainer}>
              <FontAwesome name="building" size={25} color="#FF81AE" />
              <Text style={styles.locationText}>Saray El, Gezira St</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>$45</Text>
              <Text style={styles.unit}>/ hour</Text>
            </View>
          </View>
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/65/71/d9/6571d99950851c0efd43b15b9a5efa59.jpg",
            }}
            style={{
              width: "100%",
              height: "20%",
              marginTop: 15,
              borderRadius: 20,
            }}
          ></Image>
          <Text style={styles.stepText}>Step 1: Choose your Date</Text>
          <View style={styles.calendarContainer}>
            <AvailabilityCalendar
              availability={availability}
              onTimeSelect={handleTimeSelect}
            />
          </View>
          <Text style={styles.stepText}>
            Step 2: Choose your Favourite Cake
          </Text>
          <FlatList
            data={cakes}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            renderItem={renderCakeItem}
            keyExtractor={(item) => item.id}
          />
          <Text style={styles.stepText}>Step 3: Choose your Wedding Car</Text>
          <FlatList
            data={cars}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            renderItem={renderCarItem}
            keyExtractor={(item) => item.id}
          />
          <Text style={styles.stepText}>Step 4: Choose your Caterer</Text>
          <FlatList
            data={caterers}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            renderItem={renderCatererItem}
            keyExtractor={(item) => item.id}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Cart");
            }}
          >
            <Button
              mode="contained"
              style={styles.button}
              labelStyle={{ fontSize: 16, fontWeight: "bold" }}
            >
              Next $90
            </Button>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item.key}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#ffffff",
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
    flex: 1,
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
