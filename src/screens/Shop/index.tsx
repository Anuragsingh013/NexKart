// screens/Shop/ShopScreen.tsx
import React from 'react';
import { FlatList, Image, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { PRODUCTS, styles } from '../../constants/products';


const ShopScreen = ({ navigation }:any) => {
  const renderProductItem = ({ item }:any) => (
    <TouchableOpacity
      style={styles.productCardGrid}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.productImageGrid} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={PRODUCTS}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        numColumns={2}
        style={styles.shopList}
      />
    </SafeAreaView>
  );
};

export default ShopScreen;