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
  FlatList,
} from "react-native";
import * as strings from "js/helpers/StringsManager";
import StringsManager from "js/helpers/StringsManager";
import RevisionsManager from "js/helpers/RevisionsManager";
import ActionBtn from "app/components/ActionBtn";
import * as Updates from "expo-updates";
import Screen from "app/components/Screen";
class ScreenRevisionsTools extends Component {
  constructor(props) {
    super(props);
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
    this.revisionsManager = new RevisionsManager();
    this.revisionsManager.m_loadedRevisions = this.props.revisions;
    this.commands = [
      {
        id: 1,
        title: this.stringsManager.getStr(strings.STR_BY_JUZUU),
        onPress: this.onPressByJuzuu.bind(this),
        icon: "add",
      },
      {
        id: 2,
        title: this.stringsManager.getStr(strings.STR_BY_SURAH),
        onPress: this.onPressBySurah.bind(this),
        icon: "add",
      },
      {
        id: 3,
        title: this.stringsManager.getStr(strings.STR_RESET_ALL),
        onPress: this.onPressResetAll.bind(this),
        icon: "check",
      },
      {
        id: 4,
        title: this.stringsManager.getStr(strings.STR_DEL_ALL),
        onPress: this.onPressDeleteAll.bind(this),
        icon: "delete_forever",
      },
      {
        id: 5,
        title: this.stringsManager.getStr(strings.STR_BACKUP),
        onPress: this.onPressBackup.bind(this),
        icon: "sd_storage",
      },
      {
        id: 6,
        title: this.stringsManager.getStr(strings.STR_RESTORE),
        onPress: this.onPressRestore.bind(this),
        icon: "restore",
      },
    ];
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
  getItemTextStyle() {
    return {
      fontSize: this.props.strLang == "ar" ? 20 : 16,
      lineHeight: this.props.strLang == "ar" ? 28 : 22,
      fontFamily: this.props.strLang == "ar" ? "Amiri" : "Poppins",
      marginHorizontal: 5,
      color: "#0B721E",
    };
  }
  renderItem(item) {
    return (
      <TouchableWithoutFeedback onPress={item.item.onPress}>
        <View style={styles.item}>
          <Text style={this.getItemTextStyle()}>{item.item.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.commands}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item) => item.id}
        />
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
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#0B721E0D",
    height: 55,
    marginVertical: 16,
    marginHorizontal: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    color: "red",
  },
});
