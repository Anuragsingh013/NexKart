// screens/Profile/ProfileScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
  Alert,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Images from '../../assets/images';
import { dynamicSize, getFontSize } from '../../utils/responsive';
import LinearGradient from 'react-native-linear-gradient';
import { FontFamily } from '../../assets/fonts';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const menuItems = [
    {
      id: 'orders',
      title: 'My Orders',
      icon: 'shopping-bag',
      // onPress: () => navigation.navigate("dynamicTable"),
       onPress: () => navigation.navigate("ordersScreen"),
      badge: '12'
    },
    {
      id: 'addresses',
      title: 'Shipping Addresses',
      icon: 'map-pin',
      onPress: () => console.log('Navigate to addresses'),
      badge: null
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: 'credit-card',
      onPress: () => console.log('Navigate to payment'),
      badge: null
    },
    {
      id: 'wishlist',
      title: 'Wishlist',
      icon: 'heart',
      onPress: () => navigation.navigate("WishlistScreen"),
      badge: '5'
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings',
      onPress: () => console.log('Navigate to settings'),
      badge: null
    }
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header with Gradient */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileHeader}
        >
          <View style={styles.profileAvatarContainer}>
            <View style={styles.profileAvatar}>
              <Image
                source={Images.anuragLatest}
                style={styles.profileAvatarImage}
              />
            </View>
            {/* Online indicator */}
            <View style={styles.onlineIndicator} />
          </View>

          <Text style={styles.profileName}>Anurag Singh</Text>
          <Text style={styles.profileEmail}>thakuranurag@gmail.com</Text>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Wishlist</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Addresses</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Menu Items */}
        <View style={styles.profileMenu}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.profileMenuItem,
                index === menuItems.length - 1 && styles.lastMenuItem
              ]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.iconContainer}>
                  <Icon name={item.icon} size={20} color="#667eea" />
                </View>
                <Text style={styles.profileMenuItemText}>{item.title}</Text>
              </View>

              <View style={styles.menuItemRight}>
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
                <Icon name="chevron-right" size={18} color="#bdc3c7" />
              </View>
            </TouchableOpacity>
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <LinearGradient
              // colors={['#ff6b6b', '#ee5a52']}
              colors={['#667eea', '#764ba2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.logoutButtonGradient}
            >
              <Icon name="log-out" size={20} color="white" />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileHeader: {
    paddingHorizontal: dynamicSize(30),
    paddingTop: dynamicSize(40),
    paddingBottom: dynamicSize(30),
    alignItems: 'center',
    borderBottomLeftRadius: dynamicSize(30),
    borderBottomRightRadius: dynamicSize(30),
  },
  profileAvatarContainer: {
    position: 'relative',
    marginBottom: dynamicSize(8),
  },
  profileAvatar: {
    width: dynamicSize(112),
    height: dynamicSize(112),
    borderRadius: dynamicSize(60),
    borderWidth: dynamicSize(4),
    borderColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 15,
  },
  profileAvatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: dynamicSize(8),
    right: dynamicSize(8),
    width: dynamicSize(20),
    height: dynamicSize(20),
    borderRadius: dynamicSize(10),
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: 'white',
  },
  profileName: {
    fontSize: getFontSize(21),
    fontFamily: FontFamily.sofiaProBold,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: dynamicSize(4),
  },
  profileEmail: {
    fontSize: getFontSize(16),
    fontFamily: FontFamily.sofiaProRegular,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400',
    marginBottom: dynamicSize(24),
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: dynamicSize(20),
    paddingVertical: dynamicSize(12),
    paddingHorizontal: dynamicSize(16),
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: getFontSize(17),
    fontFamily: FontFamily.poppinsBold,
    fontWeight: '700',
    color: 'white',
  },
  statLabel: {
    fontSize: getFontSize(13),
    fontFamily: FontFamily.poppinsMedium,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    // textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: dynamicSize(1),
    height: dynamicSize(30),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: dynamicSize(16),
  },
  profileMenu: {
    paddingTop: dynamicSize(16),
    paddingHorizontal: dynamicSize(16),
  },
  profileMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: dynamicSize(12),
    paddingHorizontal: dynamicSize(16),
    backgroundColor: 'white',
    marginBottom: dynamicSize(12),
    borderRadius: dynamicSize(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  lastMenuItem: {
    marginBottom: dynamicSize(20),
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: dynamicSize(40),
    height: dynamicSize(40),
    borderRadius: dynamicSize(12),
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: dynamicSize(16),
  },
  profileMenuItemText: {
    fontSize: getFontSize(17),
    fontFamily: FontFamily.nunitoSemiBold,
    color: '#2c3e50',
    fontWeight: '600',
    flex: 1,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#667eea',
    borderRadius: dynamicSize(12),
    paddingHorizontal: dynamicSize(8),
    paddingVertical: dynamicSize(4),
    marginRight: dynamicSize(12),
    minWidth: dynamicSize(24),
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: dynamicSize(12),
    fontWeight: '600',
  },
  logoutButton: {
    // marginHorizontal: dynamicSize(16),
    marginBottom: dynamicSize(30),
    borderRadius: dynamicSize(16),
    overflow: 'hidden',
    shadowColor: '#ff6b6b',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logoutButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: dynamicSize(12),
    paddingHorizontal: dynamicSize(16),
  },
  logoutButtonText: {
    color: 'white',
    fontSize: getFontSize(17),
    // fontWeight: '700',
    fontFamily: FontFamily.sofiaProBold,
    marginLeft: dynamicSize(12),
  },
});

export default ProfileScreen;