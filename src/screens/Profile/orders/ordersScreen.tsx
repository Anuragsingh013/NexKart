// screens/Orders/OrdersScreen.tsx
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

const OrdersScreen = () => {
    const navigation = useNavigation();
    const [cartItems, setCartItems] = useState([
        {
            id: '1',
            name: 'Wireless Bluetooth Headphones',
            price: 2999,
            originalPrice: 4999,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
            quantity: 2,
            color: 'Black',
            size: 'Standard',
            inStock: true,
            deliveryDate: '2-3 days'
        },
        {
            id: '2',
            name: 'Premium Cotton T-Shirt',
            price: 899,
            originalPrice: 1299,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
            quantity: 1,
            color: 'Navy Blue',
            size: 'L',
            inStock: true,
            deliveryDate: '1-2 days'
        },
        {
            id: '3',
            name: 'Smart Fitness Watch',
            price: 8999,
            originalPrice: 12999,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
            quantity: 1,
            color: 'Space Gray',
            size: '42mm',
            inStock: true,
            deliveryDate: '3-5 days'
        },
        {
            id: '4',
            name: 'Leather Backpack',
            price: 3499,
            originalPrice: 5999,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300',
            quantity: 1,
            color: 'Brown',
            size: 'Medium',
            inStock: false,
            deliveryDate: 'Out of stock'
        }
    ]);

    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
    const shipping = subtotal > 1000 ? 0 : 99;
    const promoDiscount = appliedPromo ? Math.floor(subtotal * 0.1) : 0; // 10% discount
    const total = subtotal - promoDiscount + shipping;

    const updateQuantity = (itemId: string, increment: boolean) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === itemId) {
                const newQuantity = increment ? item.quantity + 1 : Math.max(1, item.quantity - 1);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeItem = (itemId: string) => {
        Alert.alert(
            'Remove Item',
            'Are you sure you want to remove this item from your cart?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: () => {
                        setCartItems(prev => prev.filter(item => item.id !== itemId));
                    }
                }
            ]
        );
    };

    const applyPromoCode = () => {
        if (promoCode.toLowerCase() === 'save10') {
            setAppliedPromo({ code: promoCode, discount: 10 });
            Alert.alert('Success!', 'Promo code applied successfully!');
        } else {
            Alert.alert('Invalid Code', 'Please enter a valid promo code.');
        }
    };

    const proceedToCheckout = () => {
        Alert.alert('Checkout', 'Proceeding to checkout...');
    };

    const CartItem = ({ item, index }: { item: any; index: number }) => (
        <View style={styles.cartItem}>
            <View style={styles.itemImageContainer}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                {!item.inStock && (
                    <View style={styles.outOfStockBadge}>
                        <Text style={styles.outOfStockText}>Out of Stock</Text>
                    </View>
                )}
            </View>

            <View style={styles.itemDetails}>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemName} numberOfLines={2}>
                        {item.name}
                    </Text>
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removeItem(item.id)}
                        activeOpacity={0.7}
                    >
                        <Icon name="x" size={18} color="#ff6b6b" />
                    </TouchableOpacity>
                </View>

                {/* Variants */}
                <View style={styles.variantsContainer}>
                    <Text style={styles.variantText}>Color: {item.color}</Text>
                    <Text style={styles.variantText}>Size: {item.size}</Text>
                </View>

                {/* Delivery Info */}
                <View style={styles.deliveryInfo}>
                    <Icon name="truck" size={14} color="#27ae60" />
                    <Text style={styles.deliveryText}>Delivery in {item.deliveryDate}</Text>
                </View>

                <View style={styles.itemFooter}>
                    {/* Price */}
                    <View style={styles.priceContainer}>
                        <Text style={styles.currentPrice}>₹{item.price.toLocaleString()}</Text>
                        <Text style={styles.originalPrice}>₹{item.originalPrice.toLocaleString()}</Text>
                    </View>

                    {/* Quantity Controls */}
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={[styles.quantityButton, item.quantity === 1 && styles.disabledQuantityButton]}
                            onPress={() => updateQuantity(item.id, false)}
                            disabled={item.quantity === 1}
                            activeOpacity={0.7}
                        >
                            <Icon name="minus" size={16} color={item.quantity === 1 ? "#bdc3c7" : "#667eea"} />
                        </TouchableOpacity>

                        <Text style={styles.quantityText}>{item.quantity}</Text>

                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => updateQuantity(item.id, true)}
                            activeOpacity={0.7}
                        >
                            <Icon name="plus" size={16} color="#667eea" />
                        </TouchableOpacity>
                    </View>
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
                    <Text style={styles.headerTitle}>My Cart</Text>
                    <Text style={styles.headerSubtitle}>
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                    </Text>
                </View>

                <TouchableOpacity style={styles.wishlistButton} activeOpacity={0.7}>
                    <Icon name="heart" size={20} color="white" />
                </TouchableOpacity>
            </LinearGradient>

            {cartItems.length === 0 ? (
                /* Empty Cart State */
                <View style={styles.emptyState}>
                    <Icon name="shopping-cart" size={80} color="#E0E0E0" />
                    <Text style={styles.emptyStateTitle}>Your cart is empty</Text>
                    <Text style={styles.emptyStateSubtitle}>
                        Add some products to get started with your shopping
                    </Text>
                    <TouchableOpacity
                        style={styles.shopNowButton}
                        onPress={() => navigation.navigate('Home')}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#667eea', '#764ba2']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.shopNowButtonGradient}
                        >
                            <Text style={styles.shopNowButtonText}>Start Shopping</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.cartContent}>
                    {/* Cart Items */}
                    <ScrollView
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {/* Savings Banner */}
                        {savings > 0 && (
                            <View style={styles.savingsBanner}>
                                <Icon name="tag" size={18} color="#27ae60" />
                                <Text style={styles.savingsText}>
                                    You're saving ₹{savings.toLocaleString()} on this order!
                                </Text>
                            </View>
                        )}

                        {/* Cart Items */}
                        {cartItems.map((item, index) => (
                            <CartItem key={item.id} item={item} index={index} />
                        ))}

                        {/* Promo Code Section */}
                        <View style={styles.promoSection}>
                            <Text style={styles.promoTitle}>Have a promo code?</Text>
                            <View style={styles.promoInputContainer}>
                                <Icon name="tag" size={18} color="#667eea" />
                                <Text style={styles.promoInput}>SAVE10</Text>
                                <TouchableOpacity
                                    style={styles.applyButton}
                                    onPress={applyPromoCode}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.applyButtonText}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                            {appliedPromo && (
                                <View style={styles.appliedPromo}>
                                    <Icon name="check-circle" size={16} color="#27ae60" />
                                    <Text style={styles.appliedPromoText}>
                                        Promo code "{appliedPromo.code}" applied
                                    </Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.bottomSpacing} />
                    </ScrollView>

                    {/* Order Summary & Checkout */}
                    <View style={styles.checkoutSection}>
                        <View style={styles.orderSummary}>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Subtotal</Text>
                                <Text style={styles.summaryValue}>₹{subtotal.toLocaleString()}</Text>
                            </View>

                            {promoDiscount > 0 && (
                                <View style={styles.summaryRow}>
                                    <Text style={[styles.summaryLabel, { color: '#27ae60' }]}>Promo Discount</Text>
                                    <Text style={[styles.summaryValue, { color: '#27ae60' }]}>
                                        -₹{promoDiscount.toLocaleString()}
                                    </Text>
                                </View>
                            )}

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>
                                    Shipping {subtotal > 1000 && <Text style={styles.freeShipping}>(Free)</Text>}
                                </Text>
                                <Text style={styles.summaryValue}>
                                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                                </Text>
                            </View>

                            <View style={styles.summaryDivider} />

                            <View style={styles.summaryRow}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalValue}>₹{total.toLocaleString()}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.checkoutButton}
                            onPress={proceedToCheckout}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#667eea', '#764ba2']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.checkoutButtonGradient}
                            >
                                <Text style={styles.checkoutButtonText}>
                                    Proceed to Checkout
                                </Text>
                                <Icon name="arrow-right" size={20} color="white" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
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
    wishlistButton: {
        width: dynamicSize(40),
        height: dynamicSize(40),
        borderRadius: dynamicSize(20),
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartContent: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: dynamicSize(20),
    },
    savingsBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#d5f4e6',
        marginHorizontal: dynamicSize(20),
        marginTop: dynamicSize(15),
        marginBottom: dynamicSize(10),
        paddingHorizontal: dynamicSize(15),
        paddingVertical: dynamicSize(12),
        borderRadius: dynamicSize(12),
    },
    savingsText: {
        marginLeft: dynamicSize(8),
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoSemiBold,
        color: '#27ae60',
    },
    cartItem: {
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
        flexDirection: 'row',
    },
    itemImageContainer: {
        width: dynamicSize(120),
        height: dynamicSize(140),
        position: 'relative',
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    outOfStockBadge: {
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
        fontSize: dynamicSize(12),
        fontFamily: FontFamily.nunitoBold,
    },
    itemDetails: {
        flex: 1,
        padding: dynamicSize(16),
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: dynamicSize(8),
    },
    itemName: {
        flex: 1,
        fontSize: dynamicSize(16),
        fontFamily: FontFamily.nunitoSemiBold,
        color: '#2c3e50',
        lineHeight: dynamicSize(22),
    },
    removeButton: {
        width: dynamicSize(30),
        height: dynamicSize(30),
        borderRadius: dynamicSize(15),
        backgroundColor: '#fff5f5',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: dynamicSize(8),
    },
    variantsContainer: {
        marginBottom: dynamicSize(8),
    },
    variantText: {
        fontSize: dynamicSize(12),
        fontFamily: FontFamily.nunitoRegular,
        color: '#7f8c8d',
        marginBottom: dynamicSize(2),
    },
    deliveryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: dynamicSize(12),
    },
    deliveryText: {
        marginLeft: dynamicSize(6),
        fontSize: dynamicSize(12),
        fontFamily: FontFamily.nunitoMedium,
        color: '#27ae60',
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentPrice: {
        fontSize: dynamicSize(16),
        fontFamily: FontFamily.poppinsBold,
        color: '#667eea',
        marginRight: dynamicSize(8),
    },
    originalPrice: {
        fontSize: dynamicSize(12),
        fontFamily: FontFamily.poppinsRegular,
        color: '#95a5a6',
        textDecorationLine: 'line-through',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: dynamicSize(8),
        paddingHorizontal: dynamicSize(4),
    },
    quantityButton: {
        width: dynamicSize(32),
        height: dynamicSize(32),
        borderRadius: dynamicSize(16),
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    disabledQuantityButton: {
        backgroundColor: '#f8f9fa',
        shadowOpacity: 0,
        elevation: 0,
    },
    quantityText: {
        fontSize: dynamicSize(16),
        fontFamily: FontFamily.nunitoSemiBold,
        color: '#2c3e50',
        marginHorizontal: dynamicSize(16),
        minWidth: dynamicSize(20),
        textAlign: 'center',
    },
    promoSection: {
        backgroundColor: 'white',
        marginHorizontal: dynamicSize(20),
        marginTop: dynamicSize(10),
        paddingHorizontal: dynamicSize(20),
        paddingVertical: dynamicSize(20),
        borderRadius: dynamicSize(16),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    promoTitle: {
        fontSize: dynamicSize(16),
        fontFamily: FontFamily.nunitoSemiBold,
        color: '#2c3e50',
        marginBottom: dynamicSize(12),
    },
    promoInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: dynamicSize(12),
        paddingHorizontal: dynamicSize(16),
        paddingVertical: dynamicSize(12),
    },
    promoInput: {
        flex: 1,
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoMedium,
        color: '#2c3e50',
        marginLeft: dynamicSize(12),
    },
    applyButton: {
        backgroundColor: '#667eea',
        paddingHorizontal: dynamicSize(16),
        paddingVertical: dynamicSize(8),
        borderRadius: dynamicSize(8),
    },
    applyButtonText: {
        color: 'white',
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoSemiBold,
    },
    appliedPromo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: dynamicSize(12),
    },
    appliedPromoText: {
        marginLeft: dynamicSize(8),
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoMedium,
        color: '#27ae60',
    },
    checkoutSection: {
        backgroundColor: 'white',
        paddingHorizontal: dynamicSize(20),
        paddingTop: dynamicSize(20),
        paddingBottom: dynamicSize(30),
        borderTopLeftRadius: dynamicSize(24),
        borderTopRightRadius: dynamicSize(24),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    orderSummary: {
        marginBottom: dynamicSize(20),
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: dynamicSize(12),
    },
    summaryLabel: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoMedium,
        color: '#7f8c8d',
    },
    summaryValue: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoSemiBold,
        color: '#2c3e50',
    },
    freeShipping: {
        color: '#27ae60',
        fontSize: dynamicSize(12),
    },
    summaryDivider: {
        height: 1,
        backgroundColor: '#ecf0f1',
        marginVertical: dynamicSize(12),
    },
    totalLabel: {
        fontSize: dynamicSize(18),
        fontFamily: FontFamily.sofiaProBold,
        color: '#2c3e50',
    },
    totalValue: {
        fontSize: dynamicSize(20),
        fontFamily: FontFamily.poppinsBold,
        color: '#667eea',
    },
    checkoutButton: {
        borderRadius: dynamicSize(16),
        overflow: 'hidden',
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    checkoutButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: dynamicSize(18),
        paddingHorizontal: dynamicSize(20),
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: dynamicSize(18),
        fontFamily: FontFamily.sofiaProBold,
        marginRight: dynamicSize(12),
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
    shopNowButton: {
        borderRadius: dynamicSize(16),
        overflow: 'hidden',
    },
    shopNowButtonGradient: {
        paddingHorizontal: dynamicSize(32),
        paddingVertical: dynamicSize(16),
    },
    shopNowButtonText: {
        color: 'white',
        fontSize: dynamicSize(16),
        fontFamily: FontFamily.sofiaProBold,
    },
    bottomSpacing: {
        height: dynamicSize(20),
    },
});

export default OrdersScreen;