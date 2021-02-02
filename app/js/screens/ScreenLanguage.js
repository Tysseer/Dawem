import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
export default class ScreenLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curLang: "en",
    };
  }
  getlangStyle(strLang) {
    if (strLang == this.state.curLang) {
      return styles.langSelView;
    } else {
      return styles.langNonView;
    }
  }
  arLangPressed() {
    console.log("set lang to ar, was: " + this.state.curLang);
    this.setState({ curLang: "ar" });
  }
  enLangPressed() {
    console.log("set lang to en, was: " + this.state.curLang);
    this.setState({ curLang: "en" });
  }
  okButtonPressed() {
    this.props.navigation.navigate("ScrList");
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
