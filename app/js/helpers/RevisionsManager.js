import Revision from "./Revision.js";
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
}
