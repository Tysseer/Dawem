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
import { getContentFontBasicStyle } from "../helpers/scripts";

const ITEM_HEIGHT = height / 15;
const BASE_WIDTH = width / 17;

export default class RevisionItem extends Component {
  static propTypes = {
    svgLoader: PropTypes.instanceOf(SVGLoader).isRequired,
    isDetailed: PropTypes.bool.isRequired,
    revision: PropTypes.instanceOf(Revision).isRequired,
    onPresses: PropTypes.instanceOf(Map).isRequired,
    onLongPresses: PropTypes.instanceOf(Map).isRequired,
    strLang: PropTypes.string.isRequired,
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
          borderRadius: 10,
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
              <Text
                numberOfLines={1}
                style={[
                  styles.itemTitle,
                  getContentFontBasicStyle(this.props.strLang, false),
                ]}
              >
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
              <TouchableOpacity
                onPress={() => this.props.onPresses.get("numDays")(revision)}
                onLongPress={() =>
                  this.props.onLongPresses.get("numDays")(revision)
                }
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.itemNumDays,
                    getContentFontBasicStyle(this.props.strLang, false),
                  ]}
                >
                  {this.props.strLang == "ar"
                    ? convertToArabicNumbers(revision.getNumdaysText(), "rtl")
                    : revision.getNumdaysText()}
                </Text>
              </TouchableOpacity>
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
          justifyContent: "center",
          backgroundColor: colors.primary,
          height: ITEM_HEIGHT,
          paddingHorizontal: width / 40,
        }}
      >
        <TouchableOpacity
          onPress={() => this.props.onPresses.get("deleteIcon")(revision)}
        >
          <MaterialIcons name="close" size={BASE_WIDTH} color="#fff" />
        </TouchableOpacity>

        <View style={{ width: width / 40 }} />

        <TouchableOpacity
          onPress={() => this.props.onPresses.get("editIcon")(revision)}
        >
          <MaterialIcons name="edit" size={BASE_WIDTH} color="#fff" />
        </TouchableOpacity>
        <View style={{ width: width / 40 }} />

        <TouchableOpacity
          onPress={() => this.props.onPresses.get("listenIcon")(revision)}
        >
          <MaterialCommunityIcons
            name="headphones"
            size={BASE_WIDTH}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    );
  }
  getRevisionIcon(revision) {
    if (revision.bIsNewRev) {
      return (
        <MaterialIcons
          name="new-releases"
          size={BASE_WIDTH}
          color={colors.primary}
        />
      );
    }
    if (revision.numDays == 0) {
      return (
        <MaterialIcons
          name="check-box"
          size={BASE_WIDTH}
          color={colors.primary}
        />
      );
    }

    return (
      <MaterialIcons
        name="check-box-outline-blank"
        size={BASE_WIDTH}
        color={colors.primary}
      />
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
          {this.getRevisionIcon(revision)}
        </TouchableOpacity>

        <View style={{ width: width / 30 }} />

        <TouchableOpacity
          onPress={() => this.props.onPresses.get("readIcon")(revision)}
        >
          <MaterialIcons
            name="menu-book"
            size={BASE_WIDTH}
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
    justifyContent: "space-between",
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
  },
  itemTitleContainer: {
    flexDirection: "row",
    width: 9.5 * BASE_WIDTH,
    alignItems: "center",
  },
  itemTitle: {
    // fontSize: 18,
    marginStart: 0.5 * BASE_WIDTH,
    // flex: 1,
    color: colors.primary,
  },
  itemNumDays: {
    // textAlign: 'center',
    color: colors.primary,

    width: 1.5 * BASE_WIDTH,
    marginHorizontal: 0.2 * BASE_WIDTH,

    // marginLeft: 10,
    // alignSelf: 'center',
    // width: 60,
  },

  itemToolBar: {
    flexDirection: "row",
    backgroundColor: "red",
    alignItems: "center",

    // justifyContent: 'space-between',
  },
  // itemIcon: {
  //   width: 50,
  //   height: 50,
  //   paddingTop: 5,
  //   marginTop: 5,
  // },
});
