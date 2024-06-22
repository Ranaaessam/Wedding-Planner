import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from "react-native";
import SupplierCard from "../components/supplierListCard";
import { useRoute } from "@react-navigation/native";
import axios from "axios"; 

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

const ListviewSuppliers = ({ navigation ,route}) => {
  const { type } = route.params;
  const [suppliers, setSuppliers] = useState([]); 
   console.log(type);
   useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(`http://192.168.1.2:3000/suppliers/filter?type=${type}`);

        console.log("Basma")

        console.log(response.data);
        // suppliers=response.data;

        setSuppliers(response.data); // Update state with fetched data
        console.log(suppliers)

      } catch (error) {
        console.error("Error fetching suppliers:", error);
        console.error("Error response:", error.response); // Log the detailed response for debugging
        // Handle error if needed
      }
    };
  
    fetchSuppliers();
  }, [type]);




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose what fits you!</Text>
      <FlatList
        data={suppliers}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { navigation.navigate('SupplierDetails') }}>
            <SupplierCard
              image={item.images[0]}
              name={item.name}
              location={item.location}
              rate={item.rate}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 40,
    color: "#333",

  },
  list: {
    paddingHorizontal: 20,
  },
});

export default ListviewSuppliers;
