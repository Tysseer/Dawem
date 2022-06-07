import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import ActionBtn from "../../components/ActionBtn";
import allAyat from "../helpers/quranAyat";
import QuranIndexer from "../helpers/QuranIndexer";
import * as strings from "../helpers/StringsManager";
import StringsManager from "../helpers/StringsManager";

export default class ModalAyahSelector {
  constructor(parent /* should have .bShowAyahSelector & .refresh()*/) {
    this.parent = parent;
    this.surahInfo = new QuranIndexer();
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.parent.props.strLang);
    this.selAyah = 7;
    this.surahNumber = 1;
    this.onSelect = null;
    this.onCancel = null;
    this.curText = "1";
  }
  handlePress() {
    this.onNumberSubmit(this.curText);
    if (this.onSelect != null) this.onSelect(this.selAyah);
    this.parent.bShowAyahSelector = false; //this.parent.setState({ bShowAyahSelector: false });
    this.parent.refresh();
  }
  handleCancel() {
    this.onNumberSubmit(this.curText);
    if (this.onCancel != null) this.onCancel();
    this.parent.bShowAyahSelector = false; //this.parent.setState({ bShowAyahSelector: false });
    this.parent.refresh();
  }

  getModal() {
    if (this.parent.bShowAyahSelector == false) return null;
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
        visible={this.parent.bShowAyahSelector}
        onRequestClose={() => {}}
        onDismiss={() => {}}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.contentContainer}
        >
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
                numberOfLines={bIsValidSel ? 1 : 2}
                style={{
                  flex: 0.6,
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: 18,
                }}
              >
                {bIsValidSel
                  ? allAyat[indx].text
                  : this.stringsManager.getStr(strings.STR_CHOOSE_BETWEEN) +
                    "\n[1, " +
                    this.ayahRange +
                    "]"}
              </Text>
            </View>
          </View>
          <View style={styles.toolbar}>
            <ActionBtn
              text={this.stringsManager.getStr(strings.STR_SELECT)}
              handler={this.handlePress.bind(this)}
              lang={this.parent.props.strLang}
              style={{ marginHorizontal: 3 }}
            />
            <ActionBtn
              text={this.stringsManager.getStr(strings.STR_CANCEL)}
              contained={true}
              handler={this.handleCancel.bind(this)}
              lang={this.parent.props.strLang}
              style={{ marginHorizontal: 3 }}
            />
          </View>
        </KeyboardAvoidingView>
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
    this.parent.refresh(); //this.parent.setState({ bShowAyahSelector: true }); //just to refresh render
  }
  onNumberSubmit(text) {
    var str = "";
    str = this.curText;
    if (str != "") {
      this.selAyah = parseInt(str);
    } else {
      this.curText = "1";
    }

    this.parent.refresh(); //this.parent.setState({ bShowAyahSelector: true }); //just to refresh render
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    width: "80%",
    height: "80%",
    alignSelf: "center",
    marginTop: 85,
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

  okButton: {
    alignSelf: "center",
    width: 70,
    height: 70,
    marginTop: 30,
  },
  toolbar: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    // alignContent: "center",
    // backgroundColor: "red",
    // // margin: 5,
    padding: 15,
  },
});
