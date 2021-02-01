import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, StatusBar, Text, ScrollView } from "react-native";
import QuranPage from "../helpers/QuranPage";
import Ayah from "../helpers/Ayah";
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
          <Text>{"\t"} nav. buttons here</Text>
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
    height: "91%",
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
    flex: 1,
    alignSelf: "flex-end",
    borderTopColor: "yellow",
    borderTopWidth: 1,
  },
});
