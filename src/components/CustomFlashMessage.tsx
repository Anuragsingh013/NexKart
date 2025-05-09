// CustomFlashMessage.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CustomFlashMessage = ({ message, description, icon, ...rest }: any) => {
  return (
    <View style={styles.container}>
      {icon && (
        React.isValidElement(icon) ? (icon) : (
          <Image source={icon} style={styles.icon} />
        )
      )}
      {message && <Text style={styles.message}>{message}</Text>}
      <View style={styles.textContainer}>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default CustomFlashMessage;
