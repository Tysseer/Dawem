export default class QuranIndexer {
  constructor() {
    this.arrPageFirstAyah = []; // the global index of first ayah in each page
    this.arrSurahPage = []; // the page index for surah starting ayah
    this.arrSurahNamesAr = []; // the names in arabic
    this.arrSurahNamesEn = []; // the names in english
    this.arrSurahNamesTrns = []; // the names in transliration
    this.arrSurahNumAyah = []; // number of ayat for each surah
    this.arrSurahAyahStart = []; // the global index of first ayah in each surah
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
  getSurahFromAyah(iAyah /*one-based */) {
    iAyah = this.secureIndexRange(iAyah, 6236);
    if (this.arrSurahAyahStart.length == 0) this.fillArrSurahAyahStart();
    for (var i = 1; i < this.arrSurahAyahStart.length; i++) {
      if (this.arrPageFirstAyah[i] > iAyah) {
        return i - 1;
      }
    }
    return 114;
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
  getAyahGlobalIndx(iSurah, iAyah) {
    iSurah = this.secureIndexRange(iSurah, 114);
    if (this.arrSurahNumAyah.length == 0) this.fillArrSurahNumAyah();
    iAyah = this.secureIndexRange(iAyah, this.arrSurahNumAyah[iSurah]);
    if (this.arrSurahAyahStart.length == 0) this.fillArrSurahAyahStart();
    return this.arrSurahAyahStart[iSurah] + (iAyah - 1);
  }
  getAyahLocalIndx(iAyah) {
    iAyah = this.secureIndexRange(iAyah, 6236);
    iSurah = this.getSurahFromAyah(iAyah);
    if (this.arrSurahAyahStart.length == 0) this.fillArrSurahAyahStart();
    return iAyah + 1 - this.arrSurahAyahStart[iSurah];
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
  getAllSurahFromPage() {}

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
  getPageFromJuzu(iJuzu) {
    iJuzu = this.secureIndexRange(iJuzu, 30);
    if (iJuzu == 1) return 1;
    return 2 + (iJuzu - 1) * 20;
  }
  getNumPages() {
    return 604; // todo: read from db
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
      "النبإ",
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
  fillArrSurahNumAyah() {
    this.arrSurahNumAyah = [
      0,
      7,
      286,
      200,
      176,
      120,
      165,
      206,
      75,
      129,
      109,
      123,
      111,
      43,
      52,
      99,
      128,
      111,
      110,
      98,
      135,
      112,
      78,
      118,
      64,
      77,
      227,
      93,
      88,
      69,
      60,
      34,
      30,
      73,
      54,
      45,
      83,
      182,
      88,
      75,
      85,
      54,
      53,
      89,
      59,
      37,
      35,
      38,
      29,
      18,
      45,
      60,
      49,
      62,
      55,
      78,
      96,
      29,
      22,
      24,
      13,
      14,
      11,
      11,
      18,
      12,
      12,
      30,
      52,
      52,
      44,
      28,
      28,
      20,
      56,
      40,
      31,
      50,
      40,
      46,
      42,
      29,
      19,
      36,
      25,
      22,
      17,
      19,
      26,
      30,
      20,
      15,
      21,
      11,
      8,
      8,
      19,
      5,
      8,
      8,
      11,
      11,
      8,
      3,
      9,
      5,
      4,
      7,
      3,
      6,
      3,
      5,
      4,
      5,
      6,
    ];
  }
  fillArrSurahAyahStart() {
    this.arrSurahAyahStart = [
      0,
      1,
      8,
      294,
      494,
      670,
      790,
      955,
      1161,
      1236,
      1365,
      1474,
      1597,
      1708,
      1751,
      1803,
      1902,
      2030,
      2141,
      2251,
      2349,
      2484,
      2596,
      2674,
      2792,
      2856,
      2933,
      3160,
      3253,
      3341,
      3410,
      3470,
      3504,
      3534,
      3607,
      3661,
      3706,
      3789,
      3971,
      4059,
      4134,
      4219,
      4273,
      4326,
      4415,
      4474,
      4511,
      4546,
      4584,
      4613,
      4631,
      4676,
      4736,
      4785,
      4847,
      4902,
      4980,
      5076,
      5105,
      5127,
      5151,
      5164,
      5178,
      5189,
      5200,
      5218,
      5230,
      5242,
      5272,
      5324,
      5376,
      5420,
      5448,
      5476,
      5496,
      5552,
      5592,
      5623,
      5673,
      5713,
      5759,
      5801,
      5830,
      5849,
      5885,
      5910,
      5932,
      5949,
      5968,
      5994,
      6024,
      6044,
      6059,
      6080,
      6091,
      6099,
      6107,
      6126,
      6131,
      6139,
      6147,
      6158,
      6169,
      6177,
      6180,
      6189,
      6194,
      6198,
      6205,
      6208,
      6214,
      6217,
      6222,
      6226,
      6231,
    ];
  }
}
