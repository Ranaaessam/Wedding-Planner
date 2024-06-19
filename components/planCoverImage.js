import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const PlanCoverImage = ({ image, name }) => {
  return (
    <View>
      <Image
        source={{
          uri: image,
        }}
        style={styles.avatar}
      />
      <View style={styles.overlay}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: "100%",
    height: "65%",
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: "65%",
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
    paddingBottom: "5%",
  },
  name: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "start",
    padding: 0,
  },
});

export default PlanCoverImage;
