// CategoryScrollView.js
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const categories = ["Venue", "Photographer", "Caterer", "DJ", "Makeup Artist"];

const SearchCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("Venue");

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },

  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 10,
  },
  selectedCategoryButton: {
    backgroundColor: "#FF81AE",
    color: "white",
  },
  categoryText: {
    fontSize: 14,
    color: "#000",
    fontFamily: "PoppinsLight",
  },
});

export default SearchCategories;
