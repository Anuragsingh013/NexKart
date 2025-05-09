// screens/Home/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import BannerSlider from '../../components/BannerSlider';
import { CATEGORIES, PRODUCTS, styles } from '../../constants/products';
import { showSuccessMessage, showSuccessMessageNew } from '../../utils/helper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../../assets/images';
import Header from '../../components/Header';
import { dynamicSize } from '../../utils/responsive';


const HomeScreen = ({ navigation }: any) => {
  const [featuredProducts, setFeaturedProducts] = useState(PRODUCTS);
  const [activeCategory, setActiveCategory] = useState(PRODUCTS[0].category)
  const filteredProducts = PRODUCTS.filter((item) => item.category == activeCategory)
  const renderProductItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={{ position: "absolute", bottom: dynamicSize(12), right: dynamicSize(12) }}>
        <Ionicons name="arrow-forward" size={12} color="#555" style={{ marginHorizontal: dynamicSize(8) }} />
      </View>
    </TouchableOpacity>
  );

  const renderActiveCategory = ({ item }: any) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={{ position: "absolute", bottom: dynamicSize(12), right: dynamicSize(12) }}>
        <Ionicons name="arrow-forward" size={12} color="#555" style={{ marginHorizontal: dynamicSize(8) }} />
      </View>
    </TouchableOpacity>
  )



  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={16} color="#555" style={{ marginHorizontal: dynamicSize(8) }} />
          <TextInput
            placeholder="Search for brands and products"
            placeholderTextColor="#666"
            style={styles.searchInput}
          />
        </View>
        <BannerSlider />

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View>

          <FlatList
            data={CATEGORIES}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity style={[styles.categoryItem, activeCategory == item && { backgroundColor: "#ff6347" }]} onPress={() => setActiveCategory(item)} >
                  <Text style={[styles.categoryText, activeCategory == item && { color: "#fff" }]}>{item}</Text>
                </TouchableOpacity>
              )
            }}
            // keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginTop: dynamicSize(16) }}
            style={styles.productList}
          />
          <FlatList
            data={filteredProducts}
            renderItem={renderActiveCategory}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginTop: dynamicSize(16) }}
            style={styles.productList}
          />

        </View>

        {/* Featured Products */}
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <FlatList
          data={featuredProducts}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.productList}
        />

        {/* New Arrivals */}
        <Text style={styles.sectionTitle}>New Arrivals</Text>
        <FlatList
          data={featuredProducts.slice().reverse()}
          renderItem={renderProductItem}
          keyExtractor={item => `new-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.productList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;