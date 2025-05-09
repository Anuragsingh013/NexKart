import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, Animated } from 'react-native';
import { dynamicSize } from '../utils/responsive';

const BannerSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<any>(null);
    const { width } = Dimensions.get('window');

    // Banner data - you can replace these with your actual banner images and content
    const banners = [
        {
            id: '1',
            image: 'https://rukminid2.flixcart.com/image/1450/1750/xif0q/television/t/4/q/-original-imah9m5y4cmf4dcs.jpeg?q=20&crop=false',
            //   title: 'Summer Sale',
            //   subtitle: 'Up to 60% off',
            bgColor: '#FF6347'
        },
        {
            id: '2',
            image: 'https://img.freepik.com/free-psd/black-friday-super-sale-facebook-cover-banner-template_120329-5177.jpg?t=st=1744389388~exp=1744392988~hmac=bff0be49e382453f5ce62fcc209b48e5274b846909831c6f9885b649d21248f0&w=1380',
            // title: 'New Arrivals',
            // subtitle: 'Check out our latest products',
            bgColor: '#4682B4'
        },
        {
            id: '3',
            image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/627ab1121502531.60c775945f4bf.png',
            title: 'Special Offer',
            subtitle: 'Free shipping on orders over $50',
            bgColor: '#228B22'
        },
        {
            id: '4',
            image: 'https://rukminid2.flixcart.com/image/1450/1750/xif0q/television/t/4/q/-original-imah9m5y4cmf4dcs.jpeg?q=20&crop=false',
            //   title: 'Summer Sale',
            //   subtitle: 'Up to 60% off',
            bgColor: '#FF6347'
        },
        {
            id: '5',
            image: 'https://img.freepik.com/free-psd/black-friday-super-sale-facebook-cover-banner-template_120329-5177.jpg?t=st=1744389388~exp=1744392988~hmac=bff0be49e382453f5ce62fcc209b48e5274b846909831c6f9885b649d21248f0&w=1380',
            // title: 'New Arrivals',
            // subtitle: 'Check out our latest products',
            bgColor: '#4682B4'
        },
        {
            id: '6',
            image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/627ab1121502531.60c775945f4bf.png',
            title: 'Special Offer',
            subtitle: 'Free shipping on orders over $50',
            bgColor: '#228B22'
        },
    ];

    // Auto scroll effect
    useEffect(() => {
        const interval = setInterval(() => {
            // Calculate the next index with wrapping
            const nextIndex = (currentIndex + 1) % banners.length;

            // Scroll to the next item
            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true
            });

            // Update the current index
            setCurrentIndex(nextIndex);
        }, 3000); // Change banner every 3 seconds

        return () => clearInterval(interval);
    }, [currentIndex]);

    // Handle manual scroll end
    const handleScrollEnd = (event: any) => {
        const horizontalOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(horizontalOffset / width);
        setCurrentIndex(index);
    };

    // Render each banner
    const renderBanner = ({ item }: any) => {
        return (
            <View style={[styles.bannerItem, { width, backgroundColor: item.bgColor }]}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.bannerImage}
                />
                {/* <View style={styles.bannerContent}>
                    <Text style={styles.bannerTitle}>{item.title}</Text>
                    <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                </View> */}
            </View>
        );
    };

    // Render indicator dots
    const renderDots = () => {
        return (
            <View style={styles.dotContainer}>
                {banners.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            { backgroundColor: index === currentIndex ? '#FFF' : 'rgba(255,255,255,0.5)' }
                        ]}
                    />
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={banners}
                renderItem={renderBanner}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScrollEnd}
            />
            {renderDots()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: dynamicSize(240),
        marginHorizontal: dynamicSize(16),
        borderWidth: dynamicSize(1),
        borderColor: "#E2E4E8",
        borderRadius: dynamicSize(16),
        overflow: "hidden",
        position: 'relative',
        marginBottom: dynamicSize(6)
    },
    bannerItem: {
        height: dynamicSize(240),
        width:"100%",
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: "cover"
        // resizeMode:"contain"
    },
    bannerContent: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 10,
    },
    bannerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    },
    bannerSubtitle: {
        fontSize: 18,
        color: 'white',
        marginTop: 5,
    },
    dotContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    }
});

export default BannerSlider;