import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Modal, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';

const Settings = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setDropdownVisible(false);
  };

  const data = [
    { id: 'profile', icon: 'user', text: 'Profile', onPress: ()=>{} },
    { id: 'favorites', icon: 'heart', text: 'Favorites', onPress: ()=>{navigation.navigate('Favourites')} },
    { id: 'language', icon: 'globe', text: selectedLanguage === 'en' ? 'English' : 'Arabic', onPress: ()=>{setDropdownVisible(!isDropdownVisible)} },
    { id: 'contactUs', icon: 'envelope', text: 'Contact Us', onPress: ()=>{} },
    { id: 'complaints', icon: 'exclamation-triangle', text: 'Complaints', onPress: ()=>{navigation.navigate('Complaint')} },
    { id: 'darkMode', icon: 'adjust', text: 'Dark Mode', onPress: ()=>{setIsDarkMode(!setIsDarkMode)} },
    { id: 'logout', icon: 'share', text: 'Log Out', onPress: () => {alert("Logged Out")} }, 
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.optionContainer} onPress={item.onPress}>
      <Icon name={item.icon} type='font-awesome' style={styles.icon} />
      <Text style={styles.optionText}>{item.text}</Text>
      {item.id === 'language' && (
        <Icon name='caret-down' type='font-awesome' />
      )}
      {item.id === 'darkMode' && (
        <Switch
          value={isDarkMode}
          onValueChange={ ()=>{setIsDarkMode(x => !x)}}
          style={styles.switch}
        />
      )}
    </TouchableOpacity>
  );



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name='gear' type='font-awesome' size={24} />
        <Text style={styles.title}>Settings</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType='slide'
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => selectLanguage('en')}>
            <Text style={styles.dropdownItemText}>▫English</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => selectLanguage('ar')}>
            <Text style={styles.dropdownItemText}>▫Arabic</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 26,
    marginBottom: 18,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 24,
    color: '#4C134E',
    flex: 1,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdown: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    top: 400, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
  },
  dropdownItemText: {
    fontSize: 18,
    color: '#4C134E',
  },
});

export default Settings;
