import React, { Component } from "react";
import { connect } from "react-redux";
import {
  reduxActionSetLanguage,
  reduxActionSetNotifFlag,
} from "../redux/reduxActions";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  I18nManager,
  TouchableOpacity,
  Switch,
} from "react-native";
import * as strings from "js/helpers/StringsManager";
import StringsManager from "js/helpers/StringsManager";
import ActionBtn from "app/components/ActionBtn";
import * as Updates from "expo-updates";
import { useFocusEffect } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../constants";
import EnFlag from "assets/images/lang_en.png";
import ArFlag from "assets/images/lang_ar.png";
import { getFontBasicStyle } from "../helpers/scripts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

const addDailyNotification = async (strMgr) => {
  // const identifier1 = await Notifications.scheduleNotificationAsync({
  //   content: {
  //     title: strMgr.getStr(strings.DAILY_NOTIFICATION_TITLE),
  //     body: strMgr.getStr(strings.DAILY_NOTIFICATION_BODY),
  //     //  data: { data: "goes here" },
  //   },
  //   trigger: { seconds: 2, repeats: true },
  // });

  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: strMgr.getStr(strings.DAILY_NOTIFICATION_TITLE),
      body: strMgr.getStr(strings.DAILY_NOTIFICATION_BODY),
      //  data: { data: "goes here" },
    },
    trigger: { hour: 12, minute: 10, repeats: true },
  });
  return identifier;
};
async function cancelNotifications(identifier) {
  await Notifications.cancelScheduledNotificationAsync(identifier);
}
async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
//  this.localNotificationId = triggerNotifications();
//  cancelAllNotifications();
const langs = [
  {
    key: "en",
    title: "English",
  },
  {
    key: "ar",
    title: "العربية",
  },
];

function RefreshBadgesOnFocus({ onUpdate }) {
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      onUpdate();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  return null;
}

const ApplyAndRestartApp = async (fnreduxActionSetLanguage, newLang) => {
  try {
    await fnreduxActionSetLanguage(newLang);

    setTimeout(function () {
      I18nManager.forceRTL(newLang == "ar");
      Updates.reloadAsync();
    }, 600);

    // let strMgr = new StringsManager();
    // strMgr.setLanguage(newLang);
    // alert(strMgr.getStr(strings.STR_RESTART_PROMPT));
  } catch (err) {
    console.log(err);
  }
};
class ScreenSettings extends Component {
  constructor(props) {
    super(props);
    this.height = Dimensions.get("window").height;
    this.width = Dimensions.get("window").width;
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
    this.originalLang = this.props.strLang;
    this.state = {
      selectedLang: this.props.strLang,
      buttonTxt: this.stringsManager.getStr(strings.STR_SEL_LANGUAGE),
      bNotifFlag: this.props.bDailyNotification,
    };
  }

  languageHandler(lang) {
    this.stringsManager.setLanguage(lang);
    this.setState({
      selectedLang: lang,
      buttonTxt: this.stringsManager.getStr(strings.STR_SEL_LANGUAGE),
    });
  }
  async okButtonPressed() {
    let newLang = this.state.selectedLang;
    await AsyncStorage.setItem("strLang", newLang);
    this.stringsManager.setLanguage(newLang);
    // alert(this.stringsManager.getStr(strings.STR_RESTART_PROMPT));
    ApplyAndRestartApp(this.props.reduxActionSetLanguage, newLang);
  }
  onFocus() {
    this.stringsManager.setLanguage(this.props.strLang);
    this.originalLang = this.props.strLang;
    this.state = {
      selectedLang: this.props.strLang,
      buttonTxt: this.stringsManager.getStr(strings.STR_SEL_LANGUAGE),
    };
  }
  renderLanguageItem(lang) {
    return (
      <TouchableOpacity
        key={lang.key}
        activeOpacity={0.7}
        onPress={() => this.languageHandler(lang.key)}
        style={styles.langContainer}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={lang.key == "en" ? EnFlag : ArFlag}
            style={{
              width: this.width / 10,
              height: this.width / 10,
              marginRight: this.width / 28,
            }}
          />
          <Text style={this.getlangLabelTextStyle(lang.key)}>{lang.title}</Text>
        </View>
        {/* this.props.strLang */}
        {this.state.selectedLang == lang.key ? (
          <MaterialCommunityIcons
            name="check"
            size={24}
            color={colors.primary}
          />
        ) : (
          <View />
        )}
      </TouchableOpacity>
    );
  }
  onToggleNotif() {
    let bNewDailyNotification = !this.state.bNotifFlag;
    reduxActionSetNotifFlag(bNewDailyNotification);
    cancelAllNotifications();
    if (bNewDailyNotification) addDailyNotification(this.stringsManager);
    this.setState({
      bNotifFlag: bNewDailyNotification,
    });
  }
  render() {
    this.stringsManager.setLanguage(this.props.strLang);
    return (
      <View style={styles.mainContainer}>
        <RefreshBadgesOnFocus onUpdate={this.onFocus.bind(this)} />
        <View style={styles.quranLogoContainer}>
          <Image
            source={require("assets/images/Quran_logo.png")}
            style={{ resizeMode: "contain" }}
          />
        </View>
        <View style={styles.separator} />

        <View style={styles.notifSettingBar}>
          <View style={{ flexDirection: "row" }}>
            <Switch
              trackColor={{
                false: colors.primary_disabled,
                true: colors.primary,
              }}
              thumbColor={this.state.bNotifFlag ? "#ddd" : "#aaa"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.onToggleNotif.bind(this)}
              value={this.state.bNotifFlag}
              style={{ marginVertical: 15 }}
            />
            <Text style={this.getlangLabelTextStyle(this.originalLang)}>
              {this.stringsManager.getStr(strings.STR_DAILY_REMINDER)}
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.allLangsContainer}>
          {this.renderLanguageItem(langs[0])}
          <View style={styles.separator} />
          {this.renderLanguageItem(langs[1])}
        </View>

        <ActionBtn
          text={this.state.buttonTxt}
          handler={this.okButtonPressed.bind(this)}
          lang={this.state.selectedLang}
          style={{
            height: this.height / 12.5,
            width: "90%",
            marginTop: this.height / 46,
            marginBottom: this.height / 37.5,
          }}
        />
      </View>
    );
  }
  getlangLabelTextStyle(strLang) {
    return [
      {
        lineHeight: 35,
        alignSelf: "center",
        color: "#0C3D11",
      },
      getFontBasicStyle(strLang, false),
    ];
  }
}
const mapStateToProps = (state) => ({
  strLang: state.strLang,
  bDailyNotification: state.bDailyNotification,
});
const mapDispatchToProps = () => {
  return {
    reduxActionSetLanguage,
    reduxActionSetNotifFlag,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(ScreenSettings);
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
  },
  notifSettingBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "93%",
    height: 30,
  },
  quranLogoContainer: {
    alignItems: "center",
    justifyContent: "center",

    height: "42%",
    width: "100%",
  },
  allLangsContainer: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  langContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "93%",
    height: 70,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    // borderWidth: 2,

    borderColor: "#0B721EFF",
  },

  separator: {
    borderColor: "#88888859",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 2,
    width: "93%",
    marginVertical: 15,
  },
});
