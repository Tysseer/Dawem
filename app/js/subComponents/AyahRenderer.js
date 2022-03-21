import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  I18nManager,
} from "react-native";
import Ayah from "../helpers/Ayah";
import { WebView } from "react-native-webview";

export default class AyahRenderer extends Component {
  static propTypes = {
    curAyah: PropTypes.instanceOf(Ayah).isRequired,
    onPresses: PropTypes.instanceOf(Map).isRequired,
    onLongPresses: PropTypes.instanceOf(Map).isRequired,
  };
  constructor(props) {
    // console.log("props", props);
    super(props);
  }
  render() {
    var ayahNum =
      this.props.curAyah.getType() == "Ayah"
        ? " (" + this.props.curAyah.index + ") "
        : "\n";
    // var ayahText =
    //   this.props.curAyah.getType() == "Ayah"
    //     ? this.props.curAyah.text + ayahNum
    //     : "";
    var ayahText = this.props.curAyah.text + ayahNum;
    // var ayahText1 = "";
    // var ayahArr = [];
    // this.props.ayah.forEach((element, index) => {
    //   var ayahNum =
    //     element.getType() == "Ayah" ? " (" + element.index + ") " : "\n";
    //   if (element.getType() == "Ayah") {
    //     ayahText1 += element.text + ayahNum;
    //     console.log(ayahText1);
    //   } else {
    //     ayahArr.push(element.text);
    //     if (element.getType() != "Ayah" && element.getType() != "Surah") {
    //       console.log("1111", ayahText1);
    //       ayahArr.push(ayahText1);
    //       ayahText1 = "";
    //     }
    //   }
    //   if (index == this.props.ayah.length - 1) ayahArr.push(ayahText1);
    // });
    // console.log(ayahArr);
    // let ayahWords = [];
    // ayahWords.push(ayahText);
    return (
      // ayahArr.map((ayah, index) => (
      <Text
        key={this.props.curAyah.index}
        // style={styles.ayahStyle}
        style={
          this.props.curAyah.getType() != "Ayah"
            ? styles.surahStyle
            : styles.ayahStyle
        }
        onPress={() => this.props.onPresses.get("ayah")(this.props.curAyah)}
        onLongPress={() =>
          this.props.onLongPresses.get("ayah")(this.props.curAyah)
        }
      >
        {this.props.curAyah.getType() == "Surah" ? "\n" : ""}
        {/* {ayah} */}
        {ayahText}
      </Text>
    );
    // ));
  }
}
const styles = StyleSheet.create({
  ayahStyle: {
    fontSize: 22,
    // textAlign: "justify",
    fontFamily: "sans-serif",
    // backgroundColor: "red",
    // end: 20,
    // alignSelf: "stretch",
    // alignContent: "stretch",
    writingDirection: "rtl",
    // color: "green",
    // marginLeft: "auto",
    flexShrink: 1,
  },
  surahStyle: {
    fontSize: 26,
    padding: 2,
    textAlign: "center",
    color: "red",
    fontFamily: "sans-serif",
  },
});
