import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ProfilePicture from "../components/profilePicture";
import Icon from "react-native-vector-icons/FontAwesome6";
import ProgressBar from "../components/progressBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlanPercentage,
  getUserProfile,
  updateProfile,
} from "../StateManagement/slices/ProfileSlice";
import storage from "../Storage/storage";
import { useTranslation } from "react-i18next";

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState("");
  const [budget, setBudget] = useState("");

  const userDetails = useSelector((state) => state.user.user);
  const plan = useSelector((state) => state.user.plan);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = await storage.load({ key: "userId" });
      dispatch(getUserProfile(userId));
    };
    fetchUserProfile();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPlanPercentage());
  }, [dispatch]);

  useEffect(() => {
    if (userDetails) {
      setProfile({
        location: userDetails.location,
        weddingdate: userDetails.weddingdate,
        orders: userDetails.orders,
      });
      setImage(userDetails.image);
      setBudget(userDetails.budget);
    }
  }, [userDetails]);

  useEffect(() => {
    if (!isEditing && profile) {
      dispatch(updateProfile(profile));
    }
  }, [profile, isEditing, dispatch]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (key, value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [key]: value,
    }));
  };

  if (profile === null) {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Image
              source={{
                uri: "https://img.freepik.com/premium-vector/avatar-wedding-couple_24911-14448.jpg",
              }}
              style={styles.avatar}
            />
            <ProfilePicture imgUrl={image} />
            <TouchableOpacity style={styles.editBtn} onPress={handleEditToggle}>
              <Text
                style={{
                  paddingRight: 10,
                  fontWeight: "500",
                  color: "white",
                  fontSize: 18,
                }}
              >
                {isEditing ? t("saveProfile") : t("editProfile")}
              </Text>
              <Icon
                name={isEditing ? "check" : "pencil"}
                size={18}
                style={{ color: "white" }}
              />
            </TouchableOpacity>
            <View style={styles.infoContainer}>
              <View style={styles.balanceContainer}>
                <Text style={{ fontSize: 16 }}>{t("budget")}</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.data}
                    value={budget}
                    onChangeText={(text) => setBudget(text)}
                  />
                ) : (
                  <Text
                    style={{ fontWeight: "500", fontSize: 18, paddingTop: 10 }}
                  >
                    ${budget}
                  </Text>
                )}
              </View>
              <View style={styles.planContainer}>
                <Text style={{ fontSize: 16 }}>{t("plan")}</Text>
                {/* <Text style={{ fontSize: 16 }}>Plan</Text> */}
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 18,
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}
                >
                  {plan ? `${plan}%` : t("No Plan")}
                  {/* {plan ? `${plan}%` : "No Plan"} */}
                </Text>
                <ProgressBar progress={plan} height={5} />
              </View>
            </View>
            <View style={styles.detailsContainer}>
              {Object.entries(profile).map(([key, value]) => (
                <View key={key} style={styles.detailRow}>
                  <Text style={styles.head}>
                    {t(`${key.charAt(0).toUpperCase() + key.slice(1)}`)}
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    alignSelf: "flex-end",
    marginTop: 20,
    backgroundColor: "#FF81AE",
    padding: 8,
    marginRight: 22,
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
    fontSize: 16,
  },
  data: {
    fontSize: 20,
    fontWeight: "500",
    paddingVertical: 0,
    marginVertical: 5,
    height: 20,
    alignItems: "center",
  },
  divider: {
    backgroundColor: "#e0e0df",
    height: 1,
    marginVertical: 10,
  },
  detailRow: {
    marginBottom: 10,
  },
});

export default ProfileScreen;
