import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const SuppliersManagement = () => {
  const [suppliers, setSuppliers] = useState([
    {
      id: "1",
      name: "Supplier One",
      location: "New York, NY",
      rate: 4.5,
      profilePicture:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    },
    {
      id: "2",
      name: "Supplier Two",
      location: "Los Angeles, CA",
      rate: 4.0,
      profilePicture:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    },
    {
      id: "3",
      name: "Supplier Three",
      location: "Chicago, IL",
      rate: 3.8,
      profilePicture:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    },
    // Add more suppliers as needed
  ]);
  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);

  const deleteSupplier = (supplierId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this supplier?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setSuppliers((prevSuppliers) =>
              prevSuppliers.filter((supplier) => supplier.id !== supplierId)
            );
            setFilteredSuppliers((prevSuppliers) =>
              prevSuppliers.filter((supplier) => supplier.id !== supplierId)
            );
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleSearch = (text) => {
    const filteredData = suppliers.filter((supplier) =>
      supplier.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSuppliers(filteredData);
  };

  const renderItem = ({ item }) => (
    <View style={styles.supplierCard}>
      <Image
        source={{ uri: item.profilePicture }}
        style={styles.profilePicture}
      />
      <View style={styles.supplierInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <View style={styles.rateContainer}>
          <Icon name="star" size={20} color="#FFD700" style={styles.rateIcon} />
          <Text style={styles.rateText}>{item.rate}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => deleteSupplier(item.id)}>
        <Icon name="delete" size={24} color="#FF6347" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name..."
          onChangeText={handleSearch}
        />
        <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
      </View>
      <FlatList
        data={filteredSuppliers}
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
  supplierCard: {
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
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  supplierInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  rateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rateIcon: {
    marginRight: 5,
  },
  rateText: {
    fontSize: 16,
    color: "#FFD700",
  },
});

export default SuppliersManagement;
