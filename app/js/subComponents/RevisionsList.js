import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, ScrollView } from "react-native";
import RevisionsManager from "../helpers/RevisionsManager";
import QuranIndexer from "../helpers/QuranIndexer";
import SVGLoader from "../helpers/SVGLoader";
import RevisionItem from "./RevisionItem";
import Toast from "react-native-simple-toast";
import * as strings from "../helpers/StringsManager";
import StringsManager from "../helpers/StringsManager";
export default class RevisionsList extends Component {
  static propTypes = {
    revisionsManager: PropTypes.instanceOf(RevisionsManager).isRequired,
    stringsManager: PropTypes.instanceOf(StringsManager).isRequired,
    navigation: PropTypes.object.isRequired,
    updateRevFn: PropTypes.func.isRequired,
    refreshFn: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      refreshFlag: true,
      detailedRev: null,
    };
    this.svgLoader = new SVGLoader();
    this.quranIndexer = new QuranIndexer();
  }
  refresh() {
    this.props.refreshFn();
  }

  render() {
    var pressHandlers = this.getItemOnPressHandlers();
    var longPressHandlers = this.getItemOnLongPressHandlers();
    return (
      <View style={styles.listContainer}>
        <ScrollView>
          {this.props.revisionsManager.m_loadedRevisions.map((curRevision) => (
            <RevisionItem
              key={curRevision.id}
              svgLoader={this.svgLoader}
              isDetailed={this.state.detailedRev == curRevision}
              revision={curRevision}
              onPresses={pressHandlers}
              onLongPresses={longPressHandlers}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
  getItemOnPressHandlers() {
    var pressHandlers = new Map();
    pressHandlers.set("item", this.onItemPress.bind(this));
    pressHandlers.set("title", this.onItemTitlePress.bind(this));
    pressHandlers.set("numDays", this.onItemNumDaysPress.bind(this));
    pressHandlers.set("revisedIcon", this.onItemIconRevisedPress.bind(this));
    pressHandlers.set("readIcon", this.onItemIconReadPress.bind(this));
    pressHandlers.set("editIcon", this.onItemIconEditPress.bind(this));
    pressHandlers.set("deleteIcon", this.onItemIconDeletePress.bind(this));
    return pressHandlers;
  }
  getItemOnLongPressHandlers() {
    var longPressHandlers = new Map();
    longPressHandlers.set("item", this.onLongPress.bind(this));
    longPressHandlers.set("title", this.onLongPress.bind(this));
    longPressHandlers.set("numDays", this.onLongPress.bind(this));
    longPressHandlers.set("revisedIcon", this.onLongPress.bind(this));
    longPressHandlers.set("readIcon", this.onLongPress.bind(this));
    longPressHandlers.set("editIcon", this.onLongPress.bind(this));
    longPressHandlers.set("deleteIcon", this.onLongPress.bind(this));
    return longPressHandlers;
  }
  onLongPress(revision) {
    revision.progress += 9;
    if (revision.progress > 100) {
      revision.makeRevisionDateNow();
      this.props.revisionsManager.sortRevisions();
    }
    this.refresh();
  }

  onItemPress(revision) {
    var newRev = revision;
    if (this.state.detailedRev == newRev) newRev = null;

    this.setState({ detailedRev: newRev });
  }

  onItemTitlePress(revision) {
    this.onItemPress(revision);
  }

  onItemNumDaysPress(revision) {
    var strMsg =
      revision.numDays == 0
        ? this.props.stringsManager.getStr(strings.STR_REVISED)
        : revision.numDays +
          " " +
          this.props.stringsManager.getStr(strings.STR_DAYS_SINCE_REV);
    Toast.showWithGravity(strMsg, Toast.SHORT, Toast.CENTER);
  }

  onItemIconRevisedPress(revision) {
    revision.makeRevisionDateNow();
    this.props.revisionsManager.sortRevisions();
    this.refresh();
  }

  onItemIconReadPress(revision) {
    var strtPage = this.quranIndexer.getPageFromAyah(revision.strt);
    this.props.navigation.navigate("ScrQuran", { strtPage: strtPage });
  }

  onItemIconEditPress(revision) {
    this.props.updateRevFn(revision);
  }

  onItemIconDeletePress(revision) {
    this.props.deleteRevFn(revision);
  }
}
const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    flex: 1,
  },
});
