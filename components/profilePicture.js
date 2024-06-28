import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { updateProfile } from "../StateManagement/slices/ProfileSlice";
import { useTheme ,themes} from "../ThemeContext";



const ProfilePicture = ({ imgUrl }) => {
  const [imageUri, setImageUri] = useState(imgUrl);
const { theme, toggleTheme } = useTheme();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setLoading(true);
      setImageUri(result.assets[0].uri);
      dispatch(updateProfile({ image: result.assets[0].uri }))
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          // Handle error appropriately
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#FF81AE" />
        ) : (
          <Image source={{ uri: imageUri }} style={styles.avatar} />
        )}
        <TouchableOpacity
         style={[styles.editIconContainer, { backgroundColor: theme.extra }]}
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
    // backgroundColor: "#FF81AE",
    color:themes.cart,
    borderRadius: 20,
    padding: 4,
    width: 30,
    height: 30,
  },
});

export default ProfilePicture;
