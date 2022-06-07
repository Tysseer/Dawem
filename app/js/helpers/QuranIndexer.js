import MiscUtilities from "./MiscUtilities";
class QuranIndexer {
  constructor() {
    this.arrPageFirstAyah = []; // the global index of first ayah in each page
    this.arrSurahPage = []; // the page index for surah starting ayah
    this.arrSurahNamesAr = []; // the names in arabic
    this.arrSurahNamesEn = []; // the names in english
    this.arrSurahNamesTrns = []; // the names in transliteration
    this.arrSurahNamesAr_normalized = []; // the names in arabic
    this.arrSurahNamesEn_normalized = []; // the names in english
    this.arrSurahNamesTrns_normalized = []; // the names in transliteration
    this.arrSurahNamesEnTrns = []; // names in format:  english (trans)
    this.arrSurahNumAyah = []; // number of ayat for each surah
    this.arrSurahLength = []; // length of surah (ratio between 0,1) =number of letters per surah/number of all letters in quran
    this.arrSurahAyahStart = []; // the global index of first ayah in each surah
    this.arrJuzuuAyahStart = []; // the global index of first ayah in each Juzuu
    this.arrJuzuuNamesAr = [];
    this.arrJuzuuNamesAr_normalized = [];
    this.arrJuzuuNamesTrns = [];
    this.arrJuzuuNamesTrns_normalized = [];
    this.arrJuzuuNamesEn = [];
    this.arrJuzuuNamesEn_normalized = [];
  }
  isJuzuuName(text, bExact) {
    let prepTxt = MiscUtilities.normalizeString(text);
    if (/[a-z]/.test(prepTxt)) {
      prepTxt = MiscUtilities.removeThe(prepTxt);
      if (this.arrJuzuuNamesEn_normalized.length == 0)
        this.fillArrJuzuuNamesEn_normalized();
      var resEn = MiscUtilities.lookupStrIn2DArr(
        prepTxt,
        this.arrJuzuuNamesEn_normalized,
        bExact ? 0 : 4
      );
      if (resEn.dist == 0) return resEn.indx + 30;
      if (this.arrJuzuuNamesTrns_normalized.length == 0)
        this.fillArrJuzuuNamesTrns_normalized();
      var resTrns = MiscUtilities.lookupStrIn2DArr(
        prepTxt,
        this.arrJuzuuNamesTrns_normalized,
        bExact ? 0 : 4
      );
      if (resTrns.indx <= 0 && resEn.indx <= 0 - 1) return -1;
      if (resTrns.dist == 0) return resTrns.indx + 60;
      if (resEn.dist <= resTrns.dist) return resEn.indx + 30;
      return resTrns.indx + 60;
    } else {
      prepTxt = MiscUtilities.removeLeadingAlefLam(prepTxt);
      if (this.arrJuzuuNamesAr_normalized.length == 0)
        this.fillArrJuzuuNamesAr_normalized();
      var resAr = MiscUtilities.lookupStrIn2DArr(
        prepTxt,
        this.arrJuzuuNamesAr_normalized,
        bExact ? 0 : 4
      );
      if (resAr.indx <= 0) return -1;
      return resAr.indx;
    }
  }

