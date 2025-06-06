import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ShopScreen from '../screens/Shop';
import CartScreen from '../screens/Cart';
import ProfileScreen from '../screens/Profile';
import SplashScreen from '../components/SplashScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

const RootStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const ShopStack = createStackNavigator();
const CartStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: 'Shop App', headerShown: false }} />
        <HomeStack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
    </HomeStack.Navigator>
);


const ShopStackScreen = () => (
    <ShopStack.Navigator>
        <ShopStack.Screen name="Shop" component={ShopScreen} />
        <ShopStack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
    </ShopStack.Navigator>
);

const CartStackScreen = () => (
    <CartStack.Navigator>
        <CartStack.Screen name="Cart" component={CartScreen} />
    </CartStack.Navigator>
);

const ProfileStackScreen = () => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
);

const MainAppTabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'HomeTab') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'ShopTab') {
                    iconName = focused ? 'grid' : 'grid-outline';
                } else if (route.name === 'CartTab') {
                    iconName = focused ? 'cart' : 'cart-outline';
                } else if (route.name === 'ProfileTab') {
                    iconName = focused ? 'person' : 'person-outline';
                }

                // When you install icon library, uncomment this
                // return <Ionicons name={iconName} size={size} color={color} />;
                // return null; // Temporary return

                return iconName ? <Ionicons name={iconName} size={size} color={color} /> : null;

            },
            tabBarActiveTintColor: '#ff6347',
            tabBarInactiveTintColor: 'gray',
            // headerShown: false,
        })}
    >
        <Tab.Screen name="HomeTab" component={HomeStackScreen} options={{ title: 'Home', headerShown: false }} />
        <Tab.Screen name="ShopTab" component={ShopStackScreen} options={{ title: 'Shop' , headerShown: false }} />
        <Tab.Screen name="CartTab" component={CartStackScreen} options={{ title: 'Cart' , headerShown: false }} />
        <Tab.Screen name="ProfileTab" component={ProfileStackScreen} options={{ title: 'Profile' , headerShown: false }} />
    </Tab.Navigator>
);


const AppNavigator = () => {
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSplashVisible(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                {isSplashVisible ? (
                    <RootStack.Screen name="Splash" component={SplashScreen} />
                ) : (
                    <RootStack.Screen name="MainApp" component={MainAppTabs} />
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;