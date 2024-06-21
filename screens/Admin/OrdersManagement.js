import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: "1",
      username: "John Doe",
      price: 200,
      date: "2024-06-15",
    },
    {
      id: "2",
      username: "Jane Smith",
      price: 150,
      date: "2024-06-16",
    },
    {
      id: "3",
      username: "Michael Johnson",
      price: 300,
      date: "2024-06-17",
    },
    // Add more orders as needed
  ]);
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const deleteOrder = (orderId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this order?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setOrders((prevOrders) =>
              prevOrders.filter((order) => order.id !== orderId)
            );
            setFilteredOrders((prevOrders) =>
              prevOrders.filter((order) => order.id !== orderId)
            );
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleSearch = (text) => {
    const filteredData = orders.filter((order) =>
      order.username.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredOrders(filteredData);
  };

  const renderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.orderDate}>Date: {item.date}</Text>
        <View style={styles.priceContainer}>
          <Icon
            name="attach-money"
            size={20}
            color="#4CAF50"
            style={styles.priceIcon}
          />
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => deleteOrder(item.id)}>
        <Icon name="delete" size={24} color="#FF6347" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by username..."
          onChangeText={handleSearch}
        />
        <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
      </View>
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  searchBarContainer: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginLeft: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  orderInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceIcon: {
    marginRight: 5,
  },
  priceText: {
    fontSize: 16,
    color: "#4CAF50",
  },
});

export default OrdersManagement;
