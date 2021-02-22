import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import SVGLoader from "../helpers/SVGLoader.js";
import * as strings from "../helpers/StringsManager";

export default class ModalBadgeMonth {
  constructor(parent /* should have state.bShowModalBadgeMonth */) {
    this.parent = parent;
  }
  handlePress() {
    this.parent.setState({ bShowModalBadgeMonth: false });
  }
  getModal() {
    var svgLoader = new SVGLoader();
    var MonthBadge = svgLoader.getMonthBadge(false);
    var strStatus =
      this.parent.revisionsManager.getNumRevisions() < 10
        ? this.parent.stringsManager.getStr(strings.STR_MONTH_BADGE_MIN_REV)
        : this.parent.state.isBadgeMonth == false
        ? this.parent.stringsManager.getStr(strings.STR_MONTH_BADGE_INACTIVE)
        : this.parent.stringsManager.getStr(strings.STR_MONTH_BADGE_ACTIVE);
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.parent.state.bShowModalBadgeMonth}
        onRequestClose={() => {}}
      >
        <View style={styles.contentContainer}>
          <View style={styles.badge}>{MonthBadge}</View>
          <Text style={styles.motivationText}>
            {this.parent.stringsManager.getStr(strings.STR_MONTH_BADGE_DESC)}
          </Text>
          <Text style={styles.statusText}>{strStatus}</Text>
          <View style={styles.okButton}>
            <TouchableWithoutFeedback onPress={this.handlePress.bind(this)}>
              <Image
                source={require("../../assets/icons/ok_icon.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    width: "80%",
    height: "80%",
    alignSelf: "center",
    marginTop: 110,
    marginBottom: 20,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFFd5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  badge: {
    width: 140,
    height: 140,
  },
  motivationText: {
    fontSize: 20,
    fontFamily: "sans-serif",
    textAlign: "center",
    fontWeight: "bold",
    color: "#232393",
    marginHorizontal: 10,
    borderBottomColor: "#939393",
    borderBottomWidth: 1,
  },
  statusText: {
    fontSize: 20,
    fontFamily: "sans-serif",
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
    fontFamily: "sans-serif",
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
