import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import CheckBox from "react-native-check-box";
import { connect } from "react-redux";
import { reduxActionSetWelcomeFlag } from "../redux/reduxActions";
import * as strings from "../helpers/StringsManager";
import StringsManager from "../helpers/StringsManager";
import { BackgroundFetch } from "expo";

class ScreenWelcome extends Component {
  constructor(props) {
    super(props);
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
  }

  okButtonPressed() {
    this.props.navigation.navigate("ScrList");
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View>
          <Text style={this.getTitleStyle()}>
            {this.stringsManager.getStr(strings.STR_GREETING)}
          </Text>
          <Text style={this.getSubTitleStyle()}>
            {this.stringsManager.getStr(strings.STR_MOTIVATION)}
          </Text>
          <View style={styles.separator}></View>
        </View>

        {this.renderOKButton(
          strings.STR_START_NOW,
          this.okButtonPressed.bind(this)
        )}
      </View>
    );
  }
  getTitleStyle() {
    return {
      fontSize: this.props.strLang == "ar" ? 40 : 36,
      lineHeight: 63,
      fontFamily: this.props.strLang == "ar" ? "Amiri_Bold" : "Poppins",
      textAlign: "center",
      color: "#FFFFFF",
      margin: 20,
    };
  }
  getSubTitleStyle() {
    return {
      fontSize: this.props.strLang == "ar" ? 22 : 18,
      lineHeight: 36,
      fontFamily: this.props.strLang == "ar" ? "Amiri_Bold" : "Poppins",
      textAlign: "center",
      color: "#FFFFFF",
    };
  }
  renderOKButton(nStrID) {
    var styleOKButton = {
      backgroundColor: "#0B721E",
      alignItems: "center",
      justifyContent: "center",
      width: "93%",
      height: 70,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      marginTop: 50,
      marginBottom: 25,
    };
    var styleOkButtonTxt = {
      textAlign: "center",
      color: "#FFFFFF",
      fontFamily: this.props.strLang == "ar" ? "Amiri" : "Poppins",
      justifyContent: "center",
      fontSize: this.props.strLang == "ar" ? 22 : 20,
      lineHeight: 35,
      fontWeight: "600",
    };
    return (
      <View style={styleOKButton}>
        <TouchableWithoutFeedback onPress={this.okButtonPressed.bind(this)}>
          <View>
            <Text style={styleOkButtonTxt}>
              {this.stringsManager.getStr(nStrID)}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
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
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
  },
  background: {
    width: "100%",
    height: "80%",
    justifyContent: "flex-start",
    backgroundColor: "#EEEEEE00",
    alignItems: "center",
  },
  separator: {
    borderColor: "#FFFFFF59",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 1,
    width: "66%",
    marginBottom: 15,
  },
});
