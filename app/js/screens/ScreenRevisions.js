import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import RevisionsList from "../subComponents/RevisionsList";
import RevisionsManager from "../helpers/RevisionsManager";
import SVGLoader from "../helpers/SVGLoader";
import BadgesBar from "../subComponents/BadgesBar";
import ModalBadgeDay from "../modals/ModalBadgeDay.js";
import ModalBadgeMonth from "../modals/ModalBadgeMonth.js";
import ModalBadgeWeek from "../modals/ModalBadgeWeek.js";
import { connect } from "react-redux";
import {
  reduxActionSetCurRevision,
  reduxActionDelRevision,
} from "../redux/reduxActions";
import * as strings from "../helpers/StringsManager";
import StringsManager from "../helpers/StringsManager";
import Center from "app/components/Center";
import { getFontFamily } from "../helpers/scripts";
import ActionBtn from "app/components/ActionBtn";
// import bgImage from 'assets/backgroundPNG/green_background.png';
import bgImage from "assets/images/mainBg.png";
import Screen from "app/components/Screen";

const { height } = Dimensions.get("window");

class ScreenRevisions extends Component {
  constructor(props) {
    super(props);
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
    this.svgLoader = new SVGLoader();
    this.revisionsManager = new RevisionsManager();
    this.revisionsManager.m_loadedRevisions = this.props.revisions;

    var res = this.getBadgesStates();

    this.state = {
      isBadgeDay: res[0],
      isBadgeMonth: res[1],
      isBadgeWeek: res[2],
      bShowModalBadgeDay: false,
      bShowModalBadgeMonth: false,
      bShowModalBadgeWeek: false,
    };
  }

  render() {
    this.stringsManager.setLanguage(this.props.strLang);
    this.revisionsManager.m_loadedRevisions = this.props.revisions;
    var pressHandlers = this.getBadgesOnPressHandlers();
    var longPressHandlers = this.getBadgesOnLongPressHandlers();
    var modalContent = this.getModal();

    return (
      <Screen>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.listContainer}>
            <BadgesBar
              svgLoader={this.svgLoader}
              isBadgeDay={this.state.isBadgeDay}
              isBadgeMonth={this.state.isBadgeMonth}
              isBadgeWeek={this.state.isBadgeWeek}
              onPresses={pressHandlers}
              onLongPresses={longPressHandlers}
              strLang={this.props.strLang}
              title={this.stringsManager.getStr(strings.STR_MY_GOALS)}
            />
            {modalContent}
            {this.revisionsManager.m_loadedRevisions.length == 0 ? (
              <>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Mushaf", { strtPage: 165 })
                  }
                  style={{
                    backgroundColor: "#f0f",
                    width: 100,
                    height: 55,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>Mushaf</Text>
                </TouchableOpacity>
                {this.getInitialPrompt()}
              </>
            ) : (
              <RevisionsList
                revisionsManager={this.revisionsManager}
                stringsManager={this.stringsManager}
                navigation={this.props.navigation}
                refreshFn={this.refresh.bind(this)}
                updateRevFn={this.onEditRevision.bind(this)}
                deleteRevFn={this.onDeleteRevision.bind(this)}
                onAddRevision={this.onAddRevision.bind(this)}
                readRevFn={this.onReadRevision.bind(this)}
              />
            )}
          </View>
        </ScrollView>
        <ActionBtn
          text={this.stringsManager.getStr(strings.STR_REV_TITLE)}
          handler={this.onAddRevision.bind(this)}
          icon={true}
          lang={this.props.strLang}
          fullWidth={true}
          style={{ height: 60, marginTop: 20 }}
        />
      </Screen>
    );
  }

  getBadgesOnPressHandlers() {
    var pressHandlers = new Map();
    pressHandlers.set("day", this.onDayBadgePressed.bind(this));
    pressHandlers.set("month", this.onMonthBadgePressed.bind(this));
    pressHandlers.set("week", this.onWeekBadgePressed.bind(this));

    return pressHandlers;
  }
  getBadgesOnLongPressHandlers() {
    var longPressHandlers = new Map();
    longPressHandlers.set("day", this.onBadgeLongPress.bind(this));
    longPressHandlers.set("month", this.onBadgeLongPress.bind(this));
    longPressHandlers.set("week", this.onBadgeLongPress.bind(this));
    return longPressHandlers;
  }

  onDayBadgePressed() {
    let newval = this.state.bShowModalBadgeDay == false;
    this.setState({ bShowModalBadgeDay: newval });
  }
  onMonthBadgePressed() {
    let newval = this.state.bShowModalBadgeMonth == false;
    this.setState({ bShowModalBadgeMonth: newval });
  }
  onWeekBadgePressed() {
    let newval = this.state.bShowModalBadgeWeek == false;
    this.setState({ bShowModalBadgeWeek: newval });
  }
  onBadgeLongPress() {
    // todo: explain badges
  }
  onAddRevision() {
    this.props.reduxActionSetCurRevision(null);
    this.props.navigation.navigate("ScrRev");
  }