  isSurahName(text, bExact) {
    let prepTxt = MiscUtilities.normalizeString(text);
    if (/[a-z]/.test(prepTxt)) {
      prepTxt = MiscUtilities.removeThe(prepTxt);
      if (this.arrSurahNamesEn_normalized.length == 0)
        this.fillArrSurahNamesEn_normalized();
      var resEn = MiscUtilities.lookupStrIn2DArr(
        prepTxt,
        this.arrSurahNamesEn_normalized,
        bExact ? 0 : 4
      );
      if (resEn.dist == 0) return resEn.indx + 114;
      if (this.arrSurahNamesTrns_normalized.length == 0)
        this.fillArrSurahNamesTrns_normalized();
      var resTrns = MiscUtilities.lookupStrInArr(
        prepTxt,
        this.arrSurahNamesTrns_normalized,
        bExact ? 0 : 4
      );
      if (resTrns.indx <= 0 && resEn.indx <= 0) return -1;
      if (resTrns.dist == 0) return resTrns.indx + 228;
      if (resEn.dist <= resTrns.dist) return resEn.indx + 114;
      return resTrns.indx + 228;
    } else {
      prepTxt = MiscUtilities.removeLeadingAlefLam(prepTxt);
      if (this.arrSurahNamesAr_normalized.length == 0)
        this.fillArrSurahNamesAr_normalized();
      var resAr = MiscUtilities.lookupStrInArr(
        prepTxt,
        this.arrSurahNamesAr_normalized,
        bExact ? 0 : 4
      );
      if (resAr.indx <= 0) return -1;
      return resAr.indx;
    }
  }
  getSurahNameAr(iSurah /*one-based */) {
    iSurah = this.secureIndexRange(iSurah, 114);
    if (this.arrSurahNamesAr.length == 0) this.fillArrSurahNamesAr();
    return this.arrSurahNamesAr[iSurah];
  }
  getSurahNameEn(iSurah /*one-based */) {
    iSurah = this.secureIndexRange(iSurah, 114);
    if (this.arrSurahNamesEn.length == 0) this.fillArrSurahNamesEn();
    return this.arrSurahNamesEn[iSurah];
  }
  getSurahNameEnTrns(iSurah /*one-based */) {
    iSurah = this.secureIndexRange(iSurah, 114);
    if (this.arrSurahNamesEnTrns.length == 0) this.fillArrSurahNamesEnTrns();
    return this.arrSurahNamesEnTrns[iSurah];
  }
  getSurahNameTrns(iSurah /*one-based */) {
    iSurah = this.secureIndexRange(iSurah, 114);
    if (this.arrSurahNamesTrns.length == 0) this.fillArrSurahNamesTrns();
    return this.arrSurahNamesTrns[iSurah];
  }
  getSurahNumAyah(iSurah /*one-based */) {
    iSurah = this.secureIndexRange(iSurah, 114);
    if (this.arrSurahNumAyah.length == 0) this.fillArrSurahNumAyah();
    return this.arrSurahNumAyah[iSurah];
  }
  getSurahLength(iSurah /*one-based */) {
    iSurah = this.secureIndexRange(iSurah, 114);
    if (this.arrSurahNumAyah.length == 0) this.fillArrSurahLength();
    return this.arrSurahLength[iSurah];
  }
  getSurahFromAyah(iAyah /*one-based */) {
    iAyah = this.secureIndexRange(iAyah, 6236);

    if (this.arrSurahAyahStart.length == 0) this.fillArrSurahAyahStart();
    for (var i = 1; i < this.arrSurahAyahStart.length; i++) {
      if (this.arrSurahAyahStart[i] > iAyah) {
        return i - 1;
      }
    }
    return 114;
  }
  getArrSurahAyahStart(iSurah) {
    iSurah = this.secureIndexRange(iSurah, 114);
    if (this.arrSurahAyahStart.length == 0) this.fillArrSurahAyahStart();
    return this.arrSurahAyahStart[iSurah];
  }
  getPageFromAyah(iAyah /*global index */) {
    iAyah = this.secureIndexRange(iAyah, 6236);

    if (iAyah == 1) return 1;
    if (this.arrPageFirstAyah.length == 0) this.fillArrPageFirstAyah();
    for (var i = 2; i < this.arrPageFirstAyah.length; i++) {
      if (this.arrPageFirstAyah[i] > iAyah) {
        return i - 1;
      }
    }
    return 604;
  }
  getPageAyahRange(iPage) {
    iPage = this.secureIndexRange(iPage, this.getNumPages());
    if (this.arrPageFirstAyah.length == 0) this.fillArrPageFirstAyah();
    var start = this.arrPageFirstAyah[iPage];
    var end =
      iPage == this.getNumPages() /*last page */
        ? 6236
        : this.arrPageFirstAyah[iPage + 1] - 1;
    return [start, end];
  }
  getSurahAyahRange(iSurah) {
    iSurah = this.secureIndexRange(iSurah, this.getNumSuras());
    if (this.arrSurahAyahStart.length == 0) this.fillArrSurahAyahStart();
    var start = this.arrSurahAyahStart[iSurah];
    var end =
      iSurah == this.getNumSuras() /*last surah */
        ? 6236
        : this.arrSurahAyahStart[iSurah + 1] - 1;
    return [start, end];
  }
  getJuzuuAyahRange(iJuzuu) {
    iJuzuu = this.secureIndexRange(iJuzuu, this.getNumPages());
    if (this.arrJuzuuAyahStart.length == 0) this.fillArrJuzuuAyahStart();
    var start = this.arrJuzuuAyahStart[iJuzuu];
    var end =
      iJuzuu == this.getNumJuzuu() /*last juzuu */
        ? 6236
        : this.arrJuzuuAyahStart[iJuzuu + 1] - 1;
    return [start, end];
  }
  getAyahGlobalIndx(iSurah, iAyah) {
    iSurah = this.secureIndexRange(iSurah, 114);
    if (this.arrSurahNumAyah.length == 0) this.fillArrSurahNumAyah();
    iAyah = this.secureIndexRange(iAyah, this.arrSurahNumAyah[iSurah]);
    if (this.arrSurahAyahStart.length == 0) this.fillArrSurahAyahStart();
    return this.arrSurahAyahStart[iSurah] + (iAyah - 1);
  }
  getAyahLocalIndx(iAyah) {
    iAyah = this.secureIndexRange(iAyah, 6236);
    let iSurah = this.getSurahFromAyah(iAyah);
    if (this.arrSurahAyahStart.length == 0) this.fillArrSurahAyahStart();
    return {
      localSurahIndx: iSurah,
      localAyahIndx: iAyah + 1 - this.arrSurahAyahStart[iSurah],
    };
  }
  isValidLocalAyahIndex(iSurah, iAyah) {
    iSurah = this.secureIndexRange(iSurah, 114);
    if (this.arrSurahNumAyah.length == 0) this.fillArrSurahNumAyah();
    return iAyah >= 1 && iAyah <= this.arrSurahNumAyah[iSurah];
  }
  getSurahFromPage(iPage) {
    iPage = this.secureIndexRange(iPage, this.getNumPages());
    if (this.arrSurahPage.length == 0) this.fillArrSurahPage();
    for (var i = this.arrSurahPage.length - 1; i > 0; i--) {
      if (this.arrSurahPage[i] == iPage) return i;
    }
    return -1;
  }
  getLinesFromPage(iPage /*one-based */) {
    iPage = this.secureIndexRange(iPage, this.getNumPages());
    if (iPage == 1) return [0, 7];
    if (iPage == 2) return [8, 15];
    var prev = 15 + 15 * (iPage - 3) + 1;
    return [prev, 14 + prev];
  }

  getPageFromSurah(iSurah) {
    iSurah = this.secureIndexRange(iSurah, 114);
    if (this.arrSurahPage.length == 0) this.fillArrSurahPage();
    return this.arrSurahPage[iPage];
  }
  getJuzuFromPage(iPage) {
    iPage = this.secureIndexRange(iPage, this.getNumPages());

    if (iPage < 22) return 1;
    if (iPage >= 582) return 30;
    return Math.floor((iPage - 2) / 20) + 1;
  }
  getJuzuuStartAyah(iJuzu) {
    iJuzu = this.secureIndexRange(iJuzu, 30);
    if (this.arrJuzuuAyahStart.length == 0) this.fillArrJuzuuAyahStart();
    return this.arrJuzuuAyahStart[iJuzu];
  }

