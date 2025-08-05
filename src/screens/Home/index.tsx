// screens/Home/HomeScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
  SafeAreaView, ScrollView, TextInput, AppState,
  Alert,
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet
} from 'react-native';
import BannerSlider from '../../components/BannerSlider';
import { CATEGORIES, PRODUCTS, styles as oldStyles } from '../../constants/products';
import { showSuccessMessage } from '../../utils/helper';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header';
import { dynamicSize, getFontSize } from '../../utils/responsive';
import { NativeModules } from 'react-native';
import { tabBarTranslateY } from '../../navigation/AppNavigator';
import { Colors } from '../../constants/color';
import { FontFamily } from '../../assets/fonts';
import Images from '../../assets/images';

const { LauncherIconModule } = NativeModules;
const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState(PRODUCTS);
  const [activeCategory, setActiveCategory] = useState(PRODUCTS[0].category);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const filteredProducts = PRODUCTS.filter(item => item.category === activeCategory);

  const scrollOffset = useRef(0);
  const searchAnimation = useRef(new Animated.Value(0)).current;

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

      if (nextState === 'active') {
        showSuccessMessage(isPremiumUser ? 'Welcome back, Premium User!' : 'Welcome back!');
      }
    });

    return () => sub.remove();
  }, [isPremiumUser]);

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

  // Search animation
  useEffect(() => {
    Animated.timing(searchAnimation, {
      toValue: isSearchFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isSearchFocused]);

  const renderProductItem = ({ item, index }: any) => (
    <TouchableOpacity
      style={[styles.productCard, { marginLeft: index === 0 ? dynamicSize(20) : 0 }]}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
      activeOpacity={0.8}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productBadge}>
          <Text style={styles.productBadgeText}>NEW</Text>
        </View>
        <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.7}>
          <Icon name="heart" size={16} color="#ff6b6b" />
        </TouchableOpacity>
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.productPriceContainer}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addToCartButton} activeOpacity={0.8}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.addToCartGradient}
            >
              <Icon name="plus" size={16} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item, index }: any) => {
    const isActive = activeCategory === item;
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          { marginLeft: index === 0 ? dynamicSize(20) : 0 },
          isActive && styles.activeCategoryItem
        ]}
        onPress={() => setActiveCategory(item)}
        activeOpacity={0.8}
      >
        {isActive ? (
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.categoryGradient}
          >
            <Text style={[styles.categoryText, styles.activeCategoryText]}>{item}</Text>
          </LinearGradient>
        ) : (
          <Text style={styles.categoryText}>{item}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const PremiumBanner = () => (
    <View style={styles.premiumBanner}>
      <LinearGradient
        colors={isPremiumUser ? ['#27ae60', '#2ecc71'] : ['#f39c12', '#e67e22']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.premiumGradient}
      >
        <View style={styles.premiumContent}>
          <View style={styles.premiumLeft}>
            <Icon
              name={isPremiumUser ? "star" : "zap"}
              size={24}
              color="white"
            />
            <View style={styles.premiumTextContainer}>
              <Text style={styles.premiumTitle}>
                {isPremiumUser ? 'Premium Member' : 'Upgrade to Premium'}
              </Text>
              <Text style={styles.premiumSubtitle}>
                {isPremiumUser ? 'Enjoy exclusive benefits' : 'Unlock exclusive features'}
              </Text>
            </View>
          </View>
          {!isPremiumUser && (
            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={makeUserPremium}
              activeOpacity={0.8}
            >
              <Text style={styles.upgradeButtonText}>Upgrade</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </View>
  );

  const QuickActions = () => (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        <TouchableOpacity style={styles.quickActionItem} activeOpacity={0.8}
          onPress={() => {
            // navigation.navigate("Profile")
            navigation.navigate('ProfileTab', {
              screen: 'ordersScreen',
              params: {}
            });
          }}

        >
          <View style={styles.quickActionIcon}>
            <Icon name="shopping-bag" size={24} color="#667eea" />
          </View>
          <Text style={styles.quickActionText}>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickActionItem} activeOpacity={0.8}
          onPress={() => {
            // navigation.navigate("Profile")
            navigation.navigate('ProfileTab', {
              screen: 'WishlistScreen',
              params: {}
            });
          }}
        >
          <View style={styles.quickActionIcon}>
            <Icon name="heart" size={24} color="#ff6b6b" />
          </View>
          <Text style={styles.quickActionText}>Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickActionItem} activeOpacity={0.8}
          onPress={() => {
            // navigation.navigate("Profile")
            navigation.navigate('Offers', {
            });
          }}
        >
          <View style={styles.quickActionIcon}>
            <Icon name="gift" size={24} color="#f39c12" />
          </View>
          <Text style={styles.quickActionText}>Offers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickActionItem} activeOpacity={0.8}
         onPress={() => {
            // navigation.navigate("Profile")
            navigation.navigate('SupportScreen', {
            });
          }}
        >
          <View style={styles.quickActionIcon}>
            <Icon name="headphones" size={24} color="#9b59b6" />
          </View>
          <Text style={styles.quickActionText}>Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Modern Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Good Morning</Text>
            <Text style={styles.userNameText}>Anurag Singh</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
              <Icon name="bell" size={20} color="#2c3e50" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileButton} activeOpacity={0.7}
              onPress={() => {
                // navigation.navigate("Profile")
                navigation.navigate('ProfileTab', {
                  screen: 'Profile',
                  params: {}
                });
              }}
            >
              <Image
                source={Images.anuragLatest}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Enhanced Search Bar */}
        <Animated.View
          style={[
            styles.searchContainer,
            {
              borderColor: searchAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['#e0e0e0', '#667eea']
              })
            }
          ]}
        >
          <Icon name="search" size={20} color="#667eea" />
          <TextInput
            placeholder="Search for brands and products"
            placeholderTextColor="#95a5a6"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
              <Icon name="x" size={18} color="#95a5a6" />
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>

      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Premium Banner */}
        <PremiumBanner />

        {/* Banner Slider */}
        {/* <BannerSlider /> */}

        {/* Quick Actions */}
        <QuickActions />

        {/* Categories */}
        <View style={[styles.sectionContainer, { marginTop: dynamicSize(24) }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={CATEGORIES}
            renderItem={renderCategoryItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Category Products */}
        {activeCategory && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{activeCategory}</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.seeAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={filteredProducts}
              renderItem={renderProductItem}
              keyExtractor={item => `category-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsList}
            />
          </View>
        )}

        {/* Featured Products */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={featuredProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>

        {/* New Arrivals */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Arrivals</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={featuredProducts.slice().reverse()}
            renderItem={renderProductItem}
            keyExtractor={item => `new-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>

        {/* Test Buttons (Hidden in production) */}
        {__DEV__ && (
          <View style={styles.testButtonsContainer}>
            <TouchableOpacity
              onPress={makeUserPremium}
              style={styles.testButton}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#27ae60', '#2ecc71']}
                style={styles.testButtonGradient}
              >
                <Text style={styles.testButtonText}>Become Premium</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={revertToNormalUser}
              style={styles.testButton}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#e74c3c', '#c0392b']}
                style={styles.testButtonGradient}
              >
                <Text style={styles.testButtonText}>Revert to Free User</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    backgroundColor: 'white',
    paddingHorizontal: dynamicSize(20),
    paddingTop: dynamicSize(15),
    paddingBottom: dynamicSize(20),
    borderBottomLeftRadius: dynamicSize(24),
    borderBottomRightRadius: dynamicSize(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: dynamicSize(20),
  },
  greetingContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: dynamicSize(14),
    fontFamily: FontFamily.nunitoRegular,
    color: '#7f8c8d',
    marginBottom: dynamicSize(4),
  },
  userNameText: {
    fontSize: dynamicSize(22),
    fontFamily: FontFamily.sofiaProBold,
    color: '#2c3e50',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: dynamicSize(44),
    height: dynamicSize(44),
    borderRadius: dynamicSize(22),
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: dynamicSize(12),
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: dynamicSize(8),
    right: dynamicSize(8),
    width: dynamicSize(12),
    height: dynamicSize(12),
    borderRadius: dynamicSize(6),
    backgroundColor: '#ff6b6b',
  },
  profileButton: {
    width: dynamicSize(44),
    height: dynamicSize(44),
    borderRadius: dynamicSize(22),
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: dynamicSize(16),
    paddingHorizontal: dynamicSize(16),
    // paddingVertical: dynamicSize(14),
    borderWidth: dynamicSize(1),
    borderColor: '#e0e0e0',
  },
  searchInput: {
    flex: 1,
    fontSize: getFontSize(16),
    fontFamily: FontFamily.nunitoMedium,
    color: '#2c3e50',
    marginLeft: dynamicSize(12),
  },
  scrollContent: {
    paddingBottom: dynamicSize(100),
  },
  premiumBanner: {
    marginHorizontal: dynamicSize(20),
    marginTop: dynamicSize(20),
    borderRadius: dynamicSize(16),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  premiumGradient: {
    padding: dynamicSize(20),
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  premiumLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  premiumTextContainer: {
    marginLeft: dynamicSize(16),
  },
  premiumTitle: {
    fontSize: dynamicSize(18),
    fontFamily: FontFamily.sofiaProBold,
    color: 'white',
    marginBottom: dynamicSize(4),
  },
  premiumSubtitle: {
    fontSize: dynamicSize(14),
    fontFamily: FontFamily.nunitoRegular,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  upgradeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: dynamicSize(16),
    paddingVertical: dynamicSize(8),
    borderRadius: dynamicSize(12),
  },
  upgradeButtonText: {
    fontSize: dynamicSize(14),
    fontFamily: FontFamily.nunitoSemiBold,
    color: 'white',
  },
  quickActionsContainer: {
    marginTop: dynamicSize(30),
    // backgroundColor: "red",
    paddingHorizontal: dynamicSize(16)
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: dynamicSize(8)
    // paddingHorizontal: dynamicSize(20),
  },
  quickActionItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: dynamicSize(60),
    height: dynamicSize(60),
    borderRadius: dynamicSize(30),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: dynamicSize(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionText: {
    fontSize: dynamicSize(12),
    fontFamily: FontFamily.nunitoMedium,
    color: '#2c3e50',
    textAlign: 'center',
  },
  sectionContainer: {
    marginTop: dynamicSize(12),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: dynamicSize(20),
    marginBottom: dynamicSize(16),
  },
  sectionTitle: {
    fontSize: getFontSize(20),
    fontFamily: FontFamily.sofiaProBold,
    color: '#2c3e50',
  },
  seeAllText: {
    fontSize: dynamicSize(14),
    fontFamily: FontFamily.nunitoSemiBold,
    color: '#667eea',
  },
  categoriesList: {
    paddingRight: dynamicSize(20),
  },
  categoryItem: {
    marginRight: dynamicSize(12),
    borderRadius: dynamicSize(24),
    borderWidth: dynamicSize(1),
    borderColor: "#E0E0E0",
    overflow: 'hidden',
  },
  activeCategoryItem: {
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  categoryGradient: {
    paddingHorizontal: dynamicSize(24),
    // paddingVertical: dynamicSize(12),
  },
  categoryText: {
    fontSize: getFontSize(14),
    fontFamily: FontFamily.nunitoSemiBold,
    color: '#2c3e50',
    paddingHorizontal: dynamicSize(24),
    paddingVertical: dynamicSize(12),
  },
  activeCategoryText: {
    color: 'white',
    padding: 0,
  },
  productsList: {
    paddingRight: dynamicSize(20),
    paddingVertical: dynamicSize(8),
  },
  productCard: {
    width: dynamicSize(180),
    backgroundColor: 'white',
    borderRadius: dynamicSize(16),
    marginRight: dynamicSize(16),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  productImageContainer: {
    position: 'relative',
    height: dynamicSize(140),
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productBadge: {
    position: 'absolute',
    top: dynamicSize(12),
    left: dynamicSize(12),
    backgroundColor: '#ff6b6b',
    paddingHorizontal: dynamicSize(8),
    paddingVertical: dynamicSize(4),
    borderRadius: dynamicSize(8),
  },
  productBadgeText: {
    fontSize: dynamicSize(10),
    fontFamily: FontFamily.nunitoBold,
    color: 'white',
  },
  favoriteButton: {
    position: 'absolute',
    top: dynamicSize(12),
    right: dynamicSize(12),
    width: dynamicSize(32),
    height: dynamicSize(32),
    borderRadius: dynamicSize(16),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    padding: dynamicSize(16),
  },
  productName: {
    fontSize: dynamicSize(14),
    fontFamily: FontFamily.nunitoSemiBold,
    color: '#2c3e50',
    marginBottom: dynamicSize(8),
    lineHeight: dynamicSize(20),
  },
  productPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: dynamicSize(16),
    fontFamily: FontFamily.poppinsBold,
    color: '#667eea',
  },
  addToCartButton: {
    width: dynamicSize(32),
    height: dynamicSize(32),
    borderRadius: dynamicSize(16),
    overflow: 'hidden',
  },
  addToCartGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testButtonsContainer: {
    marginTop: dynamicSize(30),
    paddingHorizontal: dynamicSize(20),
  },
  testButton: {
    marginBottom: dynamicSize(12),
    borderRadius: dynamicSize(12),
    overflow: 'hidden',
  },
  testButtonGradient: {
    paddingVertical: dynamicSize(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  testButtonText: {
    fontSize: dynamicSize(16),
    fontFamily: FontFamily.nunitoSemiBold,
    color: 'white',
  },
  bottomSpacing: {
    height: dynamicSize(30),
  },
});

export default HomeScreen;