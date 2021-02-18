import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Button,
  TextInput,
  Text,
  ViewBase,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Revision from "../helpers/Revision";
import ModalSurahSelector from "../modals/ModalSurahSelector";
import ModalAyahSelector from "../modals/ModalAyahSelector";
export default class ScreenRevisionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bShowSurahSelector: false,
      bShowAyahSelector: false,
      title: "",
      strtSurah: 0,
      strtAyah: 1,
      endSurah: 0,
      endAyah: 1,
    };
    this.modalSurah = new ModalSurahSelector(this);
    this.modalAyah = new ModalAyahSelector(this);
    this.revision = new Revision(0, "Enter name", 0, 1, 1, new Date());
    this.bAutoName = true;
  }
  render() {
    return (
      <ImageBackground
        style={styles.background}
        source={require("../../assets/backgroundPNG/sunset_bk.png")}
      >
        <View style={styles.container}>
          {this.modalSurah.getModal()}
          {this.modalAyah.getModal()}

          {this.getStartAyah()}
          {this.getEndAyah()}
          {this.getRevisionTitle()}
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.okButton}>
            <TouchableWithoutFeedback onPress={this.okButtonPressed.bind(this)}>
              <Image
                source={require("../../assets/icons/ok_icon.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.okButton}>
            <TouchableWithoutFeedback
              onPress={this.backButtonPressed.bind(this)}
            >
              <Image
                source={require("../../assets/icons/back.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ImageBackground>
    );
  }
  okButtonPressed() {
    // add new or update revision here
    this.props.navigation.navigate("ScrList");
  }
  backButtonPressed() {
    // add new or update revision here
    this.props.navigation.navigate("ScrList");
  }
  onTitleChange(text) {
    this.setState({ title: text });
    this.bAutoName = false;
  }
  onTitleSubmit(text) {
    this.revision.title = this.state.title;
    this.bAutoName = false;
  }
  getRevisionTitle() {
    return (
      <View style={{ flexDirection: "row", margin: 20 }}>
        <Text style={styles.revisionTitle}>Title</Text>
        <TextInput
          style={{
            flex: 0.75,
            borderBottomWidth: 1,
            borderBottomColor: "white",
            textAlign: "center",
            textAlignVertical: "center",
            fontSize: 20,
            fontFamily: "sans-serif",
            color: "#323223",
          }}
          onChangeText={this.onTitleChange.bind(this)}
          value={this.state.title}
          onSubmitEditing={this.onTitleSubmit.bind(this)}
        />
      </View>
    );
  }
  getStartEndAyah(bIsStart) {
    return (
      <View style={{ alignSelf: "flex-start", margin: 10, width: "90%" }}>
        <View
          style={{
            width: "50%",
            backgroundColor: "#FFFFFF4D",
            borderTopRightRadius: 3,
          }}
        >
          <Text style={styles.startEndTitle}>
            {bIsStart ? "Starting Ayah" : "Ending Ayah"}
          </Text>
        </View>
        {this.getAyahSelector(bIsStart)}
      </View>
    );
  }
  getStartAyah() {
    return this.getStartEndAyah(true);
  }
  getEndAyah() {
    return this.getStartEndAyah(false);
  }
  getAyahSelector(bIsStart) {
    var surahTxt = this.getSurahTxt(bIsStart);
    var btnColor = surahTxt == "Select Surah" ? "#404040" : "#EBEBA4";
    var txtColor = surahTxt == "Select Surah" ? "#888888" : "#323223";
    return (
      <View style={styles.ayahContainer}>
        <View>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <View style={{ margin: 10 }}>
              <TouchableHighlight
                onPress={
                  bIsStart
                    ? this.selectStartSurah.bind(this)
                    : this.selectEndSurah.bind(this)
                }
                underlayColor="#FFFFFF11"
              >
                <Text style={styles.buttonText}>{surahTxt}</Text>
              </TouchableHighlight>
            </View>
            <View style={{ margin: 10 }}>
              <TouchableHighlight
                onPress={
                  bIsStart
                    ? this.selectStartAyah.bind(this)
                    : this.selectEndAyah.bind(this)
                }
                underlayColor="#FFFFFF11"
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: txtColor, backgroundColor: btnColor },
                  ]}
                >
                  {this.getAyahTxt(bIsStart)}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={{ flexDirection: "row", width: "100%" }}></View>
        </View>
      </View>
    );
  }
  getSurahTxt(bIsStart) {
    var nSurah = bIsStart ? this.state.strtSurah : this.state.endSurah;
    if (nSurah == 0) return "Select Surah";
    return this.modalSurah.surahInfo.getSurahNameAr(nSurah);
  }
  getAyahTxt(bIsStart) {
    var nSurah = bIsStart ? this.state.strtSurah : this.state.endSurah;
    var nAyah = bIsStart ? this.state.strtAyah : this.state.endAyah;
    if (nSurah == 0 || nAyah == 0) return "Select Ayah";
    return "" + nAyah;
  }
  selectStartSurah() {
    this.modalSurah.selSurah = this.state.strtSurah;
    this.modalSurah.onSelect = this.OnStartSurahSelChange.bind(this);
    this.modalSurah.onCancel = null;
    this.setState({ bShowSurahSelector: true });
  }
  OnStartSurahSelChange(nSelSurah) {
    this.state.strtSurah = nSelSurah; // not setState to avoid render
    if (this.bAutoName) {
      this.state.title = this.getAutoTitle();
    }
  }
  getAutoTitle() {
    var strStrt = this.getSurahTxt(true);
    if (strStrt == "Select Surah") strStrt = "";
    var strEnd = this.getSurahTxt(false);
    if (strEnd == "Select Surah") strEnd = "";

    if (strStrt == strEnd) {
      // same surah
      var strtAyah = this.getAyahTxt(true);
      if (strtAyah == "Select Ayah") strtAyah = "";
      var endAyah = this.getAyahTxt(false);
      if (endAyah == "Select Ayah") endAyah = "";
      if (strtAyah == "" && endAyah == "") return strStrt;
      if (endAyah == "") return strStrt + " (" + strtAyah + ")";
      if (strtAyah == "") return strStrt + " (" + endAyah + ")";
      return strStrt + " (" + strtAyah + " - " + endAyah + ")";
    }

    var strtAyah = this.getAyahTxt(true);
    if (strtAyah != "Select Ayah") strStrt += " (" + strtAyah + ")";
    var endAyah = this.getAyahTxt(false);
    if (endAyah != "Select Ayah") strEnd += " (" + endAyah + ")";
    if (strEnd == "") return strStrt;
    if (strStrt == "") return strEnd;
    return strStrt + " " + strEnd;
  }
  selectStartAyah() {
    var surahTxt = this.getSurahTxt(true);
    if (surahTxt == "Select Surah") return;
    this.modalAyah.selAyah = this.state.strtAyah;
    this.modalAyah.surahNumber = this.state.strtSurah;
    this.modalAyah.curText =
      this.modalAyah.selAyah == 0 ? "1" : "" + this.modalAyah.selAyah;
    this.modalAyah.onSelect = this.OnStartAyahSelChange.bind(this);
    this.modalAyah.onCancel = null;
    this.setState({ bShowAyahSelector: true });
  }
  OnStartAyahSelChange(nSelAyah) {
    this.state.strtAyah = nSelAyah; // not setState to avoid render
    if (this.bAutoName) {
      this.state.title = this.getAutoTitle();
    }
  }
  selectEndSurah() {
    this.modalSurah.selSurah = this.state.endSurah;
    this.modalSurah.onSelect = this.OnEndSurahSelChange.bind(this);
    this.modalSurah.onCancel = null;
    this.setState({ bShowSurahSelector: true });
  }
  OnEndSurahSelChange(nSelSurah) {
    this.state.endSurah = nSelSurah; // not setState to avoid render
    if (this.bAutoName) {
      this.state.title = this.getAutoTitle();
    }
  }
  selectEndAyah() {
    var surahTxt = this.getSurahTxt(false);
    if (surahTxt == "Select Surah") return;

    this.modalAyah.selAyah = this.state.endAyah;
    this.modalAyah.surahNumber = this.state.endSurah;
    this.modalAyah.curText =
      this.modalAyah.selAyah == 0 ? "1" : "" + this.modalAyah.selAyah;
    this.modalAyah.onSelect = this.OnEndAyahSelChange.bind(this);
    this.modalAyah.onCancel = null;
    this.setState({ bShowAyahSelector: true });
  }
  OnEndAyahSelChange(nSelAyah) {
    this.state.endAyah = nSelAyah; // not setState to avoid render
    if (this.bAutoName) {
      this.state.title = this.getAutoTitle();
    }
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  okButton: {
    alignSelf: "center",
    width: 90,
    height: 90,
    marginTop: 30,
  },
  container: {
    backgroundColor: "#FFFFFF42",
    alignItems: "center",
    justifyContent: "center",
    width: "84%",
  },
  revisionTitle: {
    flex: 0.25,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    fontFamily: "sans-serif",
    color: "#DCDCDE",
  },
  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    fontFamily: "sans-serif",
    color: "#323223",
    backgroundColor: "#EBEBA4",
    margin: 5,
    padding: 5,
    width: 130,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  startEndTitle: {
    paddingHorizontal: 3,
    textAlignVertical: "center",
    color: "#323223",
    fontSize: 16,
    fontFamily: "sans-serif",
  },
  ayahContainer: {
    backgroundColor: "#FFFFFF4D",
    borderTopRightRadius: 3,

    width: "100%",
    padding: 8,
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
