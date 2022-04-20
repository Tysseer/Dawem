import Revision from "./Revision.js";
import QuranIndexer from "./QuranIndexer.js";
export default class RevisionsManager {
  // loads from db, saves to db
  constructor() {
    this.m_loadedRevisions = [];
  }
  getNumRevisions() {
    return this.m_loadedRevisions.length;
  }
  getPastDate(nNumDaysBack) {
    return new Date(new Date().getTime() - nNumDaysBack * 24 * 60 * 60 * 1000);
  }
  getNewRevisionId() {
    var iMaxId = 0;
    for (var i = 0; i < this.m_loadedRevisions.length; i++) {
      if (this.m_loadedRevisions[i].id > iMaxId)
        iMaxId = this.m_loadedRevisions[i].id;
    }
    return iMaxId + 1;
  }
  updateAllRevisions() {
    for (var i = 0; i < this.m_loadedRevisions.length; i++) {
      this.m_loadedRevisions[i].updateNumDays();
    }
  }
  ensureUniqueIds() {
    let id = 1;
    for (var i = 0; i < this.m_loadedRevisions.length; i++) {
      this.m_loadedRevisions[i].id = id++;
    }
  }
  removeByID(id) {
    var newRevArr = [];
    for (var i = 0; i < this.m_loadedRevisions.length; i++) {
      if (this.m_loadedRevisions[i].id != id) {
        newRevArr.push(this.m_loadedRevisions[i]); //currev[i].clone()
        continue;
      }
    }
    this.m_loadedRevisions = newRevArr;
  }
  getBadgesStates() {
    if (this.m_loadedRevisions.length == 0) return [false, false, false];
    var bIsToday = false;
    var maxDays = 0;
    for (var i = 0; i < this.m_loadedRevisions.length; i++) {
      this.m_loadedRevisions[i].updateNumDays();
      if (this.m_loadedRevisions[i].numDays > maxDays)
        maxDays = this.m_loadedRevisions[i].numDays;
      if (this.m_loadedRevisions[i].numDays == 0) bIsToday = true;
    }

    var bIsWeek = maxDays <= 7;
    var bIsMonth = maxDays <= 30;

    bIsToday = bIsToday && this.m_loadedRevisions.length >= 3;
    bIsWeek = bIsWeek && this.m_loadedRevisions.length >= 7;
    bIsMonth = bIsMonth && this.m_loadedRevisions.length >= 10;
    return [bIsToday, bIsMonth, bIsWeek];
  }

