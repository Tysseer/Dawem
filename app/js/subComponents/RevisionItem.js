import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import Revision from "../helpers/Revision";
import SVGLoader from "../helpers/SVGLoader";
import { colors } from "../../constants";
import { convertToArabicNumbers } from "../helpers/convertToArabicNumbers";
const { height, width } = Dimensions.get("window");

const ITEM_HEIGHT = height / 15;

export default class RevisionItem extends Component {
  static propTypes = {
    svgLoader: PropTypes.instanceOf(SVGLoader).isRequired,
    isDetailed: PropTypes.bool.isRequired,
    revision: PropTypes.instanceOf(Revision).isRequired,
    onPresses: PropTypes.instanceOf(Map).isRequired,
    onLongPresses: PropTypes.instanceOf(Map).isRequired,
  };
  constructor(props) {
    super(props);
  }
  render() {
    var revision = this.props.revision;

    var renderReadReviseActions = this.renderReadReviseActions(
      this.props.revision
    );
    var renderEditDeleteActions = this.renderEditDeleteActions(
      this.props.revision
    );

    return (
      <View
        style={{
          backgroundColor: "rgba(11, 114, 30, 0.05)",
          marginBottom: height / 50,
        }}
      >
        <View>
          {/* item content */}
          <View style={styles.listItemContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.props.onPresses.get("item")(revision)}
              onLongPress={() => this.props.onLongPresses.get("item")(revision)}
              style={styles.itemTitleContainer}
            >
              {renderEditDeleteActions}
              <Text numberOfLines={1} style={styles.itemTitle}>
                {revision.getRevisionTitle()}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 8,
              }}
            >
              <Text numberOfLines={1} style={styles.itemNumDays}>
                {convertToArabicNumbers(revision.getNumdaysText(), "rtl")}
              </Text>
              {/* {NumDaysBtn} */}
              {renderReadReviseActions}
            </View>

            {!this.props.isDetailed && (
              <View
                style={{
                  height: styles.listItemContainer.height / 7,
                  width: this.props.revision.progress + "%",
                  backgroundColor: colors.warning,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                }}
              />
            )}
          </View>
        </View>
      </View>
    );
  }

  renderEditDeleteActions(revision) {
    if (this.props.isDetailed == false) return null;
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.primary,
          height: ITEM_HEIGHT,
          paddingHorizontal: width / 40,
        }}
      >
        <TouchableOpacity
          onPress={() => this.props.onPresses.get("deleteIcon")(revision)}
        >
          <MaterialIcons name="close" size={width / 17} color="#fff" />
        </TouchableOpacity>

        <View style={{ width: width / 40 }} />

        <TouchableOpacity
          onPress={() => this.props.onPresses.get("editIcon")(revision)}
        >
          <MaterialIcons name="edit" size={width / 17} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }

  renderReadReviseActions(revision) {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => this.props.onPresses.get("revisedIcon")(revision)}
        >
          {revision.numDays == 0 ? (
            <MaterialCommunityIcons
              name="shield-check"
              size={width / 17}
              color={colors.primary}
            />
          ) : (
            <Feather name="check" size={width / 17} color={colors.primary} />
          )}
        </TouchableOpacity>

        <View style={{ width: width / 30 }} />

        <TouchableOpacity
          onPress={() => this.props.onPresses.get("readIcon")(revision)}
        >
          <MaterialIcons
            name="menu-book"
            size={width / 17}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    height: ITEM_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
  },
  itemTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
  },
  itemTitle: {
    // fontSize: 18,
    fontSize: height / 51,

    fontFamily: "Amiri_Bold",
    color: colors.primary,
    marginHorizontal: width / 30,
  },
  itemNumDays: {
    fontSize: height / 51,
    fontFamily: "Amiri_Bold",
    // textAlign: 'center',
    color: colors.primary,
    marginHorizontal: width / 30,
    // marginLeft: 10,
    // alignSelf: 'center',
    // width: 60,
  },

  itemToolBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",

    // justifyContent: 'space-between',
  },
  // itemIcon: {
  //   width: 50,
  //   height: 50,
  //   paddingTop: 5,
  //   marginTop: 5,
  // },
});
