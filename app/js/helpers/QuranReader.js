import Ayah from "./Ayah";
import QuranPage from "./QuranPage";
import QuranIndexer from "./QuranIndexer";
import allAyat from "./quranAyat";
export default class QuranReader {
  constructor() {
    this.indexer = new QuranIndexer();
  }

  getPage(iPage) {
    iPage = this.indexer.secureIndexRange(iPage, this.indexer.getNumPages());

    [strt, end] = this.indexer.getPageAyahRange(iPage);

    var retPage = [];
    for (var i = strt; i <= end; i++) {
      if (allAyat[i].index == 1) {
        retPage.push(
          new Ayah(
            7000 + allAyat[i].surah,
            allAyat[i].surah,
            this.indexer.getSurahNameAr(allAyat[i].surah)
          )
        ); //surah name
        if (allAyat[i].surah != 1 && allAyat[i].surah != 9) {
          // add basmalah
          retPage.push(
            new Ayah(
              8000 + allAyat[i].surah,
              allAyat[i].surah,
              "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"
            )
          );
        }
      }
      retPage.push(new Ayah(i, allAyat[i].index, allAyat[i].text));
    }
    return new QuranPage(iPage, retPage);
  }
}
