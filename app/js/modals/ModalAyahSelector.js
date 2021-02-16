import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableHighlight,
  TextInput,
  Dimensions,
} from "react-native";
import QuranIndexer from "../helpers/QuranIndexer";
export default class ModalAyahSelector {
  constructor(parent /* should have state.bShowAyahSelector */) {
    this.parent = parent;
    this.surahInfo = new QuranIndexer();

    this.selAyah = 1;
    this.ayahRange = 1;
  }
  handlePress() {
    this.parent.setState({ bShowAyahSelector: false });
    //console.log(this.parent);
  }

  getModal() {
    if (this.parent.state.bShowAyahSelector == false) return null;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.parent.state.bShowAyahSelector}
        onRequestClose={() => {
          console.log("onRequestClose");
        }}
        onDismiss={() => {
          console.log("onDismiss");
        }}
      >
        <View style={styles.contentContainer}>
          <View style={styles.selectorsContainer}>
            <View>
              <TextInput
                style={{
                  flex: 0.3,
                  borderBottomWidth: 5,
                  borderBottomColor: "grey",
                  textAlign: "center",
                }}
                keyboardType="numeric"
                onChangeText={this.onNumberChange.bind(this)}
                value={"" + this.selAyah}
                onSubmitEditing={this.onNumberSubmit.bind(this)}
              />
              <Text style={{ flex: 0.6 }}></Text>
            </View>
          </View>
          <View style={styles.toolbar}>
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
  onNumberChange(text) {
    console.log("new text " + text);
    this.setState({ title: text });
  }
  onNumberSubmit(text) {
    console.log("new text " + text);
    this.revision.title = this.state.title;
  }
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
  selectorsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    flexWrap: "wrap",
    direction: "rtl",
    margin: 5,
    padding: 5,
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
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 5,
  },
});
