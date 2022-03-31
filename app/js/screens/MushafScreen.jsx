import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import Screen from 'app/components/Screen';
import QuranReaderByLine from 'app/js/helpers/QuranReaderByLine';
import SurahHeader from 'assets/svg/SurahHeader';
import allQuranLines from '../helpers/quranLines';
import SVGLoader from '../helpers/SVGLoader';
import Center from 'app/components/Center';
import { Fragment } from 'react';

const { width } = Dimensions.get('window');
const coloredList = [
  // 'رَبَّكُمُ',
  'ٱللَّهَ',
  'لِلَّهِ',
  'ٱللَّهِ',
  'ٱللَّهُ',
  // 'بِٱللَّهِ',
  // 'رَبُّكَ',
  'ٱللَّهَ',
];

const pageNum = 5;
const MushafScreen = () => {
  const quranReader = new QuranReaderByLine();
  const svgLoader = new SVGLoader();

  // {JSON.stringify(QuranReaderByLine)}

  const renderSurahHeader = (name) => (
    <View
      key={Math.random().toString()}
      style={{ position: 'relative', marginVertical: 20 }}
    >
      <View style={styles.surahHeader}>
        <Text style={{ fontFamily: 'Amiri_Bold', fontSize: 20 }}>{name}</Text>
      </View>
      <SurahHeader />
    </View>
  );

  const Basmalah = () => (
    <Text
      key={Math.random().toString()}
      style={{
        fontSize: width * 0.043,
        textAlign: 'center',
        fontFamily: 'UthmanicHafs',
        fontSize: 20,
      }}
    >
      بسم الله الرحمن الرحيم
    </Text>
  );

  const newRenderAyat = (ayat) =>
    ayat.map((ayah) => {
      return (
        <Fragment key={Math.random().toString()}>
          {ayah.words.length > 0 &&
            ayah.words.map((word) => {
              return (
                <Text
                  key={Math.random().toString()}
                  style={{
                    fontSize: width * 0.043,
                    flexGrow: 1,
                    textAlign: 'center',
                    color: coloredList.includes(word) && 'red',
                    fontFamily: 'UthmanicHafs',
                    borderColor: 'red',
                    borderWidth: 1,
                    // fontFamily: 'noorehidayat',
                    // fontSize: 'Quraan',
                    // fontFamily: 'QuranSurah2',
                    // fontFamily: 'Amiri_Bold',
                  }}
                >
                  {word.trim()}
                </Text>
              );
            })}
          {ayah.num && svgLoader.getSurahNumBorder(ayah.num, 26)}
        </Fragment>
      );
    });

  const renderSpecialSurah = (ayat) => (
    <View
      key={Math.random().toString()}
      style={{ flexDirection: 'row', justifyContent: 'center' }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {newRenderAyat(ayat)}
      </View>
      {/* {ayat.map((ayah) => {
        return (
          <View
            key={Math.random().toString()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {ayah.words.length > 0 &&
              ayah.words.map((word) => {
                return (
                  <Text
                    key={Math.random().toString()}
                    style={{
                      fontSize: width * 0.05,
                      flexGrow: 1,
                      textAlign: 'center',
                      color: coloredList.includes(word) && 'red',
                      fontFamily: 'UthmanicHafs',
                    }}
                  >
                    {word}
                  </Text>
                );
              })}
            {ayah.num && (
              <Center
                style={{
                  width: 30,
                }}
              >
                {svgLoader.getSurahNumBorder(ayah.num, 26)}
              </Center>
            )}
          </View>
        );
      })} */}
    </View>
  );

  // const renderSpecialSurah = (ayat) => (
  //   <View
  //     key={Math.random().toString()}
  //     style={{
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       flexDirection: 'row',
  //     }}
  //   >
  //     {ayat.map((ayah) => (
  //       <View style={{ flexDirection: 'row' }} key={Math.random().toString()}>
  //         <Text
  //           style={{
  //             fontSize: width * 0.043,
  //             flexGrow: 1,
  //             textAlign: 'center',
  //             // color: ayah.txt.indexOf(word) && 'red',
  //             fontFamily: 'UthmanicHafs',
  //             backgroundColor: 'red',
  //           }}
  //         >
  //           {ayah.txt}
  //         </Text>
  //         {ayah.num && (
  //           <Center
  //             style={{
  //               width: 30,
  //               flexGrow: 1,
  //             }}
  //           >
  //             {svgLoader.getSurahNumBorder(ayah.num, 26)}
  //           </Center>
  //         )}
  //       </View>
  //     ))}
  //   </View>
  // );

  const renderPageContent = () => {
    return quranReader.getPage(pageNum)?.map((page) => {
      switch (page.type) {
        case 'Basmalah':
          return Basmalah();

        case 'Surah':
          return renderSurahHeader(page.lineTxt);

        case 'Ayah':
          if ([1, 2].includes(pageNum)) {
            return renderSpecialSurah(page.allAyat);
          } else {
            return (
              <View
                key={Math.random().toString()}
                style={{
                  flexDirection: 'row',
                  // justifyContent: ![1, 2].includes(pageNum)
                  //   ? 'space-between'
                  //   : 'center',
                  alignItems: 'center',
                }}
              >
                {newRenderAyat(page.allAyat)}
              </View>
            );
          }

        default:
          return <Text>error</Text>;
      }
    });
  };

  return (
    <Screen
      style={{
        height: '100%',
        justifyContent: ![1, 2].includes(pageNum) ? 'space-between' : 'center',
      }}
    >
      {renderPageContent()}
    </Screen>
  );
};

export default MushafScreen;

const styles = StyleSheet.create({
  surahHeader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
