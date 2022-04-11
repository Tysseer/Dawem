import React, { Component } from "react";
import { connect } from "react-redux";
import {
  reduxActionDelAllRevisions,
  reduxActionResetAllRevisions,
  reduxActionAddMultipleRevisions,
} from "../redux/reduxActions";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  I18nManager,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as strings from "js/helpers/StringsManager";
import StringsManager from "js/helpers/StringsManager";
import RevisionsManager from "js/helpers/RevisionsManager";
import Revision from "js/helpers/Revision";
import ActionBtn from "app/components/ActionBtn";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import QuranIndexer from "../helpers/QuranIndexer";
import { colors } from "../../constants";
import {
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { getFontBasicStyle } from "../helpers/scripts";

const { height, width } = Dimensions.get("window");

const Write = async (strWrite) => {
  let fileUri = FileSystem.documentDirectory + "Dawem.txt";
  await FileSystem.writeAsStringAsync(fileUri, strWrite, {
    encoding: FileSystem.EncodingType.UTF8,
  });
  // Sharing.shareAsync(fileUri, {});
};
const Read = async () => {
  let fileUri = FileSystem.documentDirectory + "Dawem.txt";
  // const asset = await MediaLibrary.createAssetAsync(fileUri);
  const asset = await FileSystem.readAsStringAsync(fileUri, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  return asset + "";
};
class ScreenRevisionsTools extends Component {
  constructor(props) {
    super(props);
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
    this.revisionsManager = new RevisionsManager();
    this.revisionsManager.m_loadedRevisions = this.props.revisions;
    this.quranIndexer = new QuranIndexer();
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
        icon: "close",
      },
      {
        id: 5,
        title: this.stringsManager.getStr(strings.STR_BACKUP),
        onPress: this.onPressBackup.bind(this),
        icon: "sd-card",
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
    // console.log("here");
    this.revisionsManager.m_loadedRevisions = this.props.revisions;
    var strJuzuu = this.stringsManager.getStr(strings.STR_JUZUU) + " [";
    var revs = [];
    var id = this.revisionsManager.getNewRevisionId();
    for (var i = 1; i <= 30; i++) {
      let rev = new Revision();
      rev.id = id++;
      rev.title = strJuzuu + i + "]";
      rev.progress = 0;
      rev.strt = this.quranIndexer.getJuzuuStartAyah(i);
      rev.end = this.quranIndexer.getJuzuuStartAyah(i + 1) - 1;
      rev.dateofLastRevision = this.revisionsManager.getPastDate(31 - i);
      rev.updateNumDays();
      revs.push(rev);
    }

    revs[29].end = this.quranIndexer.getNumAyas();

    this.props.reduxActionAddMultipleRevisions(revs);

    this.props.navigation.navigate("Home", { screen: "Main" });
  }
  onPressBySurah() {
    this.revisionsManager.m_loadedRevisions = this.props.revisions;
    var revs = [];
    var id = this.revisionsManager.getNewRevisionId();
    for (var i = 1; i <= 114; i++) {
      let rev = new Revision();
      rev.id = id++;
      rev.title =
        this.props.strLang == "ar"
          ? this.quranIndexer.getSurahNameAr(i)
          : this.quranIndexer.getSurahNameEn(i) +
            " (" +
            this.quranIndexer.getSurahNameEnTrns(i) +
            ")";
      rev.progress = 0;
      rev.strt = this.quranIndexer.getArrSurahAyahStart(i);
      rev.end = this.quranIndexer.getArrSurahAyahStart(i + 1) - 1;
      rev.dateofLastRevision = this.revisionsManager.getPastDate(
        31 - i / 30 + 1
      );
      rev.updateNumDays();
      revs.push(rev);
    }

    revs[29].end = this.quranIndexer.getNumAyas();
    this.props.reduxActionAddMultipleRevisions(revs);

    this.props.navigation.navigate("Home", { screen: "Main" });
  }
  onPressResetAll() {
    this.revisionsManager.m_loadedRevisions = this.props.revisions;
    this.props.reduxActionResetAllRevisions();

    this.props.navigation.navigate("Home", { screen: "Main" });
  }
  onPressDeleteAll() {
    this.props.reduxActionDelAllRevisions();
    this.revisionsManager.m_loadedRevisions = [];
    this.props.navigation.navigate("Home", { screen: "Main" });
  }
  async onPressBackup() {
    this.revisionsManager.m_loadedRevisions = this.props.revisions;
    var strArr = this.revisionsManager.getAsStringArr();
    var writeStr = strArr.join("#$#");
    // console.log(strArr);
    // todo: ask for path here
    // todo: write here
    await Write(writeStr);
    this.props.navigation.navigate("Home", { screen: "Main" });
  }
  async onPressRestore() {
    // todo: ask for path here
    // todo: read here
    //  console.log("backup");
    var readStr = await Read();

    // {
    //   // code for testing only
    //   let tmpArr = this.revisionsManager.getAsStringArr();
    //   let writeStr = tmpArr.join("#$#");
    //   readStr = writeStr;
    // }
    var strArr = readStr.split("#$#");
    var tempRevisionsManager = new RevisionsManager();
    tempRevisionsManager.fillFromStrArr(strArr);
    tempRevisionsManager.sortRevisions();
    var id = this.revisionsManager.getNewRevisionId();

    for (var i = 0; i < tempRevisionsManager.m_loadedRevisions; i++) {
      tempRevisionsManager.m_loadedRevisions[i].id = id++;
    }
    this.props.reduxActionAddMultipleRevisions(
      tempRevisionsManager.m_loadedRevisions
    );
    this.revisionsManager.m_loadedRevisions = this.props.revisions;

    this.props.navigation.navigate("Home", { screen: "Main" });
  }
  getItemTextStyle() {
    return [
      {
        alignSelf: "center",
        marginHorizontal: 1,
        color: "#0B721E",
      },
      getFontBasicStyle(this.props.strLang, false),
    ];
  }
  renderItem(item) {
    return (
      <TouchableOpacity onPress={item.item.onPress}>
        <View style={styles.item}>
          <MaterialIcons
            name={item.item.icon}
            size={24}
            color={colors.primary}
            style={{ marginHorizontal: 5 }}
          />
          <Text style={this.getItemTextStyle()}>{item.item.title}</Text>
        </View>
      </TouchableOpacity>
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
    reduxActionDelAllRevisions,
    reduxActionResetAllRevisions,
    reduxActionAddMultipleRevisions,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(ScreenRevisionsTools);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
  item: {
    backgroundColor: "#0B721E0D",
    height: height / 16,
    marginVertical: height / 55,
    marginHorizontal: height / 55,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
});
