import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  PanResponder,
} from "react-native";
import QuranPage from "../helpers/QuranPage";
import AyahRenderer from "../subComponents/AyahRenderer";
import Toast from "react-native-simple-toast";
export default class ScreenQuranBrowser extends Component {
  static propTypes = {
    curPage: PropTypes.instanceOf(QuranPage),
  };
  constructor(props) {
    super(props);
  }

  render() {
    var pressHandlers = this.getItemOnPressHandlers();
    var longPressHandlers = this.getItemOnLongPressHandlers();
    var nextBtns = this.getNextButtons();
    var prevBtns = this.getPrevButtons();
    return (
      <View style={styles.background}>
        <View style={styles.pageContainer}>
          <ScrollView>
            <Text style={styles.textContainer}>
              {this.props.curPage.ayat.map((ayah) => (
                <AyahRenderer
                  key={ayah.id}
                  curAyah={ayah}
                  onPresses={pressHandlers}
                  onLongPresses={longPressHandlers}
                />
              ))}
            </Text>
          </ScrollView>
        </View>
        <View style={styles.toolBar}>
          {nextBtns}
          {prevBtns}
        </View>
      </View>
    );
  }
  getNextButtons() {
    return (
      <View style={styles.nextToolBar}>
        <View style={styles.toolButton}>
          <TouchableWithoutFeedback onPress={this.onNextPage.bind(this)}>
            <Image
              source={require("../../assets/icons/nextPage.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.toolButton}>
          <TouchableWithoutFeedback onPress={this.onNextJuzu.bind(this)}>
            <Image
              source={require("../../assets/icons/nextJuzuu.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.toolButton}>
          <TouchableWithoutFeedback onPress={this.onNextSurah.bind(this)}>
            <Image
              source={require("../../assets/icons/nextSurah.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
  getPrevButtons() {
    return (
      <View style={styles.prevToolBar}>
        <View style={styles.toolButton}>
          <TouchableWithoutFeedback onPress={this.onPrevSurah.bind(this)}>
            <Image
              source={require("../../assets/icons/prevSurah.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.toolButton}>
          <TouchableWithoutFeedback onPress={this.onPrevJuzu.bind(this)}>
            <Image
              source={require("../../assets/icons/prevJuzuu.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.toolButton}>
          <TouchableWithoutFeedback onPress={this.onPrevPage.bind(this)}>
            <Image
              source={require("../../assets/icons/prevPage.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
  getItemOnPressHandlers() {
    var pressHandlers = new Map();
    pressHandlers.set("ayah", this.onAyahPress.bind(this));

    return pressHandlers;
  }
  getItemOnLongPressHandlers() {
    var longPressHandlers = new Map();
    longPressHandlers.set("ayah", this.onAyahLongPress.bind(this));
    return longPressHandlers;
  }
  onAyahLongPress(ayah) {
    Toast.showWithGravity(
      "ayah Longpress " + ayah.id,
      Toast.SHORT,
      Toast.CENTER
    );
  }

  onAyahPress(ayah) {
    Toast.showWithGravity("ayah press " + ayah.id, Toast.SHORT, Toast.CENTER);
  }
  onSwipePerformed(strDir) {
    switch (action) {
      case "left": {
        onPrevPage();
        console.log("left Swipe performed");
        break;
      }
      case "right": {
        onNextPage();
        console.log("right Swipe performed");
        break;
      }
      case "up": {
        console.log("up Swipe performed");
        break;
      }
      case "down": {
        console.log("down Swipe performed");
        break;
      }
      default: {
        console.log("Undeteceted action");
      }
    }
  }
  onNextPage() {
    Toast.showWithGravity(
      "next page " + this.props.curPage.pageNumber,
      Toast.SHORT,
      Toast.CENTER
    );
  }
  onNextSurah() {
    Toast.showWithGravity(
      "next surah " + this.props.curPage.pageNumber,
      Toast.SHORT,
      Toast.CENTER
    );
  }
  onNextJuzu() {
    Toast.showWithGravity(
      "next juzuu " + this.props.curPage.pageNumber,
      Toast.SHORT,
      Toast.CENTER
    );
  }
  onPrevPage() {
    Toast.showWithGravity(
      "prev page " + this.props.curPage.pageNumber,
      Toast.SHORT,
      Toast.CENTER
    );
  }
  onPrevSurah() {
    Toast.showWithGravity(
      "prev surah " + this.props.curPage.pageNumber,
      Toast.SHORT,
      Toast.CENTER
    );
  }
  onPrevJuzu() {
    Toast.showWithGravity(
      "prev juzuu " + this.props.curPage.pageNumber,
      Toast.SHORT,
      Toast.CENTER
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
  pageContainer: {
    marginTop: StatusBar.currentHeight + 2,

    width: "100%",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#666666",
  },
  textContainer: {
    direction: "rtl",
    marginRight: 8,
    marginLeft: 8,
    marginTop: 5,
    marginBottom: 5,
    textAlign: "justify",
  },
  toolBar: {
    width: "100%",
    height: 35,
    flexDirection: "row",
    alignSelf: "flex-end",
    borderTopColor: "yellow",
    borderTopWidth: 1,
  },
  nextToolBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  prevToolBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  toolButton: {
    width: 35,
    height: 35,
  },
});
