import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from "react-native";
import axios from "axios"; // Import Axios

const ListviewSuppliers = ({ navigation, route }) => {
  const { type } = route.params;
  const [suppliers, setSuppliers] = useState([]); 
   console.log(type);
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        // console.log("test");

        const response = await axios.get("http://192.168.214.1:3000/suppliers/filtersuppliersByType", {type:type})
        console.log(response.data);
        setSuppliers(response.data); 
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, [type]); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose what fits you!</Text>
      
      {console.log(suppliers)}
      <Text>{suppliers[0]}</Text>
      <FlatList
        data={suppliers}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('SupplierDetails', { supplier: item })}>
            <SupplierCard
              image={item.image}
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