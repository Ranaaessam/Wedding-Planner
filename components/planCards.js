import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import PlanCard from "../components/planCard"; // Ensure the correct import path
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItems } from "../StateManagement/slices/CartSlice";
import { getAllFavourites } from "../StateManagement/slices/FavouritesSlice";
import { fetchGuests } from "../StateManagement/slices/GuestListSlice";

const PlanCards = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const FavItems = useSelector((state) => state.favourites.favourites);
  const guests = useSelector((state) => state.guestList.guests);
  const userDetails = useSelector((state) => state.user.user);

  const totalBudget = userDetails?.budget;
  const amountSpent = useSelector((state) => state.budget.amountSpent);

  const [cartLength, setCartLength] = useState(0);
  const [FavLength, setFavLength] = useState(0);
  const [GuestLength, setGuestLength] = useState(0);

  useEffect(() => {
    dispatch(getAllCartItems());
    dispatch(getAllFavourites());
    dispatch(fetchGuests());
  }, [dispatch]);

  useEffect(() => {
    setCartLength(cartItems.length);
    setFavLength(FavItems.length);
    setGuestLength(guests.length);
  }, [cartItems, FavItems, guests]);

  const planCards = [
    {
      id: 1,
      icon: "creditcard",
      name: "Budget",
      value: Math.floor((amountSpent / totalBudget) * 100),
    },
    { id: 2, icon: "addusergroup", name: "Guest list", value: GuestLength },
    { id: 3, icon: "hearto", name: "Favorites", value: FavLength },
    { id: 4, icon: "like2", name: "Booked", value: cartLength },
    { id: 5, icon: "profile", name: "To-Do List", value: 0 },
    { id: 6, icon: "book", name: "Scrapbook", value: 0 },
  ];

  return (
    <View style={{ marginTop: -90 }}>
      <FlatList
        data={planCards}
        renderItem={({ item }) => (
          <PlanCard
            icon={item.icon}
            name={item.name}
            value={item.value}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    height: "58%",
    width: "85%",
    paddingVertical: 90,
    alignSelf: "center",
  },
});

export default PlanCards;
