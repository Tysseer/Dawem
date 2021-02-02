import React, { Component } from "react";
import { StyleSheet } from "react-native";
import ScreenQuranBrowser from "./app/js/screens/ScreenQuranBrowser";
import QuranReader from "./app/js/helpers/QuranReader";
//import RevisionsManager from "./app/js/helpers/RevisionsManager";
//import ScreenRevisions from "./app/js/screens/ScreenRevisions";
//import ScreenWelcome from "./app/js/screens/ScreenWelcome";
//import ScreenLanguage from "./app/js/screens/ScreenLanguage";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var read = new QuranReader();
    var page = read.getPage(3);
    return <ScreenQuranBrowser strtPage={page} quranReader={read} />;
    //return <ScreenRevisions revisionsManager={rev} />;
    //return <ScreenWelcome />;
    //return <ScreenLanguage />;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#666",
    alignItems: "center",
    justifyContent: "center",
  },
});
