// screens/Wishlist/WishlistScreen.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
    ScrollView,
    StatusBar,
    Alert,
    Animated,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { dynamicSize } from '../../../utils/responsive';
import { FontFamily } from '../../../assets/fonts';


const { width: screenWidth } = Dimensions.get('window');

const WishlistScreen = () => {
    const navigation = useNavigation();
    const [wishlistItems, setWishlistItems] = useState([
        {
            id: '1',
            name: 'Wireless Bluetooth Headphones',
            price: '₹2,999',
            originalPrice: '₹4,999',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
            rating: 4.5,
            reviews: 128,
            inStock: true,
            discount: '40% OFF'
        },
        {
            id: '2',
            name: 'Premium Cotton T-Shirt',
            price: '₹899',
            originalPrice: '₹1,299',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
            rating: 4.2,
            reviews: 89,
            inStock: true,
            discount: '31% OFF'
        },
        {
            id: '3',
            name: 'Smart Fitness Watch',
            price: '₹8,999',
            originalPrice: '₹12,999',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
            rating: 4.7,
            reviews: 256,
            inStock: false,
            discount: '31% OFF'
        },
        {
            id: '4',
            name: 'Leather Backpack',
            price: '₹3,499',
            originalPrice: '₹5,999',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300',
            rating: 4.3,
            reviews: 67,
            inStock: true,
            discount: '42% OFF'
        },
        {
            id: '5',
            name: 'Wireless Charging Pad',
            price: '₹1,599',
            originalPrice: '₹2,499',
            image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300',
            rating: 4.1,
            reviews: 94,
            inStock: true,
            discount: '36% OFF'
        }
    ]);

    const removeFromWishlist = (itemId: string) => {
        Alert.alert(
            'Remove Item',
            'Are you sure you want to remove this item from your wishlist?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: () => {
                        setWishlistItems(prev => prev.filter(item => item.id !== itemId));
                    }
                }
            ]
        );
    };

    const addToCart = (item: any) => {
        Alert.alert('Added to Cart', `${item.name} has been added to your cart!`);
    };

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

    const WishlistItem = ({ item, index }: { item: any; index: number }) => (
        <View style={styles.wishlistItem}>
            <View style={styles.itemImageContainer}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />

                {/* Discount Badge */}
                {item.discount && (
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{item.discount}</Text>
                    </View>
                )}

                {/* Stock Status */}
                {!item.inStock && (
                    <View style={styles.outOfStockOverlay}>
                        <Text style={styles.outOfStockText}>Out of Stock</Text>
                    </View>
                )}
            </View>

            <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={2}>
                    {item.name}
                </Text>

                {/* Rating */}
                <View style={styles.ratingContainer}>
                    <View style={styles.starsContainer}>
                        {renderStars(item.rating)}
                    </View>
                    <Text style={styles.ratingText}>
                        {item.rating} ({item.reviews})
                    </Text>
                </View>

                {/* Price */}
                <View style={styles.priceContainer}>
                    <Text style={styles.currentPrice}>{item.price}</Text>
                    <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={[
                            styles.addToCartButton,
                            !item.inStock && styles.disabledButton
                        ]}
                        onPress={() => addToCart(item)}
                        disabled={!item.inStock}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={item.inStock ? ['#667eea', '#764ba2'] : ['#bdc3c7', '#95a5a6']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.addToCartGradient}
                        >
                            <Icon name="shopping-cart" size={16} color="white" />
                            <Text style={styles.addToCartText}>
                                {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removeFromWishlist(item.id)}
                        activeOpacity={0.7}
                    >
                        <Icon name="x" size={20} color="#ff6b6b" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#667eea" />

            {/* Custom Header */}
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
                    <Text style={styles.headerTitle}>My Wishlist</Text>
                    <Text style={styles.headerSubtitle}>
                        {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
                    </Text>
                </View>

                <TouchableOpacity style={styles.shareButton} activeOpacity={0.7}>
                    <Icon name="share-2" size={20} color="white" />
                </TouchableOpacity>
            </LinearGradient>

            {wishlistItems.length === 0 ? (
                /* Empty State */
                <View style={styles.emptyState}>
                    <Icon name="heart" size={80} color="#E0E0E0" />
                    <Text style={styles.emptyStateTitle}>Your wishlist is empty</Text>
                    <Text style={styles.emptyStateSubtitle}>
                        Start adding items you love to see them here
                    </Text>
                    <TouchableOpacity
                        style={styles.browseButton}
                        onPress={() => {
                            // navigation.navigate('Home')
                        }}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#667eea', '#764ba2']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.browseButtonGradient}
                        >
                            <Text style={styles.browseButtonText}>Browse Products</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            ) : (
                /* Wishlist Items */
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Quick Actions */}
                    <View style={styles.quickActions}>
                        <TouchableOpacity style={styles.quickActionButton} activeOpacity={0.7}>
                            <Icon name="shopping-cart" size={18} color="#667eea" />
                            <Text style={styles.quickActionText}>Add All to Cart</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quickActionButton} activeOpacity={0.7}>
                            <Icon name="trash-2" size={18} color="#ff6b6b" />
                            <Text style={[styles.quickActionText, { color: '#ff6b6b' }]}>
                                Clear All
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Wishlist Items */}
                    {wishlistItems.map((item, index) => (
                        <WishlistItem key={item.id} item={item} index={index} />
                    ))}

                    {/* Bottom Spacing */}
                    <View style={styles.bottomSpacing} />
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
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
    shareButton: {
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
    scrollContent: {
        paddingBottom: dynamicSize(20),
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: dynamicSize(20),
        paddingVertical: dynamicSize(15),
    },
    quickActionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: dynamicSize(20),
        paddingVertical: dynamicSize(12),
        borderRadius: dynamicSize(12),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    quickActionText: {
        marginLeft: dynamicSize(8),
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoSemiBold,
        color: '#667eea',
    },
    wishlistItem: {
        backgroundColor: 'white',
        marginHorizontal: dynamicSize(20),
        marginBottom: dynamicSize(15),
        borderRadius: dynamicSize(16),
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    itemImageContainer: {
        position: 'relative',
        height: dynamicSize(200),
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    discountBadge: {
        position: 'absolute',
        top: dynamicSize(12),
        left: dynamicSize(12),
        backgroundColor: '#ff6b6b',
        paddingHorizontal: dynamicSize(8),
        paddingVertical: dynamicSize(4),
        borderRadius: dynamicSize(8),
    },
    discountText: {
        color: 'white',
        fontSize: dynamicSize(12),
        fontFamily: FontFamily.nunitoBold,
    },
    outOfStockOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    outOfStockText: {
        color: 'white',
        fontSize: dynamicSize(16),
        fontFamily: FontFamily.nunitoBold,
    },
    itemDetails: {
        padding: dynamicSize(16),
    },
    itemName: {
        fontSize: dynamicSize(16),
        fontFamily: FontFamily.nunitoSemiBold,
        color: '#2c3e50',
        marginBottom: dynamicSize(8),
        lineHeight: dynamicSize(22),
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: dynamicSize(12),
    },
    starsContainer: {
        flexDirection: 'row',
        marginRight: dynamicSize(8),
    },
    ratingText: {
        fontSize: dynamicSize(12),
        fontFamily: FontFamily.nunitoRegular,
        color: '#7f8c8d',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: dynamicSize(16),
    },
    currentPrice: {
        fontSize: dynamicSize(18),
        fontFamily: FontFamily.poppinsBold,
        color: '#667eea',
        marginRight: dynamicSize(8),
    },
    originalPrice: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.poppinsRegular,
        color: '#95a5a6',
        textDecorationLine: 'line-through',
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addToCartButton: {
        flex: 1,
        marginRight: dynamicSize(12),
        borderRadius: dynamicSize(12),
        overflow: 'hidden',
    },
    disabledButton: {
        opacity: 0.6,
    },
    addToCartGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: dynamicSize(12),
        paddingHorizontal: dynamicSize(16),
    },
    addToCartText: {
        color: 'white',
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoSemiBold,
        marginLeft: dynamicSize(8),
    },
    removeButton: {
        width: dynamicSize(44),
        height: dynamicSize(44),
        borderRadius: dynamicSize(22),
        backgroundColor: '#fff5f5',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ffebee',
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: dynamicSize(40),
    },
    emptyStateTitle: {
        fontSize: dynamicSize(24),
        fontFamily: FontFamily.sofiaProBold,
        color: '#2c3e50',
        marginTop: dynamicSize(20),
        marginBottom: dynamicSize(8),
    },
    emptyStateSubtitle: {
        fontSize: dynamicSize(16),
        fontFamily: FontFamily.nunitoRegular,
        color: '#7f8c8d',
        textAlign: 'center',
        lineHeight: dynamicSize(24),
        marginBottom: dynamicSize(40),
    },
    browseButton: {
        borderRadius: dynamicSize(16),
        overflow: 'hidden',
    },
    browseButtonGradient: {
        paddingHorizontal: dynamicSize(32),
        paddingVertical: dynamicSize(16),
    },
    browseButtonText: {
        color: 'white',
        fontSize: dynamicSize(16),
        fontFamily: FontFamily.sofiaProBold,
    },
    bottomSpacing: {
        height: dynamicSize(20),
    },
});

export default WishlistScreen;