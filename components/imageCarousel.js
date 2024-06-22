import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Image } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const ImageCarousel = ({ images, renderItem, sliderWidth, itemWidth }) => {
  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={( index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth}
        // decelerationRate="fast"
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
});

export default ImageCarousel;
