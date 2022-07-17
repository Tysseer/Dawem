import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import allAyat from "../helpers/quranAyat";
import { connect } from "react-redux";
import StringsManager, * as strings from "../helpers/StringsManager";
const { height, width } = Dimensions.get("window");
import ActionBtn from "app/components/ActionBtn";
import { colors } from "app/constants";
import {
  getTitleFontBasicStyle,
  getLargeContentFontBasicStyle,
} from "../helpers/scripts";
const height18 = height / 18;
const height50 = height / 50;
import MiscUtilities from "../helpers/MiscUtilities";
import QuranIndexer from "../helpers/QuranIndexer";
import * as Notifications from "expo-notifications";

const triggerNotifications = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You’ve got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
};
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});
class ModalPlayback extends Component {
  static propTypes = {
    strLang: PropTypes.string.isRequired,
    quranInfo: PropTypes.instanceOf(QuranIndexer).isRequired,
    setModalVisible: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.bIsPlaying = false;
    this.bIsRepeat = true;
    this.bIsAr = this.props.strLang == "ar";
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
    this.revision = this.props.curRevision;

    if (this.revision == null) {
      //error
      this.revision = new Revision();
      this.revision.bIsNewRev = true;
      this.revision.title = this.bIsAr ? "مراجعة اختبارية" : "Test Revision";
      this.revision.strt = 1;
      this.revision.end = 7;
    }
    this.currentAyah = this.revision.strt;
    this.fillAyahText();
    this.state = {
      animatedValue: new Animated.Value(0),
      bRefresh: false,
    };

    this.animTimer = Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      console.log("finished anim, ready to play");
      //TrackPlayer.add(this.constructTracks());
    });
    this.ayahStyle = getTitleFontBasicStyle("ar");
    this.numberStyle = getLargeContentFontBasicStyle("ar");
    this.titleStyle = this.getTitleTextStyle();
  }
  constructTracks() {
    let ret = [];
    let baseURL =
      "https://filedn.eu/lN31ymlFlgGQjKjbcGyu9xY/QuranVerses/Hosary/";
    for (let i = this.revision.strt; i < this.revision.end; i++) {
      let ayaInfo = this.props.quranInfo.getAyahLocalIndx(i); //{localSurahIndx,localAyahIndx}
      let title = this.bIsAr
        ? this.props.quranInfo.getSurahNameAr(ayaInfo.localSurahIndx)
        : this.props.quranInfo.getSurahNameTrns(ayaInfo.localSurahIndx);
      let trackname =
        ("00" + ayaInfo.localSurahIndx).slice(-3) +
        ("00" + ayaInfo.localAyahIndx).slice(-3) +
        ".mp3";
      let track = {
        id: i,
        url: baseURL + trackname,
        title: title,
        album: this.revision.title,
      };
      ret.push(track);
    }
    return ret;
  }
  fillAyahText() {
    this.ayahText = allAyat[this.currentAyah].text;
    this.ayahNumber = this.formatAyahNumber();
  }
  handlePress() {
    this.state.animatedValue = new Animated.Value(0);
    this.animTimer = Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    this.props.setModalVisible(false);
  }
  refresh() {
    this.setState({
      bRefresh: !this.state.bRefresh,
    });
  }
  onPlay() {
    triggerNotifications();
    this.bIsPlaying = !this.bIsPlaying;
    this.refresh();
  }

  onStop() {
    this.bIsPlaying = false;
    this.refresh();
  }
  onRepeat() {
    this.bIsRepeat = !this.bIsRepeat;
    this.refresh();
  }
  formatAyahNumber() {
    let str = MiscUtilities.convertToIndianNumbers(
      allAyat[this.currentAyah].index.toString()
    );
    return " (" + str + ") ";
  }
  render() {
    var strMgr = new StringsManager();
    strMgr.setLanguage(this.props.strLang);

    return (
      <Modal transparent={true} visible={true}>
        <Animated.View
          style={{
            transform: [
              {
                translateY: this.state.animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-600, height / 5],
                }),
              },
            ],
            height: "57%",
            width: "95%",
            paddingHorizontal: 5,
            borderRadius: 12,
            backgroundColor: colors.faddedGreen,
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <View style={styles.contentContainer}>
            <Text style={this.titleStyle}>{this.revision.title}</Text>
            <Text>
              <Text style={this.ayahStyle}>{this.ayahText}</Text>
              <Text style={this.numberStyle}>{this.ayahNumber}</Text>
            </Text>

            <View style={styles.playBackBar}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.onPlay.bind(this)}
              >
                <Ionicons
                  name={this.bIsPlaying ? "pause-sharp" : "play-sharp"}
                  size={height18 - 8}
                  margin={4}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.onStop.bind(this)}
              >
                <Ionicons
                  name={"stop-sharp"}
                  size={height18 - 8}
                  margin={4}
                  color={colors.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.onRepeat.bind(this)}
              >
                <MaterialCommunityIcons
                  name={this.bIsRepeat ? "repeat" : "repeat-off"}
                  size={height18 - 8}
                  margin={4}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>

            <ActionBtn
              style={{ width: "62%" }}
              text={strMgr.getStr(strings.STR_CLOSE)}
              fullWidth={false}
              handler={this.handlePress.bind(this)}
              lang={this.props.strLang}
            />
          </View>
        </Animated.View>
      </Modal>
    );
  }
  getTitleTextStyle() {
    return [
      {
        textAlign: "center",
        color: "#0B721E",
        marginVertical: height / 200,
      },
      getLargeContentFontBasicStyle(this.props.strLang),
    ];
  }
}
const mapStateToProps = (state) => ({
  curRevision: state.curRevision,
  strLang: state.strLang,
});
const mapDispatchToProps = () => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps())(ModalPlayback);
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    width: 90,
    height: 90,
  },
  contentContainer: {
    width: "90%",
    height: "90%",
    alignSelf: "center",
    marginTop: "8%",
    marginBottom: 20,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-around",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  playBackBar: {
    flexDirection: "row-reverse",
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "space-around",
    width: "100%",
  },
});
