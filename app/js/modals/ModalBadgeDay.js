import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableHighlight,
} from "react-native";
import SVGLoader from "../helpers/SVGLoader.js";
class ModalBadgeDay {
  constructor(parent /* should have state.bShowModalBadgeDay */) {
    this.parent = parent;
  }
  handlePress() {
    this.parent.setState({ bShowModalBadgeDay: false });
    //console.log(this.parent);
  }
  getModal() {
    var svgLoader = new SVGLoader();
    var dayBadge = svgLoader.getDayBadge(false);
    var strStatus =
      this.parent.state.isBadgeDay == false
        ? "You Still Did Not Activate This Badge. Finish a revision roday to light it up!"
        : "Great Job! You activated your Dawem Badge.";
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.parent.state.bShowModalBadgeDay}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.contentContainer}>
          <View style={styles.badge}>{dayBadge}</View>
          <Text style={styles.motivationText}>
            This Badge Activates When You Finish at Least One Revision Daily.
            {"\n"}
            Make It a Habit and Visit Your List of Revisions Everyday!
          </Text>
          <Text style={styles.statusText}>{strStatus}</Text>
          <TouchableHighlight
            onPress={this.handlePress.bind(this)}
            style={styles.touchable}
            underlayColor="#FFFFFF11"
          >
            <Text style={styles.buttonText}>Got it!</Text>
          </TouchableHighlight>
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
});
export default ModalBadgeDay;
