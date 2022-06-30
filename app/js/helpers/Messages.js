import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "app/constants";

export class User {
  constructor(
    id = 0,
    name = "unkown",
    avatar = require("../../assets/images/unkown_avatar.png")
  ) {
    this._id = id;
    this.name = name;
    this.avatar = avatar;
  }
}
export class Message {
  constructor(id = 0, user = new User()) {
    this._id = id;

    //this.createdAt = new Date();
    this.user = user;
  }
  getRender(screen) {
    let backClr = {
      backgroundColor: this.user._id % 2 ? "#DDFFDD" : "#FFFFFF",
    };
    return (
      <View
        key={this._id + 1000}
        style={[
          styles.messageBox,
          { flexDirection: this.user._id % 2 ? "row" : "row-reverse" },
        ]}
      >
        <Image style={styles.avatar} source={this.user.avatar}></Image>
        <View style={[styles.msgContents, backClr]}>
          {this.renderContent(screen)}
        </View>
      </View>
    );
  }
  renderContent(screen) {
    return <></>;
  }
}
export class TextMessage extends Message {
  constructor(id = 0, user = new User(), msg = "empty") {
    super(id, user);
    this.text = msg;
  }
  renderContent(screen) {
    return <Text style={screen.getMessageStyle()}>{this.text} </Text>;
  }
}
export class ButtonsMessage extends Message {
  constructor(
    id = 0,
    user = new User(),
    buttons = [
      { label: "Yes", onClick: () => {} },
      { label: "No", onClick: () => {} },
    ]
  ) {
    super(id, user);
    this.buttons = buttons;
  }

  renderContent(screen) {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {this.buttons.map((btn) => this.getRenderBtn(btn, screen))}
      </View>
    );
  }
  getRenderBtn(btn, screen) {
    return (
      <View
        key={Math.random()}
        style={{ backgroundColor: "#EEEEFF", margin: 5 }}
      >
        <TouchableOpacity onPress={btn.onClick}>
          <Text
            style={[
              screen.getMessageStyle(),
              {
                backgroundColor: "#EEE",
                borderRadius: 7,
                borderColor: colors.primary,
                borderWidth: 1,
              },
            ]}
          >
            {btn.label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  messageBox: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    paddingHorizontal: 10,
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
    borderRadius: 6,
    margin: 10,
  },
});
