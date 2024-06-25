import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  deleteUser,
} from "../../StateManagement/slices/AdminSlice";

const UsersManagement = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);
  const status = useSelector((state) => state.admin.status);
  const error = useSelector((state) => state.admin.error);
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleDeleteUser = (userId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this user?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            dispatch(deleteUser(userId))
              .then(() => {
                // Optional: Dispatch getAllUsers() to update the user list after deletion
                dispatch(getAllUsers());
              })
              .catch((error) => {
                console.error("Failed to delete user:", error);
                // Handle error (e.g., show error message)
              });
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleSearch = (text) => {
    const filteredData = users.filter((user) =>
      user.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };

  const renderItem = ({ item }) => (
    <View style={styles.userCard}>
      <Image source={{ uri: item.image }} style={styles.profilePic} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.weddingDate}>Wedding Date: {item.weddingDate}</Text>
        <View style={styles.budgetContainer}>
          <Icon
            name="attach-money"
            size={20}
            color="#4CAF50"
            style={styles.budgetIcon}
          />
          <Text style={styles.budgetText}>{item.budget}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleDeleteUser(item._id)}>
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
          data={filteredUsers}
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
  userCard: {
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
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  weddingDate: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  budgetContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  budgetIcon: {
    marginRight: 5,
  },
  budgetText: {
    fontSize: 16,
    color: "#4CAF50",
  },
});

export default UsersManagement;
