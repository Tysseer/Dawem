import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, ScrollView } from "react-native";
import { getLargeContentFontBasicStyle } from "../helpers/scripts";

import RevisionsManager from "../helpers/RevisionsManager";
import QuranIndexer from "../helpers/QuranIndexer";
import SVGLoader from "../helpers/SVGLoader";
import RevisionItem from "./RevisionItem";
import * as strings from "../helpers/StringsManager";
import StringsManager from "../helpers/StringsManager";
import { reduxActionUpdateRevision } from "../redux/reduxActions";
import { connect } from "react-redux";
import Toast from "react-native-root-toast";
import { colors } from "../../constants";
class RevisionsList extends Component {
  static propTypes = {
    revisionsManager: PropTypes.instanceOf(RevisionsManager).isRequired,
    stringsManager: PropTypes.instanceOf(StringsManager).isRequired,
    navigation: PropTypes.object.isRequired,
    updateRevFn: PropTypes.func.isRequired,
    refreshFn: PropTypes.func.isRequired,
    readRevFn: PropTypes.func.isRequired,
    strLang: PropTypes.string.isRequired,
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.props.revisionsManager.m_loadedRevisions.map((curRevision) => (
            <RevisionItem
              key={Math.random().toString()}
              svgLoader={this.svgLoader}
              isDetailed={this.state.detailedRev == curRevision}
              revision={curRevision}
              onPresses={pressHandlers}
              onLongPresses={longPressHandlers}
              strLang={this.props.strLang}
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
    revision.lastAyahRead = -1;
    if (revision.progress >= 100) {
      // revision.makeRevisionDateNow();
      // this.props.revisionsManager.sortRevisions();
      this.onItemIconRevisedPress(revision);
    } else this.refresh();
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
        : this.props.stringsManager.getNumDaysSinceRevMessage(revision.numDays);
    /* revision.numDays +
          " " +
          this.props.stringsManager.getStr(strings.STR_DAYS_SINCE_REV);*/
    // Toast.showWithGravity(strMsg, Toast.SHORT, Toast.CENTER);
    //console.log(strMsg);

    let toast = Toast.show(strMsg, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      shadow: true,
      shadowColor: colors.primary,
      animation: true,
      hideOnPress: true,
      opacity: 1,
      backgroundColor: "#eee",
      textColor: colors.primary,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      },
    });
  }

  onItemIconRevisedPress(revision) {
    // this.props.revisionsManager.sortRevisions();
    revision.makeRevisionDateNow();
    let strMsg = this.props.stringsManager.getStr(strings.STR_REVISED);
    let toast = Toast.show(strMsg, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      shadowColor: colors.primary,
      animation: true,
      hideOnPress: true,
      opacity: 1,
      backgroundColor: "#eee",
      textStyle: getLargeContentFontBasicStyle(),
      textColor: "#031",
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      },
    });
    this.props.reduxActionUpdateRevision(revision);
    this.refresh();
  }

  onItemIconReadPress(revision) {
    this.props.readRevFn(revision);
  }

  onItemIconEditPress(revision) {
    this.props.updateRevFn(revision);
  }

  onItemIconDeletePress(revision) {
    this.props.deleteRevFn(revision);
  }
}
const mapDispatchToProps = () => {
  return {
    reduxActionUpdateRevision,
  };
};
const mapStateToProps = (state) => ({
  // revisions: state.revisions,
  // curRevision: state.curRevision,
  // strLang: state.strLang,
});
export default connect(mapStateToProps, mapDispatchToProps())(RevisionsList);

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    flex: 1,
    marginBottom: 20,
  },
});
