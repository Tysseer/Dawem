import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import RevisionsList from "../subComponents/RevisionsList";
import RevisionsManager from "../helpers/RevisionsManager";
import SVGLoader from "../helpers/SVGLoader";
import BadgesBar from "../subComponents/BadgesBar";
import ModalBadgeDay from "../modals/ModalBadgeDay.js";
import ModalBadgeMonth from "../modals/ModalBadgeMonth.js";
import ModalBadgeWeek from "../modals/ModalBadgeWeek.js";
export default class ScreenRevisions extends Component {
  constructor(props) {
    super(props);

    this.svgLoader = new SVGLoader();
    this.revisionsManager = new RevisionsManager();
    this.revisionsManager.loadTestRevisions(true);
    console.log(
      "RevisionsList constructed, manager has " +
        this.revisionsManager.m_loadedRevisions.length +
        " revisions"
    );
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
  render() {
    var pressHandlers = this.getBadgesOnPressHandlers();
    var longPressHandlers = this.getBadgesOnLongPressHandlers();
    var modalContent = this.getModal();
    var bottomToolBar = this.getBottomToolBar();
    return (
      <ImageBackground
        style={styles.background}
        source={require("../../assets/backgroundPNG/sunset_bk.png")}
      >
        <BadgesBar
          svgLoader={this.svgLoader}
          isBadgeDay={this.state.isBadgeDay}
          isBadgeMonth={this.state.isBadgeMonth}
          isBadgeWeek={this.state.isBadgeWeek}
          onPresses={pressHandlers}
          onLongPresses={longPressHandlers}
        />

        <View style={styles.listContainer}>
          {modalContent}
          <RevisionsList
            revisionsManager={this.revisionsManager}
            navigation={this.props.navigation}
            refreshFn={this.refresh.bind(this)}
          />
        </View>
        {bottomToolBar}
      </ImageBackground>
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
    let newval = this.state.isBadgeDay == false;
    this.setState({ isBadgeDay: newval, bShowModalBadgeDay: true });
  }
  onMonthBadgePressed() {
    let newval = this.state.isBadgeMonth == false;
    this.setState({ isBadgeMonth: newval, bShowModalBadgeMonth: true });
  }
  onWeekBadgePressed() {
    let newval = this.state.isBadgeWeek == false;
    this.setState({ isBadgeWeek: newval, bShowModalBadgeWeek: true });
  }
  onBadgeLongPress() {
    // todo: explain badges
  }
  onAddRevision() {
    // not sure if this should be a modal or a screen?
  }

  onSettings() {}
  onDelete() {}
  onEdit() {}
  onShare() {}
  onDonate() {}
  getBottomToolBar() {
    return (
      <View style={styles.toolBar}>
        <View style={styles.toolButton}>
          <TouchableWithoutFeedback onPress={this.onAddRevision.bind(this)}>
            <Image
              source={require("../../assets/icons/add.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.toolButton}>
          <TouchableWithoutFeedback onPress={this.onSettings.bind(this)}>
            <Image
              source={require("../../assets/icons/settings.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.toolButton}>
          <TouchableWithoutFeedback onPress={this.onEdit.bind(this)}>
            <Image
              source={require("../../assets/icons/edit.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.toolButton}>
          <TouchableWithoutFeedback onPress={this.onDelete.bind(this)}>
            <Image
              source={require("../../assets/icons/delete.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.toolButton}>
          <TouchableWithoutFeedback onPress={this.onDonate.bind(this)}>
            <Image
              source={require("../../assets/icons/donate.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.toolButton}>
          <TouchableWithoutFeedback onPress={this.onShare.bind(this)}>
            <Image
              source={require("../../assets/icons/share.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
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
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
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
});
