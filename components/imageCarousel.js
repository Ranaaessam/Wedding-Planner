import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
// import Carousel from "react-native-reanimated-carousel";

const { width: screenWidth } = Dimensions.get("window");

const ImageCarousel = ({ images }) => {
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.uri }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Carousel
        data={images}
        renderItem={renderItem}
        width={screenWidth}
        height={screenWidth * 0.75}
        loop={true}
        autoPlay={true}
        autoPlayInterval={3000}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenWidth * 0.75,
  },
  slide: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: screenWidth,
    height: screenWidth * 0.75,
    resizeMode: "cover",
  },
});

export default ImageCarousel;
