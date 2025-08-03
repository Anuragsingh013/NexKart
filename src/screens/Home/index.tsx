// screens/Home/HomeScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
  SafeAreaView, ScrollView, TextInput, AppState,
  Alert,
  Animated
} from 'react-native';
import BannerSlider from '../../components/BannerSlider';
import { CATEGORIES, PRODUCTS, styles } from '../../constants/products';
import { showSuccessMessage } from '../../utils/helper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import { dynamicSize } from '../../utils/responsive';
import { NativeModules } from 'react-native';
// import { tabBarTranslateY } from '../navigation/AppNavigator'
import { tabBarTranslateY } from '../../navigation/AppNavigator';
import { Colors } from '../../constants/color';
const { LauncherIconModule } = NativeModules;
console.log('LauncherIconModule', LauncherIconModule);

const HomeScreen = ({ navigation }: any) => {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState(PRODUCTS);
  const [activeCategory, setActiveCategory] = useState(PRODUCTS[0].category);
  const filteredProducts = PRODUCTS.filter(item => item.category === activeCategory);


  const scrollOffset = useRef(0);

  const onScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > scrollOffset.current ? 'down' : 'up';

    scrollOffset.current = currentOffset;

    if (direction === 'down') {
      Animated.timing(tabBarTranslateY, {
        toValue: 80,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(tabBarTranslateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  const premiumRef = useRef(isPremiumUser);
  useEffect(() => {
    premiumRef.current = isPremiumUser;
    showSuccessMessage(premiumRef.current ? 'Welcome back, Premium User!' : 'Welcome back!');
  }, [isPremiumUser]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (nextState) => {
      console.log('App state is now', nextState);

      if (nextState === 'background') {
        changeIcon(premiumRef.current ? 'premiumIcon' : 'MainActivity');
      }

    });

    return () => sub.remove();
  }, []);


  // Function to change launcher icon
  const changeIcon = async (iconName: string) => {
    try {
      const result = await LauncherIconModule.changeIcon(iconName);
      console.log(result);
    } catch (e) {
      console.log('Icon change failed', e);
    }
  };

  const makeUserPremium = () => {
    setIsPremiumUser(true);
    showSuccessMessage('You are now a Premium User!');
  };


  const revertToNormalUser = () => {
    setIsPremiumUser(false);
    showSuccessMessage('You are now a Free User.');
  };


  // AppState listener for background/foreground icon consistency
  useEffect(() => {
    const sub = AppState.addEventListener('change', (nextState) => {
      console.log('App state is now', nextState);

      if (nextState === 'background') {
        changeIcon(isPremiumUser ? 'premiumIcon' : 'MainActivity');
      }

      if (nextState === 'active') {
        showSuccessMessage(isPremiumUser ? 'Welcome back, Premium User!' : 'Welcome back!');
      }
    });

    return () => sub.remove();
  }, [isPremiumUser]);


  const renderProductItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => {
        navigation.navigate('ProductDetails', { product: item })
      }}
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
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {/* <ScrollView */}
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
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
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.categoryItem, activeCategory === item && { backgroundColor: Colors.coral }]}
                onPress={() => {
                  setActiveCategory(item);
                }}
              >
                <Text style={[styles.categoryText, activeCategory === item && { color: "#fff" }]}>{item}</Text>
              </TouchableOpacity>
            )}
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

        {/* Optional test buttons for simulating premium upgrade */}
        <TouchableOpacity
          onPress={makeUserPremium}
          style={{ backgroundColor: 'green', padding: 10, margin: 10, borderRadius: 6 }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Become Premium</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={revertToNormalUser}
          style={{ backgroundColor: 'red', padding: 10, margin: 10, borderRadius: 6 }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Revert to Free User</Text>
        </TouchableOpacity>
        {/* </ScrollView> */}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
