import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  getTitleFontBasicStyle,
  getLargeContentFontBasicStyle,
  getContentFontBasicStyle,
} from "../helpers/scripts";
import { colors } from "app/constants";
import * as qstrings from "../helpers/QuranicAssistantStrings";
import QuranicAssistant from "../helpers/QuranicAssistant";
import * as msgs from "../helpers/Messages";
import Screen from "app/components/Screen";
import { reduxActionAddRevision } from "../redux/reduxActions";
import Revision from "../helpers/Revision";
const { height, width } = Dimensions.get("window");
const height18 = height / 18;
const height50 = height / 50;
class ActionMessage {
  constructor(scr, strAction) {
    this.screen = scr;
    this.strAction = strAction;
  }
  applyAction() {
    if (this.strAction == "EnableChat") this.screen.userChatEnabled = true;
    if (this.strAction == "DisableChat") this.screen.userChatEnabled = false;
  }
}
class ScreenQuranicAssistant extends Component {
  constructor(props) {
    super(props);

    this.getContentFontBasicStyle = getContentFontBasicStyle(
      this.props.strLang
    );
    this.getLargeContentFontBasicStyle = getLargeContentFontBasicStyle(
      this.props.strLang
    );
    this.userTxt = "";
    this.assistant = new QuranicAssistant();
    this.assistant.stringsManager.setLanguage(this.props.strLang);
    this.assistantUser = new msgs.User(
      1,
      this.assistant.stringsManager.getStr(qstrings.STR_ASSISTANT_NAME),
      require("../../assets/images/assistant_avatar.png")
    );
    this.humanUser = new msgs.User(
      2,
      this.assistant.stringsManager.getStr(qstrings.STR_USER_NAME),
      this.props.strLang == "ar"
        ? require("../../assets/images/user_avatar_ar.png")
        : require("../../assets/images/user_avatar_en.png")
    );
    this.state = {
      numMessages: 0,
    };
    this.messages = [];
    this.delayedMessages = [];
    this.delay = -1;
    this.assistant.intializeConversation(this);
    this.userChatEnabled = false;
    setTimeout(() => {
      this.showDelayedMessages();
    }, 700);
    this.delay = 1400;
  }
  messageReady(msg) {
    this.addDelayedMsg(msg);
  }
  addDelayedMsg(msg) {
    this.delayedMessages.push(msg);
    if (this.delayedMessages.length == 1) {
      if (this.delay > 0) {
        setTimeout(() => {
          this.showDelayedMessages();
        }, this.computeMsgDelay(msg));
      }
    }
  }

  computeMsgDelay(msg) {
    let len = msg.hasOwnProperty("text") ? msg.text.length : 0;
    return Math.max(this.delay, 20 * len);
  }
  showDelayedMessages() {
    if (this.delayedMessages.length == 0) return;
    let msg = this.delayedMessages.shift();
    this.onSend(msg);
    if (this.delayedMessages.length == 0) return;
    setTimeout(() => {
      this.showDelayedMessages();
    }, this.computeMsgDelay(msg));
  }
  refresh() {
    this.setState({
      numMessages: this.state.numMessages + 1, //bShow,
    });
  }
  onSend(message) {
    if (message instanceof ActionMessage) {
      message.applyAction();
    } else {
      this.messages.push(message);
    }
    this.refresh();
  }
  onUserTextChange(text) {
    var str = "";
    str = text;
    this.userTxt = str;

    this.refresh();
  }
  onUserMsg() {
    this.userChatEnabled = false;
    this.assistant.getResponse(-1, this.userTxt);
    this.refresh();
  }
  enableUserChat(bEnable) {
    if (bEnable) {
      this.userTxt = "";
      //this.flushAllMessages();
      this.messageReady(new ActionMessage(this, "EnableChat"));
    } else {
      this.messageReady(new ActionMessage(this, "DisableChat"));
    }
    //this.userChatEnabled = bEnable;
  }
  flushAllMessages() {
    let n = this.delayedMessages.length;
    while (this.delayedMessages.length > 0) {
      let msg = this.delayedMessages.shift();
      this.onSend(msg);
    }
    if (n == 0) this.refresh();
  }
  endConversation() {
    this.flushAllMessages();
    setTimeout(() => {
      this.props.navigation.navigate("ScrList");
    }, 1800);
  }
  render() {
    return (
      <Screen>
        <View style={styles.mainContainer}>
          <View style={styles.listContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              ref={(ref) => (this.scrollView = ref)}
              onContentSizeChange={() => {
                this.scrollView.scrollToEnd({ animated: false });
              }}
            >
              {this.messages.map((msg) => msg.getRender(this))}
            </ScrollView>

            {this.getUserChatBox()}
          </View>
        </View>
      </Screen>
    );
  }

  getMessageStyle() {
    return [
      {
        textAlign: "center",
        color: "#000000",
        paddingHorizontal: 10,
      },
      this.getLargeContentFontBasicStyle,
    ];
  }
  addNewRev(parseRes /*assumes all indexes converted to global */) {
    let revision = new Revision();
    revision.bIsNewRev = true;
    revision.title = parseRes.title;
    revision.strt = parseRes.strtAyah;
    revision.end = parseRes.endAyah;
    let realStrt = Math.min(revision.strt, revision.end);
    let realEnd = Math.max(revision.strt, revision.end);
    revision.strt = realStrt;
    revision.end = realEnd;
    this.props.reduxActionAddRevision(revision);
  }
  getUserChatBox() {
    if (this.userChatEnabled == false) return <></>;
    return (
      <View style={styles.sendMsgBar}>
        <TextInput
          style={{ ...styles.sendMsgInput, ...this.getContentFontBasicStyle }}
          onChangeText={this.onUserTextChange.bind(this)}
          value={this.userTxt}
          placeholder={this.assistant.stringsManager.getStr(
            qstrings.STR_ADD_YOUR_TXT
          )}
          onSubmitEditing={this.onUserMsg.bind(this)}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.onUserMsg.bind(this)}
        >
          <MaterialCommunityIcons
            name={"message-text-outline"}
            size={height18 - 8}
            margin={4}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  strLang: state.strLang,
});
const mapDispatchToProps = () => {
  return {
    reduxActionAddRevision,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(ScreenQuranicAssistant);
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#eeeeee",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  listContainer: {
    width: "100%",
    flex: 1,
    marginBottom: 20,
    justifyContent: "center",
  },
  avatar: {
    width: 50,
    height: 50,

    borderRadius: 30,
    borderColor: "#EEFFEE",
    borderWidth: 3,
  },
  msgContents: {
    flex: 1,
    borderRadius: 3,
    margin: 10,
  },
  sendMsgBar: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "space-between",
    width: "100%",
  },
  sendMsgInput: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    height: height18,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    fontSize: height50,
    color: colors.primary,
    backgroundColor: colors.light_bg,
  },
});
