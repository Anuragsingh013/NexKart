// // screens/Profile/ProfileScreen.tsx
// import React from 'react';
// import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
// import { styles } from '../../constants/products';


// const ProfileScreen = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.profileHeader}>
//         <View style={styles.profileAvatar}>
//           <Text style={styles.profileAvatarText}>JD</Text>
//         </View>
//         <Text style={styles.profileName}>John Doe</Text>
//         <Text style={styles.profileEmail}>john.doe@example.com</Text>
//       </View>

//       <View style={styles.profileMenu}>
//         <TouchableOpacity style={styles.profileMenuItem}>
//           <Text style={styles.profileMenuItemText}>My Orders</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.profileMenuItem}>
//           <Text style={styles.profileMenuItemText}>Shipping Addresses</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.profileMenuItem}>
//           <Text style={styles.profileMenuItemText}>Payment Methods</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.profileMenuItem}>
//           <Text style={styles.profileMenuItemText}>Wishlist</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.profileMenuItem}>
//           <Text style={styles.profileMenuItemText}>Settings</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.profileMenuItem, styles.logoutButton]}>
//           <Text style={styles.logoutButtonText}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ProfileScreen;
import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';

const ProfileScreen = () => {
  // Dummy data
  const dummyData = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Alice Johnson' },
    { id: '4', name: 'Bob Brown' },
  ];

  // Render each item
  const renderItem = ({ item }: { item: { id: string; name: string } }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  // Header component
  const renderHeader = () => (
    <View style={styles.headerFooterContainer}>
      <Text style={styles.headerFooterText}>--- List Header ---</Text>
    </View>
  );

  // Footer component
  const renderFooter = () => (
    <View style={styles.headerFooterContainer}>
      <Text style={styles.headerFooterText}>--- List Footer ---</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default ProfileScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 16,
  },
  itemContainer: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
  },
  headerFooterContainer: {
    padding: 16,
    backgroundColor: '#d1e7dd',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
  },
  headerFooterText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
