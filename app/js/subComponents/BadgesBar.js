import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import SVGLoader from "../helpers/SVGLoader";
export default class BadgesBar extends Component {
  static propTypes = {
    svgLoader: PropTypes.instanceOf(SVGLoader).isRequired,
    isBadgeDay: PropTypes.bool,
    isBadgeMonth: PropTypes.bool,
    isBadgeWeek: PropTypes.bool,
    onPresses: PropTypes.instanceOf(Map).isRequired,
    onLongPresses: PropTypes.instanceOf(Map).isRequired,
  };
  constructor(props) {
    super(props);
  }
  render() {
    var svgLoader = this.props.svgLoader;
    var dayBadge = svgLoader.getDayBadge(!this.props.isBadgeDay);
    var monthBadge = svgLoader.getMonthBadge(!this.props.isBadgeMonth);
    var weekBadge = svgLoader.getWeekBadge(!this.props.isBadgeWeek);
    return (
      <View style={styles.badgesContainer}>
        <TouchableWithoutFeedback
          onPress={() => this.props.onPresses.get("day")()}
          onLongPress={() => this.props.onLongPresses.get("day")()}
        >
          <View style={styles.badge}>{dayBadge}</View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => this.props.onPresses.get("month")()}
          onLongPress={() => this.props.onLongPresses.get("month")()}
        >
          <View style={styles.badge}>{monthBadge}</View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => this.props.onPresses.get("week")()}
          onLongPress={() => this.props.onLongPresses.get("week")()}
        >
          <View style={styles.badge}>{weekBadge}</View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  badgesContainer: {
    marginTop: StatusBar.currentHeight + 2,
    borderColor: "#ffffffaa",
    borderWidth: 2,
    width: "100%",
    height: 100,
    flexDirection: "row",
    backgroundColor: "#666666",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  badge: {
    width: 80,
    height: 80,
    margin: 5,
  },
});
