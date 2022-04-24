export default class Revision {
  constructor() {
    this.id = -1;
    this.title = "";
    this.progress = 0;
    this.strt = 0;
    this.end = 0;
    this.dateofLastRevision = new Date();
    (this.numDays = 0), this.updateNumDays();
    this.lastAyahRead = -1;
  }
  fillFromSerializedObj(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.progress = obj.progress;
    this.strt = obj.strt;
    this.end = obj.end;
    this.dateofLastRevision = new Date(obj.dateofLastRevision);
    this.updateNumDays();
    if (obj.hasOwnProperty("lastAyahRead"))
      this.lastAyahRead = obj.lastAyahRead;
    else this.lastAyahRead = -1;
  }
  updateNumDays() {
    this.numDays = Math.round(
      (new Date().getTime() - this.dateofLastRevision.getTime()) /
        (1000 * 60 * 60 * 24)
    );
  }
  updateProgress(iAyahGlobal) {
    this.lastAyahRead = iAyahGlobal;

    if (this.end == this.strt) this.progress = 50;
    else {
      if (iAyahGlobal > this.strt) {
        if (iAyahGlobal < this.end) {
          this.progress = Math.floor(
            (100 * (iAyahGlobal - this.strt)) / (this.end - this.strt)
          );
        } else {
          this.progress = 100;
        }
      } else {
        this.progress = 0;
      }
    }
  }
  getProgressAyah() {
    if (this.lastAyahRead != -1) return this.lastAyahRead;
    if (this.progress <= 0) return this.strt;
    if (this.progress >= 100) return this.end;
    if (this.end == this.strt) return this.strt;
    var shift = (this.progress / 100.0) * (this.end - this.strt);
    return Math.floor(shift + -this.strt);
  }
  makeRevisionDateNow() {
    this.dateofLastRevision = new Date();
    this.numDays = 0;
    this.progress = 0;
  }
  getRevisionTitle() {
    var strTitle = this.title;
    // if (strTitle.length > 14) {
    //   strTitle = strTitle.substring(0, 11);
    //   strTitle += "...";
    // }
    return strTitle;
  }
  getNumdaysText() {
    var strNumDays = "";
    if (this.numDays >= 1000) strNumDays = "  ∞ ";
    else if (this.numDays < 10) strNumDays = "  " + this.numDays + "";
    //one digit
    else if (this.numDays < 100) strNumDays = " " + this.numDays + ""; //two digits
    if (this.numDays < 1) strNumDays = "";
    return strNumDays;
  }
  getAsStringArr() {
    var ret = [];
    ret.push("ver === 1");
    ret.push("lines === 10");
    ret.push("id === " + this.id);
    ret.push("title === " + this.title);
    ret.push("progress === " + this.progress);
    ret.push("strt === " + this.strt);
    ret.push("end === " + this.end);
    ret.push("dateofLastRevision === " + this.dateofLastRevision.toString());
    ret.push("numDays === " + this.numDays);
    ret.push("lastAyahRead === " + this.lastAyahRead);
    return ret;
  }
  fillFromStringArr(strArr, iStrt) {
    /* ver1 revision structure as of 4/4/2022:
    ver = 1
    numLines=10
    rev.id, // int
    rev.title,// str
    rev.progress,//real
    rev.strt,//int
    rev.end,//int
    rev.dateofLastRevision,// Date() object
    rev.numDays,//int
    rev.lastAyahRead,//int
    */
    try {
      let version = parseInt(strArr[iStrt++].split("===")[1]);
      if (version == 1) {
        let numLines = parseInt(strArr[iStrt++].split("===")[1]);
        var iConsumed = 10; // expected
        if (numLines != iConsumed) return -3;
        this.id = parseInt(strArr[iStrt++].split("===")[1]);
        this.title = strArr[iStrt++].split("===")[1];
        this.progress = parseFloat(strArr[iStrt++].split("===")[1]);
        this.strt = parseInt(strArr[iStrt++].split("===")[1]);
        this.end = parseInt(strArr[iStrt++].split("===")[1]);
        this.dateofLastRevision = new Date(strArr[iStrt++].split("===")[1]);
        this.numDays = parseInt(strArr[iStrt++].split("===")[1]);
        this.lastAyahRead = parseInt(strArr[iStrt++].split("===")[1]);
        return iConsumed;
      } else {
        return -2; //unkown version
      }
    } catch (error) {
      console.log("error : " + error);
      return -1;
    }
  }
}
