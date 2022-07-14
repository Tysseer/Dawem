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
import { useFocusEffect } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  reduxActionSetCurRevision,
  reduxActionUpdateRevision,
  reduxActionDelRevision,
} from "../redux/reduxActions";
import * as strings from "../helpers/StringsManager";
import StringsManager from "../helpers/StringsManager";
import Center from "app/components/Center";
import { getSubTitleFontBasicStyle } from "../helpers/scripts";
import ActionBtn from "app/components/ActionBtn";
// import bgImage from 'assets/backgroundPNG/green_background.png';
import bgImage from "assets/images/mainBg.png";
import dayBadgeImg from "assets/images/dayBadge.png";
import monthBadgeImg from "assets/images/monthBadge.png";
import weekBadgeImg from "assets/images/weekBadge.png";
import twoBadgesImg from "assets/images/prize1.png";
import threeBadgesImg from "assets/images/prize2.png";
import allBadgesDoneImg from "assets/images/prize3.png";
import allRevsDoneImg from "assets/images/prize4.png";
import Screen from "app/components/Screen";
import ModalCongrats from "../modals/ModalCongrats";
import ModalPlayback from "../modals/ModalPlayback";
import QuranIndexer from "../helpers/QuranIndexer";
const { height, width } = Dimensions.get("window");

function RefreshBadgesOnFocus({ onUpdate }) {
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      onUpdate();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  return null;
}

class ScreenRevisions extends Component {
  constructor(props) {
    super(props);
    this.height = Dimensions.get("window").height;
    this.width = Dimensions.get("window").width;
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
    this.quranInfo = new QuranIndexer();
    this.svgLoader = new SVGLoader();
    this.revisionsManager = new RevisionsManager();
    this.revisionsManager.m_loadedRevisions = this.props.revisions;
    this.revisionsManager.sortRevisions();
    //this.revisionsManager.loadTestRevisions(this.props.strLang);
    var res = this.revisionsManager.getBadgesStates();

    this.state = {
      isBadgeDay: res[0],
      isBadgeMonth: res[1],
      isBadgeWeek: res[2],
      bShowCongrats: false,
      bShowPlayBack: false,
      nNumDoneRevs: this.revisionsManager.getNumDoneRevisions(),
    };
    this.congratsMsgs = [];
  }
  onFocus() {
    this.refresh();
  }
  showHideCongrats(bShow) {
    if (bShow == false) this.congratsMsgs.pop();
    this.setState({
      bShowCongrats: this.congratsMsgs.length, //bShow,
    });
  }
  getCongratsModal() {
    if (this.state.bShowCongrats == false || this.congratsMsgs.length == 0)
      return <></>;
    var msgImg = this.congratsMsgs[this.congratsMsgs.length - 1].msgImg;
    var msgTxtIndx = this.congratsMsgs[this.congratsMsgs.length - 1].msgTxtIndx;
    return (
      <ModalCongrats
        strLang={this.props.strLang}
        badgeImg={msgImg}
        badgeMsg={msgTxtIndx}
        setModalVisible={this.showHideCongrats.bind(this)}
      />
    );
  }
  getListenModal() {
    if (this.state.bShowPlayBack == false || this.props.curRevision == null)
      return <></>;
    return (
      <ModalPlayback
        strLang={this.props.strLang}
        quranInfo={this.quranInfo}
        setModalVisible={this.showHideCongrats.bind(this)}
      />
    );
  }
  render() {
    this.stringsManager.setLanguage(this.props.strLang);
    this.revisionsManager.m_loadedRevisions = this.props.revisions;
    var pressHandlers = this.getBadgesOnPressHandlers();
    var longPressHandlers = this.getBadgesOnLongPressHandlers();

    return (
      <Screen style={{ paddingTop: 0 }}>
        <RefreshBadgesOnFocus onUpdate={this.onFocus.bind(this)} />
        {this.getCongratsModal()}
        {this.getListenModal()}
        <BadgesBar
          svgLoader={this.svgLoader}
          isBadgeDay={this.state.isBadgeDay == false}
          isBadgeMonth={this.state.isBadgeMonth == false}
          isBadgeWeek={this.state.isBadgeWeek == false}
          onPresses={pressHandlers}
          onLongPresses={longPressHandlers}
          strLang={this.props.strLang}
          title={this.stringsManager.getStr(strings.STR_MY_GOALS)}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.listContainer}>
            {this.revisionsManager.m_loadedRevisions.length == 0 ? (
              <>{this.getInitialPrompt()}</>
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
                listenRevFn={this.onListenRevision.bind(this)}
                strLang={this.props.strLang}
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
          style={{ height: this.height / 12.5, marginTop: height / 46 }}
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
    this.props.navigation.navigate("ScrDayBadge");
  }
  onMonthBadgePressed() {
    this.props.navigation.navigate("ScrMonthBadge");
  }
  onWeekBadgePressed() {
    this.props.navigation.navigate("ScrWeekBadge");
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
      bIsAr: this.props.strLang == "ar",
      // longPressHandler: this.onRevProgress.bind(this),
    });
  }
  onListenRevision(revision) {
    this.props.reduxActionSetCurRevision(null);
    this.props.reduxActionSetCurRevision(revision);
    this.setState({
      bShowPlayBack: true, //bShow,
    });
  }
  onRevProgress(iAyah) {
    this.props.curRevision.updateProgress(iAyah);
    if (this.props.curRevision.progress >= 100) {
      this.props.curRevision.makeRevisionDateNow();
      //this.props.revisionsManager.sortRevisions();
    }
    this.props.reduxActionUpdateRevision(this.props.curRevision);

    //this.refresh();
  }
  onEditRevision(revision) {
    this.props.reduxActionSetCurRevision(revision);
    this.props.navigation.navigate("ScrRev");
  }

