import React, { Component } from "react";
import { StyleSheet } from "react-native";

import ScreenRevisions from "./app/js/screens/ScreenRevisions";
import ScreenWelcome from "./app/js/screens/ScreenWelcome";
import ScreenLanguage from "./app/js/screens/ScreenLanguage";
import ScreenQuranBrowser from "./app/js/screens/ScreenQuranBrowser";
import ScreenRevisionDetails from "./app/js/screens/ScreenRevisionDetails";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider as StateProvider } from "react-redux";
import reduxStore from "./app/js/redux/reduxStore";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Stack = createStackNavigator();

    return (
      <StateProvider store={reduxStore}>
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
      </StateProvider>
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
