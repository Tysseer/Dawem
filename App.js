import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import ScreenRevisions from "./app/js/screens/ScreenRevisions";
import ScreenWelcome from "./app/js/screens/ScreenWelcome";
import ScreenLanguage from "./app/js/screens/ScreenLanguage";
import ScreenQuranBrowser from "./app/js/screens/ScreenQuranBrowser";
import ScreenRevisionDetails from "./app/js/screens/ScreenRevisionDetails";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import reduxStore from "./app/js/redux/reduxStore";
import reduxPersistor from "./app/js/redux/reduxPersistor";
import { PersistGate } from "redux-persist/integration/react";
import Revision from "./app/js/helpers/Revision";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bIsLoaded: false,
    };
  }

  onBeforeLift() {
    // take some action before the gate lifts
    console.log("onBeforeLift " + reduxStore.getState().bIsFirstRun);
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  render() {
    console.log("render " + reduxStore.getState().bIsFirstRun);

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#666",
    alignItems: "center",
    justifyContent: "center",
  },
});
