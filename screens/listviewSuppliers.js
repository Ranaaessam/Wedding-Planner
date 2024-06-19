// ListviewSuppliers.js
import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import SupplierCard from "../components/supplierListCard";

const suppliers = [
  {
    id: "1",
    name: "Supplier One",
    location: "New York, USA",
    rate: "4.5",
    image:
      "https://assets.entrepreneur.com/content/3x2/2000/20191009140007-GettyImages-1053962188.jpeg?format=pjeg&auto=webp&crop=4:3",
  },
  {
    id: "2",
    name: "Supplier Two",
    location: "Los Angeles, USA",
    rate: "4.0",
    image:
      "https://media.istockphoto.com/id/610259354/photo/young-woman-using-dslr-camera.jpg?s=612x612&w=0&k=20&c=gjAR4JiqA8lkGQzssSrXxo3yl-cwr5j7Hy47cy-10c4=",
  },
  {
    id: "3",
    name: "Supplier Three",
    location: "Chicago, USA",
    rate: "3.5",
    image:
      "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?cs=srgb&dl=pexels-andre-furtado-43594-1264210.jpg&fm=jpg",
  },
];

const ListviewSuppliers = () => {
  return (
    <FlatList
      data={suppliers}
      renderItem={({ item }) => (
        <SupplierCard
          image={item.image}
          name={item.name}
          location={item.location}
          rate={item.rate}
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
});

export default ListviewSuppliers;
