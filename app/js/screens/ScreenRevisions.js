import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, ImageBackground } from "react-native";
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

    this.state = {
      isBadgeDay: true,
      isBadgeMonth: true,
      isBadgeWeek: true,
      bShowModalBadgeDay: false,
      bShowModalBadgeMonth: false,
      bShowModalBadgeWeek: false,
    };
    this.svgLoader = new SVGLoader();
    this.revisionsManager = new RevisionsManager();
  }

  render() {
    var pressHandlers = this.getBadgesOnPressHandlers();
    var longPressHandlers = this.getBadgesOnLongPressHandlers();
    var modalContent = this.getModal();

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
          />
        </View>
        <View style={styles.toolBar}></View>
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
  },
  listContainer: {
    width: "100%",
    flex: 1,
  },
});
