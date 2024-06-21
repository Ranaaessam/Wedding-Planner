import React, { useState } from "react";
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

const UsersManagement = () => {
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "John Doe",
      profilePic:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      budget: 5000,
      weddingDate: "2024-08-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      profilePic:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      budget: 8000,
      weddingDate: "2024-09-20",
    },
    {
      id: "3",
      name: "Michael Johnson",
      profilePic:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      budget: 6500,
      weddingDate: "2024-07-10",
    },
    // Add more users as needed
  ]);
  const [filteredUsers, setFilteredUsers] = useState(users); // State to hold filtered users

  const deleteUser = (userId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to suspend this user?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setUsers((prevUsers) =>
              prevUsers.filter((user) => user.id !== userId)
            );
            setFilteredUsers((prevUsers) =>
              prevUsers.filter((user) => user.id !== userId)
            );
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
      <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
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
      <TouchableOpacity onPress={() => deleteUser(item.id)}>
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
        data={filteredUsers}
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
