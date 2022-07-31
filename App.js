import React, { Component } from "react";

import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import reduxStore from "./app/js/redux/reduxStore";
import reduxPersistor from "./app/js/redux/reduxPersistor";

import Revision from "./app/js/helpers/Revision";
import Navigation from "./app/navigation";
import { RootSiblingParent } from "react-native-root-siblings";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Audio } from "expo-av";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
async function setAudioSettingsAsync() {
  let promise = await Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    staysActiveInBackground: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    playThroughEarpieceAndroid: true,
  });
  return promise;
}
export default class App extends Component {
  async fetchFonts() {
    const y = await Font.loadAsync({
      "sans-serif": require("./app/assets/fonts/ArabicKufi.ttf"),
      "Segoe UI": require("./app/assets/fonts/SegoeUI.ttf"),
      "Segoe UI_MSFontService": require("./app/assets/fonts/SegoeUIBold.ttf"),
      Amiri: require("./app/assets/fonts/Amiri-Regular.ttf"),
      Amiri_Bold: require("./app/assets/fonts/Amiri-Bold.ttf"),
      Poppins: require("./app/assets/fonts/Poppins-Regular.ttf"),
      "Poppins-Bold": require("./app/assets/fonts/Poppins-Bold.ttf"),
      Poppins_xBold: require("./app/assets/fonts/Poppins-ExtraBold.ttf"),
      QuranSurah2: require("./app/assets/fonts/QuranSurah2.ttf"),
      Quraan: require("./app/assets/fonts/Quraan.ttf"),
      noorehidayat: require("./app/assets/fonts/noorehidayat.ttf"),
      UthmanicHafs: require("./app/assets/fonts/UthmanicHafs.ttf"),
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
    this.m_pushNotificationToken = null;
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
    registerForPushNotificationsAsync().then(
      (token) => (this.m_pushNotificationToken = token)
    );
    setAudioSettingsAsync().catch((error) => {
      alert("Audio setings error:" + error);
    });

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

  render() {
    if (!this.state.fontLoadedFinished) {
      return null;
    } else {
      return (
        <RootSiblingParent>
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
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
          </Provider>
        </RootSiblingParent>
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
