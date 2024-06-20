// AvatarComponent.js
import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
// import { launchImageLibrary } from "react-native-image-picker";

const profilePicture = () => {
  const [profilePicture, setProfilePicture] = useState(
    "https://www.mortsandmore.com/wp-content/uploads/2016/01/Thumb.jpg"
  );

  const selectImage = () => {
    // launchImageLibrary({ mediaType: "photo" }, (response) => {
    //   if (response.assets && response.assets.length > 0) {
    //     setProfilePicture(response.assets[0].uri);
    //   }
    // });
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={
            profilePicture ? { uri: profilePicture } : { uri: profilePicture }
          }
          style={styles.avatar}
        />
        <TouchableOpacity
          style={styles.editIconContainer}
          onPress={selectImage}>
          <Icon name="edit" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "7%",
    left: "5%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
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
    backgroundColor: "black",
    borderRadius: 20,
    padding: 4,
  },
});

export default profilePicture;
