import Ayah from "./Ayah";
import QuranPage from "./QuranPage";
export default class QuranReader {
  constructor() {}
  getSurahFromPage(iPage) {
    var nNumPages = this.getNumPages();
    while (iPage < 1) iPage += nNumPages;
    while (iPage > nNumPages) iPage -= nNumPages;
    var arrSurahPage = [];
    arrSurahPage.push(-1); //one based indexes
    arrSurahPage.push(1);
    arrSurahPage.push(2);
    arrSurahPage.push(50);
    arrSurahPage.push(77);
    arrSurahPage.push(106);
    arrSurahPage.push(128);
    arrSurahPage.push(151);
    arrSurahPage.push(177);
    arrSurahPage.push(187);
    arrSurahPage.push(208);
    arrSurahPage.push(221);
    arrSurahPage.push(235);
    arrSurahPage.push(249);
    arrSurahPage.push(255);
    arrSurahPage.push(262);
    arrSurahPage.push(267);
    arrSurahPage.push(282);
    arrSurahPage.push(293);
    arrSurahPage.push(305);
    arrSurahPage.push(312);
    arrSurahPage.push(322);
    arrSurahPage.push(332);
    arrSurahPage.push(342);
    arrSurahPage.push(350);
    arrSurahPage.push(359);
    arrSurahPage.push(367);
    arrSurahPage.push(377);
    arrSurahPage.push(385);
    arrSurahPage.push(396);
    arrSurahPage.push(404);
    arrSurahPage.push(411);
    arrSurahPage.push(415);
    arrSurahPage.push(418);
    arrSurahPage.push(428);
    arrSurahPage.push(434);
    arrSurahPage.push(440);
    arrSurahPage.push(446);
    arrSurahPage.push(453);
    arrSurahPage.push(458);
    arrSurahPage.push(467);
    arrSurahPage.push(477);
    arrSurahPage.push(483);
    arrSurahPage.push(489);
    arrSurahPage.push(496);
    arrSurahPage.push(499);
    arrSurahPage.push(502);
    arrSurahPage.push(507);
    arrSurahPage.push(511);
    arrSurahPage.push(515);
    arrSurahPage.push(518);
    arrSurahPage.push(520);
    arrSurahPage.push(523);
    arrSurahPage.push(526);
    arrSurahPage.push(528);
    arrSurahPage.push(531);
    arrSurahPage.push(534);
    arrSurahPage.push(537);
    arrSurahPage.push(542);
    arrSurahPage.push(545);
    arrSurahPage.push(549);
    arrSurahPage.push(551);
    arrSurahPage.push(553);
    arrSurahPage.push(554);
    arrSurahPage.push(556);
    arrSurahPage.push(558);
    arrSurahPage.push(560);
    arrSurahPage.push(562);
    arrSurahPage.push(564);
    arrSurahPage.push(566);
    arrSurahPage.push(568);
    arrSurahPage.push(570);
    arrSurahPage.push(572);
    arrSurahPage.push(574);
    arrSurahPage.push(575);
    arrSurahPage.push(577);
    arrSurahPage.push(578);
    arrSurahPage.push(580);
    arrSurahPage.push(582);
    arrSurahPage.push(583);
    arrSurahPage.push(585);
    arrSurahPage.push(586);
    arrSurahPage.push(587);
    arrSurahPage.push(587);
    arrSurahPage.push(589);
    arrSurahPage.push(590);
    arrSurahPage.push(591);
    arrSurahPage.push(591);
    arrSurahPage.push(592);
    arrSurahPage.push(593);
    arrSurahPage.push(594);
    arrSurahPage.push(595);
    arrSurahPage.push(595);
    arrSurahPage.push(596);
    arrSurahPage.push(596);
    arrSurahPage.push(597);
    arrSurahPage.push(597);
    arrSurahPage.push(598);
    arrSurahPage.push(598);
    arrSurahPage.push(599);
    arrSurahPage.push(599);
    arrSurahPage.push(600);
    arrSurahPage.push(600);
    arrSurahPage.push(601);
    arrSurahPage.push(601);
    arrSurahPage.push(601);
    arrSurahPage.push(602);
    arrSurahPage.push(602);
    arrSurahPage.push(602);
    arrSurahPage.push(603);
    arrSurahPage.push(603);
    arrSurahPage.push(603);
    arrSurahPage.push(604);
    arrSurahPage.push(604);
    arrSurahPage.push(604);
    for (var i = arrSurahPage.length - 1; i > 0; i--) {
      if (arrSurahPage[i] == iPage) return i;
    }
    return -1;
  }
  getPageFromSurah(iSurah) {
    var nNumSuras = 114;
    while (iSurah < 1) iSurah += nNumSuras;
    while (iSurah > nNumSuras) iSurah -= nNumSuras;
    var arrSurahPage = [];
    arrSurahPage.push(-1); //one based indexes
    arrSurahPage.push(1);
    arrSurahPage.push(2);
    arrSurahPage.push(50);
    arrSurahPage.push(77);
    arrSurahPage.push(106);
    arrSurahPage.push(128);
    arrSurahPage.push(151);
    arrSurahPage.push(177);
    arrSurahPage.push(187);
    arrSurahPage.push(208);
    arrSurahPage.push(221);
    arrSurahPage.push(235);
    arrSurahPage.push(249);
    arrSurahPage.push(255);
    arrSurahPage.push(262);
    arrSurahPage.push(267);
    arrSurahPage.push(282);
    arrSurahPage.push(293);
    arrSurahPage.push(305);
    arrSurahPage.push(312);
    arrSurahPage.push(322);
    arrSurahPage.push(332);
    arrSurahPage.push(342);
    arrSurahPage.push(350);
    arrSurahPage.push(359);
    arrSurahPage.push(367);
    arrSurahPage.push(377);
    arrSurahPage.push(385);
    arrSurahPage.push(396);
    arrSurahPage.push(404);
    arrSurahPage.push(411);
    arrSurahPage.push(415);
    arrSurahPage.push(418);
    arrSurahPage.push(428);
    arrSurahPage.push(434);
    arrSurahPage.push(440);
    arrSurahPage.push(446);
    arrSurahPage.push(453);
    arrSurahPage.push(458);
    arrSurahPage.push(467);
    arrSurahPage.push(477);
    arrSurahPage.push(483);
    arrSurahPage.push(489);
    arrSurahPage.push(496);
    arrSurahPage.push(499);
    arrSurahPage.push(502);
    arrSurahPage.push(507);
    arrSurahPage.push(511);
    arrSurahPage.push(515);
    arrSurahPage.push(518);
    arrSurahPage.push(520);
    arrSurahPage.push(523);
    arrSurahPage.push(526);
    arrSurahPage.push(528);
    arrSurahPage.push(531);
    arrSurahPage.push(534);
    arrSurahPage.push(537);
    arrSurahPage.push(542);
    arrSurahPage.push(545);
    arrSurahPage.push(549);
    arrSurahPage.push(551);
    arrSurahPage.push(553);
    arrSurahPage.push(554);
    arrSurahPage.push(556);
    arrSurahPage.push(558);
    arrSurahPage.push(560);
    arrSurahPage.push(562);
    arrSurahPage.push(564);
    arrSurahPage.push(566);
    arrSurahPage.push(568);
    arrSurahPage.push(570);
    arrSurahPage.push(572);
    arrSurahPage.push(574);
    arrSurahPage.push(575);
    arrSurahPage.push(577);
    arrSurahPage.push(578);
    arrSurahPage.push(580);
    arrSurahPage.push(582);
    arrSurahPage.push(583);
    arrSurahPage.push(585);
    arrSurahPage.push(586);
    arrSurahPage.push(587);
    arrSurahPage.push(587);
    arrSurahPage.push(589);
    arrSurahPage.push(590);
    arrSurahPage.push(591);
    arrSurahPage.push(591);
    arrSurahPage.push(592);
    arrSurahPage.push(593);
    arrSurahPage.push(594);
    arrSurahPage.push(595);
    arrSurahPage.push(595);
    arrSurahPage.push(596);
    arrSurahPage.push(596);
    arrSurahPage.push(597);
    arrSurahPage.push(597);
    arrSurahPage.push(598);
    arrSurahPage.push(598);
    arrSurahPage.push(599);
    arrSurahPage.push(599);
    arrSurahPage.push(600);
    arrSurahPage.push(600);
    arrSurahPage.push(601);
    arrSurahPage.push(601);
    arrSurahPage.push(601);
    arrSurahPage.push(602);
    arrSurahPage.push(602);
    arrSurahPage.push(602);
    arrSurahPage.push(603);
    arrSurahPage.push(603);
    arrSurahPage.push(603);
    arrSurahPage.push(604);
    arrSurahPage.push(604);
    arrSurahPage.push(604);
    return arrSurahPage[iPage];
  }
  getJuzuFromPage(iPage) {
    var nNumPages = this.getNumPages();
    while (iPage < 1) iPage += nNumPages;
    while (iPage > nNumPages) iPage -= nNumPages;
    if (iPage < 22) return 1;
    if (iPage >= 582) return 30;
    return Math.floor((iPage - 2) / 20) + 1;
  }
  getPageFromJuzu(iJuzu) {
    var nNumJuzu = 30;
    while (iJuzu < 1) iJuzu += nNumJuzu;
    while (iJuzu > nNumJuzu) iJuzu -= nNumJuzu;
    if (iJuzu == 1) return 1;
    return 2 + (iJuzu - 1) * 20;
  }
  getNumPages() {
    return 604; // todo: read from db
  }
  getPage(iPage) {
    console.log("loading quran page # " + iPage);
    var nNumPages = this.getNumPages();
    while (iPage < 1) iPage += nNumPages;
    while (iPage > nNumPages) iPage -= nNumPages;
    if (iPage != 3) {
      var retPage = [];
      retPage.push(new Ayah(-3, -3, "هنا ستكون الآيات لصفحة " + iPage));
      return new QuranPage(iPage, retPage);
    }
    // return array of pbject of Ayah for page,
    var retPage = [];
    retPage.push(
      new Ayah(
        6,
        6,
        "إِنَّ الَّذِينَ كَفَرُوا سَوَاءٌ عَلَيْهِمْ أَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ"
      )
    );
    retPage.push(
      new Ayah(
        7,
        7,
        "خَتَمَ اللَّهُ عَلَىٰ قُلُوبِهِمْ وَعَلَىٰ سَمْعِهِمْ وَعَلَىٰ أَبْصَارِهِمْ غِشَاوَةٌ ۖ وَلَهُمْ عَذَابٌ عَظِيمٌ"
      )
    );
    retPage.push(
      new Ayah(
        8,
        8,
        "وَمِنَ النَّاسِ مَن يَقُولُ آمَنَّا بِاللَّهِ وَبِالْيَوْمِ الْآخِرِ وَمَا هُم بِمُؤْمِنِينَ"
      )
    );
    retPage.push(
      new Ayah(
        9,
        9,

        "يُخَادِعُونَ اللَّهَ وَالَّذِينَ آمَنُوا وَمَا يَخْدَعُونَ إِلَّا أَنفُسَهُمْ وَمَا يَشْعُرُونَ"
      )
    );
    retPage.push(
      new Ayah(
        10,
        10,

        "فِي قُلُوبِهِم مَّرَضٌ فَزَادَهُمُ اللَّهُ مَرَضًا وَلَهُمْ عَذَابٌ أَلِيمٌ بِمَا كَانُوا يَكْذِبُونَ"
      )
    );
    retPage.push(
      new Ayah(
        11,
        11,

        "وَإِذَا قِيلَ لَهُمْ لَا تُفْسِدُوا فِي الْأَرْضِ قَالُوا إِنَّمَا نَحْنُ مُصْلِحُونَ"
      )
    );
    retPage.push(
      new Ayah(
        12,
        12,
        "أَلَا إِنَّهُمْ هُمُ الْمُفْسِدُونَ وَلَٰكِن لَّا يَشْعُرُونَ"
      )
    );
    retPage.push(
      new Ayah(
        13,
        13,

        "وَإِذَا قِيلَ لَهُمْ آمِنُوا كَمَا آمَنَ النَّاسُ قَالُوا أَنُؤْمِنُ كَمَا آمَنَ السُّفَهَاءُ أَلَا إِنَّهُمْ هُمُ السُّفَهَاءُ وَلَٰكِن لَّا يَعْلَمُونَ"
      )
    );
    retPage.push(
      new Ayah(
        14,
        14,

        "وَإِذَا لَقُوا الَّذِينَ آمَنُوا قَالُوا آمَنَّا وَإِذَا خَلَوْا إِلَىٰ شَيَاطِينِهِمْ قَالُوا إِنَّا مَعَكُمْ إِنَّمَا نَحْنُ مُسْتَهْزِئُونَ"
      )
    );
    retPage.push(
      new Ayah(
        15,
        15,

        "اللَّهُ يَسْتَهْزِئُ بِهِمْ وَيَمُدُّهُمْ فِي طُغْيَانِهِمْ يَعْمَهُونَ"
      )
    );
    retPage.push(
      new Ayah(
        16,
        16,

        "أُولَٰئِكَ الَّذِينَ اشْتَرَوُا الضَّلَالَةَ بِالْهُدَىٰ فَمَا رَبِحَت تِّجَارَتُهُمْ وَمَا كَانُوا مُهْتَدِينَ"
      )
    );
    return new QuranPage(iPage, retPage);
  }
}
