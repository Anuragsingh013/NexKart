// screens/Profile/ProfileScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { styles } from '../../constants/products';
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = () => {
  const navigation=useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>JD</Text>
        </View>
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john.doe@example.com</Text>
      </View>

      <View style={styles.profileMenu}>
        <TouchableOpacity style={styles.profileMenuItem} onPress={()=>{
          navigation.navigate("dynamicTable")
        }}>
          <Text style={styles.profileMenuItemText}>My Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileMenuItem}>
          <Text style={styles.profileMenuItemText}>Shipping Addresses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileMenuItem}>
          <Text style={styles.profileMenuItemText}>Payment Methods</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileMenuItem}>
          <Text style={styles.profileMenuItemText}>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileMenuItem}>
          <Text style={styles.profileMenuItemText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.profileMenuItem, styles.logoutButton]}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

