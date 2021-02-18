import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableHighlight,
  TextInput,
  Dimensions,
} from "react-native";
import allAyat from "../helpers/quranAyat";
import QuranIndexer from "../helpers/QuranIndexer";

export default class ModalAyahSelector {
  constructor(parent /* should have state.bShowAyahSelector */) {
    this.parent = parent;
    this.surahInfo = new QuranIndexer();

    this.selAyah = 7;
    this.surahNumber = 1;
    this.onSelect = null;
    this.onCancel = null;
    this.curText = "1";
  }
  handlePress() {
    this.onNumberSubmit(this.curText);
    if (this.onSelect != null) this.onSelect(this.selAyah);
    this.parent.setState({ bShowAyahSelector: false });
  }
  handleCancel() {
    this.onNumberSubmit(this.curText);
    if (this.onCancel != null) this.onCancel();
    this.parent.setState({ bShowAyahSelector: false });
  }

  getModal() {
    if (this.parent.state.bShowAyahSelector == false) return null;
    this.ayahRange = this.surahInfo.getSurahNumAyah(this.surahNumber);
    var bIsValidSel =
      this.surahNumber >= 1 &&
      this.surahNumber <= 114 &&
      this.selAyah >= 1 &&
      this.selAyah <= this.ayahRange;

    var indx = this.surahInfo.getAyahGlobalIndx(this.surahNumber, this.selAyah);
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.parent.state.bShowAyahSelector}
        onRequestClose={() => {}}
        onDismiss={() => {}}
      >
        <View style={styles.contentContainer}>
          <View style={styles.selectorsContainer}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{
                  flex: 0.3,
                  borderBottomWidth: 5,
                  borderBottomColor: "grey",
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
                keyboardType="numeric"
                onChangeText={this.onNumberChange.bind(this)}
                value={this.curText}
                onSubmitEditing={this.onNumberSubmit.bind(this)}
              />
              <Text
                numberOfLines={1}
                style={{
                  flex: 0.6,
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: 18,
                }}
              >
                {bIsValidSel ? allAyat[indx].text : "Choose Ayah Number"}
              </Text>
            </View>
          </View>
          <View style={styles.toolbar}>
            <TouchableHighlight
              onPress={this.handlePress.bind(this)}
              underlayColor="#FFFFFF11"
            >
              <Text style={styles.buttonText}>Select</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.handleCancel.bind(this)}
              underlayColor="#FFFFFF11"
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
  onNumberChange(text) {
    var str = "";
    str = text;
    let isnum = /^\d+$/.test(str);
    if (isnum || str == "") this.curText = str;
    if (this.curText != "") {
      this.selAyah = parseInt(this.curText);
    }
    this.parent.setState({ bShowAyahSelector: true }); //just to refresh render
  }
  onNumberSubmit(text) {
    var str = "";
    str = this.curText;
    if (str != "") {
      this.selAyah = parseInt(str);
    } else {
      this.curText = "1";
    }

    this.parent.setState({ bShowAyahSelector: true }); //just to refresh render
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
    backgroundColor: "#FFFFFFd9",
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
    margin: 5,
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 5,
  },
});
