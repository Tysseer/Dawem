import React, { Component } from "react";
import { connect } from "react-redux";
import {
  reduxActionSetLanguage,
  reduxActionSetFirstRunFlag,
} from "../redux/reduxActions";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

class ScreenLanguage extends Component {
  constructor(props) {
    super(props);
  }
  getlangStyle(strLang) {
    return [
      styles.langView,
      this.props.strLang == strLang
        ? { borderColor: "#dddddd" }
        : { borderColor: "#dddddd00" },
    ];
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
    return (
      <ImageBackground
        style={styles.background}
        source={require("../../assets/backgroundPNG/crescent_bk.png")}
      >
        <View style={this.getlangStyle("ar")}>
          <TouchableWithoutFeedback onPress={this.arLangPressed.bind(this)}>
            <Image
              source={require("../../assets/images/lang_ar.png")}
              style={styles.langLogo}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={this.getlangStyle("en")}>
          <TouchableWithoutFeedback onPress={this.enLangPressed.bind(this)}>
            <Image
              source={require("../../assets/images/lang_en.png")}
              style={styles.langLogo}
            />
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.okButton}>
          <TouchableWithoutFeedback onPress={this.okButtonPressed.bind(this)}>
            <Image
              source={require("../../assets/icons/ok_icon.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    );
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
  background: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
  },
  langLogo: {
    width: 180,
    height: 180,
    margin: 10,
  },

  okButton: {
    alignSelf: "center",

    width: 90,
    height: 90,
    marginTop: 30,
  },

  langView: {
    borderColor: "#dddddd",
    borderWidth: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
