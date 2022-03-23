import React, { Component } from "react";
import { connect } from "react-redux";
import {
  reduxActionSetLanguage,
  reduxActionSetFirstRunFlag,
} from "../redux/reduxActions";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import * as strings from "../helpers/StringsManager";
import StringsManager from "../helpers/StringsManager";
class ScreenLanguage extends Component {
  constructor(props) {
    super(props);
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
  }

  arLangPressed() {
    this.props.reduxActionSetLanguage("ar");
  }
  enLangPressed() {
    this.props.reduxActionSetLanguage("en");
  }
  okButtonPressed() {
    this.props.reduxActionSetFirstRunFlag(false);
    if (this.props.isSkipWelcome == false)
      this.props.navigation.navigate("ScrWelcome");
    else this.props.navigation.navigate("ScrList");
  }
  render() {
    this.stringsManager.setLanguage(this.props.strLang);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.quranLogoContainer}>
          <Image
            source={require("../../assets/images/Quran_logo.png")}
            style={{ resizeMode: "contain" }}
          ></Image>
        </View>
        <View style={styles.allLangsContainer}>
          <TouchableWithoutFeedback onPress={this.enLangPressed.bind(this)}>
            <View style={this.getLangContainerStyle("en")}>
              <Image
                source={require("../../assets/images/lang_en.png")}
                style={styles.langLogo}
              />
              <Text style={this.getlangLabelTextStyle("en")}>English</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.separator}></View>
          <TouchableWithoutFeedback onPress={this.arLangPressed.bind(this)}>
            <View style={this.getLangContainerStyle("ar")}>
              <Image
                source={require("../../assets/images/lang_ar.png")}
                style={styles.langLogo}
              />
              <Text style={this.getlangLabelTextStyle("ar")}>العربية</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.okButton}>
          <TouchableWithoutFeedback onPress={this.okButtonPressed.bind(this)}>
            <View>
              <Text style={this.getlangButtonTextStyle()}>
                {this.stringsManager.getStr(strings.STR_SEL_LANGUAGE)}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  getLangContainerStyle(strLang) {
    return [
      styles.langContainer,
      this.props.strLang == strLang
        ? { borderColor: "#00AB14" }
        : { borderColor: "#00AB1400" },
    ];
  }

  getlangButtonTextStyle() {
    return {
      textAlign: "center",
      color: "#FFFFFF",
      fontFamily: this.props.strLang == "ar" ? "Amiri" : "Poppins",
      justifyContent: "center",
      fontSize: this.props.strLang == "ar" ? 22 : 20,
      lineHeight: 35,
      fontWeight: "600",
    };
  }
  getlangLabelTextStyle(strLang) {
    return {
      fontSize: strLang == "ar" ? 22 : 18,
      lineHeight: 35,

      fontFamily: strLang == "ar" ? "Amiri" : "Poppins",
      textAlign: "left",
      color: "#0C3D11",
    };
  }
}
const mapStateToProps = (state) => ({
  isSkipWelcome: state.bSkipWelcome,
  strLang: state.strLang,
});
const mapDispatchToProps = () => {
  return {
    reduxActionSetFirstRunFlag,
    reduxActionSetLanguage,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(ScreenLanguage);
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
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
    justifyContent: "flex-start",
    width: "93%",
    height: 70,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 2,

    borderColor: "#0B721EFF",
  },
  langLogo: {
    width: 40,
    height: 40,
    marginRight: 30,
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
  okButton: {
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
  },
});
