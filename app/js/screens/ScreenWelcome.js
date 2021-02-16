import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import CheckBox from "react-native-check-box";
import { connect } from "react-redux";
import { reduxSetWelcomeFlag } from "../redux/reduxActions";
class ScreenWelcome extends Component {
  constructor(props) {
    super(props);
    console.log("ScreenWelcome constructed");
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
            Welcome, Seeker of the Quran!
          </Text>
          <Text style={styles.motivation}>
            Embark on your journey with the holy Quran and build the habit of
            consistently reviewing what you have learned.{"\n"}
          </Text>
          <Text style={(styles.instructions, { fontSize: 22 })}>
            Here's how it works:
          </Text>
          <Text style={styles.instructions}>
            1- Setup your list of revisions.{"\n"}
            2- Update the list as you revise.{"\n"}
            3- Light up badges and stay on track.{"\n"}
          </Text>
        </View>

        <TouchableHighlight
          onPress={this.handlePress.bind(this)}
          style={styles.touchable}
          underlayColor="#FFFFFF11"
        >
          <Text style={styles.buttonText}>Let's Go!</Text>
        </TouchableHighlight>
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
            <Text style={styles.checkBoxText}>Don't show again</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}
const mapStateToProps = (state) => ({
  bSkipWelcome: state.bSkipWelcome,
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
    textAlign: "justify",
    color: "#112222",
  },
  instructions: {
    fontSize: 20,
    fontFamily: "sans-serif",
    textAlign: "left",

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
