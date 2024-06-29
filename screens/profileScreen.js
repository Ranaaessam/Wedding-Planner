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
import Icon from "react-native-vector-icons/FontAwesome";
import ProgressBar from "../components/progressBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlanPercentage,
  getUserProfile,
  updateProfile,
} from "../StateManagement/slices/ProfileSlice";
import storage from "../Storage/storage";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ThemeContext";
import RNPickerSelect from "react-native-picker-select";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState("");
  const [budget, setBudget] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [weddingDate, setWeddingDate] = useState(null);

  const userDetails = useSelector((state) => state.user.user);
  const names = useSelector((state) => state.home.names);
  const plan = useSelector((state) => state.user.plan);
  const { t } = useTranslation();
  const { theme } = useTheme();

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
    const weddingDate = new Date(userDetails.weddingdate);
    const year = weddingDate.getFullYear();
    const month = String(weddingDate.getMonth() + 1).padStart(2, "0");
    const date = String(weddingDate.getDate()).padStart(2, "0");
    if (userDetails) {
      setProfile({
        groomName: names["user1Name"] || "",
        brideName: names["user2Name"] || "",
        location: userDetails.location,
        weddingdate: `${year}-${month}-${date}`,
      });
      setImage(userDetails.image);
      setBudget(userDetails.budget);
      setWeddingDate(new Date(userDetails.weddingdate));
    }
  }, [userDetails, names]);

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

  const locationOptions = [
    { label: "Cairo", value: "Cairo" },
    { label: "Giza", value: "Giza" },
    { label: "Alexandria", value: "Alexandria" },
    { label: "Mansoura", value: "Mansoura" },
  ];

  if (profile === null) {
    return (
      <View style={styles.loadingContainer}>
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
          <View
            style={[styles.container, { backgroundColor: theme.background }]}
          >
            <Image
              source={{
                uri: "https://img.freepik.com/premium-vector/avatar-wedding-couple_24911-14448.jpg",
              }}
              style={styles.avatar}
            />
            <ProfilePicture imgUrl={image} />
            <TouchableOpacity
              style={[styles.editBtn, { backgroundColor: theme.extra }]}
              onPress={handleEditToggle}
            >
              <Text style={styles.editText}>
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
                <Text style={styles.label}>{t("Budget")}</Text>
                {isEditing ? (
                  <TextInput
                    style={[styles.input, { backgroundColor: theme.text }]}
                    value={budget}
                    onChangeText={(text) => setBudget(text)}
                  />
                ) : (
                  <Text style={styles.value}>${budget}</Text>
                )}
              </View>
              <View style={styles.planContainer}>
                <Text style={styles.label}>{t("Plan")}</Text>
                <Text style={styles.value}>
                  {plan ? `${plan}%` : t("No Plan")}
                </Text>
                <ProgressBar progress={plan} height={5} />
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.label}>{t("Groom Name")}</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={profile.groomName}
                    onChangeText={(text) => handleChange("groomName", text)}
                  />
                ) : (
                  <Text style={styles.value}>{profile.groomName}</Text>
                )}
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>{t("Bride Name")}</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={profile.brideName}
                    onChangeText={(text) => handleChange("brideName", text)}
                  />
                ) : (
                  <Text style={styles.value}>{profile.brideName}</Text>
                )}
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>{t("Location")}</Text>
                {isEditing ? (
                  <View style={styles.pickerContainer}>
                    <RNPickerSelect
                      onValueChange={(value) => handleChange("location", value)}
                      items={locationOptions}
                      value={profile.location}
                      style={pickerSelectStyles}
                      useNativeAndroidPickerStyle={false}
                      Icon={() => (
                        <Icon
                          name="chevron-down"
                          size={20}
                          color="gray"
                          style={styles.pickerIcon}
                        />
                      )}
                    />
                  </View>
                ) : (
                  <Text style={styles.value}>{profile.location}</Text>
                )}
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>{t("Wedding Date")}</Text>
                {isEditing ? (
                  <View style={styles.inputContainer}>
                    <FontAwesome
                      name="calendar"
                      size={24}
                      color="gray"
                      style={styles.inputIcon}
                    />
                    <TouchableOpacity
                      style={{ height: 45, justifyContent: "center" }}
                      onPress={() => setShowPicker(true)}
                    >
                      {weddingDate ? (
                        <Text>{weddingDate.toDateString()}</Text>
                      ) : (
                        <Text style={{ color: "#AAAA" }}>
                          Select Wedding Date
                        </Text>
                      )}
                    </TouchableOpacity>
                    {showPicker && (
                      <DateTimePicker
                        value={weddingDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                          setShowPicker(false);
                          setWeddingDate(selectedDate);
                          handleChange("weddingdate", selectedDate);
                        }}
                      />
                    )}
                  </View>
                ) : (
                  <Text style={styles.value}>{profile.weddingdate}</Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "white",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "white",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  editText: {
    paddingRight: 10,
    fontWeight: "500",
    color: "white",
    fontSize: 18,
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
  detailRow: {
    marginBottom: 10,
  },
  label: {
    color: "#555",
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingVertical: Platform.OS === "ios" ? 15 : 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "white",
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "transparent",
    fontSize: 16,
    backgroundColor: "white",
    marginBottom: 5,
  },
  pickerIcon: {
    position: "absolute",
    top: 12,
    right: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    backgroundColor: "white",
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
});

export default ProfileScreen;
