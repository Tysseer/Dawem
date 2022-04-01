import QuranPage from './QuranPage';
import QuranIndexer from './QuranIndexer';
import allLines from './quranLines';

export default class QuranReaderByLine {
  constructor(quranIndexer) {
    this.indexer = quranIndexer;
  }

  getPage(iPage) {
    iPage = this.indexer.secureIndexRange(iPage, this.indexer.getNumPages());
    let wordNum;
    [strt, end] = this.indexer.getLinesFromPage(iPage);
    var retPage = [];
    for (var i = strt; i <= end; i++) {
      let txt = '';
      var ayat = [];
      let allAyat = allLines[i].lineTxt.split(' ');
      allAyat.splice(0, 1);
      allAyat.splice(allAyat.length - 1, 1);
      allAyat.forEach((element, index) => {
        let x = element
          .split('')
          .filter(
            (i) =>
              i == '١' ||
              i == '٢' ||
              i == '٣' ||
              i == '٤' ||
              i == '٥' ||
              i == '٦' ||
              i == '٧' ||
              i == '٨' ||
              i == '٩'
          );
        if (x.length != 0) {
          ayat.push({
            txt: txt,
            num: element,
            words: txt.split(' '),
            surahIndex: allLines[i].surahIndx,
          });
          txt = '';
        } else if (index == allAyat.length - 1) {
          txt += element;
          ayat.push({
            txt: txt,
            words: txt.split(' '),
          });
        } else {
          txt += element + ' ';
        }
      });
      ayat.forEach((element) => {
        if (element.num) element.words.splice(element.words.length - 1, 1);
      });
      allLines[i]['allAyat'] = ayat;
      wordNum = 0;
      ayat.forEach((element) => {
        wordNum += element.words.length;
      });
      if (wordNum < 6) allLines[i]['shortTxt'] = true;
      retPage.push(allLines[i]);
    }
    return retPage;
    // return new QuranPage(iPage, retPage);
  }
}
