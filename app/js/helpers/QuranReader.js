import Ayah from "./Ayah";
import QuranPage from "./QuranPage";
import QuranIndexer from "./QuranIndexer";
export default class QuranReader {
  constructor() {
    this.indexer = new QuranIndexer();
  }

  getPage(iPage) {
    console.log("loading quran page # " + iPage);
    var nNumPages = this.indexer.getNumPages();
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
