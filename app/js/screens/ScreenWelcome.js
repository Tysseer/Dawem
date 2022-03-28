import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import CheckBox from "react-native-check-box";
import { connect } from "react-redux";
import { reduxActionSetWelcomeFlag } from "../redux/reduxActions";
import * as strings from "../helpers/StringsManager";
import StringsManager from "../helpers/StringsManager";
import ActionBtn from "../../components/ActionBtn";

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
        <View style={styles.messageContainer}>
          <ImageBackground
            source={require("../../assets/backgroundPNG/green_background_withQuran.png")}
            style={styles.backgroundImage}
          >
            <Text style={this.getTitleStyle()}>
              {this.stringsManager.getStr(strings.STR_GREETING)}
            </Text>
            <Text style={this.getSubTitleStyle()}>
              {this.stringsManager.getStr(strings.STR_MOTIVATION)}
            </Text>
            <View style={styles.separator}></View>
            <Text style={this.getInstructionsTitleStyle()}>
              {this.stringsManager.getStr(strings.STR_INSTRUCTIONS_TITLE)}
            </Text>
            <Text style={this.getInstructionsStyle()}>
              {this.stringsManager.getStr(strings.STR_INSTRUCTIONS)}
            </Text>
          </ImageBackground>

          <View style={this.getCheckBoxContainerStyle()}>
            <CheckBox
              onClick={() => {
                this.props.reduxActionSetWelcomeFlag(!this.props.bSkipWelcome);
              }}
              isChecked={this.props.bSkipWelcome}
              checkBoxColor="#0C3D11"
            />
            <TouchableHighlight
              onPress={() => {
                this.props.reduxActionSetWelcomeFlag(!this.props.bSkipWelcome);
              }}
              underlayColor="#FFFFFF11"
            >
              <Text style={this.getCheckBoxTextStyle()}>
                {this.stringsManager.getStr(strings.STR_SKIP_SCREEN)}
              </Text>
            </TouchableHighlight>
          </View>
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
      marginHorizontal: 50,
    };
  }
  getInstructionsTitleStyle() {
    return {
      fontSize: this.props.strLang == "ar" ? 22 : 18,
      lineHeight: 36,
      fontFamily: this.props.strLang == "ar" ? "Amiri_Bold" : "Poppins",
      textAlign: this.props.strLang == "ar" ? "right" : "left",
      textDecorationLine: "underline",
      color: "#FFFFFF",
      marginHorizontal: 50,
      alignSelf: this.props.strLang == "ar" ? "flex-end" : "flex-start",
    };
  }
  getInstructionsStyle() {
    return {
      fontSize: this.props.strLang == "ar" ? 22 : 18,
      lineHeight: 36,
      fontFamily: this.props.strLang == "ar" ? "Amiri_Bold" : "Poppins",
      textAlign: this.props.strLang == "ar" ? "right" : "left",
      color: "#FFFFFF",
      marginHorizontal: 40,
    };
  }
  getCheckBoxContainerStyle() {
    return {
      flexDirection: this.props.strLang == "ar" ? "row-reverse" : "row",
      width: "100%",
      marginTop: -15,
    };
  }
  getCheckBoxTextStyle() {
    return {
      fontSize: 15,
      fontFamily: "Amiri_Bold",
      textAlign: "center",
      color: "#0C3D11",
      lineHeight: 30,
    };
  }
  renderOKButton(nStrID, onPressHandler) {
    var styleContainer = {
      flex: 1,
      justifyContent: "flex-end",
      marginBottom: 5,
      width: "100%",
      alignItems: "center",
    };

    var styleOKButton = {
      backgroundColor: "#0B721E",
      alignItems: "center",
      justifyContent: "center",
      width: "93%",
      height: 70,
      borderRadius: 10,
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
      <View style={styleContainer}>
        <TouchableWithoutFeedback onPress={onPressHandler}>
          <View style={styleOKButton}>
            <View>
              <Text style={styleOkButtonTxt}>
                {this.stringsManager.getStr(nStrID)}
              </Text>
            </View>
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
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    borderWidth: 1,
    borderColor: "red",
  },
  messageContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    width: "93%",
    height: "95%",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "blue",
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
    marginBottom: 15,
  },
});
