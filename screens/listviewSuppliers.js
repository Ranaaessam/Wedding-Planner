import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import SupplierCard from "../components/supplierListCard";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import API_URL from "../constants";
import { useTheme ,themes} from "../ThemeContext";

// const suppliers = [
//   {
//     id: "1",
//     name: "Supplier One",
//     location: "New York, USA",
//     rate: "4.5",
//     image:
//       "https://assets.entrepreneur.com/content/3x2/2000/20191009140007-GettyImages-1053962188.jpeg?format=pjeg&auto=webp&crop=4:3",
//   },
//   {
//     id: "2",
//     name: "Supplier Two",
//     location: "Los Angeles, USA",
//     rate: "4.0",
//     image:
//       "https://media.istockphoto.com/id/610259354/photo/young-woman-using-dslr-camera.jpg?s=612x612&w=0&k=20&c=gjAR4JiqA8lkGQzssSrXxo3yl-cwr5j7Hy47cy-10c4=",
//   },
//   {
//     id: "3",
//     name: "Supplier Three",
//     location: "Chicago, USA",
//     rate: "3.5",
//     image:
//       "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?cs=srgb&dl=pexels-andre-furtado-43594-1264210.jpg&fm=jpg",
//   },
// ];

const ListviewSuppliers = ({ navigation, route }) => {
  const { type } = route.params;
  const [suppliers, setSuppliers] = useState([]);
  const { theme, toggleTheme } = useTheme();
  console.log(type);
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/suppliers/filter?type=${type}`
        );

        setSuppliers(response.data);
        console.log("suppliers array");
        // console.log(suppliers.images[0])
        console.log(response.data.location);
        response.data.forEach((supplier) => {
          console.log("Location:", supplier.images[0]);
        });
      } catch (error) {
        console.error("Error fetching suppliers:", error);
        console.error("Error response:", error.response);
      }
    };

    fetchSuppliers();
  }, [type]);

  return (
    // <View style={styles.container}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={suppliers}
        renderItem={({ item }) => (
          // <TouchableOpacity onPress={() => { navigation.navigate('SupplierDetails') }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SupplierDetails", {
                supplierId: item._id,
                imagess: item.images,
              })
            }>
            <SupplierCard
              image={item.images[0]}
              name={item.name}
              location={item.location}
              rate={Math.round(item.rate)}
              navigation={navigation}
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
    // backgroundColor: "#f0f0f0",
    backgroundColor: themes.cart,

  },

  list: {
    paddingHorizontal: 20,
  },
});

export default ListviewSuppliers;
