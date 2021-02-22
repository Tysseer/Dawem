import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableHighlight, Text, StyleSheet, View } from "react-native";
import Revision from "../helpers/Revision";
import SVGLoader from "../helpers/SVGLoader";
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
    var TitleBtn = this.getTitleButton(this.props.revision);
    var NumDaysBtn = this.getNumDaysButton(this.props.revision);
    var RevisedBtn = this.getRevisedButton(this.props.revision);
    var ReadBtn = this.getReadButton(this.props.revision);
    var extrBtns = this.getExtraButtons(this.props.revision);
    return (
      <View
        key={this.props.revision.id + 1254}
        style={
          this.props.isDetailed
            ? {
                borderBottomColor: "yellow",
                borderBottomWidth: 0.2,
                backgroundColor: "#FFFFFF33",
              }
            : {
                borderBottomColor: "black",
                borderBottomWidth: 0.2,
              }
        }
      >
        <TouchableHighlight
          onPress={() => this.props.onPresses.get("item")(revision)}
          onLongPress={() => this.props.onLongPresses.get("item")(revision)}
          key={this.props.revision.id + 100}
          underlayColor="#FFFFFF11"
        >
          <View
            style={styles.listItemContainer}
            key={this.props.revision.id + 1254}
          >
            <View key={100} style={styles.itemTitleContainer}>
              {TitleBtn}
              {NumDaysBtn}
            </View>
            <View key={101} style={styles.itemToolBar}>
              {ReadBtn}
              {RevisedBtn}
            </View>
          </View>
        </TouchableHighlight>
        {extrBtns}
        <View
          key={this.props.revision.id + 1002}
          style={{
            height: styles.listItemContainer.height / 8,
            width: this.props.revision.progress + "%",
            backgroundColor: "#50DD50",
          }}
        ></View>
      </View>
    );
  }

  getTitleButton(revision) {
    var strTitle = revision.getRevisionTitle();
    return (
      <TouchableHighlight
        onPress={() => this.props.onPresses.get("title")(revision)}
        onLongPress={() => this.props.onLongPresses.get("title")(revision)}
        key={revision.id + 105}
        underlayColor="#FFFFFF11"
      >
        <Text key={6} numberOfLines={1} style={styles.itemTitle}>
          {strTitle}
        </Text>
      </TouchableHighlight>
    );
  }

  getNumDaysButton(revision) {
    var strNumDays = revision.getNumdaysText();
    return (
      <TouchableHighlight
        onPress={() => this.props.onPresses.get("numDays")(revision)}
        onLongPress={() => this.props.onLongPresses.get("numDays")(revision)}
        key={revision.id + 100}
        underlayColor="#FFFFFF11"
      >
        <Text key={7} numberOfLines={1} style={styles.itemNumDays}>
          {strNumDays}
        </Text>
      </TouchableHighlight>
    );
  }
  getRevisedButton(revision) {
    var IconRevised = this.props.svgLoader.getRevisedIcon(
      revision.numDays == 0
    );
    return (
      <TouchableHighlight
        onPress={() => this.props.onPresses.get("revisedIcon")(revision)}
        onLongPress={() =>
          this.props.onLongPresses.get("revisedIcon")(revision)
        }
        key={revision.id + 103}
        underlayColor="#FFFFFF11"
      >
        <View key={1} style={styles.itemIcon}>
          {IconRevised}
        </View>
      </TouchableHighlight>
    );
  }
  getExtraButtons(revision) {
    if (this.props.isDetailed == false) return null;
    return (
      <View
        key={this.props.revision.id + 1003}
        style={{
          flexDirection: "row",
          height: styles.listItemContainer.height,
          width: "100%",
        }}
      >
        {this.getEditButton(revision)}
        {this.getDeleteButton(revision)}
      </View>
    );
  }
  getReadButton(revision) {
    var IconRead = this.props.svgLoader.getReadIcon(); //this.getReadIcon(revision);
    return (
      <TouchableHighlight
        onPress={() => this.props.onPresses.get("readIcon")(revision)}
        onLongPress={() => this.props.onLongPresses.get("readIcon")(revision)}
        key={revision.id + 101}
        underlayColor="#FFFFFF11"
      >
        <View key={1} style={styles.itemIcon}>
          {IconRead}
        </View>
      </TouchableHighlight>
    );
  }
  getDeleteButton(revision) {
    var IconDelete = this.props.svgLoader.getDeleteIcon(); //this.getDeleteIcon(revision);
    return (
      <TouchableHighlight
        onPress={() => this.props.onPresses.get("deleteIcon")(revision)}
        onLongPress={() => this.props.onLongPresses.get("deleteIcon")(revision)}
        key={revision.id + 100}
        underlayColor="#FFFFFF11"
      >
        <View key={1} style={styles.itemIcon}>
          {IconDelete}
        </View>
      </TouchableHighlight>
    );
  }
  getEditButton(revision) {
    var IconEdit = this.props.svgLoader.getEditIcon();
    return (
      <TouchableHighlight
        onPress={() => this.props.onPresses.get("editIcon")(revision)}
        onLongPress={() => this.props.onLongPresses.get("editIcon")(revision)}
        key={revision.id + 102}
        underlayColor="#FFFFFF11"
      >
        <View key={1} style={styles.itemIcon}>
          {IconEdit}
        </View>
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  listItemContainer: {
    width: "100%",
    height: 50,

    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    flexGrow: 1,
  },
  itemTitle: {
    fontSize: 20,
    fontFamily: "Roboto",
    textAlign: "left",
    fontWeight: "bold",
    color: "white",
    marginRight: 10,
  },
  itemNumDays: {
    fontSize: 18,
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "bold",
    color: "#AAAAAA",
    marginLeft: 10,
    marginRight: 10,
    alignSelf: "center",
    width: 60,
  },

  itemToolBar: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  itemIcon: {
    width: 50,
    height: 50,
    paddingTop: 5,
    marginTop: 5,
  },
});
