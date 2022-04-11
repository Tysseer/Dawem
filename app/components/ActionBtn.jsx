import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { colors } from "../constants";
import { getFontBasicStyle } from "../js/helpers/scripts";
import Center from "./Center";
const { height, width } = Dimensions.get("window");

const ActionBtn = ({
  text,
  icon = false,
  handler,
  lang,
  contained = false,
  disabled = false,
  fullWidth = false,
  bold = true,
  style,
  ...rest
}) => {
  const extraStyle = {
    //borderStyle: contained ? 'solid' : 'none',
    borderWidth: contained ? 1 : 0,
    backgroundColor: disabled
      ? colors.primary_disabled
      : contained
      ? colors.light_bg
      : colors.primary,
    width: fullWidth ? "100%" : "48%",
  };

  const extraTextStyle = {
    color: contained ? "#B0B0B0" : "#fff",
    alignSelf:  "center" ,
    padding:3
   // alignSelf: fullWidth ? "center" : "flex-start",
    // flexDirection: 'row',
    // alignSelf: fullWidth ? 'center' : 'flex-start',
    // textAlign: fullWidth ? 'center' : 'left',
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handler}
      style={{ ...styles.btn, ...extraStyle, ...style }}
      {...rest}
    >
      <Center style={{ flexDirection: "row" }}>
        {icon && <Feather name="plus" size={24} color="#fff" />}

        <Text
          numberOfLines={1}
          style={{
            ...styles.text,
            ...getFontBasicStyle(lang, bold),
            ...extraTextStyle,
          }}
        >
          {text}
        </Text>
      </Center>
    </TouchableOpacity>
  );
};

export default ActionBtn;

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: height / 18,
    backgroundColor: colors.primary,
    borderRadius: 10,
    borderColor: colors.primary,
  },
  text: {
    color: "#fff",
    marginHorizontal: 7,
    alignSelf:"center"
    // width: '100%',
  },
});
