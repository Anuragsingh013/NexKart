// SplashScreen.tsx
import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Images from '../assets/images';
import { dynamicSize, getFontSize } from '../utils/responsive';

const SplashScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Image source={Images.splashScreen} style={styles.logo} />
            <Text style={styles.logoText}>NexKart</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: "32%",
        height: "32%",
        resizeMode: 'contain',
    },
    logoText: {
        position: 'absolute',
        bottom: dynamicSize(48),
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: getFontSize(24),
        fontFamily: "OpenSans-Medium",
        color: "#2c2c2c",
    },
});

export default SplashScreen;
