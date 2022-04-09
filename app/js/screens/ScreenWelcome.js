import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
  Dimensions,
} from "react-native";
import CheckBox from "react-native-check-box";
import { connect } from "react-redux";
import { reduxActionSetWelcomeFlag } from "../redux/reduxActions";
import * as strings from "../helpers/StringsManager";
import StringsManager from "../helpers/StringsManager";
import ActionBtn from "app/components/ActionBtn";
import Screen from "app/components/Screen";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

class ScreenWelcome extends Component {
  constructor(props) {
    super(props);
    this.height = Dimensions.get("window").height;
    this.width = Dimensions.get("window").width;
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
    // this.registerForPushNotificationsAsync();
    //console.log(Dimensions.get("window"));
  }

  async okButtonPressed() {
    this.props.navigation.navigate("Home", { screen: "Main" });
  }

  // registerForPushNotificationsAsync = async () => {
  //   let token;
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     // alert('Must use physical device for Push Notifications');
  //   }
  //   return token;
  // };

  render() {
    return (
      <Screen>
        <View style={styles.mainContainer}>
          <View style={{ width: "100%", alignItems: "center", height: "68%" }}>
            <View style={styles.messageContainer}>
              <ImageBackground
                source={require("assets/backgroundPNG/green_background_withQuran.png")}
                style={styles.backgroundImage}
              >
                <View style={{ width: "93%" }}>
                  <Text style={this.getTitleStyle()}>
                    {this.stringsManager.getStr(strings.STR_GREETING)}
                  </Text>
                  <Text style={this.getSubTitleStyle()}>
                    {this.stringsManager.getStr(strings.STR_MOTIVATION)}
                  </Text>
                  <View style={[styles.separator, { alignSelf: "center" }]} />
                  <Text style={this.getInstructionsTitleStyle()}>
                    {this.stringsManager.getStr(strings.STR_INSTRUCTIONS_TITLE)}
                  </Text>
                  <Text style={this.getInstructionsStyle()}>
                    {this.stringsManager.getStr(strings.STR_INSTRUCTIONS)}
                  </Text>
                </View>
              </ImageBackground>
            </View>

            <View style={this.getCheckBoxContainerStyle()}>
              <CheckBox
                onClick={() => {
                  this.props.reduxActionSetWelcomeFlag(
                    !this.props.bSkipWelcome
                  );
                }}
                isChecked={this.props.bSkipWelcome}
                checkBoxColor="#0C3D11"
              />
              <TouchableHighlight
                onPress={() => {
                  this.props.reduxActionSetWelcomeFlag(
                    !this.props.bSkipWelcome
                  );
                }}
                underlayColor="#FFFFFF11"
              >
                <Text style={this.getCheckBoxTextStyle()}>
                  {this.stringsManager.getStr(strings.STR_SKIP_SCREEN)}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
          <ActionBtn
            text={this.stringsManager.getStr(strings.STR_START_NOW)}
            handler={this.okButtonPressed.bind(this)}
            lang={this.props.strLang}
            style={{
              height: this.height / 15.6,
              width: "100%",
              marginBottom: "2%",
            }}
          />
        </View>
      </Screen>
    );
  }
  getTitleStyle() {
    return {
      fontSize: this.props.strLang == "ar" ? this.width / 12 : 32,
      // lineHeight: this.props.strLang == "ar" ? 63 : 50,
      fontFamily: this.props.strLang == "ar" ? "Amiri_Bold" : "Poppins-Bold",
      textAlign: "center",
      color: "#FFFFFF",
      margin: this.width / 25,
    };
  }
  getSubTitleStyle() {
    return {
      fontSize: this.props.strLang == "ar" ? this.width / 20.3 : 16,
      // lineHeight: this.props.strLang == "ar" ? 36 : 28,
      fontFamily: this.props.strLang == "ar" ? "Amiri" : "Poppins",
      textAlign: "center",
      color: "#FFFFFF",
    };
  }
  getInstructionsTitleStyle() {
    return {
      fontSize: this.props.strLang == "ar" ? this.width / 18 : 18,
      // lineHeight: this.props.strLang == "ar" ? 36 : 30,
      fontFamily: this.props.strLang == "ar" ? "Amiri_Bold" : "Poppins-Bold",
      textDecorationLine: "underline",
      color: "#FFFFFF",

      alignSelf: "flex-start",
      marginBottom: 10,
    };
  }
  getInstructionsStyle() {
    return {
      fontSize: this.props.strLang == "ar" ? this.width / 20.3 : 16,
      // lineHeight: this.props.strLang == "ar" ? 36 : 30,
      fontFamily: this.props.strLang == "ar" ? "Amiri" : "Poppins",
      alignSelf: "flex-start",
      color: "#FFFFFF",
    };
  }
  getCheckBoxContainerStyle() {
    return {
      flexDirection: "row",
      width: "100%",
      marginTop: "2%",
    };
  }
  getCheckBoxTextStyle() {
    return {
      fontSize: this.props.strLang == "ar" ? this.width / 29 : 13,
      fontFamily: this.props.strLang == "ar" ? "Amiri_Bold" : "Poppins-Bold",
      textAlign: "center",
      color: "#0C3D11",
      // lineHeight: this.props.strLang == "ar" ? 30 : 28,
      marginHorizontal: this.width / 70,
    };
  }
}
const mapStateToProps = (state) => ({
  bSkipWelcome: state.bSkipWelcome,
  strLang: state.strLang,
});
const mapDispatchToProps = () => {
  return {
    reduxActionSetWelcomeFlag,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(ScreenWelcome);
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    justifyContent: "space-between",
  },
  messageContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    alignItems: "center",
  },

  separator: {
    borderColor: "#FFFFFF59",
    borderWidth: 1,
    borderRadius: 10,
    width: "80%",
    height: 1,
    marginVertical: "5%",
  },
});
