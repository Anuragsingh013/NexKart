
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import CustomFlashMessage from './src/components/CustomFlashMessage';


const App = () => {
  return (<View style={{ flex: 1 }}>
    <AppNavigator />
    <FlashMessage position="top"
      // renderCustomContent={(props) => <CustomFlashMessage {...props} />}
    />
  </View>);
};

export default App;