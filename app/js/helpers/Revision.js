export default class Revision {
  constructor(
    id = 0,
    title = "",
    progress = 0,
    strt = 0,
    end = 0,
    dateofLastRevision = new Date()
  ) {
    this.id = id;
    this.title = title;
    this.progress = progress;
    this.strt = strt;
    this.end = end;
    this.dateofLastRevision = dateofLastRevision;
    this.updateNumDays();
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
    if (strTitle.length > 14) {
      strTitle = strTitle.substring(0, 11);
      strTitle += "...";
    }
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
}
