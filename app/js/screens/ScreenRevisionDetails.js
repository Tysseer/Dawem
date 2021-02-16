import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Button,
  TextInput,
  Text,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Revision from "../helpers/Revision";
import ModalSurahSelector from "../modals/ModalSurahSelector";
import ModalAyahSelector from "../modals/ModalAyahSelector";
export default class ScreenRevisionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bShowSurahSelector: false,
      bShowAyahSelector: false,
      title: "",
    };
    this.modalSurah = new ModalSurahSelector(this);
    this.modalAyah = new ModalAyahSelector(this);
    this.revision = new Revision(0, "Enter name", 0, 1, 1, new Date());
    console.log("ScreenWelcome constructed");
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
          {this.getRevisionTitle()}
          {this.getStartAyah()}
          {this.getEndAyah()}
        </View>
        <View style={styles.okButton}>
          <TouchableWithoutFeedback onPress={this.okButtonPressed.bind(this)}>
            <Image
              source={require("../../assets/icons/ok_icon.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    );
  }
  okButtonPressed() {
    // add new or update revision here
    this.props.navigation.navigate("ScrList");
  }
  onTitleChange(text) {
    console.log("new text " + text);
    this.setState({ title: text });
  }
  onTitleSubmit(text) {
    console.log("new text " + text);
    this.revision.title = this.state.title;
  }
  getRevisionTitle() {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.revisionTitle}>Title</Text>
        <TextInput
          style={{
            flex: 0.75,
            borderBottomWidth: 1,
            borderBottomColor: "white",
          }}
          onChangeText={this.onTitleChange.bind(this)}
          value={this.state.title}
          onSubmitEditing={this.onTitleSubmit.bind(this)}
        />
      </View>
    );
  }
  getStartEndAyah(bIsStart) {
    return (
      <View style={{ alignSelf: "flex-start", margin: 10, width: "90%" }}>
        <View
          style={{
            width: "50%",
            backgroundColor: "#FFFFFF4D",
            borderTopRightRadius: 5,
          }}
        >
          <Text style={styles.startEndTitle}>
            {bIsStart ? "Starting Ayah" : "Ending Ayah"}
          </Text>
        </View>
        {this.getAyahSelector()}
      </View>
    );
  }
  getStartAyah() {
    return this.getStartEndAyah(true);
  }
  getEndAyah() {
    return this.getStartEndAyah(false);
  }
  getAyahSelector() {
    return (
      <View style={styles.ayahContainer}>
        <View>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <View style={{ margin: 10 }}>
              <TouchableHighlight
                onPress={this.selectSurah.bind(this)}
                underlayColor="#FFFFFF11"
              >
                <Text style={styles.buttonText}>
                  {this.modalSurah.getSelSurahName()}
                </Text>
              </TouchableHighlight>
            </View>
            <View style={{ margin: 10 }}>
              <TouchableHighlight
                onPress={this.selectAyah.bind(this)}
                underlayColor="#FFFFFF11"
              >
                <Text style={styles.buttonText}>Select Ayah</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={{ flexDirection: "row", width: "100%" }}></View>
        </View>
      </View>
    );
  }
  selectSurah() {
    this.setState({ bShowSurahSelector: true });
  }
  selectAyah() {
    this.setState({ bShowAyahSelector: true });
  }
}
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
    borderTopRightRadius: 5,

    width: "100%",
    padding: 8,
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
