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
import { reduxSetWelcomeFlag } from "../redux/reduxActions";
import * as strings from "../helpers/StringsManager";
import StringsManager from "../helpers/StringsManager";

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
    return (
      <ImageBackground
        style={styles.background}
        source={require("../../assets/backgroundPNG/sunrise_bk.png")}
      >
        <View style={styles.textContainer}>
          <Text style={styles.welcomeMessage}>
            {this.stringsManager.getStr(strings.STR_GREETING)}
          </Text>
          <Text style={styles.motivation}>
            {this.stringsManager.getStr(strings.STR_MOTIVATION)}
          </Text>
          <Text style={(styles.instructions, { fontSize: 22 })}>
            {this.stringsManager.getStr(strings.STR_INSTRUCTIONS_TITLE)}
          </Text>
          <Text style={styles.instructions}>
            {this.stringsManager.getStr(strings.STR_INSTRUCTIONS)}
          </Text>
        </View>

        <View style={styles.okButton}>
          <TouchableWithoutFeedback onPress={this.handlePress.bind(this)}>
            <Image
              source={require("../../assets/icons/ok_icon.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            onClick={() => {
              this.props.reduxSetWelcomeFlag(!this.props.bSkipWelcome);
            }}
            isChecked={this.props.bSkipWelcome}
            checkBoxColor="white"
          />
          <TouchableHighlight
            onPress={() => {
              this.props.reduxSetWelcomeFlag(!this.props.bSkipWelcome);
            }}
            underlayColor="#FFFFFF11"
          >
            <Text style={styles.checkBoxText}>
              {this.stringsManager.getStr(strings.STR_SKIP_SCREEN)}
            </Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}
const mapStateToProps = (state) => ({
  bSkipWelcome: state.bSkipWelcome,
  strLang: state.strLang,
});
const mapDispatchToProps = () => {
  return {
    reduxSetWelcomeFlag,
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
    fontFamily: "sans-serif",
    fontWeight: "bold",
    textAlign: "center",
    color: "#5A0912",
  },
  motivation: {
    fontSize: 25,
    fontFamily: "sans-serif",
    fontStyle: "italic",
    textAlign: "center",
    color: "#112222",
  },
  instructions: {
    fontSize: 20,
    fontFamily: "sans-serif",
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
    fontFamily: "sans-serif",
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
    fontFamily: "sans-serif",
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
