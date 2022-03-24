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
import SVGLoader from "../helpers/SVGLoader";

class ScreenWelcome extends Component {
  constructor(props) {
    super(props);
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
  }

  handlePress() {
    this.props.navigation.navigate("ScrList");
  }

  render() {
    var svgLoader = new SVGLoader();
    var nH = StatusBar.currentHeight;
    return (
      <View style={styles.background}>
        <View
          style={{
            width: "100%",
            height: nH,
            borderWidth: 1,
            borderColor: "#00FF00",
          }}
        ></View>
        <View
          style={{
            width: 300,
            height: 300,
            borderWidth: 1,
            borderColor: "#00FF00",
          }}
        >
          {svgLoader.getPurpleBox()}
        </View>
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
  background: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },

  textContainer: {
    backgroundColor: "#FFFFFF4D",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 5,
    marginTop: StatusBar.currentHeight + 70,
    marginLeft: 5,
    marginRight: 5,
  },
  welcomeMessage: {
    fontSize: 30,
    fontFamily: "Amiri_Bold",
    fontWeight: "bold",
    textAlign: "center",
    color: "#5A0912",
  },
  motivation: {
    fontSize: 25,
    fontFamily: "Amiri_Bold",
    fontStyle: "italic",
    textAlign: "center",
    color: "#112222",
  },
  instructions: {
    fontSize: 20,
    fontFamily: "Amiri_Bold",
    textAlign: "center",

    color: "#081135",
  },
  touchable: {
    position: "absolute",
    bottom: 30,
    width: "80%",
    alignSelf: "center",
  },
  buttonText: {
    width: "100%",
    alignSelf: "center",
    borderWidth: 1,
    padding: 25,
    margin: 10,
    borderColor: "#6B2504",
    backgroundColor: "#6B2504",
    fontSize: 20,
    fontFamily: "Amiri_Bold",
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  okButton: {
    alignSelf: "center",
    width: 90,
    height: 90,
    marginTop: 30,
  },
  checkBoxText: {
    fontSize: 15,
    fontFamily: "Amiri_Bold",
    textAlign: "center",
    color: "white",
  },
  checkBoxContainer: {
    position: "absolute",
    bottom: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
