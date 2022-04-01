import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Screen from 'app/components/Screen';
import QuranReaderByLine from 'app/js/helpers/QuranReaderByLine';
import SurahHeader from 'assets/svg/SurahHeader';
import SVGLoader from '../helpers/SVGLoader';
import { Fragment } from 'react';
import { useRoute } from '@react-navigation/native';

import QuranIndexer from '../helpers/QuranIndexer';
import { convertToArabicNumbers } from '../helpers/scripts';
import Center from '../../components/Center';

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

const MushafScreen = () => {
  const route = useRoute();
  const { ayahIndex, longPressHandler } = route.params;
  var quranIndexer = new QuranIndexer();
  // quranIndexer.f;

  const onAyahLongPress = (iAyah /*local */, iSurah) => {
    console.log('dsfsd');
    var engNum = convertToArabicNumbers(iAyah, 'ltr');
    console.log('here ' + iAyah + ' ' + engNum + ' ' + iSurah);
    var globalAyah = quranIndexer.getAyahGlobalIndx(iSurah, +engNum);
    longPressHandler(globalAyah);
  };

  const quranReader = new QuranReaderByLine(quranIndexer);
  const svgLoader = new SVGLoader();

  var pagenum = quranIndexer.getPageFromAyah(ayahIndex);

  // todo: highlight
  //  var curSurah = quranIndexer.getSurahFromAyah(ayahIndex);
  const { localSurahIdx, localAyahIdx } =
    quranIndexer.getAyahLocalIndx(ayahIndex);

  const getNumBg = (num, idx) => {
    if (
      convertToArabicNumbers(num, 'ltr') == localAyahIdx &&
      idx == localSurahIdx
    )
      return '#ff0';
  };

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
                    ...styles.ayah,
                    color: coloredList.includes(word) && 'red',
                  }}
                >
                  {word.trim()}
                </Text>
              );
            })}
          {ayah.num && (
            <Center
              style={{
                paddingHorizontal: 4,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onLongPress={() => onAyahLongPress(ayah.num, ayah.surahIndex)}
                style={{
                  backgroundColor: getNumBg(ayah.num, ayah.surahIndex),
                }}
              >
                {svgLoader.getSurahNumBorder(ayah.num, 26)}
              </TouchableOpacity>
            </Center>
          )}
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
    </View>
  );

  const renderPageContent = () => {
    return quranReader.getPage(pagenum)?.map((page) => {
      switch (page.type) {
        case 'Basmalah':
          return Basmalah();

        case 'Surah':
          return renderSurahHeader(page.lineTxt);

        case 'Ayah':
          if ([1, 2].includes(pagenum)) {
            return renderSpecialSurah(page.allAyat);
          } else {
            return (
              <View
                key={Math.random().toString()}
                style={{
                  flexDirection: 'row',
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
        justifyContent: ![1, 2].includes(pagenum) ? 'space-between' : 'center',
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
  ayah: {
    fontSize: width * 0.043,
    flexGrow: 1,
    textAlign: 'center',
    fontFamily: 'UthmanicHafs',
  },
});
