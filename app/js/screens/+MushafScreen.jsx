import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import MyPager from 'app/components/MyPager';

import Screen from 'app/components/Screen';
import QuranReaderByLine from 'app/js/helpers/QuranReaderByLine';
import SurahHeader from 'assets/svg/SurahHeader';
import SVGLoader from '../helpers/SVGLoader';
import { Fragment } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import QuranIndexer from '../helpers/QuranIndexer';
import { convertToArabicNumbers } from '../helpers/scripts';
import Center from '../../components/Center';
import Swiper from '../../components/Swiper';
import { useSelector } from 'react-redux';
import Sandbox from '../../components/Sandbox';

const { width, height } = Dimensions.get('window');
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
  // prevent screen form sleeping
  useKeepAwake();

  const route = useRoute();

  const [localSurahIndx, setLocalSurahIdx] = useState();
  const [localAyahIndx, setLocalAyahIdx] = useState();
  const [pageNum, setPageNum] = useState();
  const [pageContent, setPageContent] = useState();
  const [markedAyah, setMarkedAyah] = useState();

  const { ayahIndex } = route.params;

  var quranIndexer = new QuranIndexer();
  // quranIndexer.f;
  const reduxState = useSelector((state) => state);

  const onAyahLongPress = (iAyah /*local */, iSurah) => {
    if (iSurah == localSurahIndx) {
      var engNum = convertToArabicNumbers(iAyah, 'ltr');
      setMarkedAyah(engNum);
      // console.log('here ' + iAyah + ' ' + engNum + ' ' + iSurah.surahIndex);
      // console.log('localSurahIndx', localSurahIndx);
      var globalAyah = quranIndexer.getAyahGlobalIndx(iSurah, +engNum);
      handleRevProgress(globalAyah);
      // longPressHandler(globalAyah);
    }
  };

  const quranReader = new QuranReaderByLine(quranIndexer);
  const svgLoader = new SVGLoader();

  // todo: highlight
  //  var curSurah = quranIndexer.getSurahFromAyah(ayahIndex);

  const getNumBg = (num, idx) => {
    if (
      convertToArabicNumbers(num, 'ltr') == markedAyah &&
      // convertToArabicNumbers(num, 'ltr') == localAyahIndx &&
      idx == localSurahIndx
    )
      return '#ff0';
  };


  const renderSurahHeader = (name) => (
    <View
      // source={require('assets/images/SurahHeader.png')}
      key={Math.random().toString()}
      style={{
        position: 'relative',
        marginVertical: 10,
        width: '100%',
        height: height * 0.05,
      }}
    >
      <View style={styles.surahHeader}>
        <Text style={{ fontFamily: 'Amiri_Bold', fontSize: width * 0.04 }}>
          {name}
        </Text>
      </View>
      <Image
        source={require('assets/images/SurahHeader.png')}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
        }}
      />

      {/* <SurahHeader /> */}
    </View>
  );

  const Basmalah = () => (
    <Text
      key={Math.random().toString()}
      style={{
        fontSize: width * 0.04,
        textAlign: 'center',
        fontFamily: 'UthmanicHafs',
        // fontSize: 20,
      }}
    >
      بسم الله الرحمن الرحيم
    </Text>
  );

  const newRenderAyat = (ayat, shortTxt) =>
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
                    flexGrow: !shortTxt ? 1 : 0,
                    paddingHorizontal: shortTxt && 4,
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
                disabled={ayah.surahIndex !== localSurahIndx}
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

  const swipeableRef = useRef();
  const onswipeLeft = () => {
    swipeableRef.current.close();
    setPageNum(pageNum + 1);
  };
  const onswipeRight = () => {
    swipeableRef.current.close();
    setPageNum(pageNum - 1);
  };

  const renderDummy = () => (
    <View
      style={{
        width: 5,
        margin: 0,
        padding: 0,
        height: '100%',
      }}
    />
  );

  const renderPageContent = () => {
    return pageContent?.map((page) => {
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
                  alignItems: 'center',
                  justifyContent: page.shortTxt && 'center',
                }}
              >
                {newRenderAyat(page.allAyat, page.shortTxt)}
              </View>
            );
          }

        default:
          return <Text>error</Text>;
      }
    });
  };

  const RightActions = (progress, dragX, children) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0],
    });

    return <Animated.View>{children}</Animated.View>;
  };

  const LeftActions = (progress, dragX, children) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return <Animated.View>{children}</Animated.View>;
  };

  useFocusEffect(
    useCallback(() => {
      const { localSurahIndx, localAyahIndx } =
        quranIndexer.getAyahLocalIndx(ayahIndex);

      setLocalSurahIdx(localSurahIndx);
      setLocalAyahIdx(localAyahIndx);
      setMarkedAyah(localAyahIndx);

      const pageNum = quranIndexer.getPageFromAyah(ayahIndex);
      setPageNum(pageNum);
    }, [ayahIndex, route.params])
  );

  useEffect(() => {
    const content = quranReader.getPage(pageNum);
    setPageContent(content);
  }, [pageNum]);

  return (
    <Screen style={{ padding: 10 }}>
      {/* <Swiper /> */}
      {/* <Sandbox /> */}
      <MyPager />
      {/* <Swipeable
      renderLeftActions={LeftActions} renderRightActions={RightActions}
        // renderLeftActions={renderDummy}
        // renderRightActions={renderDummy}
        // onSwipeableLeftOpen={onswipeLeft}
        // onSwipeableRightOpen={onswipeRight}
        // leftThreshold={35}
        // rightThreshold={35}
        // ref={swipeableRef}
      >
        <View
          style={{
            height: '99%',
            justifyContent: ![1, 2].includes(pageNum)
              ? 'space-between'
              : 'center',
          }}
        >
          {renderPageContent()}
        </View>
      </Swipeable> */}
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
