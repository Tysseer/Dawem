import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, FlatList } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';

import Screen from 'app/components/Screen';
import QuranReaderByLine from 'app/js/helpers/QuranReaderByLine';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import QuranIndexer from 'app/js/helpers/QuranIndexer';
import Center from 'app/components/Center';
import SurahHeader from './SurahHeader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RenderAyat from './RenderAyat';

const { width,height } = Dimensions.get('window');

const SwipeableMushaf = () => {
  const route = useRoute();
  const swipeableRef = useRef();

  const [localSurahIdx, setLocalSurahIdx] = useState();
  const [localAyahIdx, setLocalAyahIdx] = useState();
  const [pageNum, setPageNum] = useState();
  const [pageContent, setPageContent] = useState();

  const { ayahIndex,bIsAr } = route.params;

  var quranIndexer = new QuranIndexer();

  const quranReader = new QuranReaderByLine(quranIndexer);

  const Basmalah = () => (
    <Text key={Math.random().toString()} style={styles.basmalah}>
      بسم الله الرحمن الرحيم
    </Text>
  );

  const renderSpecialSurah = (ayat, shortTxt) => (
    <View
      key={Math.random().toString()}
      style={{ flexDirection:bIsAr? 'row':'row-reverse', justifyContent: 'center' }}
    >
      <View style={{ flexDirection: bIsAr? 'row':'row-reverse', alignItems: 'center' }}>
        <RenderAyat
          ayat={ayat}
          shortTxt={shortTxt}
          localSurahIdx={localSurahIdx}
          localAyahIdx={localAyahIdx}
        />
      </View>
    </View>
  );

  const onswipeLeft = () => {
    swipeableRef.current.close();
    setPageNum(pageNum == 604 ? 1 : pageNum + 1);
  };

  const onswipeRight = () => {
    swipeableRef.current.close();
    setPageNum(pageNum - 1);
  };

  const renderItem = ({ item: page }) => {
    switch (page.type) {
      case 'Basmalah':
        return Basmalah();

      case 'Surah':
        return (
          <SurahHeader name={page.lineTxt} key={Math.random().toString()} />
        );

      case 'Ayah':
        if ([1, 2].includes(pageNum)) {
          return renderSpecialSurah(page.allAyat);
        } else {
          return (
            <View
              key={Math.random().toString()}
              style={{
                flexDirection:bIsAr? 'row':'row-reverse',
                alignItems: 'center',
                justifyContent: page.shortTxt && 'center',
                flexWrap :"wrap"
              }}
            >
              <RenderAyat
                ayat={page.allAyat}
                shortTxt={page.shortTxt}
                localSurahIdx={localSurahIdx}
                localAyahIdx={localAyahIdx}
              />
            </View>
          );
        }

      default:
        return <Text>error</Text>;
    }
  };

  const renderPageContent = () => (
    <FlatList
      keyExtractor={() => Math.random().toString()}
      data={pageContent}
      renderItem={renderItem}
      ListFooterComponent={() => (
        <Center style={{ marginTop: 10 }}>
          <Text>{pageNum}</Text>
        </Center>
      )}
      contentContainerStyle={{
        height: '100%',
        width: '100%',
        justifyContent: ![1, 2].includes(pageNum) ? 'space-between' : 'center',
      }}
    />
  );

  const transitionPage = () => <View style={styles.transitionPage} />;

  useFocusEffect(
    useCallback(() => {
      const { localSurahIdx, localAyahIdx } =
        quranIndexer.getAyahLocalIndx(ayahIndex);

      setLocalSurahIdx(localSurahIdx);
      setLocalAyahIdx(localAyahIdx);
      // setMarkedAyah(localAyahIdx);

      const pageNum = quranIndexer.getPageFromAyah(ayahIndex);
      setPageNum(pageNum);
    }, [ayahIndex, route.params])
  );

  useEffect(() => {
    const content = quranReader.getPage(pageNum);
    setPageContent(content);
  }, [pageNum]);

  return (
    <Screen style={{ paddingBottom: 2,paddingTop:8,paddingHorizontal:4 }}>
      {/* <Sandbox /> */}

      <GestureHandlerRootView>
        <Swipeable
          renderLeftActions={transitionPage}
          renderRightActions={transitionPage}
          onSwipeableLeftOpen={onswipeLeft}
          onSwipeableRightOpen={onswipeRight}
          ref={swipeableRef}
        >
          {renderPageContent()}
        </Swipeable>
      </GestureHandlerRootView>
    </Screen>
  );
};

export default SwipeableMushaf;

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
  basmalah: {
    fontSize: width * 0.04,
    textAlign: 'center',
    fontFamily: 'UthmanicHafs',
  },
  transitionPage: {
    width: '100%',
    margin: 0,
    padding: 0,
    height: '100%',
  },
});
