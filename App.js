import React, { Component, useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import ScreenRevisions from "./app/js/screens/ScreenRevisions";
import ScreenWelcome from "./app/js/screens/ScreenWelcome";
import ScreenLanguage from "./app/js/screens/ScreenLanguage";
import ScreenQuranBrowser from "./app/js/screens/ScreenQuranBrowser";
import ScreenRevisionDetails from "./app/js/screens/ScreenRevisionDetails";
import ScreenSettings from "./app/js/screens/ScreenSettings";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import reduxStore from "./app/js/redux/reduxStore";
import reduxPersistor from "./app/js/redux/reduxPersistor";
import { PersistGate } from "redux-persist/integration/react";
import Revision from "./app/js/helpers/Revision";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

export default class App extends Component {
  async fetchFonts() {
    const y = await Font.loadAsync({
      "sans-serif": require("./app/assets/fonts/ArabicKufi.ttf"),
      "Segoe UI": require("./app/assets/fonts/SegoeUI.ttf"),
      "Segoe UI_MSFontService": require("./app/assets/fonts/SegoeUIBold.ttf"),
      Amiri: require("./app/assets/fonts/Amiri-Regular.ttf"),
      Amiri_Bold: require("./app/assets/fonts/Amiri-Bold.ttf"),
      Poppins: require("./app/assets/fonts/Poppins-Regular.ttf"),
      Poppins_xBold: require("./app/assets/fonts/Poppins-ExtraBold.ttf"),
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
        <Text style={{ fontSize: 40, color: "red" }}>Loading</Text>
      </View>
    );
  }

  getFonts() {}

  getNavigationStack() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {reduxStore.getState().bIsFirstRun ? (
            <Stack.Screen name="ScrLang" component={ScreenLanguage} />
          ) : null}
          {reduxStore.getState().bSkipWelcome == false ? (
            <Stack.Screen name="ScrWelcome" component={ScreenWelcome} />
          ) : null}
          <Stack.Screen name="ScrList" component={ScreenRevisions} />
          <Stack.Screen name="ScrRev" component={ScreenRevisionDetails} />
          <Stack.Screen name="ScrQuran" component={ScreenQuranBrowser} />
          <Stack.Screen name="ScrSettings" component={ScreenSettings} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  render() {
    if (!this.state.fontLoadedFinished) {
      return null;
    } else {
      return (
        <Provider store={reduxStore}>
          <PersistGate
            loading={null}
            persistor={reduxPersistor}
            onBeforeLift={this.onBeforeLift.bind(this)}
          >
            {this.state.bIsLoaded
              ? this.getNavigationStack()
              : this.getLoadingRender()}
          </PersistGate>
        </Provider>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#666",
    alignItems: "center",
    justifyContent: "center",
  },
});
