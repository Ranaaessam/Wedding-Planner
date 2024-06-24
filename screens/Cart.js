import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { Card, Button } from "react-native-paper";
import axios from "axios";
import API_URL from "../constants";
import { useTranslation } from "react-i18next";

const Cart = ({ navigation, route }) => {
  const { t } = useTranslation();
  const userId = "667745386a459633a0b64a88";
  const accountID = "66773bae194fe37a728f3716";
  // console.log("paramss");
  // console.log(route.params)

  const [cartItems, setCartItems] = useState([]);

  const deleteFromcart = async (itemID) => {
    try {
      const response = await axios.delete(
        `${API_URL}/account/cart?accountId=${accountID}&itemId=${itemID}`
      );

      setCartItems(response.data.cart);
    } catch (error) {
      console.error("Error fetching supplier details:", error);
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/account/profile?userId=${userId}`
        );
        setCartItems(response.data.cart);
      } catch (error) {
        console.error("Error hna", error);
      }
    };
    fetchCartItems();
  });
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const proceedToPayment = () => {
    alert("Proceeding to payment...");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>{t("Your Wedding Plan!")}</Text>
      <Text style={styles.subtitle}>
        {t("Review your cart and proceed to payment")}
      </Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Card.Cover
                source={{ uri: item.images[0] }}
                style={styles.image}
              />
              <View style={styles.detailsContainer}>
                <Text style={styles.itemTitle}>{t(item.name)}</Text>
                <Text style={styles.description}>
                  {(item.cakes && item.cakes[0] && item.cakes[0].name) || ""}
                </Text>
                <Text style={styles.description}>
                  {(item.cars && item.cars[0] && item.cars[0].name) || ""}
                </Text>
                <Text style={styles.description}>
                  {(item.caterer && item.caterer[0] && item.caterer[0].name) ||
                    ""}
                </Text>

                <Text style={styles.price}>Price: ${item.price}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteFromcart(item._id)}>
                <Icon
                  name="trash"
                  type="font-awesome"
                  color="red"
                  size={22}
                  containerStyle={styles.trashIconContainer}
                />
              </TouchableOpacity>
            </View>
          </Card>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>{t("Total Package:")}</Text>
          <Text style={styles.totalAmount}>${calculateTotalPrice()}</Text>
        </View>
        <Button
          mode="contained"
          style={styles.paymentButton}
          onPress={proceedToPayment}
          labelStyle={{ fontSize: 16 }}
        >
          {t("Proceed to Payment")}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FF81AE",
    textAlign: "center",
    marginTop: 25,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  card: {
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 170,
    height: 130,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
    maxWidth: "80%",
  },
  price: {
    fontSize: 16,
    color: "green",
  },
  trashIconContainer: {
    marginTop: 100,
    paddingRight: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 1,
  },
  totalContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF81AE",
    marginRight: 4,
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 2,
  },
  paymentButton: {
    backgroundColor: "#FF81AE",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    minWidth: "40%",
    fontWeight: "bold",
    marginTop: 7,
  },
  contentContainer: {
    paddingBottom: 80,
  },
});

export default Cart;
