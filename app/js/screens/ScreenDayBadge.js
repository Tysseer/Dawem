import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
  Image,
} from "react-native";

import { connect } from "react-redux";
import * as strings from "../helpers/StringsManager";
import StringsManager from "../helpers/StringsManager";
import RevisionsManager from "../helpers/RevisionsManager";
import Screen from "app/components/Screen";

class ScreenDayBadge extends Component {
  constructor(props) {
    super(props);
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
    //console.log(Dimensions.get("window"));

    this.revisionsManager = new RevisionsManager();
    this.revisionsManager.m_loadedRevisions = this.props.revisions;
    var bIsDay, bIsMonth, bIsWeek;
    [bIsDay, bIsMonth, bIsWeek] = this.revisionsManager.getBadgesStates();
    this.isEnabled = bIsDay;
  }

  okButtonPressed() {
    this.props.navigation.navigate("Home", { screen: "ScrList" });
  }

  render() {
    var strStatus =
      this.props.revisions.length < 7
        ? this.stringsManager.getStr(strings.STR_DAY_BADGE_MIN_REV)
        : this.isEnabled == false
        ? this.stringsManager.getStr(strings.STR_DAY_BADGE_INACTIVE)
        : this.stringsManager.getStr(strings.STR_DAY_BADGE_ACTIVE);
    return (
      <Screen>
        <View style={styles.mainContainer}>
          <View style={styles.messageContainer}>
            <ImageBackground
              source={require("assets/backgroundPNG/green_background_withQuran.png")}
              style={styles.backgroundImage}
            >
              <View style={styles.contentContainer}>
                <Image
                  style={styles.badge}
                  source={require("../../assets/images/dayBadge.png")}
                ></Image>
                <Text style={this.getTitleStyle()}>
                  {this.stringsManager.getStr(strings.STR_DAYBADGE_NAME)}
                </Text>
                <Text style={this.getSubTitleStyle()}>
                  {this.stringsManager.getStr(strings.STR_DAY_BADGE_DESC)}
                </Text>
                <View style={styles.separator}></View>
                <Text style={this.getSubTitleStyle()}>{strStatus}</Text>
              </View>
            </ImageBackground>
          </View>
        </View>
      </Screen>
    );
  }
  getTitleStyle() {
    return {
      fontSize: this.props.strLang == "ar" ? 36 : 32,
      lineHeight: this.props.strLang == "ar" ? 63 : 50,
      fontFamily: this.props.strLang == "ar" ? "Amiri_Bold" : "Poppins-Bold",
      textAlign: "center",
      color: "#FFFFFF",
      margin: 15,
    };
  }
  getSubTitleStyle() {
    return {
      fontSize: this.props.strLang == "ar" ? 22 : 16,
      lineHeight: this.props.strLang == "ar" ? 36 : 28,
      fontFamily: this.props.strLang == "ar" ? "Amiri" : "Poppins",
      textAlign: "center",
      color: "#FFFFFF",
    };
  }
}
const mapStateToProps = (state) => ({
  revisions: state.revisions,
  strLang: state.strLang,
});
const mapDispatchToProps = () => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps())(ScreenDayBadge);
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
    width: 280,
    height: 1,
    marginVertical: 15,
  },
  contentContainer: {
    width: "90%",
    height: "90%",
    alignSelf: "center",
    marginTop: "8%",
    marginBottom: 20,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-around",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  badge: {
    width: 140,
    height: 140,
  },
});
