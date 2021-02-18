import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableHighlight,
  ScrollView,
  Dimensions,
} from "react-native";
import QuranIndexer from "../helpers/QuranIndexer";
export default class ModalSurahSelector {
  constructor(parent /* should have state.bShowSurahSelector */) {
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
    this.parent.setState({ bShowSurahSelector: false });
    if (this.onSelect != null) this.onSelect(this.selSurah);
  }
  handleCancel() {
    this.parent.setState({ bShowSurahSelector: false });
    if (this.onCancel != null) this.onCancel();
  }
  getModal() {
    if (this.parent.state.bShowSurahSelector == false) return null;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.parent.state.bShowSurahSelector}
        onRequestClose={this.handlePress.bind(this)}
        onDismiss={this.handlePress.bind(this)}
      >
        <View style={styles.contentContainer}>
          <ScrollView>
            <View style={styles.selectorsContainer}>
              {this.indexes.map((iS) => this.getSurahBtn(iS))}
            </View>
          </ScrollView>

          <View style={styles.toolbar}>
            <TouchableHighlight
              onPress={this.handlePress.bind(this)}
              underlayColor="#FFFFFF11"
            >
              <Text style={[styles.buttonText, { margin: 5 }]}>Select</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.handleCancel.bind(this)}
              underlayColor="#FFFFFF11"
            >
              <Text style={[styles.buttonText, { margin: 5 }]}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
  getSurahBtn(iSurah) {
    var bordercol =
      iSurah == this.selSurah
        ? { borderColor: "#540000" }
        : { borderColor: "#545454" };
    return (
      <View style={{ margin: 10 }} key={iSurah + 123}>
        <TouchableHighlight
          onPress={() => this.selectSurah.bind(this)(iSurah)}
          underlayColor="#FFFFFF11"
        >
          <Text style={[styles.buttonText, bordercol]}>
            {this.surahInfo.getSurahNameAr(iSurah)}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
  selectSurah(iSurah) {
    this.selSurah = iSurah;
    this.parent.setState({ bShowSurahSelector: true }); // just to render
  }
  getSelSurahName() {
    if (this.selSurah == 0) return "Select Surah";
    else return this.surahInfo.getSurahNameAr(this.selSurah);
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
  selectorsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    flexWrap: "wrap",
    direction: "rtl",
    margin: 5,
    padding: 5,
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
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 5,
  },
});
