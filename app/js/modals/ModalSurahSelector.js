import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import QuranIndexer from "../helpers/QuranIndexer";
import SVGLoader from "../helpers/SVGLoader";
export default class ModalSurahSelector {
  constructor(parent /* should have .bShowSurahSelector and .refresh()*/) {
    this.parent = parent;
    this.surahInfo = new QuranIndexer();
    this.surahInfo.fillArrSurahNamesAr();
    this.indexes = Array(114)
      .fill(0)
      .map((e, i) => i + 1);

    this.selSurah = 0;
    this.onSelect = null;
    this.onCancel = null;
  }
  handlePress() {
    //this.parent.setState({ bShowSurahSelector: false });
    if (this.onSelect != null) this.onSelect(this.selSurah);
    this.parent.bShowSurahSelector = false;
    this.parent.refresh();
  }
  handleCancel() {
    //this.parent.setState({ bShowSurahSelector: false });
    if (this.onCancel != null) this.onCancel();
    this.parent.bShowSurahSelector = false;
    this.parent.refresh();
  }
  getModal() {
    if (this.parent.bShowSurahSelector == false) return null;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.parent.bShowSurahSelector}
        onRequestClose={this.handlePress.bind(this)}
        onDismiss={this.handlePress.bind(this)}
      >
        <View style={styles.contentContainer}>
          <ScrollView>
            <View style={styles.selectorsContainer}>
              {this.indexes.map((iS, index) => this.getSurahBtn(iS, index))}
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
  getSurahBtn(item, index) {
    var bordercol =
      item == this.selSurah
        ? { borderColor: "#540000" }
        : { borderColor: "#545454" };
    var svgLoader = new SVGLoader();
    var numBorder = svgLoader.getSurahNumBorder(index + 1);
    return (
      <View style={{ margin: 10 }} key={item + 123}>
        <TouchableHighlight
          onPress={() => this.selectSurah.bind(this)(item)}
          underlayColor="#FFFFFF11"
          style={{ margin: 10 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-start",
                alignItems: "center",
              }}
            >
              {numBorder}
              <Text style={{ paddingHorizontal: 5 }}>
                {this.surahInfo.getSurahNameAr(item)}
              </Text>
            </View>
            <View
              style={{
                height: 14,
                width: 14,
                borderRadius: 7,
                borderStyle: "solid",
                borderWidth: 1,
                backgroundColor: this.selSurah == item ? "#0B721E" : null,
              }}
            ></View>
          </View>
        </TouchableHighlight>
        <View
          style={{ height: 1, width: "100%", backgroundColor: "#BBC4CE" }}
        ></View>
      </View>
    );
  }
  selectSurah(iSurah) {
    this.selSurah = iSurah;
    this.parent.refresh(); //this.parent.setState({ bShowSurahSelector: true }); // just to render
    this.handlePress();
  }
  getSelSurahName() {
    if (this.selSurah == 0) return "Select Surah";
    else return this.surahInfo.getSurahNameAr(this.selSurah);
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    width: "90%",
    height: "80%",
    marginTop: 110,
    marginBottom: 20,
    marginHorizontal: 20,
    // justifyContent: "space-around",
    backgroundColor: "#FFFFFFd5",
    borderRadius: 30,
  },
  selectorsContainer: {
    margin: "10%",
    // backgroundColor: "green",
    // width: "100%",
    // flex: 1,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    // alignContent: "center",
    // flexWrap: "wrap",
    // direction: "rtl",
    // margin: 5,
    // padding: 5,
  },

  buttonText: {
    width: Dimensions.get("window").width / 5,
    borderWidth: 2,
    backgroundColor: "#EBEBA4",
    fontSize: (Dimensions.get("window").width * 20) / 411,
    fontFamily: "sans-serif",
    textAlign: "center",
    fontWeight: "bold",
    color: "#121212",
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
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 5,
  },
});
