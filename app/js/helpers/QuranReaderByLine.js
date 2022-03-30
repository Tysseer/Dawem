import QuranPage from "./QuranPage";
import QuranIndexer from "./QuranIndexer";
import allLines from "./quranLines";

export default class QuranReaderByLine {
  constructor() {
    this.indexer = new QuranIndexer();
  }

  getPage(iPage) {
    iPage = this.indexer.secureIndexRange(iPage, this.indexer.getNumPages());

    [strt, end] = this.indexer.getLinesFromPage(iPage);

    var retPage = [];
    let txt = "";
    for (var i = strt; i <= end; i++) {
      var ayat = [];

      let allAyat = allLines[i].lineTxt.split(" ");
      allAyat.splice(0, 1);
      allAyat.splice(allAyat.length - 1, 1);
      allAyat.forEach((element, index) => {
        let x = element.split("");
        let y = x.filter(
          (i) =>
            i == "١" ||
            i == "٢" ||
            i == "٣" ||
            i == "٤" ||
            i == "٥" ||
            i == "٦" ||
            i == "٧" ||
            i == "٨" ||
            i == "٩"
        );
        if (y.length != 0) {
          ayat.push({
            txt: txt,
            num: element,
          });
          txt = "";
        } else if (index == allAyat.length - 1) {
          txt += element + " ";
          ayat.push({
            txt: txt,
          });
        } else {
          txt += element + " ";
        }

        if (index == allAyat.length - 1) {
        }
      });
      allLines[i]["allAyat"] = ayat;
      retPage.push(allLines[i]);
    }
    return new QuranPage(iPage, retPage);
  }
}
