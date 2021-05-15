import React, { Component } from "react";
import { connect } from "react-redux";
import {
  reduxActionSetLanguage,
  reduxActionSetWelcomeFlag,
} from "../redux/reduxActions";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

class ScreenSettings extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ImageBackground
        style={styles.background}
        source={require("../../assets/backgroundPNG/crescent_bk.png")}
      >
        <View style={styles.controlsRow}>
          <View style={this.getlangStyle("ar")}>
            <TouchableWithoutFeedback onPress={this.arLangPressed.bind(this)}>
              <Image
                source={require("../../assets/images/lang_ar.png")}
                style={styles.imgIcon}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={this.getlangStyle("en")}>
            <TouchableWithoutFeedback onPress={this.enLangPressed.bind(this)}>
              <Image
                source={require("../../assets/images/lang_en.png")}
                style={styles.imgIcon}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.controlsRow}>
          <View style={styles.iconView}>
            <TouchableWithoutFeedback onPress={this.arLangPressed.bind(this)}>
              <Image source={this.getFontSizeIcon()} style={styles.imgIcon} />
            </TouchableWithoutFeedback>
          </View>
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
  getFontSizeIcon() {
    if (this.props.strLang == "ar") {
      return require("../../assets/icons/fontSize_ar.png");
    }
    if (this.props.strLang == "en") {
      return require("../../assets/icons/fontSize_en.png");
    }
    return require("../../assets/icons/fontSize_ar.png");
  }
  getlangStyle(strLang) {
    return [
      styles.iconView,
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
    this.props.navigation.navigate("ScrList");
  }
}
const mapStateToProps = (state) => ({
  isSkipWelcome: state.bSkipWelcome,
  strLang: state.strLang,
});
const mapDispatchToProps = () => {
  return {
    reduxActionSetLanguage,
    reduxActionSetWelcomeFlag,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(ScreenSettings);
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: 120,
    margin: 20,
  },
  imgIcon: {
    width: 100,
    height: 100,
    margin: 10,
  },

  okButton: {
    alignSelf: "center",

    width: 90,
    height: 90,
    marginTop: 30,
  },

  iconView: {
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
