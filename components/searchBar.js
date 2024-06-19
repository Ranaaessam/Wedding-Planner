import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { IconButton } from "react-native-paper";

const SearchBar = () => {
  const [searchValue, setSearch] = useState("");
  const handleSearch = (text) => {
    setSearch(text);
  };
  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.textInputStyle}
        value={searchValue}
        onChangeText={handleSearch}
        placeholder="Search for venues or suppliers.."
      ></TextInput>
      <IconButton icon="magnify" size={20} iconColor="#FF81AE"></IconButton>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "88%",
    margin: 25,
    marginTop: 20,
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
