import MiscUtilities from "./MiscUtilities";

class QuranQueryDictionary {
  constructor() {
    this.arabicDictionary = [];
    this.englishDictionary = []; //includes translitration
  }
  fillDictionary(quranIndexer, tokenTypes) {
    this.fillDictionaryAr(quranIndexer, tokenTypes);
    this.fillDictionaryEn(quranIndexer, tokenTypes);
  }
  lookup(strNormalized) {
    if (/[a-z]/.test(strNormalized)) {
      if (this.englishDictionary.length == 0)
        return { bIsFound: false, err: "Empty dictionary" };
      let nMinDist = 1000,
        iMinDistIndx = -1;
      for (var i = 0; i < this.englishDictionary.length; i++) {
        let dist = MiscUtilities.computeLevenshteinDist(
          strNormalized,
          this.englishDictionary[i].key
        );
        if (dist < nMinDist) {
          iMinDistIndx = i;
          nMinDist = dist;
          if (dist == 0) break; // exact match
        }
      }
      if (iMinDistIndx == -1)
        return { bIsFound: false, err: "Word too far from all entries" };
      return {
        bIsFound: true,
        dist: nMinDist,
        distR: nMinDist / this.englishDictionary[iMinDistIndx].key.length,
        type: this.englishDictionary[iMinDistIndx].type,
        val: this.englishDictionary[iMinDistIndx].val,
      };
    } else {
      if (this.arabicDictionary.length == 0)
        return { bIsFound: false, err: "Empty dictionary" };
      let nMinDist = 1000,
        iMinDistIndx = -1;
      for (var i = 0; i < this.arabicDictionary.length; i++) {
        let dist = MiscUtilities.computeLevenshteinDist(
          strNormalized,
          this.arabicDictionary[i].key
        );
        if (dist < nMinDist) {
          iMinDistIndx = i;
          nMinDist = dist;
          if (dist == 0) break; // exact match
        }
      }
      if (iMinDistIndx == -1)
        return { bIsFound: false, err: "Word too far from all entries" };
      return {
        bIsFound: true,
        dist: nMinDist,
        distR: nMinDist / this.arabicDictionary[iMinDistIndx].key.length,
        type: this.arabicDictionary[iMinDistIndx].type,
        val: this.arabicDictionary[iMinDistIndx].val,
      };
    }
  }
  fillDictionaryAr(quranIndexer, tokenTypes) {
    this.fillConstantEntriesAr(tokenTypes);
    this.fillSurahNamesAr(quranIndexer, tokenTypes);
    this.fillJuzuuNamesAr(quranIndexer, tokenTypes);
  }
  fillDictionaryEn(quranIndexer, tokenTypes) {
    this.fillConstantEntriesEn(tokenTypes);
    this.fillSurahNamesEn(quranIndexer, tokenTypes);
    this.fillJuzuuNamesEn(quranIndexer, tokenTypes);
  }
  fillConstantEntriesEn(tokenTypes) {
    this.englishDictionary.push({
      key: "the",
      val: "the",
      type: tokenTypes.ignore,
    });

    this.englishDictionary.push({
      key: "page",
      val: "page",
      type: tokenTypes.pageWord,
    });
    this.englishDictionary.push({
      key: "from",
      val: "from",
      type: tokenTypes.fromWord,
    });
    this.englishDictionary.push({
      key: "start",
      val: "from",
      type: tokenTypes.fromWord,
    });
    this.englishDictionary.push({
      key: "to",
      val: "to",
      type: tokenTypes.toWord,
    });
    this.englishDictionary.push({
      key: "verse",
      val: "ayah",
      type: tokenTypes.ayahWord,
    });
    this.englishDictionary.push({
      key: "ayah",
      val: "ayah",
      type: tokenTypes.ayahWord,
    });
    this.englishDictionary.push({
      key: "aya",
      val: "ayah",
      type: tokenTypes.ayahWord,
    });
    this.englishDictionary.push({
      key: "ayat",
      val: "ayah",
      type: tokenTypes.ayahWord,
    });
    this.englishDictionary.push({
      key: "ayatu",
      val: "ayah",
      type: tokenTypes.ayahWord,
    });
    this.englishDictionary.push({
      key: "chapter",
      val: "surah",
      type: tokenTypes.surahWord,
    });
    this.englishDictionary.push({
      key: "surah",
      val: "surah",
      type: tokenTypes.surahWord,
    });
    this.englishDictionary.push({
      key: "sura",
      val: "surah",
      type: tokenTypes.surahWord,
    });
    this.englishDictionary.push({
      key: "surat",
      val: "surah",
      type: tokenTypes.surahWord,
    });
    this.englishDictionary.push({
      key: "suratu",
      val: "surah",
      type: tokenTypes.surahWord,
    });
    this.englishDictionary.push({
      key: "juzu",
      val: "juzuu",
      type: tokenTypes.juzuuWord,
    });
    this.englishDictionary.push({
      key: "juzuu",
      val: "juzuu",
      type: tokenTypes.juzuuWord,
    });
    this.englishDictionary.push({
      key: "part",
      val: "juzuu",
      type: tokenTypes.juzuuWord,
    });
    this.englishDictionary.push({
      key: "last",
      val: "end",
      type: tokenTypes.endWord,
    });
    this.englishDictionary.push({
      key: "finish",
      val: "end",
      type: tokenTypes.endWord,
    });
    this.englishDictionary.push({
      key: "end",
      val: "end",
      type: tokenTypes.endWord,
    });
  }
  fillConstantEntriesAr(tokenTypes) {
    this.arabicDictionary.push({
      key: "من",
      val: "from",
      type: tokenTypes.fromWord,
    });
    this.arabicDictionary.push({
      key: "بدايه",
      val: "from",
      type: tokenTypes.fromWord,
    });
    this.arabicDictionary.push({
      key: "بدء",
      val: "from",
      type: tokenTypes.fromWord,
    });
    this.arabicDictionary.push({
      key: "ابدا",
      val: "from",
      type: tokenTypes.fromWord,
    });

    this.arabicDictionary.push({
      key: "الي",
      val: "to",
      type: tokenTypes.toWord,
    });
    this.arabicDictionary.push({
      key: "حتي",
      val: "to",
      type: tokenTypes.toWord,
    });
    this.arabicDictionary.push({
      key: "ل",
      val: "to",
      type: tokenTypes.toWord,
    });

    this.arabicDictionary.push({
      key: "نهايه",
      val: "end",
      type: tokenTypes.endWord,
    });
    this.arabicDictionary.push({
      key: "للنهايه",
      val: "end",
      type: tokenTypes.endWord,
    });
    this.arabicDictionary.push({
      key: "اخره",
      val: "end",
      type: tokenTypes.endWord,
    });
    this.arabicDictionary.push({
      key: "اخرها",
      val: "end",
      type: tokenTypes.endWord,
    });
    this.arabicDictionary.push({
      key: "نهايته",
      val: "end",
      type: tokenTypes.endWord,
    });
    this.arabicDictionary.push({
      key: "نهايتها",
      val: "end",
      type: tokenTypes.endWord,
    });
    this.arabicDictionary.push({
      key: "للاخر",
      val: "end",
      type: tokenTypes.endWord,
    });
    this.arabicDictionary.push({
      key: "لاخره",
      val: "end",
      type: tokenTypes.endWord,
    });
    this.arabicDictionary.push({
      key: "لاخرها",
      val: "end",
      type: tokenTypes.endWord,
    });

    this.arabicDictionary.push({
      key: "صفحه",
      val: "page",
      type: tokenTypes.pageWord,
    });
    this.arabicDictionary.push({
      key: "سوره",
      val: "surah",
      type: tokenTypes.surahWord,
    });
    this.arabicDictionary.push({
      key: "جزء",
      val: "juzuu",
      type: tokenTypes.juzuuWord,
    });
    this.arabicDictionary.push({
      key: "ايه",
      val: "ayah",
      type: tokenTypes.ayahWord,
    });
  }
  fillJuzuuNamesAr(quranIndexer, tokenTypes) {
    if (quranIndexer.arrJuzuuNamesAr_normalized.length == 0)
      quranIndexer.fillArrJuzuuNamesAr_normalized();
    for (var i = 1; i <= 30; i++) {
      let numNames = quranIndexer.arrJuzuuNamesAr_normalized[i].length;
      for (var j = 0; j < numNames; j++) {
        this.arabicDictionary.push({
          key: quranIndexer.arrJuzuuNamesAr_normalized[i][j],
          val: i,
          type: tokenTypes.juzuuID,
        });
      }
    }
  }
  fillJuzuuNamesEn(quranIndexer, tokenTypes) {
    if (quranIndexer.arrJuzuuNamesEn_normalized.length == 0)
      quranIndexer.fillArrJuzuuNamesEn_normalized();
    for (var i = 1; i <= 30; i++) {
      let numNames = quranIndexer.arrJuzuuNamesEn_normalized[i].length;
      for (var j = 0; j < numNames; j++) {
        this.englishDictionary.push({
          key: quranIndexer.arrJuzuuNamesEn_normalized[i][j],
          val: i,
          type: tokenTypes.juzuuID,
        });
      }
      if (quranIndexer.arrJuzuuNamesTrns_normalized.length == 0)
        quranIndexer.fillArrJuzuuNamesTrns_normalized();
      numNames = quranIndexer.arrJuzuuNamesTrns_normalized[i].length;
      for (var j = 0; j < numNames; j++) {
        this.englishDictionary.push({
          key: quranIndexer.arrJuzuuNamesTrns_normalized[i][j],
          val: i,
          type: tokenTypes.juzuuID,
        });
      }
    }
  }
  fillSurahNamesAr(quranIndexer, tokenTypes) {
    if (quranIndexer.arrSurahNamesAr_normalized.length == 0)
      quranIndexer.fillArrSurahNamesAr_normalized();
    for (var i = 1; i <= 114; i++) {
      this.arabicDictionary.push({
        key: quranIndexer.arrSurahNamesAr_normalized[i],
        val: i,
        type: tokenTypes.surahID,
      });
    }
  }
  fillSurahNamesEn(quranIndexer, tokenTypes) {
    if (quranIndexer.arrSurahNamesEn_normalized.length == 0)
      quranIndexer.fillArrSurahNamesEn_normalized();
    if (quranIndexer.arrSurahNamesTrns_normalized.length == 0)
      quranIndexer.fillArrSurahNamesTrns_normalized();
    for (var i = 1; i <= 114; i++) {
      this.englishDictionary.push({
        key: quranIndexer.arrSurahNamesEn_normalized[i],
        val: i,
        type: tokenTypes.surahID,
      });
      this.englishDictionary.push({
        key: quranIndexer.arrSurahNamesTrns_normalized[i],
        val: i,
        type: tokenTypes.surahID,
      });
    }
  }
}
export default QuranQueryDictionary;
