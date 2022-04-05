import React from "react";
import { View } from "react-native";

export default function Center({ children, style }) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {children}
    </View>
  );
}
