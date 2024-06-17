import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';

const Cart = () => {
  const cartItems = [
    { id: '1', title: 'Item 1', price: 10, description: 'This is item 1 description. It could be longer to demonstrate wrapping within the card boundaries.', image: require('../assets/Images/cars.avif') },
    { id: '2', title: 'Item 2', price: 20, description: 'This is item 2 description.', image: require('../assets/Images/decorations.avif') },
    { id: '3', title: 'Item 3', price: 30, description: 'This is item 3 description.', image: require('../assets/Images/venue1.avif') },
    { id: '4', title: 'Item 4', price: 40, description: 'This is item 4 description.', image: require('../assets/Images/venue1.avif') },
    { id: '5', title: 'Item 5', price: 50, description: 'This is item 5 description.', image: require('../assets/Images/venue1.avif') },
  ];

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const proceedToPayment = () => {
    alert('Proceeding to payment...');
  };
  const renderDesc = (text)=>{
    if(text.length>50){
        return `${text.substring(0,50)}...`;
    }
    return text

  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Your Wedding Plan!</Text>
      <Text style={styles.subtitle}>Review your cart and proceed to payment</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Card.Cover source={item.image} style={styles.image} />
              <View >
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.description}>{renderDesc(item.description)}</Text>
                <Text style={styles.price}>Price: ${item.price}</Text>
              </View>
              </View>
            </Card>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Package:</Text>
          <Text style={styles.totalAmount}>${calculateTotalPrice()}</Text>
        </View>
        <Button
          mode="contained"
          style={styles.paymentButton}
          onPress={proceedToPayment}
          labelStyle={{ fontSize: 16 }}
        >
          Proceed to Payment
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF81AE',
    textAlign: 'center',
    marginTop: 25,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    // borderWidth: 3,
    // borderColor: '#f5dcef',
  },
  cardContent: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  image: {
    width: 170,
    height: 130,
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    marginLeft: 10,
    maxWidth: '80%', 

  },
  price: {
    fontSize: 16,
    color: 'green',
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 1,
  },
  totalContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF81AE',
    marginRight:4
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop:5,
    marginLeft:2
  },
  paymentButton: {
    backgroundColor: '#FF81AE',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    minWidth: '40%',
    fontWeight: 'bold',
    marginTop:7
  },
  contentContainer: {
    paddingBottom: 80,
  },
});

export default Cart;
