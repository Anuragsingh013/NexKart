// screens/Auth/LoginScreen.tsx
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Alert,
    Animated,
    Dimensions,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { dynamicSize } from '../../../utils/responsive';
import { FontFamily } from '../../../assets/fonts';
import { loginSuccess } from '../../../store/slices/authslice';
import { useDispatch } from 'react-redux';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    const dispatch = useDispatch();
    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        let isValid = true;

        // Reset errors
        setEmailError('');
        setPasswordError('');

        // Email validation
        if (!email.trim()) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        }

        // Password validation
        if (!password.trim()) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false;
        }

        return isValid;
    };

    const handleLogin = async () => {
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setTimeout(() => {
                dispatch(loginSuccess({
                    user: {
                        id: '1',
                        name: 'John Doe',
                        email: email
                    },
                    token: 'fake-jwt-token'
                }));
            }, 500);
            // Alert.alert('Success', 'Login successful!', [
            //     {
            //         text: 'OK',
            //         onPress: () => {
            //             // navigation.navigate('HomeTab', {
            //             //     screen: 'Home',
            //             //     params: {}
            //             // });


            //             setTimeout(() => {
            //                 dispatch(loginSuccess({
            //                     user: {
            //                         id: '1',
            //                         name: 'John Doe',
            //                         email: email
            //                     },
            //                     token: 'fake-jwt-token'
            //                 }));
            //             }, 500);
            //         }
            //     }
            // ]);
        }, 2000);
    };

    const handleSocialLogin = (provider: string) => {
        Alert.alert('Social Login', `Login with ${provider} will be implemented`);
    };

    const handleForgotPassword = () => {
        // navigation.navigate('ForgotPassword');
        Alert.alert('Forgot Password', 'Reset password feature will be implemented');
    };

    const handleSignUp = () => {
        // navigation.navigate('SignUp');
        Alert.alert('Sign Up', 'Navigate to Sign Up screen');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#667eea" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoid}
            >
                {/* Background Gradient */}
                <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.backgroundGradient}
                >
                    {/* Decorative Elements */}
                    <View style={styles.decorativeCircle1} />
                    <View style={styles.decorativeCircle2} />
                    <View style={styles.decorativeCircle3} />
                </LinearGradient>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <Animated.View
                        style={[
                            styles.content,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }]
                            }
                        ]}
                    >
                        {/* Header */}
                        <View style={styles.header}>
                            <View style={styles.logoContainer}>
                                <LinearGradient
                                    colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                                    style={styles.logoBackground}
                                >
                                    <Icon name="shopping-bag" size={40} color="white" />
                                </LinearGradient>
                            </View>
                            <Text style={styles.welcomeText}>Welcome Back!</Text>
                            <Text style={styles.subtitleText}>
                                Sign in to continue shopping
                            </Text>
                        </View>

                        {/* Login Form */}
                        <View style={styles.formContainer}>
                            {/* Email Input */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Email Address</Text>
                                <View style={[
                                    styles.inputContainer,
                                    emailError ? styles.inputError : null
                                ]}>
                                    <Icon name="mail" size={20} color="#7f8c8d" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter your email"
                                        placeholderTextColor="#bdc3c7"
                                        value={email}
                                        onChangeText={(text) => {
                                            setEmail(text);
                                            if (emailError) setEmailError('');
                                        }}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                </View>
                                {emailError ? (
                                    <Text style={styles.errorText}>{emailError}</Text>
                                ) : null}
                            </View>

                            {/* Password Input */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Password</Text>
                                <View style={[
                                    styles.inputContainer,
                                    passwordError ? styles.inputError : null
                                ]}>
                                    <Icon name="lock" size={20} color="#7f8c8d" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter your password"
                                        placeholderTextColor="#bdc3c7"
                                        value={password}
                                        onChangeText={(text) => {
                                            setPassword(text);
                                            if (passwordError) setPasswordError('');
                                        }}
                                        secureTextEntry={!showPassword}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={styles.eyeIcon}
                                        activeOpacity={0.7}
                                    >
                                        <Icon
                                            name={showPassword ? "eye-off" : "eye"}
                                            size={20}
                                            color="#7f8c8d"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {passwordError ? (
                                    <Text style={styles.errorText}>{passwordError}</Text>
                                ) : null}
                            </View>

                            {/* Remember Me & Forgot Password */}
                            <View style={styles.optionsRow}>
                                <TouchableOpacity
                                    style={styles.rememberMeContainer}
                                    onPress={() => setRememberMe(!rememberMe)}
                                    activeOpacity={0.7}
                                >
                                    <View style={[
                                        styles.checkbox,
                                        rememberMe ? styles.checkboxChecked : null
                                    ]}>
                                        {rememberMe && (
                                            <Icon name="check" size={14} color="white" />
                                        )}
                                    </View>
                                    <Text style={styles.rememberMeText}>Remember me</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleForgotPassword}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Login Button */}
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={handleLogin}
                                disabled={isLoading}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={['#667eea', '#764ba2']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.loginButtonGradient}
                                >
                                    {isLoading ? (
                                        <View style={styles.loadingContainer}>
                                            <Text style={styles.loginButtonText}>Signing In...</Text>
                                        </View>
                                    ) : (
                                        <Text style={styles.loginButtonText}>Sign In</Text>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={styles.dividerContainer}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>or continue with</Text>
                                <View style={styles.dividerLine} />
                            </View>

                            {/* Social Login Buttons */}
                            <View style={styles.socialContainer}>
                                <TouchableOpacity
                                    style={styles.socialButton}
                                    onPress={() => handleSocialLogin('Google')}
                                    activeOpacity={0.8}
                                >
                                    <Icon name="chrome" size={20} color="#db4437" />
                                    <Text style={styles.socialButtonText}>Google</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.socialButton}
                                    onPress={() => handleSocialLogin('Facebook')}
                                    activeOpacity={0.8}
                                >
                                    <Icon name="facebook" size={20} color="#4267B2" />
                                    <Text style={styles.socialButtonText}>Facebook</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Sign Up Link */}
                            <View style={styles.signUpContainer}>
                                <Text style={styles.signUpText}>Don't have an account? </Text>
                                <TouchableOpacity
                                    onPress={handleSignUp}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.signUpLink}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    keyboardAvoid: {
        flex: 1,
    },
    backgroundGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: screenHeight * 0.4,
    },
    decorativeCircle1: {
        position: 'absolute',
        width: dynamicSize(200),
        height: dynamicSize(200),
        borderRadius: dynamicSize(100),
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        top: -dynamicSize(50),
        right: -dynamicSize(50),
    },
    decorativeCircle2: {
        position: 'absolute',
        width: dynamicSize(150),
        height: dynamicSize(150),
        borderRadius: dynamicSize(75),
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        top: dynamicSize(100),
        left: -dynamicSize(30),
    },
    decorativeCircle3: {
        position: 'absolute',
        width: dynamicSize(100),
        height: dynamicSize(100),
        borderRadius: dynamicSize(50),
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        bottom: dynamicSize(50),
        right: dynamicSize(30),
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: dynamicSize(24),
    },
    header: {
        alignItems: 'center',
        paddingTop: dynamicSize(60),
        paddingBottom: dynamicSize(40),
    },
    logoContainer: {
        marginBottom: dynamicSize(24),
    },
    logoBackground: {
        width: dynamicSize(80),
        height: dynamicSize(80),
        borderRadius: dynamicSize(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: dynamicSize(28),
        fontFamily: FontFamily.sofiaProBold,
        color: 'white',
        marginBottom: dynamicSize(8),
    },
    subtitleText: {
        fontSize: dynamicSize(16),
        fontFamily: FontFamily.nunitoRegular,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },
    formContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: dynamicSize(24),
        borderTopRightRadius: dynamicSize(24),
        paddingHorizontal: dynamicSize(24),
        paddingTop: dynamicSize(32),
        paddingBottom: dynamicSize(24),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    inputGroup: {
        marginBottom: dynamicSize(20),
    },
    inputLabel: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoSemiBold,
        color: '#2c3e50',
        marginBottom: dynamicSize(8),
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: dynamicSize(12),
        borderWidth: 1,
        borderColor: '#e9ecef',
        paddingHorizontal: dynamicSize(16),
        height: dynamicSize(52),
    },
    inputError: {
        borderColor: '#ff6b6b',
        backgroundColor: '#fff5f5',
    },
    inputIcon: {
        marginRight: dynamicSize(12),
    },
    textInput: {
        flex: 1,
        fontSize: dynamicSize(16),
        fontFamily: FontFamily.nunitoRegular,
        color: '#2c3e50',
        paddingVertical: 0,
    },
    eyeIcon: {
        padding: dynamicSize(4),
    },
    errorText: {
        fontSize: dynamicSize(12),
        fontFamily: FontFamily.nunitoRegular,
        color: '#ff6b6b',
        marginTop: dynamicSize(4),
        marginLeft: dynamicSize(4),
    },
    optionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: dynamicSize(32),
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: dynamicSize(20),
        height: dynamicSize(20),
        borderRadius: dynamicSize(4),
        borderWidth: 2,
        borderColor: '#bdc3c7',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: dynamicSize(8),
    },
    checkboxChecked: {
        backgroundColor: '#667eea',
        borderColor: '#667eea',
    },
    rememberMeText: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoRegular,
        color: '#7f8c8d',
    },
    forgotPasswordText: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoSemiBold,
        color: '#667eea',
    },
    loginButton: {
        borderRadius: dynamicSize(12),
        overflow: 'hidden',
        marginBottom: dynamicSize(24),
    },
    loginButtonGradient: {
        paddingVertical: dynamicSize(16),
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonText: {
        color: 'white',
        fontSize: dynamicSize(16),
        fontFamily: FontFamily.sofiaProBold,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: dynamicSize(24),
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e9ecef',
    },
    dividerText: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoRegular,
        color: '#7f8c8d',
        marginHorizontal: dynamicSize(16),
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: dynamicSize(32),
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e9ecef',
        borderRadius: dynamicSize(12),
        paddingVertical: dynamicSize(12),
        marginHorizontal: dynamicSize(6),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    socialButtonText: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoSemiBold,
        color: '#2c3e50',
        marginLeft: dynamicSize(8),
    },
    signUpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpText: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoRegular,
        color: '#7f8c8d',
    },
    signUpLink: {
        fontSize: dynamicSize(14),
        fontFamily: FontFamily.nunitoSemiBold,
        color: '#667eea',
    },
});

export default LoginScreen;