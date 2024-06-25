import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { searchAll } from "../../StateManagement/slices/SearchSlice";
const SearchBar = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [searchValue, setSearch] = useState("");
  const handleSearch = (text) => {
    setSearch(text);
  };
  const onPress = () => {
    dispatch(searchAll(searchValue));
    navigate.navigate("SearchResults", { searchQuery: searchValue });
  };
  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.textInputStyle}
        value={searchValue}
        onChangeText={handleSearch}
        onSubmitEditing={onPress}
        placeholder="Search by name"
      ></TextInput>
      <IconButton
        icon="magnify"
        size={20}
        iconColor="#4C134E"
        onPress={onPress}
      ></IconButton>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "88%",
    margin: 25,
    marginTop: "10%",
    backgroundColor: "#FAFAFA",
    shadowOpacity: 0,
    borderRadius: 15,
  },
  textInputStyle: {
    flex: 1,
    borderRadius: 15,
    height: 50,
    paddingHorizontal: 20,
  },
});

export default SearchBar;
