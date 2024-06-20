import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ProfilePicture from "../components/profilePicture";
import Icon from "react-native-vector-icons/FontAwesome6";
import ProgressBar from "../components/progressBar";

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    email: "leomessi@gmail.com",
    username: "Leo10",
    name: "Leo Messi",
    partnerUsername: "Mrs10",
    birthDate: "June 24, 1987",
    location: "USA",
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://img.freepik.com/premium-vector/avatar-wedding-couple_24911-14448.jpg",
          }}
          style={styles.avatar}
        />
        <ProfilePicture />
        <TouchableOpacity style={styles.editBtn} onPress={handleEditToggle}>
          <Text style={{ paddingRight: 10, fontWeight: "500" }}>
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Text>
          <Icon name={isEditing ? "check" : "pencil"} size={18} />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <View style={styles.balanceContainer}>
            <Text>Balance</Text>
            <Text style={{ fontWeight: "500", fontSize: 18, paddingTop: 10 }}>
              $8000
            </Text>
          </View>
          <View style={styles.planContainer}>
            <Text>Plan</Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 18,
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              20%
            </Text>
            <ProgressBar progress={20} height={5} />
          </View>
        </View>
        <View style={styles.detailsContainer}>
          {Object.entries(profile).map(([key, value]) => (
            <View key={key} style={styles.detailRow}>
              <Text style={styles.head}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              {isEditing ? (
                <TextInput
                  style={styles.data}
                  value={value}
                  onChangeText={(text) => handleChange(key, text)}
                />
              ) : (
                <Text style={styles.data}>{value}</Text>
              )}
              <View style={styles.divider}></View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 1400,
    borderBottomRightRadius: 550,
  },
  editBtn: {
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#FF81AE",
    padding: 8,
    paddingHorizontal: 11,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  balanceContainer: {
    flex: 1.3,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e0e0df",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  planContainer: {
    flex: 2,
    marginLeft: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e0e0df",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  head: {
    color: "grey",
    fontSize: 12,
  },
  data: {
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 0,
    marginVertical: 0,
    height: 20,
    alignItems: "center",
  },
  divider: {
    backgroundColor: "#e0e0df",
    height: 1,
    marginVertical: 5,
  },
  detailRow: {
    marginBottom: 10,
  },
});

export default ProfileScreen;