import React, { useCallback, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Screen from "app/components/Screen";
import QuranReaderByLine from "app/js/helpers/QuranReaderByLine";
import { colors } from "../../constants";
import SurahHeader from "../../assets/svg/SurahHeader";
import Doaa from "assets/svg/Doaa";
import allQuranLines from "../helpers/quranLines";
import SVGLoader from "../helpers/SVGLoader";
import Center from "../../components/Center";
import TestComp from "app/components/TestComp";
import AdjustLabel from "../../components/Adjustable";

const { width } = Dimensions.get("window");
const MushafScreen = () => {
  const quranReader = new QuranReaderByLine();
  const svgLoader = new SVGLoader();

  // {JSON.stringify(QuranReaderByLine)}

  const renderSurahHeader = (name) => (
    <View
      key={Math.random().toString()}
      style={{ position: "relative", marginVertical: 20 }}
    >
      <View style={styles.surahHeader}>
        <Text style={{}}>{name}</Text>
      </View>
      <SurahHeader />
    </View>
  );

  const Basmalah = () => (
    <Text
      key={Math.random().toString()}
      // style={{ textAlign: "center", marginBottom: 10 }}
      style={{
        // backgroundColor: "#ff0",
        fontSize: width * 0.043,
        // flexGrow: 1,
        textAlign: "center",
        // textAlign: "justify",
        // letterSpacing: 3.3,
      }}
    >
      بسم الله الرحمن الرحيم
    </Text>
  );

  const renderAyat2 = (ayat) => (
    <Text
      style={{
        backgroundColor: "green",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {ayat.map((ayah) => (
        <Text
          key={Math.random().toString()}
          style={{
            textAlign: "left",
            // alignSelf: 'stretch',
            backgroundColor: "#ff0",
            // justifyContent: 'center',
            width: "100%",
          }}
        >
          {ayah.txt}
          {/* <Text>{ayah.txt}</Text> */}
          {ayah.num && (
            <Text
              style={{
                width: 50,
                backgroundColor: "red",
                textAlign: "center",
              }}
            >
              {ayah.num}
            </Text>
          )}
        </Text>
      ))}
    </Text>
  );

  const renderAyat = (ayat) =>
    ayat.map((ayah) => {
      return (
        <View
          key={Math.random().toString()}
          style={{
            flexDirection: "row",
            backgroundColor: "#f0f",

            // alignSelf: 'baseline',
            // width: '100%',
            // flexGrow: 1,
          }}
        >
          {/* {<AdjustLabel text={ayah.txt} numberOfLines={1} fontSize={21} />} */}
          <Text
            style={{
              backgroundColor: "#ff0",
              fontSize: width * 0.04,
              flexGrow: 1,
              // textAlign: 'left',
              textAlign: "justify",
              letterSpacing: 3.3,
            }}
            // allowFontScaling={true}
            // minimumFontScale={2.2}
            adjustsFontSizeToFit={true}
          >
            {ayah.txt}
          </Text>
          {/* {ayah.num && (
            <Center
              style={{
                width: 30,
                backgroundColor: 'red',
                flexGrow: 1,
              }}
            >
              {svgLoader.getSurahNumBorder(ayah.num, 26)}
  
            </Center>
          )} */}
        </View>
      );
    });

  const newRenderAyat = (ayat) =>
    ayat.map((ayah) => {
      return (
        <>
          {/* {<AdjustLabel text={ayah.txt} numberOfLines={1} fontSize={21} />} */}
          {ayah.words.length > 0 &&
            ayah.words.map((word, index) => {
              return (
                <>
                  <Text
                    style={{
                      // backgroundColor: "#ff0",
                      fontSize: width * 0.043,
                      flexGrow: 1,
                      textAlign: "center",
                      // textAlign: "justify",
                      // letterSpacing: 3.3,
                    }}
                    // allowFontScaling={true}
                    // minimumFontScale={2.2}
                    // adjustsFontSizeToFit={true}
                  >
                    {word}
                  </Text>
                  {/* {index + 1 != ayah.words.length && (
                    <Text
                      style={{
                        // backgroundColor: "#ff0",
                        fontSize: width * 0.09,
                        // flexGrow: 1,
                        // textAlign: 'left',
                        // textAlign: "justify",
                        // letterSpacing: 3.3,
                      }}
                      // allowFontScaling={true}
                      // minimumFontScale={2.2}
                      adjustsFontSizeToFit={true}
                    >
                      {" "}
                    </Text>
                  )} */}
                </>
              );
            })}
          {ayah.num && (
            <Center
              style={{
                width: 30,
                // backgroundColor: "red",
                flexGrow: 1,
              }}
            >
              {svgLoader.getSurahNumBorder(ayah.num, 26)}
            </Center>
          )}
        </>
      );
    });

  const renderPart = () => {
    // console.log('123');
    const replaceNum = (chars) => {
      const numbers = ["۰", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

      for (let i = 0; i < chars.length; i++) {
        if (numbers.includes(chars[i])) {
          console.log(chars[i]);
          chars[i] = <Doaa />;
        }
      }

      return chars;
    };
    let string = "";
    allQuranLines.slice(16, 31).map((line) => (string += line.lineTxt));

    // const newStr = replaceNum(string);
    let x = string.replace("٦", "SS");

    string = string.replace("٦", <Doaa />);

    return <Text style={{ fontSize: 17 }}>{string}</Text>;
  };

  const renderPageContent = () => {
    return quranReader.getPage(106)?.map((page) => {
      switch (page.type) {
        case "Basmalah":
          return Basmalah();

        case "Surah":
          return renderSurahHeader(page.lineTxt);

        case "Ayah":
          // return (
          //   <View
          //     style={{
          //       flexDirection: 'row',
          //       justifyContent: 'center',
          //       backgroundColor: 'blue',
          //     }}
          //   >
          //     {renderAyat2(page.allAyat)}
          //   </View>
          // );

          // return (
          //   <View
          //     key={Math.random().toString()}
          //     style={{
          //       flexDirection: 'row',
          //       // justifyContent: 'flex-start',
          //       // width: '100%',
          //       backgroundColor: 'green',
          //     }}
          //   >
          //     {renderAyat(page.allAyat)}
          //   </View>
          // );
          return (
            <View
              key={Math.random().toString()}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // alignContent: "center",
                alignItems: "center",
                // width: '100%',
                // backgroundColor: "green",
                // height: 40,
              }}
            >
              {newRenderAyat(page.allAyat)}
            </View>
          );

        default:
          return <Text>error</Text>;
      }
    });
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     console.log('MushafScreen', quranReader.getPage(160)[0]);
  //   }, [pageNum])
  // );

  return (
    <Screen style={{ height: "100%", justifyContent: "space-between" }}>
      {/* {renderPart()} */}
      {renderPageContent()}
      {/* <TestComp /> */}
    </Screen>
  );
};

export default MushafScreen;

const styles = StyleSheet.create({
  surahHeader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});
