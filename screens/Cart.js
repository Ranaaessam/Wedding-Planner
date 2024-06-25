import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Icon } from "react-native-elements";
import { Card, Button } from "react-native-paper";
import axios from "axios";
import API_URL from "../constants";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import storage from "../Storage/storage";

const Cart = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { userId, accountID } = route.params; // Access userId and accountID here

  // console.log("paramss");
  // console.log(route.params)

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);

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
  const handleCheckOut = () => {
    // console.log(typeof totalPrice, totalPrice);

    axios
      .post("https://accept.paymob.com/api/auth/tokens", {
        api_key:
          "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1Rjd09UUTVMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkudzh4WjByODVaTll6WnJueE1nc1pKZnU5OEVFRWdFcGNoa3Y5QjNUZWF4VVlTdFp2ZnhyMDFBeE1MSGh0QWpaOTZpbVJJUTlYNUl4WmZjV09mZVgzV1E=",
      })
      .then((res) => {
        // console.log(res.data.token);
        const authToken = res.data.token;
        const amountCents = Math.round(totalPrice * 100);

        axios
          .post("https://accept.paymob.com/api/ecommerce/orders", {
            auth_token: authToken,
            delivery_needed: "false",
            amount_cents: amountCents,
            currency: "EGP",
            items: [],
          })
          .then((res) => {
            // console.log(res.data);
            const orderId = res.data.id;
            axios
              .post("https://accept.paymob.com/api/acceptance/payment_keys", {
                auth_token: authToken,
                amount_cents: amountCents,
                expiration: 3600,
                order_id: orderId,
                billing_data: {
                  apartment: "803",
                  email: "claudette09@exa.com",
                  floor: "42",
                  first_name: "Clifford",
                  street: "Ethan Land",
                  building: "8028",
                  phone_number: "+86(8)9135210487",
                  shipping_method: "PKG",
                  postal_code: "01898",
                  city: "Jaskolskiburgh",
                  country: "CR",
                  last_name: "Nicolas",
                  state: "Utah",
                },
                currency: "EGP",
                integration_id: 4556039,
              })
              .then((res) => {
                Linking.openURL(
                  `https://accept.paymob.com/api/acceptance/iframes/837986?payment_token=${res.data.token}`
                );
                // window.open(
                //   `https://accept.paymob.com/api/acceptance/iframes/837986?payment_token=${res.data.token}`
                // );
                const order = {
                  clientID: accountID,
                  price: totalPrice,
                  products: cartItems,
                  // date: formatDate(new Date()),
                  date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                };
                // axios.post("http://localhost:3001/orders", order).then();
                // dispatch(clearCart());
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
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
      settotalPrice(calculateTotalPrice());
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
                source={{
                  uri:
                    item.images && item.images.length > 0 ? item.images[0] : "",
                }}
                style={styles.image}
              />

              <View style={styles.detailsContainer}>
                <Text style={styles.itemTitle}>{item.name}</Text>
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
          <Text style={styles.totalAmount}>${totalPrice}</Text>
        </View>
        <Button
          mode="contained"
          style={styles.paymentButton}
          onPress={handleCheckOut}
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