  onDeleteRevision(revision) {
    this.props.reduxActionDelRevision(revision);

    this.revisionsManager.removeByID(revision.id);

    this.refresh();
  }

  getInitialPrompt() {
    return (
      <ImageBackground source={bgImage} style={styles.bgImage}>
        <Image
          source={require("assets/icon_trans.png")}
          style={styles.bgIcon}
        />
        <Center style={{ height: "100%" }}>
          <View>
            <Text
              style={{
                ...styles.text,
                ...getSubTitleFontBasicStyle(this.props.strLang),
              }}
            >
              {this.stringsManager.getStr(strings.STR_REVS_PROMPT)}
            </Text>
          </View>
        </Center>
      </ImageBackground>
    );
  }

  updateBadgesStates() {
    var oldState = [
      this.state.isBadgeDay,
      this.state.isBadgeMonth,
      this.state.isBadgeWeek,
    ];
    var nNumDone = this.revisionsManager.getNumDoneRevisions();
    var res = this.revisionsManager.getBadgesStates();
    var strImgPath = [dayBadgeImg, monthBadgeImg, weekBadgeImg];
    var nNumActivated = 0,
      nNumActiveNow = 0;
    for (var i = 0; i < 3; i++) {
      if (res[i] == true) nNumActiveNow++;
      if (oldState[i] == false && res[i] == true) {
        this.congratsMsgs.push({
          msgImg: strImgPath[i],
          msgTxtIndx: strings.STR_DAYBADGE_CONGRATS + i,
        });
        nNumActivated++;
      }
    }
    if (nNumActivated == 2) {
      this.congratsMsgs.push({
        msgImg: twoBadgesImg,
        msgTxtIndx: strings.STR_TWOBADGES_CONGRATS,
      });
    }
    if (nNumActivated == 3) {
      this.congratsMsgs.push({
        msgImg: threeBadgesImg,
        msgTxtIndx: strings.STR_THREEBADGES_CONGRATS,
      });
    }
    if (nNumActivated > 0 && nNumActiveNow == 3) {
      this.congratsMsgs.push({
        msgImg: allBadgesDoneImg,
        msgTxtIndx: strings.STR_ALLBADGES_DONE_CONGRATS,
      });
    }
    if (
      nNumDone > this.state.nNumDoneRevs &&
      nNumDone == this.revisionsManager.getNumRevisions()
    ) {
      // finished all revisions
      this.congratsMsgs.push({
        msgImg: allRevsDoneImg,
        msgTxtIndx: strings.STR_ALLREVS_DONE_CONGRATS,
      });
    }
    this.congratsMsgs.reverse();

    this.setState({
      isBadgeDay: res[0],
      isBadgeMonth: res[1],
      isBadgeWeek: res[2],
      bShowCongrats: this.congratsMsgs.length > 0,
      nNumDoneRevs: nNumDone,
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
    reduxActionUpdateRevision,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(ScreenRevisions);
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#EEE",
  //   padding: 20,
  //   // paddingHorizontal: 20,
  //   // paddingBottom: 20,
  //   // justifyContent: 'center',
  // },

  // toolBar: {
  //   width: "100%",
  //   height: 40,
  //   alignSelf: "flex-end",
  //   borderTopColor: "yellow",
  //   borderTopWidth: 1,
  //   paddingHorizontal: 6,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-around",
  // },
  // toolButton: {
  //   width: 38,
  //   height: 38,
  //   marginHorizontal: 2,
  // },
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
    // bottom: -120,
    bottom: -(height / 7),
    // left: -50,
    left: -(height / 19),
    opacity: 0.1,
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingHorizontal: 10,
  },
});
