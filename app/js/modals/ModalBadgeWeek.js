import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  StatusBar,
  Image,
} from "react-native";
import SVGLoader from "../helpers/SVGLoader.js";
import * as strings from "../helpers/StringsManager";
export default class ModalBadgeWeek {
  constructor(parent /* should have state.bShowModalBadgeWeek */) {
    this.parent = parent;
  }
  handlePress() {
    this.parent.setState({ bShowModalBadgeWeek: false });
  }
  getModal() {
    var svgLoader = new SVGLoader();
    var strStatus =
      this.parent.revisionsManager.getNumRevisions() < 7
        ? this.parent.stringsManager.getStr(strings.STR_WEEK_BADGE_MIN_REV)
        : this.parent.state.isBadgeWeek == false
        ? this.parent.stringsManager.getStr(strings.STR_WEEK_BADGE_INACTIVE)
        : this.parent.stringsManager.getStr(strings.STR_WEEK_BADGE_ACTIVE);
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={this.parent.state.bShowModalBadgeWeek}
        onRequestClose={() => {}}
      >
        <View style={styles.contentContainer}>
          <Image
            source={require("../../assets/backgroundPNG/green_background.png")}
            style={styles.backgroundImage}
          ></Image>
          <Image
            style={styles.badge}
            source={require("../../assets/images/weekBadge.png")}
          ></Image>
          <Text style={this.getTitleStyle()}>
            {this.parent.stringsManager.getStr(strings.STR_WEEKBADGE_NAME)}
          </Text>
          <Text style={this.getSubTitleStyle()}>
            {this.parent.stringsManager.getStr(strings.STR_WEEK_BADGE_DESC)}
          </Text>
          <View style={styles.separator}></View>
          <Text style={this.getSubTitleStyle()}>{strStatus}</Text>
        </View>
      </Modal>
    );
  }

  getTitleStyle() {
    return {
      fontSize: this.parent.stringsManager.getLanguage() == "ar" ? 40 : 36,
      lineHeight: 63,
      fontFamily:
        this.parent.stringsManager.getLanguage() == "ar"
          ? "Amiri_Bold"
          : "Poppins",
      textAlign: "center",
      color: "#FFFFFF",
      margin: 20,
    };
  }
  getSubTitleStyle() {
    return {
      fontSize: this.parent.stringsManager.getLanguage() == "ar" ? 22 : 18,
      lineHeight: 36,
      fontFamily:
        this.parent.stringsManager.getLanguage() == "ar"
          ? "Amiri_Bold"
          : "Poppins",
      textAlign: "center",
      color: "#FFFFFF",
      marginHorizontal: 50,
    };
  }
}
const styles = StyleSheet.create({
  separator: {
    borderColor: "#FFFFFF59",
    borderWidth: 1,
    borderRadius: 10,
    width: 280,
    height: 1,
    marginBottom: 15,
  },
  contentContainer: {
    width: "90%",
    height: "90%",
    alignSelf: "center",
    marginTop: "8%",
    marginBottom: 20,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-around",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backgroundImage: {
    position: "absolute",
    top: 1,
    width: "93%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "stretch",
  },
  badge: {
    width: 140,
    height: 140,
  },
  motivationText: {
    fontSize: 20,
    fontFamily: "Amiri_Bold",
    textAlign: "center",
    fontWeight: "bold",
    color: "#232393",
    marginHorizontal: 10,
    borderBottomColor: "#939393",
    borderBottomWidth: 1,
  },
  statusText: {
    fontSize: 20,
    fontFamily: "Amiri_Bold",
    textAlign: "center",
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#081133",
  },
  touchable: {
    height: 30,
    width: "80%",
    alignSelf: "center",
  },
  buttonText: {
    width: "50%",
    alignSelf: "center",
    borderWidth: 1,

    borderColor: "#6B2504",
    backgroundColor: "#6B2504",
    fontSize: 20,
    fontFamily: "Amiri_Bold",
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  okButton: {
    alignSelf: "center",
    width: 70,
    height: 70,
    marginTop: 30,
  },
});
