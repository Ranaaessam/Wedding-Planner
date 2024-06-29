import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import SupplierCard from "../components/supplierListCard";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import API_URL from "../constants";
import { useTheme, themes } from "../ThemeContext";
import LoaderComponent from "../components/loader";

const ListviewSuppliers = ({ navigation, route }) => {
  const { type } = route.params;
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true); // Set loading state to true before fetching data
        const response = await axios.get(
          `${API_URL}/suppliers/filter?type=${type}`
        );
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
        console.error("Error response:", error.response);
      } finally {
        setLoading(false); // Set loading state to false after data is fetched
      }
    };

    fetchSuppliers();
  }, [type]);

  if (loading) {
    return <LoaderComponent />; // Show loader while loading is true
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.statusBarStyle} />
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme.text }]}>{type}</Text>
      </View>
      <FlatList
        data={suppliers}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SupplierDetails", {
                supplierId: item._id,
                imagess: item.images,
              })
            }
          >
            <SupplierCard
              image={item.images[0]}
              name={item.name}
              location={item.location}
              rate={Math.round(item.rate)}
              navigation={navigation}
              style={styles.supplierCard}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.cart,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 20,
    backgroundColor: themes.header,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  list: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  supplierCard: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default ListviewSuppliers;
