import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Animated,
  FlatList,
  Fragment,
} from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import MyPager from 'app/components/MyPager';

import Screen from 'app/components/Screen';
import QuranReaderByLine from 'app/js/helpers/QuranReaderByLine';
import SVGLoader from 'app/js/helpers/SVGLoader';
import {} from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';

import QuranIndexer from 'app/js/helpers/QuranIndexer';
import { convertToArabicNumbers } from 'app/js/helpers/scripts';
import Center from 'app/components/Center';
import Swiper from 'app/components/Swiper';
import { useSelector } from 'react-redux';
import Sandbox from 'app/components/Sandbox';
import SurahHeader from './SurahHeader';
import RenderAyat from './RenderAyat';
// import SwipeableMushaf from './SwipeableMushaf';

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

const PagerView = () => {
  // prevent screen form sleeping
  useKeepAwake();

  const route = useRoute();

  const [localSurahIdx, setLocalSurahIdx] = useState();
  const [localAyahIdx, setLocalAyahIdx] = useState();
  const [pageNum, setPageNum] = useState();
  const [pageContent, setPageContent] = useState([]);
  const [multiPageContent, setMultiPageContent] = useState([]);
  const [markedAyah, setMarkedAyah] = useState();

  // --------
  const [mushafPages, setMushafPages] = useState([]);

  const { ayahIndex } = route.params;

  var quranIndexer = new QuranIndexer();
  const reduxState = useSelector((state) => state);

  const onAyahLongPress = (iAyah /*local */, iSurah) => {
    if (iSurah == localSurahIdx) {
      var engNum = convertToArabicNumbers(iAyah, 'ltr');
      setMarkedAyah(engNum);
      var globalAyah = quranIndexer.getAyahGlobalIndx(iSurah, +engNum);
      handleRevProgress(globalAyah);
    }
  };

  const quranReader = new QuranReaderByLine(quranIndexer);
  const svgLoader = new SVGLoader();

  // todo: highlight
  //  var curSurah = quranIndexer.getSurahFromAyah(ayahIndex);

  const getNumBg = (num, idx) => {
    if (
      convertToArabicNumbers(num, 'ltr') == markedAyah &&
      // convertToArabicNumbers(num, 'ltr') == localAyahIdx &&
      idx == localSurahIdx
    )
      return '#ff0';
  };



  const Basmalah = () => (
    <Text key={Math.random().toString()} style={styles.basmalah}>
      بسم الله الرحمن الرحيم
    </Text>
  );

  const renderSpecialSurah = (ayat, shortTxt) => (
    <View
      key={Math.random().toString()}
      style={{ flexDirection: 'row', justifyContent: 'center' }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RenderAyat
          ayat={ayat}
          shortTxt={shortTxt}
          localSurahIdx={localSurahIdx}
        />
        {/* {newRenderAyat(ayat)} */}
      </View>
    </View>
  );

  const renderItem = ({ item: page }) => {
    switch (page.type) {
      case 'Basmalah':
        return Basmalah();

      case 'Surah':
        return <SurahHeader name={page.lineTxt} />;

      case 'Ayah':
        if ([1, 2].includes(pageNum)) {
          return renderSpecialSurah(page.allAyat, page.shortTxt);
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
              <RenderAyat
                ayat={page.allAyat}
                shortTxt={page.shortTxt}
                localSurahIdx={localSurahIdx}
              />
              {/* {newRenderAyat(page.allAyat, page.shortTxt)} */}
            </View>
          );
        }

      default:
        return <Text>error</Text>;
    }
  };

  const renderPageContent = (pageContent, pageNum) => (
    <FlatList
      keyExtractor={() => Math.random().toString()}
      data={pageContent}
      renderItem={renderItem}
      // ListFooterComponent={() => (
      //   <Center style={{ marginTop: 20 }}>
      //     <Text>{pageNum}</Text>
      //   </Center>
      // )}
      contentContainerStyle={{
        height: '99%',
        width: '100%',
        // backgroundColor: 'red',
        // justifyContent: 'space-between',
        justifyContent: ![1, 2].includes(pageNum) ? 'space-between' : 'center',
      }}
    />
  );

  useFocusEffect(
    useCallback(() => {
      const { localSurahIdx, localAyahIdx } =
        quranIndexer.getAyahLocalIndx(ayahIndex);

      setLocalSurahIdx(localSurahIdx);
      setLocalAyahIdx(localAyahIdx);
      setMarkedAyah(localAyahIdx);

      const pageNum = quranIndexer.getPageFromAyah(ayahIndex);
      setPageNum(pageNum);

      // get
    }, [ayahIndex, route.params])
  );

  // const renderPagerContent = (page, idx) => {
  //   const content = quranReader.getPage(page);
  //   setPageContent(content);

  //   return <View key={idx}>{renderPageContent()}</View>;
  // };

  useEffect(() => {
    // check if mushafPages => start filling
    // check pages count after curr page
    // console.log('got here 11');
    if (!mushafPages?.length) {
      // console.log('got here');
      const currPageNum = pageNum - 5;
      let leftSide = [];
      let rightSide = [];
      let temp = [];

      for (let page = currPageNum; page <= currPageNum + 10; page++) {
        if (page <= 0) leftSide.push(page);
        else rightSide.push(page);
        !mushafPages.includes(page) && temp.push(page);
      }
      console.log(temp);
      setMushafPages(temp);
    }
    // else {
    //   if (mushafPages.length - 1 - mushafPages.indexOf(pageNum) < 5) {
    //     console.log('fill right');
    //   } else if (mushafPages.indexOf(pageNum) < 5) {
    //     console.log('fill left');
    //   } else {
    //     ('dont fill');
    //   }
    // }
  }, [pageNum]);

  useEffect(() => {
    if (mushafPages?.length == 11) {
      // console.log('mushafPages', mushafPages);
      let contentArr = [];
      for (const page of mushafPages) {
        // console.log(page);
        const content = quranReader.getPage(page);
        contentArr.push({
          page,
          content,
          pageNum: page > 0 ? page : 604 + page,
        });
        // setMultiPageContent((prev) => [
        //   ...prev,
        //   { page, content, pageNum: page > 0 ? page : 604 + page },
        // ]);
      }

      setMultiPageContent(contentArr);
    }
  }, [mushafPages]);

  const handlePageChange = (position) => {
    if (mushafPages.indexOf(pageNum) !== position) {
      console.log('change');
      setPageNum(mushafPages[position]);
    }
  };

  return (
    <Screen style={{ padding: 10 }}>
      {multiPageContent?.length == 11 ? (
        <MyPager
          initialPage={mushafPages.indexOf(pageNum)}
          handlePageChange={handlePageChange}
        >
          {multiPageContent.map((page) => (
            <View key={Math.random().toString()} style={{ height: '100%' }}>
              {renderPageContent(page.content, page.pageNum)}
            </View>
          ))}
        </MyPager>
      ) : (
        <Image
          source={require('assets/splash.png')}
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        />
      )}
    </Screen>
  );
};

export default PagerView;

const styles = StyleSheet.create({
  basmalah: {
    fontSize: width * 0.04,
    textAlign: 'center',
    fontFamily: 'UthmanicHafs',
  },
  ayah: {
    fontSize: width * 0.043,
    flexGrow: 1,
    textAlign: 'center',
    fontFamily: 'UthmanicHafs',
  },
});
