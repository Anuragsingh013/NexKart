
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Text, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import CustomFlashMessage from './src/components/CustomFlashMessage';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={persistor}
      >
        <View style={{ flex: 1 }}>
          <AppNavigator />
          <FlashMessage position="top"
          />
        </View>

      </PersistGate>
    </Provider>
  );
};

export default App;