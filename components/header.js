// Header.js
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Octicons";

const Header = ({ imageUri, name }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.avatar}
        />
      </View>
      <Text style={styles.name}>{name}</Text>
      {/* <TouchableOpacity onPress={()=>{navigation.navigate('Settings')}}>
      <Icon name="gear" size={25} color="grey" style={styles.settingsIcon} />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFDFEB",
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: "#D3D3D3",
    borderRadius: 30,
    overflow: "hidden",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4,
    elevation: 5, 
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  name: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  settingsIcon: {
    marginLeft: "auto",
  },
});

export default Header;
