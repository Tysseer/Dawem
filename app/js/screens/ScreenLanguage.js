import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxActionSetLanguage } from "../redux/reduxActions";
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
    if (strLang == this.props.curLang) {
      return styles.langSelView;
    } else {
      return styles.langNonView;
    }
  }
  arLangPressed() {
    console.log("set lang to ar, was: " + this.props.curLang);
    //this.setState({ curLang: "ar" });
    this.props.reduxActionSetLanguage("ar");
  }
  enLangPressed() {
    console.log("set lang to en, was: " + this.props.curLang);
    //this.setState({ curLang: "en" });
    this.props.reduxActionSetLanguage("en");
  }
  okButtonPressed() {
    if (this.props.isSkipWelcome == false)
      this.props.navigation.navigate("ScrWelcome");
    else this.props.navigation.navigate("ScrList");
  }
  render() {
    console.log(this.props.curLang);
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
  curLang: state.strLang,
});
const mapDispatchToProps = () => {
  return {
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

  langSelView: {
    borderColor: "#dddddd",
    borderWidth: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  langNonView: {
    borderColor: "#dddddd00",
    borderWidth: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
