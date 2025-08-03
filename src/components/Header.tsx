// components/Header.tsx
import React from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../assets/images'; // Your Myntra logo here
import { dynamicSize } from '../utils/responsive';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.headerContainer}>
            {/* Top Row */}
            <View style={styles.topRow}>
                <TouchableOpacity>
                    {/* <Ionicons name="menu" size={24} color="#000" /> */}
                    <Image source={Images.splashScreen} style={styles.logo} resizeMode="contain" />

                </TouchableOpacity>
                {/* <Image source={Images.splashIcon} style={styles.logo} resizeMode="contain" /> */}
                <View style={styles.icons}>
                    <TouchableOpacity style={styles.icon} onPress={() => {
                        navigation.navigate('ProfileTab', {
                            screen: 'WishlistScreen',
                            params: {}
                        });
                    }}  >
                        <Ionicons name="heart-outline" size={22} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={() => {
                        // navigation.navigate("Profile")
                        navigation.navigate('ProfileTab', {
                            screen: 'Profile',
                            params: {}
                        });
                    }}>
                        <Ionicons name="person-outline" size={22} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}
                        onPress={() => {
                            // navigation.navigate("Profile")
                            navigation.navigate('ProfileTab', {
                                screen: 'ordersScreen',
                                params: {}
                            });
                        }}
                    >
                        <Ionicons name="bag-outline" size={22} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        paddingVertical: dynamicSize(12),
        paddingHorizontal: dynamicSize(16),
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        width: dynamicSize(52),
        height: dynamicSize(52),
    },
    icons: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: dynamicSize(16),
    },
});
