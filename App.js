import React, { Component } from 'react';

import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import reduxStore from './app/js/redux/reduxStore';
import reduxPersistor from './app/js/redux/reduxPersistor';

import Revision from './app/js/helpers/Revision';
import Navigation from './app/navigation';

export default class App extends Component {
  async fetchFonts() {
    const y = await Font.loadAsync({
      'sans-serif': require('./app/assets/fonts/ArabicKufi.ttf'),
      'Segoe UI': require('./app/assets/fonts/SegoeUI.ttf'),
      'Segoe UI_MSFontService': require('./app/assets/fonts/SegoeUIBold.ttf'),
      Amiri: require('./app/assets/fonts/Amiri-Regular.ttf'),
      Amiri_Bold: require('./app/assets/fonts/Amiri-Bold.ttf'),
      Poppins: require('./app/assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Bold': require('./app/assets/fonts/Poppins-Bold.ttf'),
      Poppins_xBold: require('./app/assets/fonts/Poppins-ExtraBold.ttf'),
    });
    this.setState({ fontLoadedFinished: true });
    return y;
  }

  constructor(props) {
    super(props);
    this.state = {
      bIsLoaded: false,
      fontLoaded: false,
      fontLoadedFinished: false,
    };
  }

  async componentDidMount() {
    if (!this.state.fontLoadedFinished) {
      return (
        <AppLoading
          startAsync={this.fetchFonts()}
          onFinish={() => {
            this.setState({ fontLoaded: true });
          }}
          onError={(err) => console.log(err)}
        />
      );
    }
  }

  onBeforeLift() {
    // take some action before the gate lifts
    for (var i = 0; i < reduxStore.getState().revisions.length; i++) {
      var rev = new Revision();
      rev.fillFromSerializedObj(reduxStore.getState().revisions[i]);
      reduxStore.getState().revisions[i] = rev;
    }
    this.setState({ bIsLoaded: true });
  }

  getLoadingRender() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 40, color: 'red' }}>Loading</Text>
      </View>
    );
  }

  getFonts() {}

  render() {
    if (!this.state.fontLoadedFinished) {
      return null;
    } else {
      return (
        <>
          <Provider store={reduxStore}>
            <PersistGate
              loading={null}
              persistor={reduxPersistor}
              onBeforeLift={this.onBeforeLift.bind(this)}
            >
              <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                  {this.state.bIsLoaded ? (
                    <Navigation />
                  ) : (
                    this.getLoadingRender()
                  )}
                </SafeAreaView>
              </SafeAreaProvider>
            </PersistGate>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
          </Provider>
        </>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
