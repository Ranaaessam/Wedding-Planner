import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const ProgressBar = ({ progress, height = 5 }) => {
  const [animatedWidth] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false, // `width` cannot be animated with native driver
    }).start();
  }, [progress]);

  return (
    <View style={[styles.container, { height: height }]}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 5,
    width: "100%",
    backgroundColor: "#e0e0df",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FF81AE",
    borderRadius: 5,
  },
});

export default ProgressBar;
