export default class Revision {
  constructor(id, title, progress, strt, end, numDays) {
    this.id = id;
    this.title = title;
    this.progress = progress;
    this.strt = strt;
    this.end = end;
    this.numDays = numDays;
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
