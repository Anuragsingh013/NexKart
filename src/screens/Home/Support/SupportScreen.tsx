// screens/Support/SupportScreen.tsx
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    TextInput,
    Alert,
    Linking,
    Animated,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { dynamicSize } from '../../../utils/responsive';
import { FontFamily } from '../../../assets/fonts';

const SupportScreen = () => {
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const quickActions = [
        {
            id: '1',
            title: 'Live Chat',
            subtitle: 'Chat with our support team',
            icon: 'message-circle',
            color: ['#667eea', '#764ba2'],
            isAvailable: true,
            action: () => Alert.alert('Live Chat', 'Connecting you to our support team...')
        },
        {
            id: '2',
            title: 'Call Us',
            subtitle: '+91 9876543210',
            icon: 'phone',
            color: ['#74b9ff', '#0984e3'],
            isAvailable: true,
            action: () => Linking.openURL('tel:+919876543210')
        },
        {
            id: '3',
            title: 'Email Support',
            subtitle: 'support@yourapp.com',
            icon: 'mail',
            color: ['#fd79a8', '#e84393'],
            isAvailable: true,
            action: () => Linking.openURL('mailto:support@yourapp.com')
        },
        {
            id: '4',
            title: 'Video Call',
            subtitle: 'Schedule a video session',
            icon: 'video',
            color: ['#00b894', '#00a085'],
            isAvailable: false,
            action: () => Alert.alert('Video Call', 'Video support will be available soon!')
        }
    ];

    const supportCategories = [
        {
            id: '1',
            title: 'Order Issues',
            icon: 'package',
            color: '#667eea',
            count: 12
        },
        {
            id: '2',
            title: 'Payment & Billing',
            icon: 'credit-card',
            color: '#ff6b6b',
            count: 8
        },
        {
            id: '3',
            title: 'Account Help',
            icon: 'user',
            color: '#74b9ff',
            count: 6
        },
        {
            id: '4',
            title: 'Technical Issues',
            icon: 'settings',
            color: '#fd79a8',
            count: 4
        },
        {
            id: '5',
            title: 'Returns & Refunds',
            icon: 'rotate-ccw',
            color: '#00b894',
            count: 10
        },
        {
            id: '6',
            title: 'App Features',
            icon: 'smartphone',
            color: '#fdcb6e',
            count: 5
        }
    ];

    const faqs = [
        {
            id: '1',
            question: 'How can I track my order?',
            answer: 'You can track your order by going to "My Orders" section in your account. You\'ll find real-time tracking information and estimated delivery time there.'
        },
        {
            id: '2',
            question: 'What is your return policy?',
            answer: 'We offer a 30-day return policy for most items. Items must be unused and in original packaging. Some categories like electronics have a 15-day return window.'
        },
        {
            id: '3',
            question: 'How do I cancel my order?',
            answer: 'You can cancel your order within 2 hours of placing it by going to "My Orders" and clicking the cancel button. After that, please contact our support team.'
        },
        {
            id: '4',
            question: 'Do you offer international shipping?',
            answer: 'Currently, we only ship within India. We\'re working on expanding to international markets soon. Stay tuned for updates!'
        },
        {
            id: '5',
            question: 'How can I change my delivery address?',
            answer: 'You can change your delivery address before the order is shipped by editing it in "My Orders". Once shipped, please contact our support team for assistance.'
        },
        {
            id: '6',
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit/debit cards, UPI, net banking, wallets like Paytm, PhonePe, and cash on delivery for eligible locations.'
        }
    ];

    const handleSubmitForm = () => {
        if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
            Alert.alert('Incomplete Form', 'Please fill in all required fields.');
            return;
        }

        Alert.alert(
            'Message Sent!',
            'Thank you for contacting us. We\'ll get back to you within 24 hours.',
            [{ text: 'OK', onPress: () => {
                setContactForm({ name: '', email: '', subject: '', message: '' });
            }}]
        );
    };

    const QuickActionCard = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={[
                styles.quickActionCard,
                !item.isAvailable && styles.disabledCard
            ]}
            onPress={item.action}
            activeOpacity={0.8}
            disabled={!item.isAvailable}
        >
            <LinearGradient
                colors={item.isAvailable ? item.color : ['#bdc3c7', '#95a5a6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickActionGradient}
            >
                <View style={styles.quickActionIcon}>
                    <Icon name={item.icon} size={24} color="white" />
                </View>
                <Text style={styles.quickActionTitle}>{item.title}</Text>
                <Text style={styles.quickActionSubtitle}>{item.subtitle}</Text>
                
                {!item.isAvailable && (
                    <View style={styles.comingSoonBadge}>
                        <Text style={styles.comingSoonText}>Soon</Text>
                    </View>
                )}
            </LinearGradient>
        </TouchableOpacity>
    );

    const CategoryCard = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.categoryCard} activeOpacity={0.8}>
            <View style={[styles.categoryIcon, { backgroundColor: `${item.color}20` }]}>
                <Icon name={item.icon} size={20} color={item.color} />
            </View>
            <View style={styles.categoryInfo}>
                <Text style={styles.categoryTitle}>{item.title}</Text>
                <Text style={styles.categoryCount}>{item.count} articles</Text>
            </View>
            <Icon name="chevron-right" size={16} color="#95a5a6" />
        </TouchableOpacity>
    );

    const FAQItem = ({ item }: { item: any }) => {
        const isExpanded = expandedFAQ === item.id;
        
        return (
            <View style={styles.faqItem}>
                <TouchableOpacity
                    style={styles.faqQuestion}
                    onPress={() => setExpandedFAQ(isExpanded ? null : item.id)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.faqQuestionText}>{item.question}</Text>
                    <Icon 
                        name={isExpanded ? "minus" : "plus"} 
                        size={16} 
                        color="#667eea" 
                    />
                </TouchableOpacity>
                
                {isExpanded && (
                    <View style={styles.faqAnswer}>
                        <Text style={styles.faqAnswerText}>{item.answer}</Text>
                    </View>
                )}
            </View>
        );
    };

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
                        <Text style={styles.headerTitle}>Help & Support</Text>
                        <Text style={styles.headerSubtitle}>We're here to help you</Text>
                    </View>

                    <TouchableOpacity style={styles.helpButton} activeOpacity={0.7}>
                        <Icon name="help-circle" size={20} color="white" />
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
                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.quickActionsGrid}>
                        {quickActions.map((item) => (
                            <QuickActionCard key={item.id} item={item} />
                        ))}
                    </View>
                </View>

                {/* Support Categories */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Browse Help Topics</Text>
                    <View style={styles.categoriesContainer}>
                        {supportCategories.map((item) => (
                            <CategoryCard key={item.id} item={item} />
                        ))}
                    </View>
                </View>

                {/* FAQs */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.faqContainer}>
                        {faqs.map((item) => (
                            <FAQItem key={item.id} item={item} />
                        ))}
                    </View>
                </View>

                {/* Contact Form */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Still Need Help?</Text>
                    <View style={styles.contactForm}>
                        <Text style={styles.formTitle}>Send us a message</Text>
                        <Text style={styles.formSubtitle}>
                            We typically respond within 24 hours
                        </Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Full Name *</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter your full name"
                                placeholderTextColor="#95a5a6"
                                value={contactForm.name}
                                onChangeText={(text) => setContactForm(prev => ({ ...prev, name: text }))}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email Address *</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter your email"
                                placeholderTextColor="#95a5a6"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={contactForm.email}
                                onChangeText={(text) => setContactForm(prev => ({ ...prev, email: text }))}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Subject *</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="What's this about?"
                                placeholderTextColor="#95a5a6"
                                value={contactForm.subject}
                                onChangeText={(text) => setContactForm(prev => ({ ...prev, subject: text }))}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Message *</Text>
                            <TextInput
                                style={[styles.textInput, styles.messageInput]}
                                placeholder="Describe your issue or question..."
                                placeholderTextColor="#95a5a6"
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                                value={contactForm.message}
                                onChangeText={(text) => setContactForm(prev => ({ ...prev, message: text }))}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleSubmitForm}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#667eea', '#764ba2']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.submitGradient}
                            >
                                <Icon name="send" size={16} color="white" />
                                <Text style={styles.submitText}>Send Message</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Additional Resources */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Additional Resources</Text>
                    <View style={styles.resourcesContainer}>
                        <TouchableOpacity style={styles.resourceCard} activeOpacity={0.8}>
                            <Icon name="book-open" size={20} color="#667eea" />
                            <Text style={styles.resourceTitle}>User Guide</Text>
                            <Text style={styles.resourceSubtitle}>Complete app documentation</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.resourceCard} activeOpacity={0.8}>
                            <Icon name="youtube" size={20} color="#ff6b6b" />
                            <Text style={styles.resourceTitle}>Video Tutorials</Text>
                            <Text style={styles.resourceSubtitle}>Step-by-step video guides</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.resourceCard} activeOpacity={0.8}>
                            <Icon name="users" size={20} color="#74b9ff" />
                            <Text style={styles.resourceTitle}>Community Forum</Text>
                            <Text style={styles.resourceSubtitle}>Connect with other users</Text>
                        </TouchableOpacity>
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
    helpButton: {
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
    viewAllText: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoSemiBold,
        color: '#667eea',
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: dynamicSize(20),
    },
    quickActionCard: {
        width: '48%',
        marginBottom: dynamicSize(12),
        borderRadius: dynamicSize(16),
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    disabledCard: {
        opacity: 0.7,
    },
    quickActionGradient: {
        padding: dynamicSize(20),
        alignItems: 'center',
        minHeight: dynamicSize(120),
        justifyContent: 'center',
        position: 'relative',
    },
    quickActionIcon: {
        marginBottom: dynamicSize(8),
    },
    quickActionTitle: {
        fontSize: dynamicSize(16),
        fontFamily: FontFamily.sofiaProBold,
        color: 'white',
        textAlign: 'center',
        marginBottom: dynamicSize(4),
    },
    quickActionSubtitle: {
        fontSize: dynamicSize(12),
        fontFamily: FontFamily.nunitoRegular,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
    },
    comingSoonBadge: {
        position: 'absolute',
        top: dynamicSize(8),
        right: dynamicSize(8),
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: dynamicSize(6),
        paddingVertical: dynamicSize(2),
        borderRadius: dynamicSize(6),
    },
    comingSoonText: {
        fontSize: dynamicSize(10),
        fontFamily: FontFamily.nunitoBold,
        color: 'white',
    },
    categoriesContainer: {
        paddingHorizontal: dynamicSize(20),
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: dynamicSize(16),
        marginBottom: dynamicSize(12),
        borderRadius: dynamicSize(12),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    categoryIcon: {
        width: dynamicSize(40),
        height: dynamicSize(40),
        borderRadius: dynamicSize(20),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: dynamicSize(12),
    },
    categoryInfo: {
        flex: 1,
    },
    categoryTitle: {
        fontSize: dynamicSize(16),
        fontFamily: FontFamily.nunitoSemiBold,
        color: '#2c3e50',
        marginBottom: dynamicSize(2),
    },
    categoryCount: {
        fontSize: dynamicSize(12),
        fontFamily: FontFamily.nunitoRegular,
        color: '#7f8c8d',
    },
    faqContainer: {
        paddingHorizontal: dynamicSize(20),
    },
    faqItem: {
        backgroundColor: 'white',
        marginBottom: dynamicSize(8),
        borderRadius: dynamicSize(12),
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    faqQuestion: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: dynamicSize(16),
    },
    faqQuestionText: {
        flex: 1,
        fontSize: dynamicSize(15),
        fontFamily: FontFamily.nunitoSemiBold,
        color: '#2c3e50',
        marginRight: dynamicSize(12),
    },
    faqAnswer: {
        paddingHorizontal: dynamicSize(16),
        paddingBottom: dynamicSize(16),
        borderTopWidth: 1,
        borderTopColor: '#f1f2f6',
    },
    faqAnswerText: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoRegular,
        color: '#7f8c8d',
        lineHeight: dynamicSize(20),
    },
    contactForm: {
        backgroundColor: 'white',
        marginHorizontal: dynamicSize(20),
        borderRadius: dynamicSize(16),
        padding: dynamicSize(20),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    formTitle: {
        fontSize: dynamicSize(18),
        fontFamily: FontFamily.sofiaProBold,
        color: '#2c3e50',
        marginBottom: dynamicSize(4),
    },
    formSubtitle: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoRegular,
        color: '#7f8c8d',
        marginBottom: dynamicSize(20),
    },
    inputContainer: {
        marginBottom: dynamicSize(16),
    },
    inputLabel: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoSemiBold,
        color: '#2c3e50',
        marginBottom: dynamicSize(8),
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: dynamicSize(12),
        paddingHorizontal: dynamicSize(16),
        paddingVertical: dynamicSize(12),
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoRegular,
        color: '#2c3e50',
        backgroundColor: '#f8f9fa',
    },
    messageInput: {
        height: dynamicSize(100),
        paddingTop: dynamicSize(12),
    },
    submitButton: {
        borderRadius: dynamicSize(12),
        overflow: 'hidden',
        marginTop: dynamicSize(8),
    },
    submitGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: dynamicSize(16),
    },
    submitText: {
        color: 'white',
        fontSize: dynamicSize(16),
        fontFamily: FontFamily.sofiaProBold,
        marginLeft: dynamicSize(8),
    },
    resourcesContainer: {
        paddingHorizontal: dynamicSize(20),
    },
    resourceCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: dynamicSize(16),
        marginBottom: dynamicSize(12),
        borderRadius: dynamicSize(12),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    resourceTitle: {
        fontSize: dynamicSize(16),
        fontFamily: FontFamily.nunitoSemiBold,
        color: '#2c3e50',
        marginLeft: dynamicSize(12),
        flex: 1,
    },
    resourceSubtitle: {
        fontSize: dynamicSize(12),
        fontFamily: FontFamily.nunitoRegular,
        color: '#7f8c8d',
        marginLeft: dynamicSize(12),
        flex: 2,
    },
    bottomSpacing: {
        height: dynamicSize(30),
    },
});

export default SupportScreen;