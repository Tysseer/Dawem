import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxActionSetLanguage } from "../redux/reduxActions";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  I18nManager,
  TouchableOpacity,
} from "react-native";
import * as strings from "js/helpers/StringsManager";
import StringsManager from "js/helpers/StringsManager";
import ActionBtn from "app/components/ActionBtn";
import * as Updates from "expo-updates";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../constants";
import EnFlag from "assets/images/lang_en.png";
import ArFlag from "assets/images/lang_ar.png";
import { getFontBasicStyle } from "../helpers/scripts";
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

class ScreenSettings extends Component {
  constructor(props) {
    super(props);
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
    this.originalLang = this.props.strLang;
    this.state = {
      selectedLang: this.props.strLang,
    };
  }

  arLangPressed() {
    this.props.reduxActionSetLanguage("ar");
  }
  enLangPressed() {
    this.props.reduxActionSetLanguage("en");
  }
  languageHandler(lang) {
    this.setState({ selectedLang: lang });
    this.props.reduxActionSetLanguage(lang);
  }
  okButtonPressed() {
    if (this.props.strLang == "ar") {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
    Updates.reloadAsync();
  }
  render() {
    this.stringsManager.setLanguage(this.props.strLang);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.quranLogoContainer}>
          <Image
            source={require("assets/images/Quran_logo.png")}
            style={{ resizeMode: "contain" }}
          />
        </View>
        <View style={styles.allLangsContainer}>
          <View style={styles.separator} />
          {langs.map((lang) => (
            <TouchableOpacity
              key={lang.key}
              activeOpacity={0.7}
              onPress={() => this.languageHandler(lang.key)}
              style={styles.langContainer}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={lang.key == "en" ? EnFlag : ArFlag}
                  style={styles.langLogo}
                />
                <Text style={this.getlangLabelTextStyle(lang.key)}>
                  {lang.title}
                </Text>
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
          ))}
        </View>

        <ActionBtn
          text={this.stringsManager.getStr(strings.STR_SEL_LANGUAGE)}
          handler={this.okButtonPressed.bind(this)}
          lang={this.props.strLang}
          style={{ height: 60, width: "93%" }}
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
});
const mapDispatchToProps = () => {
  return {
    reduxActionSetLanguage,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(ScreenSettings);
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
