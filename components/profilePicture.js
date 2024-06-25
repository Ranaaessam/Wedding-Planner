// AvatarComponent.js
import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";

const profilePicture = ({ imgUrl }) => {
  const [profilePicture, setProfilePicture] = useState(imgUrl);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setProfilePicture(result.uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: imgUrl }} style={styles.avatar} />
        <TouchableOpacity
          style={styles.editIconContainer}
          onPress={selectImage}
        >
          <Icon name="edit" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "12%",
    left: "5%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 100,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#FF81AE",
    borderRadius: 20,
    padding: 4,
    width: 30,
    height: 30,
  },
});

export default profilePicture;
