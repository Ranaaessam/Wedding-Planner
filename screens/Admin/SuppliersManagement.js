import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSuppliers,
  deleteSupplier,
} from "../../StateManagement/slices/AdminSlice";

const SuppliersManagement = () => {
  const dispatch = useDispatch();
  const suppliers = useSelector((state) => state.admin.suppliers);
  const status = useSelector((state) => state.admin.status);
  const error = useSelector((state) => state.admin.error);
  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);

  useEffect(() => {
    dispatch(getAllSuppliers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredSuppliers(suppliers);
  }, [suppliers]);

  const handleDeleteSupplier = (supplierId) => {
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
            dispatch(deleteSupplier(supplierId));
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
      <Image source={{ uri: item.images[0] }} style={styles.profilePicture} />
      <View style={styles.supplierInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <View style={styles.rateContainer}>
          <Icon name="star" size={20} color="#FFD700" style={styles.rateIcon} />
          <Text style={styles.rateText}>{item.rate}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleDeleteSupplier(item._id)}>
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
      {status === "loading" ? (
        <Text>Loading...</Text>
      ) : status === "failed" ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={filteredSuppliers}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
