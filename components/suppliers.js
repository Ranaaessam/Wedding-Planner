import React from "react";
import { FlatList, View } from "react-native";
import SupplierCard from "./supplierCard";
import { useTranslation } from 'react-i18next';

const DATA = [
  { id: "1", name: "Venue", imageUri: "https://assets.cairo360.com/app/uploads/2023/05/02/119941638_1666081876889903_2897944758434622818_n-768x512.jpeg" },
  { id: "2", name: "Photographers", imageUri: "https://media.greatbigphotographyworld.com/wp-content/uploads/2022/04/best-cameras-for-wedding-photography.jpg" },
  { id: "3", name: "Make-up Artist", imageUri: "https://erinmartonphoto.com/wp-content/uploads/sites/11888/2020/06/wedding-hair-and-makeup-artist-los-angeles-2-1024x683.jpg" },
  { id: "4", name: "Cakes", imageUri: "https://www.bloomsburys.ae/uploads/products/wedg_jpg_25102021084637.jpg" },
  { id: "5", name: "Escort Cars", imageUri: "https://media.karousell.com/media/photos/products/2018/05/26/wedding_car_with_escort_cars_1527337192_a089c70a.jpg" },
  { id: "6", name: "Music Playlist", imageUri: "https://vinesoftheyarravalley.com.au/wp-content/uploads/2020/06/Equipment-of-a-Wedding-DJ-1-scaled.jpg" },
  { id: "7", name: "Jewelry", imageUri: "https://i.etsystatic.com/5698877/r/il/930748/4373826505/il_fullxfull.4373826505_5drb.jpg" },
  { id: "8", name: "Attire", imageUri: "https://withjoy.com/blog/wp-content/uploads/2018/12/Wedding-Dress-Code_Deciphered.jpg" },
  { id: "9", name: "Caterers", imageUri: "https://www.wedinspire.com/wp-content/uploads/2021/11/Questions-to-Ask-your-Wedding-Caterer.jpg" },
  { id: "10", name: "Entertainment", imageUri: "https://julesbridaljewellery.com/cdn/shop/articles/wedding-entertainment-ideas_1456x.png?v=1700017724" },
  { id: "11", name: "Decoration", imageUri: "https://cdn.greenvelope.com/blog/wp-content/uploads/outdoor-wedding-aisle.jpeg" },
];

const Suppliers = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <View>
          <SupplierCard name={t(item.name)} imageUri={item.imageUri} navigation={navigation} />
        </View>
      )}
      keyExtractor={(item) => item.id}
      numColumns={3}
    />
  );
};

export default Suppliers;