  sortRevisions() {
    this.updateAllRevisions();
    this.ensureUniqueIds();
    this.m_loadedRevisions.sort(function (a, b) {
      return b.numDays - a.numDays;
    });
  }
  getAsStringArr() {
    var retArr = [];
    retArr.push("ver === 1");

    retArr.push("num_rev === " + this.m_loadedRevisions.length);

    for (var i = 0; i < this.m_loadedRevisions.length; i++) {
      retArr.push(...this.m_loadedRevisions[i].getAsStringArr());
    }
    return retArr;
  }
  fillFromStrArr(strArr) {
    let iStrt = 0;
    let version = parseInt(strArr[iStrt++].split("===")[1]);
    if (version == 1) {
      let numRev = parseInt(strArr[iStrt++].split("===")[1]);
      var newRevs = [];

      for (var i = 0; i < numRev; i++) {
        var rev = new Revision();
        let iRet = rev.fillFromStringArr(strArr, iStrt);
        if (iRet <= 0) return 0;
        newRevs.push(rev);
        iStrt += iRet;
      }
      this.m_loadedRevisions = newRevs;
      return numRev;
    } else {
      return 0;
    }
  }
  loadTestRevisions(strLang) {
    this.quranIndexer = new QuranIndexer();
    let rev = new Revision();
    rev.id = this.getNewRevisionId();
    rev.title =
      strLang == "ar" ? "الانعام حتى الآية ٥٠" : "The Cattle verses 1 to 50";
    rev.progress = 0;
    rev.strt = this.quranIndexer.getArrSurahAyahStart(6);
    rev.end = rev.strt + 49;
    rev.dateofLastRevision = this.getPastDate(15);
    rev.updateNumDays();
    this.m_loadedRevisions.push(rev);

    rev = new Revision();
    rev.id = this.getNewRevisionId();
    rev.title =
      strLang == "ar" ? "النصف الأخير من الأعراف" : "The Heights (last half)";
    rev.progress = 0;
    rev.strt = this.quranIndexer.getArrSurahAyahStart(7) + 100;
    rev.end = this.quranIndexer.getArrSurahAyahStart(7) + 205;
    rev.dateofLastRevision = this.getPastDate(10);
    rev.updateNumDays();
    this.m_loadedRevisions.push(rev);

    rev = new Revision();
    rev.id = this.getNewRevisionId();
    rev.title =
      strLang == "ar"
        ? "(واتل عليهم نبأ ابني آدم..)"
        : "(The story of the two sons of Adam)";
    rev.progress = 0;
    rev.strt = this.quranIndexer.getArrSurahAyahStart(5) + 26;
    rev.end = this.quranIndexer.getArrSurahAyahStart(5) + 35;
    rev.dateofLastRevision = this.getPastDate(8);
    rev.updateNumDays();
    this.m_loadedRevisions.push(rev);

    rev = new Revision();
    rev.id = this.getNewRevisionId();
    rev.title = strLang == "ar" ? "سورة الكهف" : "The Cave";
    rev.progress = 0;
    rev.strt = this.quranIndexer.getPageAyahRange(500)[0];
    rev.end = this.quranIndexer.getArrSurahAyahStart(504)[1];
    rev.dateofLastRevision = this.getPastDate(7);
    rev.updateNumDays();
    this.m_loadedRevisions.push(rev);

    rev = new Revision();
    rev.id = this.getNewRevisionId();
    rev.title = strLang == "ar" ? "من صفحة 500 إلى 504" : "Pages 500 to 504";
    rev.progress = 0;
    rev.strt = this.quranIndexer.getPageAyahRange(500)[0];
    rev.end = this.quranIndexer.getPageAyahRange(504)[1];
    rev.dateofLastRevision = this.getPastDate(4);
    rev.updateNumDays();
    this.m_loadedRevisions.push(rev);

    rev = new Revision();
    rev.id = this.getNewRevisionId();
    rev.title = strLang == "ar" ? "سورة يس" : "Yaseen";
    rev.progress = 0;
    rev.strt = this.quranIndexer.getPageAyahRange(500)[0];
    rev.end = this.quranIndexer.getPageAyahRange(504)[1];
    rev.dateofLastRevision = this.getPastDate(2);
    rev.updateNumDays();
    this.m_loadedRevisions.push(rev);

    rev = new Revision();
    rev.id = this.getNewRevisionId();
    rev.title = strLang == "ar" ? "جزء عم" : "Last Juzuu";
    rev.progress = 0;
    rev.strt = this.quranIndexer.getPageAyahRange(582)[0];
    rev.end = this.quranIndexer.getPageAyahRange(604)[1];
    rev.dateofLastRevision = this.getPastDate(2);
    rev.updateNumDays();
    this.m_loadedRevisions.push(rev);

    rev = new Revision();
    rev.id = this.getNewRevisionId();
    rev.title = strLang == "ar" ? "واجب القرآن" : "َQuran Homework";
    rev.progress = 0;
    rev.strt = this.quranIndexer.getPageAyahRange(562)[0];
    rev.end = this.quranIndexer.getPageAyahRange(581)[1];
    rev.dateofLastRevision = this.getPastDate(0);
    rev.updateNumDays();
    this.m_loadedRevisions.push(rev);

    rev = new Revision();
    rev.id = this.getNewRevisionId();
    rev.title = strLang == "ar" ? "سورة البقرة" : "َThe Cow";
    rev.progress = 0;
    rev.strt = this.quranIndexer.getArrSurahAyahStart(2);
    rev.end = this.quranIndexer.getArrSurahAyahStart(3) - 1;
    rev.dateofLastRevision = this.getPastDate(0);
    rev.updateNumDays();
    this.m_loadedRevisions.push(rev);

    rev = new Revision();
    rev.id = this.getNewRevisionId();
    rev.title = strLang == "ar" ? "سورة الملك" : "َSurah Al-Mulk";
    rev.progress = 0;
    rev.strt = this.quranIndexer.getArrSurahAyahStart(67);
    rev.end = this.quranIndexer.getArrSurahAyahStart(68) - 1;
    rev.dateofLastRevision = this.getPastDate(0);
    rev.updateNumDays();
    this.m_loadedRevisions.push(rev);
  }
}
