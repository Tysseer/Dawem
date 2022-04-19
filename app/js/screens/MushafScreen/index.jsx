import React from "react";
import { Dimensions, ScrollView, StyleSheet, View, Image } from "react-native";
import { useKeepAwake } from "expo-keep-awake";

import Screen from "app/components/Screen";

import SwipeableMushaf from "./comp/SwipeableMushaf";
import PagerView from "./comp/PagerView";

export const assets = [
  require("assets/temp/1.jpg"),
  require("assets/temp/3.jpg"),
  require("assets/temp/5.jpg"),
  require("assets/temp/4.jpg"),
  require("assets/temp/2.jpg"),
];

const { width, height } = Dimensions.get("window");
const MushafScreen = () => {
  // prevent screen form sleeping
  useKeepAwake();

  // const TestSwip = () => (
  //   <View style={styles.container}>
  //     <ScrollView snapToInterval={width} decelerationRate="fast" horizontal>
  //       {assets.map((source) => (
  //         <View key={source} style={styles.picture}>
  //           <Image style={styles.image} {...{ source }} />
  //         </View>
  //       ))}
  //     </ScrollView>
  //   </View>
  // );

  return (
    <Screen style={{ padding: 10}}>
      {/* <TestSwip /> */}
      <SwipeableMushaf />
      {/* <PagerView /> */}
    </Screen>
  );
};

export default MushafScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'red',
  },
  pictures: {
    width: width * assets.length,
    height,
    flexDirection: "row",
  },
  picture: {
    width,
    height,
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});
