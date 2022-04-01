import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxActionSetLanguage } from "../redux/reduxActions";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  I18nManager,
} from "react-native";
import * as strings from "js/helpers/StringsManager";
import StringsManager from "js/helpers/StringsManager";
import RevisionsManager from "js/helpers/RevisionsManager";
import ActionBtn from "app/components/ActionBtn";
import * as Updates from "expo-updates";

class ScreenRevisionsTools extends Component {
  constructor(props) {
    super(props);
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
    this.revisionsManager = new RevisionsManager();
    this.revisionsManager.m_loadedRevisions = this.props.revisions;
  }
  getToolbarTitleStyle() {
    return {
      fontSize: this.props.strLang == "ar" ? 18 : 16,
      lineHeight: this.props.strLang == "ar" ? 32 : 25,
      fontFamily: this.props.strLang == "ar" ? "Amiri_Bold" : "Poppins-Bold",
      textAlign: "center",
      color: "#FFFFFF",
      margin: 8,
    };
  }
  onPressByJuzuu() {
    console.log("add by Juzu");
  }
  onPressBySurah() {
    console.log("add by Surah");
  }
  onPressResetAll() {
    console.log("reset all");
  }
  onPressDeleteAll() {
    console.log("delete all");
  }
  onPressBackup() {
    console.log("backup");
  }
  onPressRestore() {
    console.log("restore");
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={this.getToolbarTitleStyle()}>
          {this.stringsManager.getStr(strings.STR_ADD_KHATMAH)}
        </Text>
        <View style={[styles.separator, { alignSelf: "center" }]}></View>
        <View style={styles.buttonsContainer}>
          <ActionBtn
            text={this.stringsManager.getStr(strings.STR_JUZUU)}
            handler={this.onPressByJuzuu.bind(this)}
            lang={this.props.strLang}
            style={{ marginHorizontal: 3 }}
          />
          <ActionBtn
            text={this.stringsManager.getStr(strings.STR_SURAH)}
            handler={this.onPressBySurah.bind(this)}
            lang={this.props.strLang}
            style={{ marginHorizontal: 3 }}
          />
        </View>
        <Text style={this.getToolbarTitleStyle()}>
          {this.stringsManager.getStr(strings.STR_MOD_REV_LIST)}
        </Text>
        <View style={[styles.separator, { alignSelf: "center" }]}></View>
        <View style={styles.buttonsContainer}>
          <ActionBtn
            text={this.stringsManager.getStr(strings.STR_RESET_ALL)}
            handler={this.onPressResetAll.bind(this)}
            lang={this.props.strLang}
            style={{ marginHorizontal: 3 }}
          />
          <ActionBtn
            text={this.stringsManager.getStr(strings.STR_DEL_ALL)}
            handler={this.onPressDeleteAll.bind(this)}
            lang={this.props.strLang}
            style={{ marginHorizontal: 3 }}
          />
        </View>
        <Text style={this.getToolbarTitleStyle()}>
          {this.stringsManager.getStr(strings.STR_BACKUP_RESTORE)}
        </Text>
        <View style={[styles.separator, { alignSelf: "center" }]}></View>
        <View style={styles.buttonsContainer}>
          <ActionBtn
            text={this.stringsManager.getStr(strings.STR_BACKUP)}
            handler={this.onPressResetAll.bind(this)}
            lang={this.props.strLang}
            style={{ marginHorizontal: 3 }}
          />
          <ActionBtn
            text={this.stringsManager.getStr(strings.STR_RESTORE)}
            handler={this.onPressDeleteAll.bind(this)}
            lang={this.props.strLang}
            style={{ marginHorizontal: 3 }}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  strLang: state.strLang,
  revisions: state.revisions,
});
const mapDispatchToProps = () => {
  return {
    reduxActionSetLanguage,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(ScreenRevisionsTools);
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
  },
  toolbar: {
    flexDirection: "row",
    padding: 15,
  },

  separator: {
    borderColor: "#88888859",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 2,
    width: "93%",
    marginVertical: 15,
  },
});
