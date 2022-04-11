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
  I18nManager,
  TouchableOpacity,
  Dimensions,
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

class ScreenLanguage extends Component {
  constructor(props) {
    super(props);
    // const { height, width } = Dimensions.get("window");
    this.height = Dimensions.get("window").height;
    this.width = Dimensions.get("window").width;
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
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
    this.props.reduxActionSetFirstRunFlag(false);
    if (this.props.strLang == "ar") {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
    Updates.reloadAsync();
  }
  renderLanguageItem(lang) {
    return (
      <TouchableOpacity
        key={lang.key}
        activeOpacity={0.7}
        onPress={() => this.languageHandler(lang.key)}
        style={styles.langContainer}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={lang.key == "en" ? EnFlag : ArFlag}
            style={{
              width: this.width / 10,
              height: this.width / 10,
              marginRight: this.width / 28,
            }}
          />
          <Text style={this.getlangLabelTextStyle(lang.key)}>{lang.title}</Text>
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
    );
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
          {this.renderLanguageItem(langs[0])}
          <View style={styles.separator} />
          {this.renderLanguageItem(langs[1])}
        </View>

        <ActionBtn
          text={this.stringsManager.getStr(strings.STR_SEL_LANGUAGE)}
          handler={this.okButtonPressed.bind(this)}
          lang={this.props.strLang}
          style={{ height: this.height / 15.6, width: "93%" }}
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
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  langContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "93%",
    // height: 70,
    height: "35%",

    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    // borderWidth: 2,

    borderColor: "#0B721EFF",
  },
  // langLogo: {
  //   width: 40,
  //   height: 40,
  //   marginRight: 30,
  // },

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
  // okButton: {
  //   backgroundColor: "#0B721E",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   width: "93%",
  //   height: 70,
  //   borderTopLeftRadius: 10,
  //   borderTopRightRadius: 10,
  //   borderBottomLeftRadius: 10,
  //   borderBottomRightRadius: 10,
  //   marginTop: 50,
  //   marginBottom: 25,
  // },
});
