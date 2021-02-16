import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import QuranIndexer from "../helpers/QuranIndexer";
export default class ModalSurahSelector {
  constructor(parent /* should have state.bShowSurahSelector */) {
    this.parent = parent;
    this.surahInfo = new QuranIndexer();
    this.surahInfo.fillArrSurahNamesAr();
    this.surahInfo.fillArrSurahNumAyah();
    this.indexes = Array(114)
      .fill(0)
      .map((e, i) => i + 1);

    this.selSurah = 0;
  }
  handlePress() {
    this.parent.setState({ bShowSurahSelector: false });
    //console.log(this.parent);
  }

  getModal() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.parent.state.bShowSurahSelector}
        onRequestClose={() => {}}
      >
        <View style={styles.contentContainer}>
          <ScrollView>
            <View style={styles.buttonsContainer}>
              {this.indexes.map((iS) => this.getSurahBtn(iS))}
            </View>
          </ScrollView>

          <View style={styles.toolbar}>
            <TouchableHighlight
              onPress={this.handleNext.bind(this)}
              underlayColor="#FFFFFF11"
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.handlePrev.bind(this)}
              underlayColor="#FFFFFF11"
            >
              <Text style={styles.buttonText}>Prev</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.handlePress.bind(this)}
              underlayColor="#FFFFFF11"
            >
              <Text style={styles.buttonText}>Select</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
  getSurahBtn(iSurah) {
    return (
      <View style={{ margin: 10 }} key={iSurah + 123}>
        <TouchableHighlight
          onPress={() => this.selectSurah.bind(this)(iSurah)}
          underlayColor="#FFFFFF11"
        >
          <Text style={styles.buttonText}>
            {this.surahInfo.getSurahNameAr(iSurah)}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
  selectSurah(iSurah) {
    console.log("selected surah " + iSurah);
    this.selSurah = iSurah;
    this.parent.setState({ bShowSurahSelector: true }); // just to render
  }
  handleNext() {}
  handlePrev() {}
}
const styles = StyleSheet.create({
  contentContainer: {
    width: "80%",
    height: "80%",
    alignSelf: "center",
    marginTop: 110,
    marginBottom: 20,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFFd5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    alignContent: "center",
    flexWrap: "wrap",
  },

  buttonText: {
    width: 80,
    borderWidth: 1,
    borderColor: "#6B2504",
    backgroundColor: "#6B2504",
    fontSize: 20,
    fontFamily: "sans-serif",
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
