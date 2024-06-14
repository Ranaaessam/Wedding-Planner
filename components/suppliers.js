import React from "react";
import { FlatList, View } from "react-native";
import SupplierCard from "./supplierCard";

const DATA = [
  {
    id: "1",
    name: "Awesome Venue",
    imageUri:
      "https://www.fcbarcelona.com/photo-resources/2022/08/02/ae5252d1-b79b-4950-9e34-6e67fac09bb0/LeoMessi20092010_pic_fcb-arsenal62.jpg?width=1200&height=750",
  },
  {
    id: "2",
    name: "Another Venue",
    imageUri:
      "https://www.fcbarcelona.com/photo-resources/2022/08/02/ae5252d1-b79b-4950-9e34-6e67fac09bb0/LeoMessi20092010_pic_fcb-arsenal62.jpg?width=1200&height=750",
  },
];

const Suppliers = () => {
  return (
    <FlatList
      data={DATA.concat(DATA, DATA, DATA)}
      renderItem={({ item }) => (
        <View>
          <SupplierCard name={item.name} imageUri={item.imageUri} />
        </View>
      )}
      keyExtractor={(item) => item.id}
      numColumns={3}
    />
  );
};

export default Suppliers;
