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
  }

  onBeforeLift() {
    // take some action before the gate lifts
    console.log("onbeforelift: " + reduxStore.getState().strLang);
    for (var i = 0; i < reduxStore.getState().revisions.length; i++) {
      var rev = new Revision();
      rev.fillFromSerializedObj(reduxStore.getState().revisions[i]);
      reduxStore.getState().revisions[i] = rev;
    }
  }
  render() {
    const Stack = createStackNavigator();

    return (
      <Provider store={reduxStore}>
        <PersistGate
          loading={
            <View style={styles.container}>
              <Text style={{ fontSize: 40, color: "red" }}>Loading</Text>
            </View>
          }
          persistor={reduxPersistor}
          onBeforeLift={this.onBeforeLift.bind(this)}
        >
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="ScrLang" component={ScreenLanguage} />
              <Stack.Screen name="ScrWelcome" component={ScreenWelcome} />
              <Stack.Screen name="ScrList" component={ScreenRevisions} />
              <Stack.Screen name="ScrRev" component={ScreenRevisionDetails} />
              <Stack.Screen name="ScrQuran" component={ScreenQuranBrowser} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );

    // var read = new QuranReader();
    // var page = read.getPage(3);
    // return <ScreenQuranBrowser strtPage={page} quranReader={read} />;
    //return <ScreenRevisions revisionsManager={rev} />;
    //return <ScreenWelcome />;
    //return <ScreenLanguage />;
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
