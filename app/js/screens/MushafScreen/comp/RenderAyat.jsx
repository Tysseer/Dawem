import React, { Fragment, memo, useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import {UPDATE_REVISION} from "app/js/redux/reduxActions";

import Center from 'app/components/Center';
import SVGLoader from 'app/js/helpers/SVGLoader';
import { convertToArabicNumbers } from 'app/js/helpers/scripts';
import QuranIndexer from 'app/js/helpers/QuranIndexer';

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

const { width,height } = Dimensions.get('window');
const quranFont = (width-30)*0.045;//Math.max(10,width*0.054);
const quranLineHeight = quranFont*1.82;
const ayaNumSize = quranFont*1.3;//Math.max(22,height/26);
const RenderAyat = ({ ayat, shortTxt, localSurahIndx, localAyahIndx }) => {
  const svgLoader = new SVGLoader();
  const [markedAyah, setMarkedAyah] = useState();

  var quranIndexer = new QuranIndexer();
  // quranIndexer.f;
  const reduxState = useSelector((state) => state);
  const dispatch = useDispatch();
 
  const getNumBg = (num, idx) => {
    if (
      convertToArabicNumbers(num, 'ltr') == markedAyah &&
      idx == localSurahIndx
    )
      return '#ff0';
  };

  const onAyahLongPress = (iAyah /*local */, iSurah) => {
    if (iSurah == localSurahIndx) {
      var engNum = convertToArabicNumbers(iAyah, 'ltr');
      setMarkedAyah(engNum);
      var globalAyah = quranIndexer.getAyahGlobalIndx(iSurah, +engNum);
      handleRevProgress(globalAyah);
    }
  };

  const handleRevProgress = (iAyah) => {
    if(reduxState.curRevision==null) return;
    reduxState.curRevision.updateProgress(iAyah);
    if (reduxState.curRevision.progress >= 100) {
      reduxState.curRevision.makeRevisionDateNow();
     // reduxState.revisionsManager.sortRevisions();
    }

    const updateRev = state => dispatch({ type: UPDATE_REVISION, payload:   state.curRevision});
    updateRev(reduxState);
  };

  const renderContent = () =>
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
                    paddingHorizontal: shortTxt && 3,
                  }}
                >
                  {word.trim()}
                </Text>
              );
            })}
          {ayah.num && (
            <Center
              style={{
                paddingHorizontal: 2,
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
                
                {svgLoader.getSurahNumBorder(ayah.num, ayaNumSize)}
               
              </TouchableOpacity>
            </Center>
          )}
        </Fragment>
      );
    });

  useEffect(() => {
    setMarkedAyah(localAyahIndx);
  }, [localAyahIndx]);

  return renderContent();
};

export default memo(RenderAyat);

const styles = StyleSheet.create({
  ayah: {
    fontSize: quranFont,
    lineHeight:quranLineHeight,
    flexGrow: 1,
    textAlign: 'center',
    fontFamily: 'UthmanicHafs',
  },
});
