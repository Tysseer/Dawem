import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  ScrollView,
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
import { Audio } from "expo-av";
class Track {
  constructor(
    id = 0,
    ayaInfo = {},
    url = "unkown",
    title = "unkown",
    album = "unkown"
  ) {
    this.id = id;
    this.ayaInfo = ayaInfo;
    this.url = url;
    this.title = title;
    this.album = album;
  }
}
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
    this.currentAyahProgress = 0;
    this.fillAyahText();
    this.state = {
      animatedValue: new Animated.Value(0),
      bRefresh: false,
    };

    this.tracks = this.constructTracks();
    this.animTimer = Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      //console.log("finished anim, ready to play");
      this._loadNewPlaybackInstance(false);
    });
    this.ayahStyle = getTitleFontBasicStyle("ar");
    this.ayahStyle.lineHeight += 14;
    this.ayahNumLines = 2;
    this.currentAyahScroll = 0;
    this.numberStyle = getLargeContentFontBasicStyle("ar");
    this.titleStyle = this.getTitleTextStyle();
    this.scrollView = React.createRef();
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
      let track = new Track(
        (id = i),
        (ayaInfo = ayaInfo),
        (url = baseURL + trackname),
        (title = title),
        (album = this.revision.title)
      );
      ret.push(track);
    }

    return ret;
  }
  fillAyahText() {
    // this.currentAyahProgress
    this.ayahText = allAyat[this.currentAyah].text;
    this.ayahNumber = this.formatAyahNumber();
  }
  handlePress() {
    this.state.animatedValue = new Animated.Value(0);
    this._unloadPlaybackInstance();
    this.props.setModalVisible(false);
  }
  _onPlaybackStatusUpdate(status) {
    if (status.isLoaded) {
      // this.setState({
      //   playbackInstancePosition: status.positionMillis,
      //   playbackInstanceDuration: status.durationMillis,
      //   shouldPlay: status.shouldPlay,
      //   isPlaying: status.isPlaying,
      //   isBuffering: status.isBuffering,
      //   rate: status.rate,
      //   muted: status.isMuted,
      //   volume: status.volume,
      //   loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
      //   shouldCorrectPitch: status.shouldCorrectPitch,
      // });
      if (status.didJustFinish && !status.isLooping) {
        this._advanceIndex(true);
        this._loadNewPlaybackInstance(true);
      } else if (this.ayahNumLines > 3) {
        let curProgress = parseInt(
          (100 * status.positionMillis) / status.durationMillis
        );
        if (curProgress - this.currentAyahProgress > 5) {
          this.currentAyahProgress = curProgress;
          // let scroll =
          //   (this.ayahNumLines - 1) *
          //   (curProgress / 100) *
          //   this.ayahStyle.lineHeight *
          //   0.35;
          let lineEstimate = Math.floor(
            this.ayahNumLines * (curProgress / 100)
          );
          this.currentAyahScroll = this.ayahStyle.lineHeight * lineEstimate;
          this.scrollView.scrollTo({
            x: 0,
            y: this.currentAyahScroll,
            animated: true,
          });
        }
      }
    } else {
      if (status.error) {
        alert("FATAL PLAYER ERROR:" + status.error);
      }
    }
  }
  async _unloadPlaybackInstance() {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      // this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }
  }
  async _loadNewPlaybackInstance(bDoPlay) {
    await this._unloadPlaybackInstance();
    this.fillAyahText();
    const source = {
      uri: this.tracks[this.currentAyah - this.revision.strt].url,
    };
    const initialStatus = {
      shouldPlay: bDoPlay,
      rate: 1,
      shouldCorrectPitch: true,
      isMuted: false,
      isLooping: false,
      // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
      // androidImplementation: 'MediaPlayer',
    };

    const { sound, status } = await Audio.Sound.createAsync(
      source,
      initialStatus,
      this._onPlaybackStatusUpdate.bind(this),
      true
    );
    this.playbackInstance = sound;
    this.refresh();
  }
  _advanceIndex(forward) {
    if (forward) this.currentAyah += 1;
    else this.currentAyah -= 1;
    if (this.currentAyah > this.revision.end)
      if (this.bIsRepeat) this.currentAyah = this.revision.strt;
      else {
        this.currentAyah = this.revision.end;
        onStop();
      }
    if (this.currentAyah < this.revision.strt)
      if (this.bIsRepeat) this.currentAyah = this.revision.end;
      else {
        this.currentAyah = this.revision.strt;
        onStop();
      }
  }

  refresh() {
    this.setState({
      bRefresh: !this.state.bRefresh,
    });
  }
  onPlay() {
    if (this.playbackInstance != null) {
      if (this.bIsPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }

    this.bIsPlaying = !this.bIsPlaying;
    this.refresh();
  }

  onStop() {
    this.bIsPlaying = false;
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync();
    }
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
  onAyahTextLayout(e) {
    //console.log("num lines " + e.nativeEvent.lines.length);
    this.ayahNumLines = e.nativeEvent.lines.length;
    this.refresh();
  }
  render() {
    var strMgr = new StringsManager();
    strMgr.setLanguage(this.props.strLang);
    //console.log(this.ayahNumLines);
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
            <ScrollView
              style={{ flex: 1 }}
              ref={(ref) => (this.scrollView = ref)}
            >
              <Text
                numberOfLines={this.ayahNumLines}
                onTextLayout={this.onAyahTextLayout.bind(this)}
              >
                <Text style={this.ayahStyle}>{this.ayahText}</Text>
                <Text style={this.numberStyle}>{this.ayahNumber}</Text>
              </Text>
            </ScrollView>

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
    width: "95%",
    height: "90%",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
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
    marginBottom: 20,
  },
});