  getPageFromJuzu(iJuzu) {
    iJuzu = this.secureIndexRange(iJuzu, 30);
    if (iJuzu == 1) return 1;
    return 2 + (iJuzu - 1) * 20;
  }
  isValidPage(iPage) {
    return iPage >= 1 && iPage <= 604;
  }
  isValidSurah(iSurah) {
    return iSurah >= 1 && iSurah <= 114;
  }
  isValidJuzuu(iJuzuu) {
    return iJuzuu >= 1 && iJuzuu <= 30;
  }
  isValidAyah(iAyah) {
    return iAyah >= 1 && iAyah <= 6236;
  }
  isValidAyah(iSurah, iLocalAyah) {
    return (
      this.isValidSurah(iSurah) &&
      iLocalAyah >= 1 &&
      iLocalAyah <= this.getSurahNumAyah()
    );
  }
  getNumPages() {
    return 604; // todo: read from db
  }
  getNumAyas() {
    return 6236; // todo: read from db
  }
  getNumJuzuu() {
    return 30; // todo: read from db
  }
  getNumSuras() {
    return 114; // todo: read from db
  }
  getNumWords() {
    return 157935; // unverified
  }
  getNumLetters() {
    return 668684; // unverified
  }
  secureIndexRange(iIndx, iRange) {
    while (iIndx < 1) iIndx += iRange;
    while (iIndx > iRange) iIndx -= iRange;
    return iIndx;
  }
  fillArrSurahPage() {
    this.arrSurahPage = [
      -1, //one based indexes
      1,
      2,
      50,
      77,
      106,
      128,
      151,
      177,
      187,
      208,
      221,
      235,
      249,
      255,
      262,
      267,
      282,
      293,
      305,
      312,
      322,
      332,
      342,
      350,
      359,
      367,
      377,
      385,
      396,
      404,
      411,
      415,
      418,
      428,
      434,
      440,
      446,
      453,
      458,
      467,
      477,
      483,
      489,
      496,
      499,
      502,
      507,
      511,
      515,
      518,
      520,
      523,
      526,
      528,
      531,
      534,
      537,
      542,
      545,
      549,
      551,
      553,
      554,
      556,
      558,
      560,
      562,
      564,
      566,
      568,
      570,
      572,
      574,
      575,
      577,
      578,
      580,
      582,
      583,
      585,
      586,
      587,
      587,
      589,
      590,
      591,
      591,
      592,
      593,
      594,
      595,
      595,
      596,
      596,
      597,
      597,
      598,
      598,
      599,
      599,
      600,
      600,
      601,
      601,
      601,
      602,
      602,
      602,
      603,
      603,
      603,
      604,
      604,
      604,
    ];
  }
  fillArrPageFirstAyah() {
    this.arrPageFirstAyah = [
      -1, //one based indexes
      1,
      8,
      13,
      24,
      32,
      37,
      45,
      56,
      65,
      69,
      77,
      84,
      91,
      96,
      101,
      109,
      113,
      120,
      127,
      134,
      142,
      149,
      153,
      161,
      171,
      177,
      184,
      189,
      194,
      198,
      204,
      210,
      218,
      223,
      227,
      232,
      238,
      241,
      245,
      253,
      256,
      260,
      264,
      267,
      272,
      277,
      282,
      289,
      290,
      294,
      303,
      309,
      316,
      323,
      331,
      339,
      346,
      355,
      364,
      371,
      377,
      385,
      394,
      402,
      409,
      415,
      426,
      434,
      442,
      447,
      451,
      459,
      467,
      474,
      480,
      488,
      494,
      500,
      505,
      508,
      513,
      517,
      520,
      527,
      531,
      538,
      545,
      553,
      559,
      568,
      573,
      580,
      585,
      588,
      595,
      599,
      607,
      615,
      621,
      628,
      634,
      641,
      648,
      656,
      664,
      669,
      672,
      675,
      679,
      683,
      687,
      693,
      701,
      706,
      711,
      715,
      720,
      727,
      734,
      740,
      746,
      752,
      759,
      765,
      773,
      778,
      783,
      790,
      798,
      808,
      817,
      825,
      834,
      842,
      849,
      858,
      863,
      871,
      880,
      884,
      891,
      900,
      908,
      914,
      921,
      927,
      932,
      936,
      941,
      947,
      955,
      966,
      977,
      985,
      992,
      998,
      1006,
      1012,
      1022,
      1028,
      1036,
      1042,
      1050,
      1059,
      1075,
      1085,
      1092,
      1098,
      1104,
      1110,
      1114,
      1118,
      1125,
      1133,
      1142,
      1150,
      1161,
      1169,
      1177,
      1186,
      1194,
      1201,
      1206,
      1213,
      1222,
      1230,
      1236,
      1242,
      1249,
      1256,
      1262,
      1267,
      1272,
      1276,
      1283,
      1290,
      1297,
      1304,
      1308,
      1315,
      1322,
      1329,
      1335,
      1342,
      1347,
      1353,
      1358,
      1365,
      1371,
      1379,
      1385,
      1390,
      1398,
      1407,
      1418,
      1426,
      1435,
      1443,
      1453,
      1462,
      1471,
      1479,
      1486,
      1493,
      1502,
      1511,
      1519,
      1527,
      1536,
      1545,
      1555,
      1562,
      1571,
      1582,
      1591,
      1601,
      1611,
      1619,
      1627,
      1634,
      1640,
      1649,
      1660,
      1666,
      1675,
      1683,
      1692,
      1700,
      1708,
      1713,
      1721,
      1726,
      1736,
      1742,
      1750,
      1756,
      1761,
      1769,
      1775,
      1784,
      1793,
      1803,
      1818,
      1834,
      1854,
      1873,
      1893,
      1908,
      1916,
      1928,
      1936,
      1944,
      1956,
      1966,
      1974,
      1981,
      1989,
      1995,
      2004,
      2012,
      2020,
      2030,
      2037,
      2047,
      2057,
      2068,
      2079,
      2088,
      2096,
      2105,
      2116,
      2126,
      2134,
      2145,
      2156,
      2161,
      2168,
      2175,
      2186,
      2194,
      2202,
      2215,
      2224,
      2238,
      2251,
      2262,
      2276,
      2289,
      2302,
      2315,
      2327,
      2346,
      2361,
      2386,
      2400,
      2413,
      2425,
      2436,
      2447,
      2462,
      2474,
      2484,
      2494,
      2508,
      2519,
      2528,
      2541,
      2556,
      2565,
      2574,
      2585,
      2596,
      2601,
      2611,
      2619,
      2626,
      2634,
      2642,
      2651,
      2660,
      2668,
      2674,
      2691,
      2701,
      2716,
      2733,
      2748,
      2763,
      2778,
      2792,
      2802,
      2812,
      2819,
      2823,
      2828,
      2835,
      2845,
      2850,
      2853,
      2858,
      2867,
      2876,
      2888,
      2899,
      2911,
      2923,
      2933,
      2952,
      2972,
      2993,
      3016,
      3044,
      3069,
      3092,
      3116,
      3139,
      3160,
      3173,
      3182,
      3195,
      3204,
      3215,
      3223,
      3236,
      3248,
      3258,
      3266,
      3274,
      3281,
      3288,
      3296,
      3303,
      3312,
      3323,
      3330,
      3337,
      3347,
      3355,
      3364,
      3371,
      3379,
      3386,
      3393,
      3404,
      3415,
      3425,
      3434,
      3442,
      3451,
      3460,
      3470,
      3481,
      3489,
      3498,
      3504,
      3515,
      3524,
      3534,
      3540,
      3549,
      3556,
      3564,
      3569,
      3577,
      3584,
      3588,
      3596,
      3607,
      3614,
      3621,
      3629,
      3638,
      3646,
      3655,
      3664,
      3672,
      3679,
      3691,
      3699,
      3705,
      3718,
      3733,
      3746,
      3760,
      3776,
      3789,
      3813,
      3840,
      3865,
      3891,
      3915,
      3942,
      3971,
      3987,
      3997,
      4013,
      4032,
      4054,
      4064,
      4069,
      4080,
      4090,
      4099,
      4106,
      4115,
      4126,
      4133,
      4141,
      4150,
      4159,
      4167,
      4174,
      4183,
      4192,
      4200,
      4211,
      4219,
      4230,
      4239,
      4248,
      4257,
      4265,
      4273,
      4283,
      4288,
      4295,
      4304,
      4317,
      4324,
      4336,
      4348,
      4359,
      4373,
      4386,
      4399,
      4415,
      4433,
      4454,
      4474,
      4487,
      4496,
      4506,
      4516,
      4525,
      4531,
      4539,
      4546,
      4557,
      4565,
      4575,
      4584,
      4593,
      4599,
      4607,
      4612,
      4617,
      4624,
      4631,
      4646,
      4666,
      4682,
      4706,
      4727,
      4750,
      4767,
      4785,
      4811,
      4829,
      4853,
      4874,
      4896,
      4918,
      4942,
      4969,
      4996,
      5030,
      5056,
      5079,
      5087,
      5094,
      5100,
      5105,
      5111,
      5116,
      5126,
      5130,
      5136,
      5143,
      5151,
      5156,
      5162,
      5169,
      5178,
      5186,
      5193,
      5200,
      5209,
      5218,
      5223,
      5230,
      5237,
      5242,
      5254,
      5268,
      5287,
      5314,
      5332,
      5358,
      5386,
      5415,
      5430,
      5448,
      5461,
      5476,
      5495,
      5513,
      5543,
      5571,
      5597,
      5617,
      5642,
      5673,
      5703,
      5728,
      5759,
      5801,
      5830,
      5855,
      5883,
      5910,
      5932,
      5964,
      5994,
      6017,
      6044,
      6073,
      6099,
      6126,
      6138,
      6156,
      6177,
      6194,
      6208,
      6222,
    ];
  }
  fillArrSurahNamesAr() {
    this.arrSurahNamesAr = [
      "",
      "الفاتحة",
      "البقرة",
      "آل عمران",
      "النساء",
      "المائدة",
      "الأنعام",
      "الأعراف",
      "الأنفال",
      "التوبة",
      "يونس",
      "هود",
      "يوسف",
      "الرعد",
      "ابراهيم",
      "الحجر",
      "النحل",
      "الإسراء",
      "الكهف",
      "مريم",
      "طه",
      "الأنبياء",
      "الحج",
      "المؤمنون",
      "النور",
      "الفرقان",
      "الشعراء",
      "النمل",
      "القصص",
      "العنكبوت",
      "الروم",
      "لقمان",
      "السجدة",
      "الأحزاب",
      "سبإ",
      "فاطر",
      "يس",
      "الصافات",
      "ص",
      "الزمر",
      "غافر",
      "فصلت",
      "الشورى",
      "الزخرف",
      "الدخان",
      "الجاثية",
      "الأحقاف",
      "محمد",
      "الفتح",
      "الحجرات",
      "ق",
      "الذاريات",
      "الطور",
      "النجم",
      "القمر",
      "الرحمن",
      "الواقعة",
      "الحديد",
      "المجادلة",
      "الحشر",
      "الممتحنة",
      "الصف",
      "الجمعة",
      "المنافقون",
      "التغابن",
      "الطلاق",
      "التحريم",
      "الملك",
      "القلم",
      "الحاقة",
      "المعارج",
      "نوح",
      "الجن",
      "المزمل",
      "المدثر",
      "القيامة",
      "الانسان",
      "المرسلات",
      "النبأ",
      "النازعات",
      "عبس",
      "التكوير",
      "الإنفطار",
      "المطففين",
      "الإنشقاق",
      "البروج",
      "الطارق",
      "الأعلى",
      "الغاشية",
      "الفجر",
      "البلد",
      "الشمس",
      "الليل",
      "الضحى",
      "الشرح",
      "التين",
      "العلق",
      "القدر",
      "البينة",
      "الزلزلة",
      "العاديات",
      "القارعة",
      "التكاثر",
      "العصر",
      "الهمزة",
      "الفيل",
      "قريش",
      "الماعون",
      "الكوثر",
      "الكافرون",
      "النصر",
      "المسد",
      "الإخلاص",
      "الفلق",
      "الناس",
    ];
  }
  fillArrSurahNamesAr_normalized() {
    if (this.arrSurahNamesAr.length == 0) this.fillArrSurahNamesAr();
    this.arrSurahNamesAr_normalized = [[""]];
    for (var i = 1; i < this.arrSurahNamesAr.length; i++) {
      this.arrSurahNamesAr_normalized.push(
        MiscUtilities.removeLeadingAlefLam(
          MiscUtilities.normalizeString(this.arrSurahNamesAr[i])
        )
      );
    }
  }
  fillArrSurahNamesEn() {
    this.arrSurahNamesEn = [
      "",
      "The Opening",
      "The Cow",
      "The Family of Imraan",
      "The Women",
      "The Table",
      "The Cattle",
      "The Heights",
      "The Spoils of War",
      "The Repentance",
      "Jonas",
      "Hud",
      "Joseph",
      "The Thunder",
      "Abraham",
      "The Rock",
      "The Bee",
      "The Night Journey",
      "The Cave",
      "Mary",
      "Taa-Haa",
      "The Prophets",
      "The Pilgrimage",
      "The Believers",
      "The Light",
      "The Criterion",
      "The Poets",
      "The Ant",
      "The Stories",
      "The Spider",
      "The Romans",
      "Luqman",
      "The Prostration",
      "The Clans",
      "Sheba",
      "The Originator",
      "Yaseen",
      "Those drawn up in Ranks",
      "The letter Saad",
      "The Groups",
      "The Forgiver",
      "Explained in detail",
      "Consultation",
      "Ornaments of gold",
      "The Smoke",
      "Crouching",
      "The Dunes",
      "Muhammad",
      "The Victory",
      "The Inner Apartments",
      "The letter Qaaf",
      "The Winnowing Winds",
      "The Mount",
      "The Star",
      "The Moon",
      "The Beneficent",
      "The Inevitable",
      "The Iron",
      "The Pleading Woman",
      "The Exile",
      "She that is to be examined",
      "The Ranks",
      "Friday",
      "The Hypocrites",
      "Mutual Disillusion",
      "Divorce",
      "The Prohibition",
      "The Sovereignty",
      "The Pen",
      "The Reality",
      "The Ascending Stairways",
      "Noah",
      "The Jinn",
      "The Enshrouded One",
      "The Cloaked One",
      "The Resurrection",
      "Man",
      "The Emissaries",
      "The Announcement",
      "Those who drag forth",
      "He frowned",
      "The Overthrowing",
      "The Cleaving",
      "Defrauding",
      "The Splitting Open",
      "The Constellations",
      "The Morning Star",
      "The Most High",
      "The Overwhelming",
      "The Dawn",
      "The City",
      "The Sun",
      "The Night",
      "The Morning Hours",
      "The Consolation",
      "The Fig",
      "The Clot",
      "The Power",
      "The Evidence",
      "The Earthquake",
      "The Chargers",
      "The Calamity",
      "Competition",
      "The Declining Day",
      "The Traducer",
      "The Elephant",
      "Quraysh",
      "Almsgiving",
      "Abundance",
      "The Disbelievers",
      "Divine Support",
      "The Palm Fibre",
      "Sincerity",
      "The Dawn",
      "Mankind",
    ];
  }
  fillArrSurahNamesEn_normalized() {
    if (this.arrSurahNamesEn.length == 0) this.fillArrSurahNamesEn();
    this.arrSurahNamesEn_normalized = [[""]];
    for (var i = 1; i < this.arrSurahNamesEn.length; i++) {
      this.arrSurahNamesEn_normalized.push(
        MiscUtilities.removeThe(
          MiscUtilities.normalizeString(this.arrSurahNamesEn[i])
        )
      );
    }
  }
  fillArrSurahNamesTrns() {
    this.arrSurahNamesTrns = [
      "",
      "Al-Faatiha",
      "Al-Baqara",
      "Aal-i-Imraan",
      "An-Nisaa",
      "Al-Maaida",
      "Al-An'aam",
      "Al-A'raaf",
      "Al-Anfaal",
      "At-Tawba",
      "Yunus",
      "Hud",
      "Yusuf",
      "Ar-Ra'd",
      "Ibrahim",
      "Al-Hijr",
      "An-Nahl",
      "Al-Israa",
      "Al-Kahf",
      "Maryam",
      "Taa-Haa",
      "Al-Anbiyaa",
      "Al-Hajj",
      "Al-Muminoon",
      "An-Noor",
      "Al-Furqaan",
      "Ash-Shu'araa",
      "An-Naml",
      "Al-Qasas",
      "Al-Ankaboot",
      "Ar-Room",
      "Luqman",
      "As-Sajda",
      "Al-Ahzaab",
      "Saba",
      "Faatir",
      "Yaseen",
      "As-Saaffaat",
      "Saad",
      "Az-Zumar",
      "Ghaafir",
      "Fussilat",
      "Ash-Shura",
      "Az-Zukhruf",
      "Ad-Dukhaan",
      "Al-Jaathiya",
      "Al-Ahqaf",
      "Muhammad",
      "Al-Fath",
      "Al-Hujuraat",
      "Qaaf",
      "Adh-Dhaariyat",
      "At-Tur",
      "An-Najm",
      "Al-Qamar",
      "Ar-Rahmaan",
      "Al-Waaqia",
      "Al-Hadid",
      "Al-Mujaadila",
      "Al-Hashr",
      "Al-Mumtahana",
      "As-Saff",
      "Al-Jumu'a",
      "Al-Munaafiqoon",
      "At-Taghaabun",
      "At-Talaaq",
      "At-Tahrim",
      "Al-Mulk",
      "Al-Qalam",
      "Al-Haaqqa",
      "Al-Ma'aarij",
      "Nooh",
      "Al-Jinn",
      "Al-Muzzammil",
      "Al-Muddaththir",
      "Al-Qiyaama",
      "Al-Insaan",
      "Al-Mursalaat",
      "An-Naba",
      "An-Naazi'aat",
      "Abasa",
      "At-Takwir",
      "Al-Infitaar",
      "Al-Mutaffifin",
      "Al-Inshiqaaq",
      "Al-Burooj",
      "At-Taariq",
      "Al-A'laa",
      "Al-Ghaashiya",
      "Al-Fajr",
      "Al-Balad",
      "Ash-Shams",
      "Al-Lail",
      "Ad-Dhuhaa",
      "Ash-Sharh",
      "At-Tin",
      "Al-Alaq",
      "Al-Qadr",
      "Al-Bayyina",
      "Az-Zalzala",
      "Al-Aadiyaat",
      "Al-Qaari'a",
      "At-Takaathur",
      "Al-Asr",
      "Al-Humaza",
      "Al-Fil",
      "Quraish",
      "Al-Maa'un",
      "Al-Kawthar",
      "Al-Kaafiroon",
      "An-Nasr",
      "Al-Masad",
      "Al-Ikhlaas",
      "Al-Falaq",
      "An-Naas",
    ];
  }
  fillArrSurahNamesTrns_normalized() {
    if (this.arrSurahNamesTrns.length == 0) this.fillArrSurahNamesTrns();
    this.arrSurahNamesTrns_normalized = [[""]];
    for (var i = 1; i < this.arrSurahNamesTrns.length; i++) {
      let arrSplit = this.arrSurahNamesTrns[i].split("-");
      let norm = arrSplit.pop();
      this.arrSurahNamesTrns_normalized.push(
        MiscUtilities.normalizeString(norm)
      );
    }
  }
  fillArrSurahNamesEnTrns() {
    this.arrSurahNamesEnTrns = [
      "",
      "The Opening (Al-Faatiha) ",
      "The Cow (Al-Baqara) ",
      "The Family of Imraan (Aal-i-Imraan) ",
      "The Women (An-Nisaa) ",
      "The Table (Al-Maaida) ",
      "The Cattle (Al-An'aam) ",
      "The Heights (Al-A'raaf) ",
      "The Spoils of War (Al-Anfaal) ",
      "The Repentance (At-Tawba) ",
      "Jonas (Yunus) ",
      "Hud (Hud) ",
      "Joseph (Yusuf) ",
      "The Thunder (Ar-Ra'd) ",
      "Abraham (Ibrahim) ",
      "The Rock (Al-Hijr) ",
      "The Bee (An-Nahl) ",
      "The Night Journey (Al-Israa) ",
      "The Cave (Al-Kahf) ",
      "Mary (Maryam) ",
      "Taa-Haa (Taa-Haa) ",
      "The Prophets (Al-Anbiyaa) ",
      "The Pilgrimage (Al-Hajj) ",
      "The Believers (Al-Muminoon) ",
      "The Light (An-Noor) ",
      "The Criterion (Al-Furqaan) ",
      "The Poets (Ash-Shu'araa) ",
      "The Ant (An-Naml) ",
      "The Stories (Al-Qasas) ",
      "The Spider (Al-Ankaboot) ",
      "The Romans (Ar-Room) ",
      "Luqman (Luqman) ",
      "The Prostration (As-Sajda) ",
      "The Clans (Al-Ahzaab) ",
      "Sheba (Saba) ",
      "The Originator (Faatir) ",
      "Yaseen (Yaseen) ",
      "Those drawn up in Ranks (As-Saaffaat) ",
      "The letter Saad (Saad) ",
      "The Groups (Az-Zumar) ",
      "The Forgiver (Ghaafir) ",
      "Explained in detail (Fussilat) ",
      "Consultation (Ash-Shura) ",
      "Ornaments of gold (Az-Zukhruf) ",
      "The Smoke (Ad-Dukhaan) ",
      "Crouching (Al-Jaathiya) ",
      "The Dunes (Al-Ahqaf) ",
      "Muhammad (Muhammad) ",
      "The Victory (Al-Fath) ",
      "The Inner Apartments (Al-Hujuraat) ",
      "The letter Qaaf (Qaaf) ",
      "The Winnowing Winds (Adh-Dhaariyat) ",
      "The Mount (At-Tur) ",
      "The Star (An-Najm) ",
      "The Moon (Al-Qamar) ",
      "The Beneficent (Ar-Rahmaan) ",
      "The Inevitable (Al-Waaqia) ",
      "The Iron (Al-Hadid) ",
      "The Pleading Woman (Al-Mujaadila) ",
      "The Exile (Al-Hashr) ",
      "She that is to be examined (Al-Mumtahana) ",
      "The Ranks (As-Saff) ",
      "Friday (Al-Jumu'a) ",
      "The Hypocrites (Al-Munaafiqoon) ",
      "Mutual Disillusion (At-Taghaabun) ",
      "Divorce (At-Talaaq) ",
      "The Prohibition (At-Tahrim) ",
      "The Sovereignty (Al-Mulk) ",
      "The Pen (Al-Qalam) ",
      "The Reality (Al-Haaqqa) ",
      "The Ascending Stairways (Al-Ma'aarij) ",
      "Noah (Nooh) ",
      "The Jinn (Al-Jinn) ",
      "The Enshrouded One (Al-Muzzammil) ",
      "The Cloaked One (Al-Muddaththir) ",
      "The Resurrection (Al-Qiyaama) ",
      "Man (Al-Insaan) ",
      "The Emissaries (Al-Mursalaat) ",
      "The Announcement (An-Naba) ",
      "Those who drag forth (An-Naazi'aat) ",
      "He frowned (Abasa) ",
      "The Overthrowing (At-Takwir) ",
      "The Cleaving (Al-Infitaar) ",
      "Defrauding (Al-Mutaffifin) ",
      "The Splitting Open (Al-Inshiqaaq) ",
      "The Constellations (Al-Burooj) ",
      "The Morning Star (At-Taariq) ",
      "The Most High (Al-A'laa) ",
      "The Overwhelming (Al-Ghaashiya) ",
      "The Dawn (Al-Fajr) ",
      "The City (Al-Balad) ",
      "The Sun (Ash-Shams) ",
      "The Night (Al-Lail) ",
      "The Morning Hours (Ad-Dhuhaa) ",
      "The Consolation (Ash-Sharh) ",
      "The Fig (At-Tin) ",
      "The Clot (Al-Alaq) ",
      "The Power (Al-Qadr) ",
      "The Evidence (Al-Bayyina) ",
      "The Earthquake (Az-Zalzala) ",
      "The Chargers (Al-Aadiyaat) ",
      "The Calamity (Al-Qaari'a) ",
      "Competition (At-Takaathur) ",
      "The Declining Day (Al-Asr) ",
      "The Traducer (Al-Humaza) ",
      "The Elephant (Al-Fil) ",
      "Quraysh (Quraish) ",
      "Almsgiving (Al-Maa'un) ",
      "Abundance (Al-Kawthar) ",
      "The Disbelievers (Al-Kaafiroon) ",
      "Divine Support (An-Nasr) ",
      "The Palm Fibre (Al-Masad) ",
      "Sincerity (Al-Ikhlaas) ",
      "The Dawn (Al-Falaq) ",
      "Mankind (An-Naas)",
    ];
  }
  fillArrSurahNumAyah() {
    this.arrSurahNumAyah = [
      0, 7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99,
      128, 111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30,
      73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45,
      60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52,
      52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17,
      19, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7,
      3, 6, 3, 5, 4, 5, 6,
    ];
  }
  fillArrSurahLength() {
    this.arrSurahLength = [
      0, 0.000469579, 0.078720292, 0.045276992, 0.047623392, 0.0357897,
      0.039045349, 0.042695803, 0.016201973, 0.033915871, 0.02235286,
      0.024178835, 0.021702329, 0.011006694, 0.010543097, 0.008817319,
      0.023790011, 0.020262187, 0.020671947, 0.012244947, 0.01735947,
      0.015117754, 0.016357502, 0.013266356, 0.016922792, 0.011681153,
      0.016357502, 0.01452405, 0.017672024, 0.0124917, 0.010472809, 0.006602521,
      0.004715232, 0.016963169, 0.010897524, 0.009708622, 0.009032667,
      0.011808268, 0.009870133, 0.014702012, 0.015534991, 0.010362144,
      0.010807796, 0.011195124, 0.00452082, 0.006231643, 0.008316335,
      0.007257539, 0.007712163, 0.004320426, 0.004710745, 0.0047586,
      0.004265094, 0.004594098, 0.004718223, 0.004902166, 0.005290989,
      0.007685244, 0.006147896, 0.00593853, 0.00467934, 0.002733728,
      0.002102637, 0.00232995, 0.003263126, 0.003755137, 0.003162929,
      0.00404825, 0.00412751, 0.00346651, 0.002908698, 0.002841402, 0.003625031,
      0.002617081, 0.003400709, 0.002160961, 0.003367809, 0.00247202,
      0.002419678, 0.002666431, 0.001987486, 0.001502952, 0.001091697,
      0.002273122, 0.001485006, 0.001487997, 0.000782133, 0.000954113,
      0.001248721, 0.00181102, 0.00108721, 0.000979536, 0.001051319,
      0.000625108, 0.000396301, 0.000418733, 0.000832979, 0.000354428,
      0.00122928, 0.000477056, 0.000557812, 0.000512948, 0.000387328,
      0.000197403, 0.000444156, 0.000303581, 0.000278158, 0.000326013,
      0.000161511, 0.000285636, 0.000285636, 0.000288627, 0.000139079,
      0.000254231, 0.000249744,
    ];
  }
  fillArrJuzuuAyahStart() {
    this.arrJuzuuAyahStart = [
      0, 1, 149, 260, 385, 517, 641, 751, 900, 1042, 1201, 1328, 1479, 1649,
      1803, 2030, 2215, 2484, 2674, 2876, 3215, 3386, 3564, 3733, 4090, 4265,
      4511, 4706, 5105, 5242, 5673,
    ];
    /* to calculate:
     this.arrJuzuuAyahStart = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25,
    ];
    var strtAyahlocal = [
      0, 1, 142, 253, 92, 24, 148, 82, 111, 88, 41, 93, 6, 53, 1, 1, 75, 1, 1,
      21, 56, 46, 31, 28, 32, 47, 1, 31, 1, 1, 1,
    ];
    var strtSurah = [
      0, 1, 2, 2, 3, 4, 4, 5, 6, 7, 8, 9, 11, 12, 15, 17, 18, 21, 23, 25, 27,
      29, 33, 36, 39, 41, 46, 51, 58, 67, 78,
    ];
    for (var i = 1; i <= 30; i++) {
      this.arrJuzuuAyahStart[i] = this.getAyahGlobalIndx(
        strtSurah[i],
        strtAyahlocal[i]
      );
    } */
  }
  fillArrSurahAyahStart() {
    this.arrSurahAyahStart = [
      0, 1, 8, 294, 494, 670, 790, 955, 1161, 1236, 1365, 1474, 1597, 1708,
      1751, 1803, 1902, 2030, 2141, 2251, 2349, 2484, 2596, 2674, 2792, 2856,
      2933, 3160, 3253, 3341, 3410, 3470, 3504, 3534, 3607, 3661, 3706, 3789,
      3971, 4059, 4134, 4219, 4273, 4326, 4415, 4474, 4511, 4546, 4584, 4613,
      4631, 4676, 4736, 4785, 4847, 4902, 4980, 5076, 5105, 5127, 5151, 5164,
      5178, 5189, 5200, 5218, 5230, 5242, 5272, 5324, 5376, 5420, 5448, 5476,
      5496, 5552, 5592, 5623, 5673, 5713, 5759, 5801, 5830, 5849, 5885, 5910,
      5932, 5949, 5968, 5994, 6024, 6044, 6059, 6080, 6091, 6099, 6107, 6126,
      6131, 6139, 6147, 6158, 6169, 6177, 6180, 6189, 6194, 6198, 6205, 6208,
      6214, 6217, 6222, 6226, 6231,
    ];
  }
  fillArrJuzuuNamesAr() {
    this.arrJuzuuNamesAr = [
      [""],
      ["واحد", "الأول", "الحمد لله", "البسملة"],
      ["اثنان", "الثاني", "سيقول السفهاء"],
      ["ثلاثة", "الثالث", "تلك الرسل"],
      ["أربعة", "الرابع", "لن تنالوا البر", "كل الطعام"],
      ["خمسة", "الخامس", "والمحصنات"],
      ["ستة", "السادس", "لا يحب الله"],
      ["سبعة", "السابع", "لتجدن", "وإذا سمعوا"],
      ["ثمانية", "الثامن", "ولو أننا نزلنا"],
      ["تسعة", "التاسع", "قال الملأ"],
      ["عشرة", "العاشر", "واعلموا"],
      ["أحد عشر", "الحادي عشر", "إنما السبيل"],
      ["إثني عشر", "الثاني عشر", "ومامن دابة"],
      ["الثالثعشر", "الثالث عشر", "وما أبرئ نفسي"],
      ["الرابعشر", "الرابع عشر" /*"الـر"*/],
      ["الخامسعشر", "الخامس عشر", "سبحان"],
      ["السادسعشر", "السادس عشر", "قال ألم", "أما السفينة"],
      ["السابعشر", "السابع عشر", "اقترب للناس"],
      ["الثامنعشر", "الثامن عشر", "قد أفلح"],
      ["التاسعشر", "التاسع عشر", "وقال الذين لا يرجون"],
      ["العشرين", "العشرون", "فما كان جواب قومه"],
      ["الحادي والعشرين", "الحادي والعشرون", "ولا تجادلوا"],
      ["الثاني والعشرين", "الثاني والعشرون", "ومن يقنت"],
      ["الثالث والعشرين", "الثالث والعشرون", "وما أنزلنا" /*"يس"*/],
      ["الرابع والعشرين", "الرابع والعشرون", "فمن أظلم"],
      ["الخامس والعشرين", "الخامس والعشرون", "إليه يرد"],
      ["السادس والعشرين", "السادس والعشرون", "حـم" /*" الأحقاف"*/],
      ["السابع والعشرين", "السابع والعشرون", "قال فما خطبكم" /*"الذاريات"*/],
      ["الثامن والعشرين", "الثامن والعشرون", "قد سمع"],
      ["التاسع والعشرين", "التاسع والعشرون", "تبارك"],
      ["الثلاثين", "الثلاثون", "عمّ"],
    ];
  }
  fillArrJuzuuNamesAr_normalized() {
    if (this.arrJuzuuNamesAr.length == 0) this.fillArrJuzuuNamesAr();
    this.arrJuzuuNamesAr_normalized = [[""]];
    for (var i = 1; i < this.arrJuzuuNamesAr.length; i++) {
      this.arrJuzuuNamesAr_normalized.push([]); //create empty array
      for (var j = 0; j < this.arrJuzuuNamesAr[i].length; j++) {
        this.arrJuzuuNamesAr_normalized[i].push(
          MiscUtilities.removeLeadingAlefLam(
            MiscUtilities.normalizeString(this.arrJuzuuNamesAr[i][j])
          )
        );
      }
    }
  }
  fillArrJuzuuNamesEn() {
    this.arrJuzuuNamesEn = [
      [""],
      ["one", "first", "1st"],
      ["two", "second", "2nd"],
      ["three", "third", "3rd"],
      ["four", "fourth", "4th"],
      ["five", "fifth", "5th"],
      ["six", "sixth", "6th"],
      ["seven", "seventh", "7th"],
      ["eight", "eighth", "8th"],
      ["nine", "ninth", "9th"],
      ["ten", "tenth", "10th"],
      ["eleven", "eleventh", "11th"],
      ["twelve", "twelfth", "12th"],
      ["thirteen", "thirteenth", "13th"],
      ["fourteen", "fourteenth", "14th"],
      ["fifteen", "fifteenth", "15th"],
      ["sixteen", "sixteenth", "16th"],
      ["seventeen", "seventeenth", "17th"],
      ["eighteen", "eighteenth", "18th"],
      ["nineteen", "nineteenth", "19th"],
      ["twenty", "twentieth", "20th"],
      [
        "twenty-one",
        "twenty-first",
        "21st",
        "twenty one",
        "twenty first",
        "twentyone",
        "twentyfirst",
      ],
      [
        "twenty-two",
        "twenty-second",
        "22nd",
        "twenty two",
        "twenty second",
        "twentytwo",
        "twentysecond",
      ],
      [
        "twenty-three",
        "twenty-third",
        "23rd",
        "twenty three",
        "twenty third",
        "twentythree",
        "twentythird",
      ],
      [
        "twenty-four",
        "twenty-fourth",
        "24th",
        "twenty four",
        "twenty fourth",
        "twentyfour",
        "twentyfourth",
      ],
      [
        "twenty-five",
        "twenty-fifth",
        "25th",
        "twenty five",
        "twenty fifth",
        "twentyfive",
        "twentyfifth",
      ],
      [
        "twenty-six",
        "twenty-sixth",
        "26th",
        "twenty six",
        "twenty sixth",
        "twentysix",
        "twentysixth",
      ],
      [
        "twenty-seven",
        "twenty-seventh",
        "27th",
        "twenty seven",
        "twenty seventh",
        "twentyseven",
        "twentyseventh",
      ],
      [
        "twenty-eight",
        "twenty-eighth",
        "28th",
        "twenty eight",
        "twenty eighth",
        "twentyeight",
        "twentyeighth",
      ],
      [
        "twenty-nine",
        "twenty-ninth",
        "29th",
        "twenty nine",
        "twenty ninth",
        "twentynine",
        "twentyninth",
      ],
      ["thirty", "thirtieth", "30th"],
    ];
  }
  fillArrJuzuuNamesEn_normalized() {
    if (this.arrJuzuuNamesEn.length == 0) this.fillArrJuzuuNamesEn();
    this.arrJuzuuNamesEn_normalized = [[""]];
    for (var i = 1; i < this.arrJuzuuNamesEn.length; i++) {
      this.arrJuzuuNamesEn_normalized.push([]); //create empty array
      for (var j = 0; j < this.arrJuzuuNamesEn[i].length; j++) {
        this.arrJuzuuNamesEn_normalized[i].push(
          MiscUtilities.removeThe(
            MiscUtilities.normalizeString(this.arrJuzuuNamesEn[i][j])
          )
        );
      }
    }
  }
  fillArrJuzuuNamesTrns() {
    this.arrJuzuuNamesTrns = [
      [""],
      ["Alif Lam Meem"],
      ["Sayaqool"],
      ["Tilkal Rusulu"],
      ["Lan tanaloo albirra", "Lan tanaloo "],
      ["Wal Mohsanatu"],
      ["La Yuhibbullah"],
      ["Wa Iza Samiu"],
      ["Wa Lau Annana"],
      ["Qalal Malao"],
      ["Wa A'lamu"],
      ["Yatazeroon"],
      ["Wa Mamin Da'abatin"],
      ["Wa Ma Ubrioo"],
      ["Rubama"],
      ["Subhan iladhi"],
      ["Qala Alam"],
      ["Iqtaraba li’n-nasi"],
      ["Qadd Aflaha"],
      ["Wa Qala illadhina"],
      ["A'man Khalaqa"],
      ["Utlu Ma Oohiya"],
      ["Wa-Man yaqnut"],
      ["Wa Mali"],
      ["Fa-man Azlamu"],
      ["Ilayhi Yuruddu"],
      ["Ha Meem"],
      ["Qala Fama Khatbukum", "Qala Fama "],
      ["Qadd Sami Allah", "Qadd Sami"],
      ["Tabaraka lladhi", "Tabaraka"],
      ["Amma"],
    ];
  }
  fillArrJuzuuNamesTrns_normalized() {
    if (this.arrJuzuuNamesTrns.length == 0) this.fillArrJuzuuNamesTrns();
    this.arrJuzuuNamesTrns_normalized = [[""]];
    for (var i = 1; i < this.arrJuzuuNamesTrns.length; i++) {
      this.arrJuzuuNamesTrns_normalized.push([]); //create empty array
      for (var j = 0; j < this.arrJuzuuNamesTrns[i].length; j++) {
        this.arrJuzuuNamesTrns_normalized[i].push(
          MiscUtilities.normalizeString(this.arrJuzuuNamesTrns[i][j])
        );
      }
    }
  }
  replaceJuzuuNamesFromString(str) {
    var bIsEnglish = /[a-z]/.test(str);
    if (bIsEnglish) {
      if (this.arrJuzuuNamesTrns_normalized.length == 0)
        this.fillArrJuzuuNamesTrns_normalized();
      for (var i = this.arrJuzuuNamesAr_normalized.length - 1; i > 0; i--) {
        // must make last before start because of partial words
        for (var j = 0; j < this.arrJuzuuNamesTrns_normalized[i].length; j++) {
          str = MiscUtilities.replaceStringParts(
            str,
            this.arrJuzuuNamesTrns_normalized[i][j],
            " juzuu " + i.toString()
          );
        }
      }
      if (this.arrJuzuuNamesEn_normalized.length == 0)
        this.fillArrJuzuuNamesEn_normalized();

      for (var i = this.arrJuzuuNamesAr_normalized.length - 1; i > 0; i--) {
        // must make last before start because of partial words
        for (var j = 0; j < this.arrJuzuuNamesEn_normalized[i].length; j++) {
          str = MiscUtilities.replaceStringParts(
            str,
            this.arrJuzuuNamesEn_normalized[i][j],
            " juzuu " + i.toString()
          );
        }
      }
    } else {
      if (this.arrJuzuuNamesAr_normalized.length == 0)
        this.fillArrJuzuuNamesAr_normalized();

      for (var i = this.arrJuzuuNamesAr_normalized.length - 1; i > 0; i--) {
        // must make last before start because of partial words
        for (var j = 0; j < this.arrJuzuuNamesAr_normalized[i].length; j++) {
          str = MiscUtilities.replaceStringParts(
            str,
            this.arrJuzuuNamesAr_normalized[i][j],
            " جزء " + i.toString()
          );
        }
      }
    }
    return str;
  }
}
export default QuranIndexer;
