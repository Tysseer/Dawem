import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  Text,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Revision from "../helpers/Revision";
import ModalSurahSelector from "../modals/ModalSurahSelector";
import ModalAyahSelector from "../modals/ModalAyahSelector";
import { connect } from "react-redux";
import {
  reduxActionUpdateRevision,
  reduxActionAddRevision,
} from "../redux/reduxActions";
import RevisionsManager from "../helpers/RevisionsManager";
import * as strings from "../helpers/StringsManager";
import StringsManager from "../helpers/StringsManager";
class ScreenRevisionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bRefresh: true,
    };
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
    this.modalSurah = new ModalSurahSelector(this);
    this.modalAyah = new ModalAyahSelector(this);
    this.revision = this.props.curRevision;
    if (this.revision == null) {
      this.bIsNewRev = true;
      this.revision = new Revision(0, "", 0, 1, 1, new Date());

      this.bShowSurahSelector = false;
      this.bShowAyahSelector = false;
      this.title = "";
      this.strtSurah = 0;
      this.strtAyah = 1;
      this.endSurah = 0;
      this.endAyah = 1;
      this.bAutoName = true;

      var revisionsManager = new RevisionsManager();
      //this.revisionsManager.loadTestRevisions(true);
      revisionsManager.m_loadedRevisions = this.props.revisions;
      this.revision.id = revisionsManager.getNewRevisionId();
    } else {
      this.bIsNewRev = false;
      this.bAutoName = false;

      this.bShowSurahSelector = false;
      this.bShowAyahSelector = false;
      this.title = this.revision.title;
      this.strtSurah = this.modalSurah.surahInfo.getSurahFromAyah(
        this.revision.strt
      );
      this.strtAyah = this.modalSurah.surahInfo.getAyahLocalIndx(
        this.revision.strt
      );
      this.endSurah = this.modalSurah.surahInfo.getSurahFromAyah(
        this.revision.end
      );
      this.endAyah = this.modalSurah.surahInfo.getAyahLocalIndx(
        this.revision.end
      );
    }
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
    // todo: validation
    this.revision.title = this.title;
    this.revision.strt = this.modalSurah.surahInfo.getAyahGlobalIndx(
      this.strtSurah,
      this.strtAyah
    );
    this.revision.end = this.modalSurah.surahInfo.getAyahGlobalIndx(
      this.endSurah,
      this.endAyah
    );
    if (this.bIsNewRev) this.props.reduxActionAddRevision(this.revision);
    else this.props.reduxActionUpdateRevision(this.revision);
    this.props.navigation.navigate("ScrList");
  }
  refresh() {
    var bVal = this.state.bRefresh == false;
    this.setState({ bRefresh: bVal });
  }

  backButtonPressed() {
    this.props.navigation.navigate("ScrList");
  }
  onTitleChange(text) {
    var str = "";
    str = text;
    this.title = str; //this.setState({ title: text });
    this.bAutoName = false;
    this.refresh();
  }
  onTitleSubmit(text) {
    this.revision.title = this.title;
    this.bAutoName = false;
  }
  getRevisionTitle() {
    return (
      <View style={{ flexDirection: "row", margin: 20 }}>
        <Text style={styles.revisionTitle}>
          {this.stringsManager.getStr(strings.STR_TITLE)}
        </Text>
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
          value={this.title}
          onSubmitEditing={this.onTitleSubmit.bind(this)}
        />
      </View>
    );
  }
  getStartEndAyah(bIsStart) {
    var strAyahTxt = bIsStart
      ? this.stringsManager.getStr(strings.STR_STRT_AYAH)
      : this.stringsManager.getStr(strings.STR_END_AYAH);
    return (
      <View style={{ alignSelf: "flex-start", margin: 10, width: "90%" }}>
        <View
          style={{
            width: "50%",
            backgroundColor: "#FFFFFF4D",
            borderTopRightRadius: 3,
          }}
        >
          <Text style={styles.startEndTitle}>{strAyahTxt}</Text>
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
    var btnColor =
      surahTxt == this.stringsManager.getStr(strings.STR_SEL_SURAH)
        ? "#404040"
        : "#EBEBA4";
    var txtColor =
      surahTxt == this.stringsManager.getStr(strings.STR_SEL_SURAH)
        ? "#888888"
        : "#323223";
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
    var nSurah = bIsStart ? this.strtSurah : this.endSurah;
    if (nSurah == 0) return this.stringsManager.getStr(strings.STR_SEL_SURAH);
    return this.modalSurah.surahInfo.getSurahNameAr(nSurah);
  }
  getAyahTxt(bIsStart) {
    var nSurah = bIsStart ? this.strtSurah : this.endSurah;
    var nAyah = bIsStart ? this.strtAyah : this.endAyah;
    if (nSurah == 0 || nAyah == 0)
      return this.stringsManager.getStr(strings.STR_SEL_AYAH);
    return "" + nAyah;
  }
  selectStartSurah() {
    this.modalSurah.selSurah = this.strtSurah;
    this.modalSurah.onSelect = this.OnStartSurahSelChange.bind(this);
    this.modalSurah.onCancel = null;
    this.bShowSurahSelector = true; //this.setState({ bShowSurahSelector: true });
    this.refresh();
  }
  OnStartSurahSelChange(nSelSurah) {
    var ayahTxt = this.getAyahTxt(true);
    this.strtSurah = nSelSurah;
    if (
      ayahTxt == this.stringsManager.getStr(strings.STR_SEL_AYAH) ||
      this.modalSurah.surahInfo.isValidLocalAyahIndex(
        this.strtSurah,
        this.strtAyah
      ) == false
    ) {
      this.strtAyah = 1;
    }
    ayahTxt = this.getAyahTxt(false);
    var endTxt = this.getSurahTxt(false);
    if (endTxt == this.stringsManager.getStr(strings.STR_SEL_SURAH)) {
      this.endSurah = nSelSurah;
    }
    if (
      ayahTxt == this.stringsManager.getStr(strings.STR_SEL_AYAH) ||
      this.modalSurah.surahInfo.isValidLocalAyahIndex(
        this.endSurah,
        this.endAyah
      ) == false
    ) {
      this.endAyah = this.modalSurah.surahInfo.getSurahNumAyah(this.endSurah);
    }
    if (this.bAutoName) {
      this.title = this.getAutoTitle();
    }
  }
  getAutoTitle() {
    var strStrt = this.getSurahTxt(true);
    if (strStrt == this.stringsManager.getStr(strings.STR_SEL_SURAH))
      strStrt = "";
    var strEnd = this.getSurahTxt(false);
    if (strEnd == this.stringsManager.getStr(strings.STR_SEL_SURAH))
      strEnd = "";

    if (strStrt == strEnd) {
      if (
        strStrt != "" &&
        this.strtAyah == 1 &&
        this.endAyah ==
          this.modalSurah.surahInfo.getSurahNumAyah(this.strtSurah)
      ) {
        return this.modalSurah.surahInfo.getSurahNameAr(this.strtSurah);
      }
      // same surah
      var strtAyah = this.getAyahTxt(true);
      if (strtAyah == this.stringsManager.getStr(strings.STR_SEL_AYAH))
        strtAyah = "";
      var endAyah = this.getAyahTxt(false);
      if (endAyah == this.stringsManager.getStr(strings.STR_SEL_AYAH))
        endAyah = "";
      if (strtAyah == "" && endAyah == "") return strStrt;
      if (endAyah == "") return strStrt + " (" + strtAyah + ")";
      if (strtAyah == "") return strStrt + " (" + endAyah + ")";
      return strStrt + " (" + strtAyah + " - " + endAyah + ")";
    }

    var strtAyah = this.getAyahTxt(true);
    if (strtAyah != this.stringsManager.getStr(strings.STR_SEL_AYAH))
      strStrt += " (" + strtAyah + ")";
    var endAyah = this.getAyahTxt(false);
    if (endAyah != this.stringsManager.getStr(strings.STR_SEL_AYAH))
      strEnd += " (" + endAyah + ")";
    if (strEnd == "") return strStrt;
    if (strStrt == "") return strEnd;
    return strStrt + " " + strEnd;
  }
  selectStartAyah() {
    var surahTxt = this.getSurahTxt(true);
    if (surahTxt == this.stringsManager.getStr(strings.STR_SEL_SURAH)) return;
    this.modalAyah.selAyah = this.strtAyah;
    this.modalAyah.surahNumber = this.strtSurah;
    this.modalAyah.curText =
      this.modalAyah.selAyah == 0 ? "1" : "" + this.modalAyah.selAyah;
    this.modalAyah.onSelect = this.OnStartAyahSelChange.bind(this);
    this.modalAyah.onCancel = null;
    this.bShowAyahSelector = true; //this.setState({ bShowAyahSelector: true });
    this.refresh();
  }
  OnStartAyahSelChange(nSelAyah) {
    this.strtAyah = nSelAyah;

    if (this.bAutoName) {
      this.title = this.getAutoTitle();
    }
  }
  selectEndSurah() {
    this.modalSurah.selSurah = this.endSurah;
    this.modalSurah.onSelect = this.OnEndSurahSelChange.bind(this);
    this.modalSurah.onCancel = null;
    this.bShowSurahSelector = true; //this.setState({ bShowSurahSelector: true });
    this.refresh();
  }
  OnEndSurahSelChange(nSelSurah) {
    this.endSurah = nSelSurah;

    var ayahTxt = this.getAyahTxt(false);
    if (
      ayahTxt == this.stringsManager.getStr(strings.STR_SEL_AYAH) ||
      this.modalSurah.surahInfo.isValidLocalAyahIndex(
        this.endSurah,
        this.endAyah
      ) == false
    ) {
      this.endAyah = this.modalSurah.surahInfo.getSurahNumAyah(this.endSurah);
    }
    var strtTxt = this.getSurahTxt(true);
    if (strtTxt == this.stringsManager.getStr(strings.STR_SEL_SURAH)) {
      this.strtSurah = nSelSurah;
    }
    ayahTxt = this.getAyahTxt(true);
    if (
      ayahTxt == this.stringsManager.getStr(strings.STR_SEL_AYAH) ||
      this.modalSurah.surahInfo.isValidLocalAyahIndex(
        this.strtSurah,
        this.strtAyah
      ) == false
    ) {
      this.strtAyah = 1;
    }

    if (this.bAutoName) {
      this.title = this.getAutoTitle();
    }
  }
  selectEndAyah() {
    var surahTxt = this.getSurahTxt(false);
    if (surahTxt == this.stringsManager.getStr(strings.STR_SEL_SURAH)) return;

    this.modalAyah.selAyah = this.endAyah;
    this.modalAyah.surahNumber = this.endSurah;
    this.modalAyah.curText =
      this.modalAyah.selAyah == 0 ? "1" : "" + this.modalAyah.selAyah;
    this.modalAyah.onSelect = this.OnEndAyahSelChange.bind(this);
    this.modalAyah.onCancel = null;
    this.bShowAyahSelector = true; //this.setState({ bShowAyahSelector: true });
    this.refresh();
  }
  OnEndAyahSelChange(nSelAyah) {
    this.endAyah = nSelAyah; // not setState to avoid render
    if (this.bAutoName) {
      this.title = this.getAutoTitle();
    }
  }
}
const mapStateToProps = (state) => ({
  revisions: state.revisions,
  curRevision: state.curRevision,
  strLang: state.strLang,
});
const mapDispatchToProps = () => {
  return {
    reduxActionUpdateRevision,
    reduxActionAddRevision,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(ScreenRevisionDetails);
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
