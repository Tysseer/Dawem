import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableHighlight,
  ScrollView,
  Dimensions,
} from "react-native";
import Center from "../../components/Center";
import { colors } from "../../constants";
import QuranIndexer from "../helpers/QuranIndexer";
import SVGLoader from "../helpers/SVGLoader";
const { width } = Dimensions.get("window");
export default class ModalSurahSelector {
  constructor(parent /* should have .bShowSurahSelector and .refresh()*/) {
    this.parent = parent;
    this.surahInfo = new QuranIndexer();
    this.bIsAr = this.parent.stringsManager.getLanguage() == "ar";
    if (this.bIsAr) {
      this.surahInfo.fillArrSurahNamesAr();
    } else {
      this.surahInfo.fillArrSurahNamesEnTrns();
    }
    this.indexes = Array(114)
      .fill(0)
      .map((e, i) => i + 1);

    this.selSurah = 0;
    this.onSelect = null;
    this.onCancel = null;
  }
  handlePress() {
    //this.parent.setState({ bShowSurahSelector: false });
    if (this.onSelect != null) this.onSelect(this.selSurah);
    this.parent.bShowSurahSelector = false;
    this.parent.refresh();
  }
  handleCancel() {
    //this.parent.setState({ bShowSurahSelector: false });
    if (this.onCancel != null) this.onCancel();
    this.parent.bShowSurahSelector = false;
    this.parent.refresh();
  }
  getModal() {
    if (this.parent.bShowSurahSelector == false) return null;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.parent.bShowSurahSelector}
        onRequestClose={this.handlePress.bind(this)}
        onDismiss={this.handlePress.bind(this)}
      >
        <Center style={styles.contentContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.modalView}
          >
            <View style={styles.selectorsContainer}>
              {/* {this.indexes.map((iS, index) => this.getSurahBtn(iS, index))} */}
              {(this.bIsAr
                ? this.surahInfo.arrSurahNamesAr
                : this.surahInfo.arrSurahNamesEnTrns
              ).map((iS, index) => this.getSurahBtn(iS, index))}
            </View>
          </ScrollView>
        </Center>
      </Modal>
    );
  }
  renderSurahName(item) {
    if (this.bIsAr) {
      return <Text style={{ paddingHorizontal: 5 }}>{item}</Text>;
    } else {
      return (
        <Text numberOfLines={1} style={{ paddingHorizontal: 5, flex: 1 }}>
          {item}
        </Text>
      );
    }
  }
  getSurahBtn(item, index) {
    // var bordercol =
    //   item == this.selSurah
    //     ? { borderColor: '#540000' }
    //     : { borderColor: '#545454' };

    var svgLoader = new SVGLoader();
    var numBorder = svgLoader.getSurahNumBorder(index);

    if (index != 0)
      return (
        <View key={Math.random().toString()}>
          <TouchableHighlight
            onPress={() => this.selectSurah.bind(this)(index)}
            underlayColor="#FFFFFF11"
            style={{ width: "100%" }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-start",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {numBorder}

                {this.renderSurahName(item)}
              </View>

              {/* icon */}
              <View
                style={{
                  height: 14,
                  width: 14,
                  borderRadius: 7,
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: "#818181",
                  backgroundColor:
                    this.selSurah == index ? colors.primary : null,
                }}
              />
            </View>
          </TouchableHighlight>
          {/* {index + 1 < this.indexes.length && ( */}
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "rgba(187, 196, 206, 0.35)",
              marginVertical: 15,
            }}
          />
          {/* )} */}
        </View>
      );
  }
  selectSurah(iSurah) {
    this.selSurah = iSurah;
    this.parent.refresh(); //this.parent.setState({ bShowSurahSelector: true }); // just to render
    this.handlePress();
  }
  getSelSurahName() {
    if (this.selSurah == 0) return "Select Surah";
    else
      return this.bIsAr
        ? this.surahInfo.arrSurahNamesAr[this.selSurah]
        : this.surahInfo.arrSurahNamesEnTrns[this.selSurah];
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    width,
    paddingTop: 40,
    flex: 1,
    backgroundColor: "rgba(0,0,0,.6)",
  },
  modalView: {
    borderRadius: 30,
    backgroundColor: "white",
    // padding: 20,
    width: width * 0.95,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  selectorsContainer: {
    margin: "10%",
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
  },
  okButton: {
    alignSelf: "center",
    width: 70,
    height: 70,
    marginTop: 30,
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 5,
  },
});