  onSettings() {
    this.props.navigation.navigate("ScrSettings");
  }
  onDonate() {}

  onReadRevision(revision) {
    this.props.reduxActionSetCurRevision(revision);
    this.props.navigation.navigate("Mushaf", {
      ayahIndex: revision.getProgressAyah(),
      longPressHandler: this.onRevProgress.bind(this),
    });
  }
  onRevProgress(iAyah) {
    this.props.curRevision.updateProgress(iAyah);
    if (this.props.curRevision.progress > 100) {
      this.props.curRevision.makeRevisionDateNow();
      this.props.revisionsManager.sortRevisions();
    }
    //this.refresh();
  }
  onEditRevision(revision) {
    this.props.reduxActionSetCurRevision(revision);
    this.props.navigation.navigate("ScrRev");
  }

  onDeleteRevision(revision) {
    this.props.reduxActionDelRevision(revision);
    this.refresh();
  }

  getInitialPrompt() {
    return (
      <ImageBackground source={bgImage} style={styles.bgImage}>
        <Image source={require("assets/icon.png")} style={styles.bgIcon} />
        <Center style={{ height: "100%" }}>
          <View>
            <Text
              style={{
                ...styles.text,
                ...getFontFamily(this.props.strLang),
              }}
            >
              {this.stringsManager.getStr(strings.STR_REVS_PROMPT)}
            </Text>
          </View>
        </Center>
      </ImageBackground>
    );
  }

  getModal() {
    var modal = this.getBadgesModal();
    if (modal != null) return modal;
    return null;
  }

  getBadgesModal() {
    if (this.state.bShowModalBadgeDay) {
      var modalDay = new ModalBadgeDay(this).getModal(
        this.state.isBadgeDay == false
      );
      return <View>{modalDay}</View>;
    }
    if (this.state.bShowModalBadgeMonth) {
      var modalMonth = new ModalBadgeMonth(this).getModal(
        this.state.isBadgeMonth == false
      );
      return <View>{modalMonth}</View>;
    }
    if (this.state.bShowModalBadgeWeek) {
      var modalWeek = new ModalBadgeWeek(this).getModal(
        this.state.isBadgeWeek == false
      );
      return <View>{modalWeek}</View>;
    }
    return null;
  }
  getBadgesStates() {
    if (this.revisionsManager.m_loadedRevisions.length == 0)
      return [false, false, false];
    var bIsToday = false;
    var maxDays = 0;
    for (var i = 0; i < this.revisionsManager.m_loadedRevisions.length; i++) {
      this.revisionsManager.m_loadedRevisions[i].updateNumDays();
      if (this.revisionsManager.m_loadedRevisions[i].numDays > maxDays)
        maxDays = this.revisionsManager.m_loadedRevisions[i].numDays;
      if (this.revisionsManager.m_loadedRevisions[i].numDays == 0)
        bIsToday = true;
    }

    var bIsWeek = maxDays <= 7;
    var bIsMonth = maxDays <= 30;

    bIsToday = bIsToday && this.revisionsManager.m_loadedRevisions.length >= 5;
    bIsWeek = bIsWeek && this.revisionsManager.m_loadedRevisions.length >= 7;
    bIsMonth = bIsMonth && this.revisionsManager.m_loadedRevisions.length >= 10;
    return [bIsToday, bIsMonth, bIsWeek];
  }
  updateBadgesStates() {
    var res = this.getBadgesStates();

    this.setState({
      isBadgeDay: res[0],
      isBadgeMonth: res[1],
      isBadgeWeek: res[2],
    });
  }
  refresh() {
    this.updateBadgesStates();
  }
}
const mapStateToProps = (state) => ({
  revisions: state.revisions,
  curRevision: state.curRevision,
  strLang: state.strLang,
});
const mapDispatchToProps = () => {
  return {
    reduxActionSetCurRevision,
    reduxActionDelRevision,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(ScreenRevisions);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEE",
    padding: 20,
    // paddingHorizontal: 20,
    // paddingBottom: 20,
    // justifyContent: 'center',
  },

  toolBar: {
    width: "100%",
    height: 40,
    alignSelf: "flex-end",
    borderTopColor: "yellow",
    borderTopWidth: 1,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  toolButton: {
    width: 38,
    height: 38,
    marginHorizontal: 2,
  },
  listContainer: {
    width: "100%",
    flex: 1,
  },
  bgImage: {
    width: "100%",
    height: 0.42 * height,
    position: "relative",
    overflow: "hidden",
    borderRadius: 12,
  },
  bgIcon: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
    position: "absolute",
    bottom: -120,
    left: -50,
    opacity: 0.1,
  },
  text: {
    fontSize: 18,
    // textAlign: 'center',
    color: "#fff",
  },
});
