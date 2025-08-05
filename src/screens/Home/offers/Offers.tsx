// screens/Offers/Offers.tsx
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
    ScrollView,
    StatusBar,
    FlatList,
    Dimensions,
    StyleSheet,
    Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { dynamicSize } from '../../../utils/responsive';
import { FontFamily } from '../../../assets/fonts';

const { width: screenWidth } = Dimensions.get('window');

const Offers = () => {
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Flash Sale', 'Electronics', 'Fashion', 'Home', 'Sports'];

    const bannerOffers = [
        {
            id: '1',
            title: 'Mega Flash Sale',
            subtitle: 'Up to 80% OFF',
            description: 'Limited time offer on electronics',
            image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400',
            color: ['#ff6b6b', '#ee5a24'],
            textColor: 'white',
            timeLeft: '23:45:12'
        },
        {
            id: '2',
            title: 'Fashion Fiesta',
            subtitle: 'Buy 2 Get 1 Free',
            description: 'On all fashion items',
            image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
            color: ['#667eea', '#764ba2'],
            textColor: 'white',
            timeLeft: '15:30:45'
        },
        {
            id: '3',
            title: 'Home Decor',
            subtitle: '50% OFF',
            description: 'Transform your space',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
            color: ['#74b9ff', '#0984e3'],
            textColor: 'white',
            timeLeft: '08:15:33'
        }
    ];

    const dealOfTheDay = {
        id: 'deal1',
        name: 'Premium Wireless Headphones',
        originalPrice: '₹12,999',
        salePrice: '₹3,999',
        discount: '69% OFF',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
        rating: 4.8,
        reviews: 2847,
        soldCount: 1250,
        totalStock: 2000,
        timeLeft: '12:34:56'
    };

    const categoryOffers = [
        {
            id: '1',
            name: 'Smart Watch Pro',
            originalPrice: '₹15,999',
            salePrice: '₹7,999',
            discount: '50% OFF',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=250',
            category: 'Electronics',
            rating: 4.6,
            isFlashSale: true
        },
        {
            id: '2',
            name: 'Designer Jacket',
            originalPrice: '₹4,999',
            salePrice: '₹2,499',
            discount: '50% OFF',
            image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=250',
            category: 'Fashion',
            rating: 4.3,
            isFlashSale: false
        },
        {
            id: '3',
            name: 'Bluetooth Speaker',
            originalPrice: '₹5,999',
            salePrice: '₹1,999',
            discount: '67% OFF',
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=250',
            category: 'Electronics',
            rating: 4.5,
            isFlashSale: true
        },
        {
            id: '4',
            name: 'Yoga Mat Set',
            originalPrice: '₹2,999',
            salePrice: '₹1,299',
            discount: '57% OFF',
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=250',
            category: 'Sports',
            rating: 4.4,
            isFlashSale: false
        },
        {
            id: '5',
            name: 'Coffee Maker',
            originalPrice: '₹8,999',
            salePrice: '₹4,499',
            discount: '50% OFF',
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=250',
            category: 'Home',
            rating: 4.7,
            isFlashSale: false
        },
        {
            id: '6',
            name: 'Running Shoes',
            originalPrice: '₹6,999',
            salePrice: '₹3,499',
            discount: '50% OFF',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=250',
            category: 'Sports',
            rating: 4.2,
            isFlashSale: true
        }
    ];

    const filteredOffers = selectedCategory === 'All' 
        ? categoryOffers 
        : selectedCategory === 'Flash Sale'
        ? categoryOffers.filter(item => item.isFlashSale)
        : categoryOffers.filter(item => item.category === selectedCategory);

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Icon key={i} name="star" size={12} color="#FFD700" />);
        }

        if (hasHalfStar) {
            stars.push(<Icon key="half" name="star" size={12} color="#FFD700" />);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Icon key={`empty-${i}`} name="star" size={12} color="#E0E0E0" />);
        }

        return stars;
    };

    const BannerOffer = ({ item, index }: { item: any; index: number }) => (
        <TouchableOpacity 
            style={[styles.bannerOffer, { marginLeft: index === 0 ? dynamicSize(20) : dynamicSize(10) }]}
            activeOpacity={0.9}
        >
            <LinearGradient
                colors={item.color}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.bannerGradient}
            >
                <View style={styles.bannerContent}>
                    <View style={styles.bannerTextContainer}>
                        <Text style={[styles.bannerTitle, { color: item.textColor }]}>
                            {item.title}
                        </Text>
                        <Text style={[styles.bannerSubtitle, { color: item.textColor }]}>
                            {item.subtitle}
                        </Text>
                        <Text style={[styles.bannerDescription, { color: item.textColor, opacity: 0.9 }]}>
                            {item.description}
                        </Text>
                        
                        <View style={styles.timerContainer}>
                            <Icon name="clock" size={14} color={item.textColor} />
                            <Text style={[styles.timerText, { color: item.textColor }]}>
                                {item.timeLeft}
                            </Text>
                        </View>
                    </View>
                    
                    <Image source={{ uri: item.image }} style={styles.bannerImage} />
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );

    const CategoryButton = ({ category }: { category: string }) => (
        <TouchableOpacity
            style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton
            ]}
            onPress={() => setSelectedCategory(category)}
            activeOpacity={0.7}
        >
            {selectedCategory === category ? (
                <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.selectedCategoryGradient}
                >
                    <Text style={styles.selectedCategoryText}>{category}</Text>
                </LinearGradient>
            ) : (
                <Text style={styles.categoryText}>{category}</Text>
            )}
        </TouchableOpacity>
    );

    const OfferItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.offerItem} activeOpacity={0.9}>
            <View style={styles.offerImageContainer}>
                <Image source={{ uri: item.image }} style={styles.offerImage} />
                
                {item.isFlashSale && (
                    <View style={styles.flashSaleBadge}>
                        <Icon name="zap" size={12} color="white" />
                        <Text style={styles.flashSaleText}>Flash</Text>
                    </View>
                )}
                
                <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{item.discount}</Text>
                </View>
            </View>

            <View style={styles.offerDetails}>
                <Text style={styles.offerName} numberOfLines={2}>
                    {item.name}
                </Text>

                <View style={styles.ratingContainer}>
                    <View style={styles.starsContainer}>
                        {renderStars(item.rating)}
                    </View>
                    <Text style={styles.ratingText}>({item.rating})</Text>
                </View>

                <View style={styles.priceContainer}>
                    <Text style={styles.salePrice}>{item.salePrice}</Text>
                    <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0.9],
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#667eea" />

            {/* Custom Header */}
            <Animated.View style={[styles.headerContainer, { opacity: headerOpacity }]}>
                <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.header}
                >
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.7}
                    >
                        <Icon name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>

                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>Special Offers</Text>
                        <Text style={styles.headerSubtitle}>Limited time deals</Text>
                    </View>

                    <TouchableOpacity style={styles.searchButton} activeOpacity={0.7}>
                        <Icon name="search" size={20} color="white" />
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>

            <Animated.ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                {/* Banner Offers */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Hot Deals</Text>
                    <FlatList
                        horizontal
                        data={bannerOffers}
                        renderItem={({ item, index }) => <BannerOffer item={item} index={index} />}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingRight: dynamicSize(20) }}
                    />
                </View>

                {/* Deal of the Day */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Deal of the Day</Text>
                    <TouchableOpacity style={styles.dealOfTheDay} activeOpacity={0.9}>
                        <LinearGradient
                            colors={['#ff6b6b', '#ee5a24']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.dealGradient}
                        >
                            <View style={styles.dealContent}>
                                <View style={styles.dealInfo}>
                                    <Text style={styles.dealName}>{dealOfTheDay.name}</Text>
                                    <View style={styles.dealPricing}>
                                        <Text style={styles.dealSalePrice}>{dealOfTheDay.salePrice}</Text>
                                        <Text style={styles.dealOriginalPrice}>{dealOfTheDay.originalPrice}</Text>
                                        <View style={styles.dealDiscountBadge}>
                                            <Text style={styles.dealDiscountText}>{dealOfTheDay.discount}</Text>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.dealStats}>
                                        <View style={styles.dealRating}>
                                            {renderStars(dealOfTheDay.rating)}
                                            <Text style={styles.dealRatingText}>
                                                {dealOfTheDay.rating} ({dealOfTheDay.reviews})
                                            </Text>
                                        </View>
                                        
                                        <View style={styles.stockProgress}>
                                            <Text style={styles.stockText}>
                                                {dealOfTheDay.soldCount} sold
                                            </Text>
                                            <View style={styles.progressBar}>
                                                <View 
                                                    style={[
                                                        styles.progressFill, 
                                                        { width: `${(dealOfTheDay.soldCount / dealOfTheDay.totalStock) * 100}%` }
                                                    ]} 
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.dealTimer}>
                                        <Icon name="clock" size={16} color="white" />
                                        <Text style={styles.dealTimerText}>Ends in {dealOfTheDay.timeLeft}</Text>
                                    </View>
                                </View>
                                
                                <Image source={{ uri: dealOfTheDay.image }} style={styles.dealImage} />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Categories */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesContainer}
                    >
                        {categories.map((category) => (
                            <CategoryButton key={category} category={category} />
                        ))}
                    </ScrollView>
                </View>

                {/* Category Offers */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            {selectedCategory === 'All' ? 'All Offers' : selectedCategory}
                        </Text>
                        <Text style={styles.offerCount}>
                            {filteredOffers.length} offers
                        </Text>
                    </View>
                    
                    <View style={styles.offersGrid}>
                        {filteredOffers.map((item) => (
                            <OfferItem key={item.id} item={item} />
                        ))}
                    </View>
                </View>

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
        zIndex: 1000,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: dynamicSize(20),
        paddingVertical: dynamicSize(15),
        paddingTop: dynamicSize(20),
    },
    backButton: {
        width: dynamicSize(40),
        height: dynamicSize(40),
        borderRadius: dynamicSize(20),
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerCenter: {
        alignItems: 'center',
        flex: 1,
    },
    headerTitle: {
        fontSize: dynamicSize(20),
        fontFamily: FontFamily.sofiaProBold,
        color: 'white',
        marginBottom: dynamicSize(2),
    },
    headerSubtitle: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.sofiaProRegular,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    searchButton: {
        width: dynamicSize(40),
        height: dynamicSize(40),
        borderRadius: dynamicSize(20),
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        flex: 1,
    },
    section: {
        marginBottom: dynamicSize(25),
    },
    sectionTitle: {
        fontSize: dynamicSize(18),
        fontFamily: FontFamily.sofiaProBold,
        color: '#2c3e50',
        marginHorizontal: dynamicSize(20),
        marginBottom: dynamicSize(15),
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: dynamicSize(20),
        marginBottom: dynamicSize(15),
    },
    offerCount: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoRegular,
        color: '#7f8c8d',
    },
    bannerOffer: {
        width: screenWidth * 0.8,
        height: dynamicSize(140),
        marginRight: dynamicSize(10),
        borderRadius: dynamicSize(16),
        overflow: 'hidden',
    },
    bannerGradient: {
        flex: 1,
    },
    bannerContent: {
        flex: 1,
        flexDirection: 'row',
        padding: dynamicSize(20),
    },
    bannerTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    bannerTitle: {
        fontSize: dynamicSize(18),
        fontFamily: FontFamily.sofiaProBold,
        marginBottom: dynamicSize(4),
    },
    bannerSubtitle: {
        fontSize: dynamicSize(24),
        fontFamily: FontFamily.poppinsBold,
        marginBottom: dynamicSize(4),
    },
    bannerDescription: {
        fontSize: dynamicSize(12),
        fontFamily: FontFamily.nunitoRegular,
        marginBottom: dynamicSize(12),
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timerText: {
        fontSize: dynamicSize(12),
        fontFamily: FontFamily.nunitoSemiBold,
        marginLeft: dynamicSize(4),
    },
    bannerImage: {
        width: dynamicSize(80),
        height: dynamicSize(80),
        borderRadius: dynamicSize(12),
        alignSelf: 'center',
    },
    dealOfTheDay: {
        marginHorizontal: dynamicSize(20),
        borderRadius: dynamicSize(16),
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    dealGradient: {
        padding: dynamicSize(20),
    },
    dealContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dealInfo: {
        flex: 1,
    },
    dealName: {
        fontSize: dynamicSize(18),
        fontFamily: FontFamily.sofiaProBold,
        color: 'white',
        marginBottom: dynamicSize(8),
    },
    dealPricing: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: dynamicSize(12),
    },
    dealSalePrice: {
        fontSize: dynamicSize(24),
        fontFamily: FontFamily.poppinsBold,
        color: 'white',
        marginRight: dynamicSize(8),
    },
    dealOriginalPrice: {
        fontSize: dynamicSize(16),
        fontFamily: FontFamily.poppinsRegular,
        color: 'rgba(255, 255, 255, 0.7)',
        textDecorationLine: 'line-through',
        marginRight: dynamicSize(8),
    },
    dealDiscountBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: dynamicSize(8),
        paddingVertical: dynamicSize(4),
        borderRadius: dynamicSize(8),
    },
    dealDiscountText: {
        fontSize: dynamicSize(12),
        fontFamily: FontFamily.nunitoBold,
        color: 'white',
    },
    dealStats: {
        marginBottom: dynamicSize(12),
    },
    dealRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: dynamicSize(8),
    },
    dealRatingText: {
        fontSize: dynamicSize(12),
        fontFamily: FontFamily.nunitoRegular,
        color: 'rgba(255, 255, 255, 0.9)',
        marginLeft: dynamicSize(6),
    },
    stockProgress: {
        marginBottom: dynamicSize(4),
    },
    stockText: {
        fontSize: dynamicSize(12),
        fontFamily: FontFamily.nunitoSemiBold,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: dynamicSize(4),
    },
    progressBar: {
        height: dynamicSize(4),
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: dynamicSize(2),
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: 'white',
    },
    dealTimer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dealTimerText: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoBold,
        color: 'white',
        marginLeft: dynamicSize(6),
    },
    dealImage: {
        width: dynamicSize(100),
        height: dynamicSize(100),
        borderRadius: dynamicSize(12),
        marginLeft: dynamicSize(16),
    },
    categoriesContainer: {
        paddingHorizontal: dynamicSize(20),
    },
    categoryButton: {
        marginRight: dynamicSize(12),
        borderRadius: dynamicSize(20),
        overflow: 'hidden',
    },
    selectedCategoryButton: {
        elevation: 3,
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    selectedCategoryGradient: {
        paddingHorizontal: dynamicSize(20),
        paddingVertical: dynamicSize(10),
    },
    selectedCategoryText: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoBold,
        color: 'white',
    },
    categoryText: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoSemiBold,
        color: '#7f8c8d',
        paddingHorizontal: dynamicSize(20),
        paddingVertical: dynamicSize(10),
        backgroundColor: 'white',
        borderRadius: dynamicSize(20),
        overflow: 'hidden',
    },
    offersGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: dynamicSize(20),
    },
    offerItem: {
        width: (screenWidth - dynamicSize(50)) / 2,
        backgroundColor: 'white',
        borderRadius: dynamicSize(16),
        marginBottom: dynamicSize(15),
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    offerImageContainer: {
        position: 'relative',
        height: dynamicSize(140),
    },
    offerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    flashSaleBadge: {
        position: 'absolute',
        top: dynamicSize(8),
        left: dynamicSize(8),
        backgroundColor: '#ff6b6b',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: dynamicSize(6),
        paddingVertical: dynamicSize(3),
        borderRadius: dynamicSize(8),
    },
    flashSaleText: {
        color: 'white',
        fontSize: dynamicSize(10),
        fontFamily: FontFamily.nunitoBold,
        marginLeft: dynamicSize(2),
    },
    discountBadge: {
        position: 'absolute',
        top: dynamicSize(8),
        right: dynamicSize(8),
        backgroundColor: '#667eea',
        paddingHorizontal: dynamicSize(8),
        paddingVertical: dynamicSize(4),
        borderRadius: dynamicSize(8),
    },
    discountText: {
        color: 'white',
        fontSize: dynamicSize(12),
        fontFamily: FontFamily.nunitoBold,
    },
    offerDetails: {
        padding: dynamicSize(12),
    },
    offerName: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoSemiBold,
        color: '#2c3e50',
        marginBottom: dynamicSize(6),
        lineHeight: dynamicSize(18),
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: dynamicSize(8),
    },
    starsContainer: {
        flexDirection: 'row',
        marginRight: dynamicSize(4),
    },
    ratingText: {
        fontSize: dynamicSize(11),
        fontFamily: FontFamily.nunitoRegular,
        color: '#7f8c8d',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    salePrice: {
        fontSize: dynamicSize(16),
        fontFamily: FontFamily.poppinsBold,
        color: '#667eea',
        marginRight: dynamicSize(6),
    },
    originalPrice: {
        fontSize: dynamicSize(12),
        fontFamily: FontFamily.poppinsRegular,
        color: '#95a5a6',
        textDecorationLine: 'line-through',
    },
    bottomSpacing: {
        height: dynamicSize(30),
    },
});

export default Offers;