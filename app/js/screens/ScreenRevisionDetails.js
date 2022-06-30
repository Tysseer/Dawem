import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";

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
import { colors } from "app/constants";
import { getContentFontBasicStyle } from "../helpers/scripts";
import ActionBtn from "app/components/ActionBtn";
import SearchTextParser from "../helpers/SearchTextParser";
const { height, width } = Dimensions.get("window");
const height12_5 = height / 12.5;
const height18 = height / 18;
const height50 = height / 50;
const height130 = height / 130;
class ScreenRevisionDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bRefresh: true,
      addBtnDisabled: true,
    };
    this.height = Dimensions.get("window").height;
    this.width = Dimensions.get("window").width;
    this.bIsAr = this.props.strLang == "ar";
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
    this.modalSurah = new ModalSurahSelector(this);
    this.modalAyah = new ModalAyahSelector(this);
    this.revision = this.props.curRevision;
    if (this.revision == null) {
      this.bIsNewRev = true;
      this.revision = new Revision();
      this.revision.bIsNewRev = true;
      this.bShowSurahSelector = false;
      this.bShowAyahSelector = false;
      this.title = "";
      this.strtSurah = 0;
      this.strtAyah = 1;
      this.endSurah = 0;
      this.endAyah = 1;
      this.bAutoName = true;

      var revisionsManager = new RevisionsManager();

      revisionsManager.m_loadedRevisions = this.props.revisions;
      this.revision.id = revisionsManager.getNewRevisionId();
    } else {
      this.bIsNewRev = false;
      this.bAutoName = false;

      this.bShowSurahSelector = false;
      this.bShowAyahSelector = false;
      this.title = this.revision.title;

      const { localSurahIndx: iSurahStrt, localAyahIndx: iAyahStrt } =
        this.modalSurah.surahInfo.getAyahLocalIndx(this.revision.strt);

      const { localSurahIndx: iSurahEnd, localAyahIndx: iAyahEnd } =
        this.modalSurah.surahInfo.getAyahLocalIndx(this.revision.end);

      this.strtSurah = iSurahStrt;
      this.strtAyah = iAyahStrt;
      this.endSurah = iSurahEnd;
      this.endAyah = iAyahEnd;
    }
    this.search = "";

    this.getContentFontBasicStyle = getContentFontBasicStyle(
      this.props.strLang
    );
  }

  // componentDidMount() {
  //   // this.props.navigation.setParams({ title: 'title 123' });
  //   console.log('test');
  //   // this.navigation.setOptions({ headerTitle: 'title 123' });
  //   // this.props.navigation.set
  // }

  render() {
    return (
      // <Text>{JSON.stringify(this.quranReaderByLine.getPage(165))}</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* header */}
        {/* <Header
          title={this.stringsManager.getStr(strings.STR_REV_TITLE)}
          lang={this.props.strLang}
        /> */}

        {/* content */}
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View>
            {this.modalSurah.getModal()}
            {this.modalAyah.getModal()}
            {this.getRevisionSearch()}
            <View style={styles.separator}></View>
            {this.getStartAyah()}
            {this.getEndAyah()}
            {this.getRevisionTitle()}
          </View>

          <ActionBtn
            text={
              this.bIsNewRev
                ? this.stringsManager.getStr(strings.STR_ADD_REV)
                : this.stringsManager.getStr(strings.STR_AGREE)
            }
            fullWidth={true}
            handler={this.okButtonPressed.bind(this)}
            disabled={!this.title.length}
            lang={this.props.strLang}
            icon={this.bIsNewRev}
            style={{ height: height12_5 }}
          />
        </View>
      </KeyboardAvoidingView>
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
    let realStrt = Math.min(this.revision.strt, this.revision.end);
    let realEnd = Math.max(this.revision.strt, this.revision.end);
    this.revision.strt = realStrt;
    this.revision.end = realEnd;
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
    this.title = str;
    this.bAutoName = false;
    this.refresh();
  }
  onSearchChange(text) {
    var str = "";
    str = text;
    this.search = str;
    this.refresh();
  }
  onTitleSubmit(text) {
    this.revision.title = this.title;
    this.bAutoName = false;
  }
  onRevSearch() {
    var text = this.search;
    if (text == null || text == "") return;
    var parser = new SearchTextParser();
    var ret = parser.parseRevisionQuery(text);
    if (ret != null && ret.bIsSuccess) {
      this.strtSurah = ret.strtSurah;
      this.strtAyah = ret.strtAyah;
      this.endSurah = ret.endSurah;
      this.endAyah = ret.endAyah;

      this.title = this.getAutoTitle(); // or text?

      this.bAutoName = true;
    } else {
      let strMsg = this.stringsManager.getStr(strings.STR_CANT_UNDERSTAND);
      let toast = Toast.show(strMsg, {
        duration: Toast.durations.long,
        position: Toast.positions.CENTER,
        shadow: true,
        shadowColor: colors.primary,
        animation: true,
        hideOnPress: true,
        opacity: 1,
        backgroundColor: "#eee",
        textColor: "#333",
        onShow: () => {
          // calls on toast\`s appear animation start
        },
        onShown: () => {
          // calls on toast\`s appear animation end.
        },
        onHide: () => {
          // calls on toast\`s hide animation start.
        },
        onHidden: () => {
          // calls on toast\`s hide animation end.
        },
      });
    }

    this.refresh();
  }
  getRevisionSearch() {
    return (
      <View>
        <Text style={[styles.revisionTitle, this.getContentFontBasicStyle]}>
          {this.stringsManager.getStr(strings.STR_ADD_REV_BY_TXT)}
        </Text>
        <View style={styles.searchBar}>
          <TextInput
            style={{ ...styles.input, ...this.getContentFontBasicStyle }}
            onChangeText={this.onSearchChange.bind(this)}
            value={this.search}
            placeholder={this.stringsManager.getStr(
              strings.STR_ADD_REV_BY_TXT_PROMPT
            )}
            onSubmitEditing={this.onRevSearch.bind(this)}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={this.onRevSearch.bind(this)}
          >
            <MaterialCommunityIcons
              name={"text-box-search-outline"}
              size={height18 - 8}
              margin={4}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  getRevisionTitle() {
    return (
      <View>
        <Text style={[styles.revisionTitle, this.getContentFontBasicStyle]}>
          {this.stringsManager.getStr(strings.STR_TITLE)}
        </Text>
        <TextInput
          style={{ ...styles.input, ...this.getContentFontBasicStyle }}
          onChangeText={this.onTitleChange.bind(this)}
          value={this.title}
          placeholder={this.stringsManager.getStr(strings.STR_ADD_REV_TITLE)}
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
      <View style={{ marginBottom: 15 }}>
        <View>
          <Text style={[styles.startEndTitle, this.getContentFontBasicStyle]}>
            {strAyahTxt}
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
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ActionBtn
          style={{ width: "62%" }}
          text={surahTxt}
          fullWidth={false}
          handler={
            bIsStart
              ? this.selectStartSurah.bind(this)
              : this.selectEndSurah.bind(this)
          }
          lang={this.props.strLang}
        />

        {this.modalAyah.getModal()}
        <ActionBtn
          style={{ width: "32%" }}
          fullWidth={false}
          text={this.getAyahTxt(bIsStart)}
          contained={true}
          handler={
            bIsStart
              ? this.selectStartAyah.bind(this)
              : this.selectEndAyah.bind(this)
          }
          lang={this.props.strLang}
        />
      </View>
    );
  }
  getSurahTxt(bIsStart) {
    var nSurah = bIsStart ? this.strtSurah : this.endSurah;
    if (nSurah == 0) return this.stringsManager.getStr(strings.STR_SEL_SURAH);
    return this.bIsAr
      ? this.modalSurah.surahInfo.getSurahNameAr(nSurah)
      : this.modalSurah.surahInfo.getSurahNameEnTrns(nSurah);
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
        return this.bIsAr
          ? this.modalSurah.surahInfo.getSurahNameAr(this.strtSurah)
          : this.modalSurah.surahInfo.getSurahNameEnTrns(this.strtSurah);
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
  container: {
    flex: 1,
    backgroundColor: "#EEE",
    height: "100%",
    paddingBottom: 20,
    paddingHorizontal: 20,
    // paddingTop: 40,
  },
  // okButton: {
  //   alignSelf: "center",
  //   width: 90,
  //   height: 90,
  //   marginTop: 30,
  // },

  revisionTitle: {
    //marginTop: 20,
    alignSelf: "flex-start",
    // fontSize: 18,
    color: "#323223",
  },
  // buttonText: {
  //   textAlign: "center",
  //   textAlignVertical: "center",
  //   fontSize: 18,
  //   // fontFamily: "sans-serif",
  //   color: "#fff",
  // },
  // buttonTextContainer: {
  //   justifyContent: "center",
  //   width: "48%",
  //   height: 55,
  //   backgroundColor: "#0B721E",
  //   borderRadius: 10,
  //   borderStyle: "solid",
  // },
  // buttonSubmitContainer: {
  //   marginRight: 20,
  //   marginLeft: 20,
  //   justifyContent: "center",
  //   // width: "90%",
  //   height: 55,
  //   backgroundColor: "#0B721E",
  //   borderRadius: 10,
  //   borderStyle: "solid",
  // },
  startEndTitle: {
    paddingHorizontal: 3,
    textAlignVertical: "center",
    color: "#333",
    fontSize: height50,
    alignSelf: "flex-start",
    marginBottom: height130,
  },

  // ayahContainer: {
  //   backgroundColor: "#FFFFFF4D",
  //   borderTopRightRadius: 3,

  //   width: "100%",
  //   padding: 8,
  //   margin: 0,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  input: {
    paddingHorizontal: 10,
    height: height18,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    fontSize: height50,
    color: colors.primary,
    backgroundColor: colors.light_bg,
  },
  separator: {
    borderColor: "#88888859",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 2,
    width: "101%",
    marginVertical: 15,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 5,
  },
  // btnStyle: {
  //   justifyContent: "center",
  //   height: 55,
  //   borderRadius: 10,
  //   borderColor: colors.primary,
  //   paddingHorizontal: 10,
  // },
});
