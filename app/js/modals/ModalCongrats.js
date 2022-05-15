import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  StatusBar,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types";
import SVGLoader from "../helpers/SVGLoader.js";
import StringsManager, * as strings from "../helpers/StringsManager";
const { height, width } = Dimensions.get("window");
import ActionBtn from "app/components/ActionBtn";
import {
  getTitleFontBasicStyle,
  getLargeContentFontBasicStyle,
} from "../helpers/scripts";
export default class ModalCongrats extends Component {
  static propTypes = {
    strLang: PropTypes.string.isRequired,
    badgeImg: PropTypes.any.isRequired,
    badgeMsg: PropTypes.number.isRequired,
    setModalVisible: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0),
    };

    this.animTimer = Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
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
            height: "37%",
            width: "93%",
            paddingHorizontal: 5,
            borderRadius: 12,
            backgroundColor: "#dddddd",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <View style={styles.contentContainer}>
            <TouchableWithoutFeedback onPress={this.handlePress.bind(this)}>
              <Image style={styles.badge} source={this.props.badgeImg}></Image>
            </TouchableWithoutFeedback>
            <Text style={this.getCongratsTextStyle()}>
              {strMgr.getStr(this.props.badgeMsg)}
            </Text>

            <ActionBtn
              style={{ width: "62%" }}
              text={strMgr.getStr(strings.STR_ALHAMDULELLAH)}
              fullWidth={false}
              handler={this.handlePress.bind(this)}
              lang={this.props.strLang}
            />
          </View>
        </Animated.View>
      </Modal>
    );
  }
  getCongratsTextStyle() {
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
});
