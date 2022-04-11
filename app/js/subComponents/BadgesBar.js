import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  StatusBar,
  ImageBackground,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import SVGLoader from "../helpers/SVGLoader";
import { getSideTitleFontBasicStyle } from "../helpers/scripts";
import BgImage from "../../assets/backgroundPNG/green_background.png";
import BgBadge from "../../assets/images/trophy_transparent.png";
import RenderBadgeImg from "./RenderBadgeImg";

const { height } = Dimensions.get("window");

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
    // var svgLoader = this.props.svgLoader;
    // var dayBadge = svgLoader.getDayBadge(!this.props.isBadgeDay);
    // var monthBadge = svgLoader.getMonthBadge(!this.props.isBadgeMonth);
    // var weekBadge = svgLoader.getWeekBadge(!this.props.isBadgeWeek);

    const intervals = ["day", "month", "week"];
    const renderIntervalBadge = (interval) => (
      <TouchableOpacity
        activeOpacity={0.7}
        key={interval}
        onPress={() => this.props.onPresses.get(interval)()}
        onLongPress={() => this.props.onLongPresses.get(interval)()}
      >
        <RenderBadgeImg
          badgeName={`${interval}Badge`}
          dim={
            this.props[
              `isBadge${interval.replace(/^\w/, (c) => c.toUpperCase())}`
            ]
          }
        />
      </TouchableOpacity>
    );

    return (
      <ImageBackground source={BgImage} style={styles.bgImage}>
        <View style={styles.container}>
          <Image source={BgBadge} style={styles.bgBadge} />
          <View style={{ height: "40%" }}>
            <Text
              style={{
                ...styles.text,
                ...getSideTitleFontBasicStyle(this.props.strLang),
              }}
            >
              {this.props.title}
            </Text>
          </View>
          <View style={styles.badgesContainer}>
            {intervals.map((interval) => renderIntervalBadge(interval))}
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: 0.2 * height,
    borderRadius: 12,
    position: "relative",
    overflow: "hidden",
    marginBottom: 20,
  },
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bgBadge: {
    width: "30%",
    height: "70%",
    resizeMode: "cover",
    position: "absolute",
    bottom: 0,
    right: 0,
    opacity: 0.4,
  },
  badgesContainer: {
    flexDirection: "row",
    height: "55%",
    alignItems: "flex-end",
  },
  badge: {
    width: 60,
    height: 56,
    resizeMode: "cover",
    marginRight: 15,
  },
  text: {
    color: "#fff",
    alignSelf: "flex-start",
    marginTop: 6,
  },
});
