var MiscUtilities = {
  constructReplaceUsingRegexFromStr: function (str) {
    let prepFn = function (str) {
      return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    };
    return new RegExp(prepFn(str), "g");
  },
  getComposedRegex: function (...regexes) {
    return new RegExp(regexes.map((regex) => regex.source).join("|"));
  },
  convertToArabicNumbers: function (strA) {
    // const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
    // const e2a = s => s.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);

    // const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
    // const a2e = s => s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));

    // const p2a = s => s.replace(/[۰-۹]/g, d => '٠١٢٣٤٥٦٧٨٩'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]);
    // const a2p = s => s.replace(/[٠-٩]/g, d => '۰۱۲۳۴۵۶۷۸۹'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]);

    // console.log(e2p("asdf01234")); // asdf۱۲۳۴
    // console.log(e2a("asdf01234"));// asdf١٢٣٤
    // console.log(p2e("asdf۰۱۲۳۴")) ;// asdf1234
    // console.log(a2e("asdf٠١٢٣٤")) ;// asdf1234
    // console.log(p2a("asdf۰۱۲۳۴")) ;// asdf١٢٣٤
    // console.log(a2p("asdf٠١٢٣٤")) ;// asdf۱۲۳۴

    const a2e = (s) =>
      s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());
    const p2e = (s) =>
      s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
    var strRet = a2e(strA);
    strRet = p2e(strRet);
    return strRet;
  },
  replaceStringParts: function (strTxt, strSrc, strReplace) {
    let parts = strSrc.split(" ");
    let destParts = strTxt.split(" ");
    if (parts.length == 0 || destParts.length == 0) return strTxt;
    // find the parts in order but using Levenshtein distance
    let iDest = 0;
    while (iDest < destParts.length) {
      let dist = MiscUtilities.computeLevenshteinDist(
        destParts[iDest],
        parts[0]
      );
      if (dist == 0 || dist / parts[0].length < 0.4) {
        let bDiff = false;
        let iStrt = iDest;
        let iPart = 1;
        iDest++;
        while (iDest < destParts.length && iPart < parts.length) {
          let dist = MiscUtilities.computeLevenshteinDist(
            destParts[iDest],
            parts[iPart]
          );
          if (dist == 0 || dist / parts[iPart].length < 0.4) {
            iDest++;
            iPart++;
          } else {
            bDiff = true;
            break;
          }
        }
        if (bDiff == false && iPart >= parts.length) {
          // full match found, replace with new str
          destParts[iStrt] = strReplace;
          for (var i = 1; i < parts.length; i++) {
            destParts[iStrt + i] = " ";
          }
        }
      } else {
        iDest++; // no start match found
      }
    }
    let strRet = destParts.join(" ");
    strRet = strRet.replace(/  +/g, " "); // remove repeated spaces
    return strRet;
  },
  normalizeString: function (str) {
    var bIsEnglish = /[a-z]/.test(str);
    var to = bIsEnglish ? "to" : "حتي";

    var text = str.replace(/[\t\r\n']/g, " ").toLowerCase();

    text = text.replace(/[-؟؛..,،;:_]/g, " " + to + " ");

    //remove special characters & tashkeel
    //text = text.replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669])/g, "");
    text = text.replace(
      /[\u064B-\u065F\u0611-\u061A\u06D6-\u06ED\u0640\u0670]/g,
      ""
    );
    //normalize Arabic
    text = text.replace(/(آ|إ|أ)/g, "ا");
    text = text.replace(/(ة)/g, "ه");
    text = text.replace(/(ئ|ؤ)/g, "ء");
    text = text.replace(/(ى)/g, "ي");
    text = text.replace(/(ـ)/g, "");

    //convert arabic numerals to english counterparts.
    text = MiscUtilities.convertToArabicNumbers(text);
    if (bIsEnglish) {
      let shortForm = [
        "",
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
        "11th",
        "12th",
        "13th",
        "14th",
        "15th",
        "16th",
        "17th",
        "18th",
        "19th",
        "20th",
        "21st",
        "22nd",
        "23rd",
        "24th",
        "25th",
        "26th",
        "27th",
        "28th",
        "29th",
        "30th",
      ];
      let longForm = [
        "",
        "first ",
        "second ",
        "third ",
        "fourth ",
        "fifth ",
        "sixth ",
        "seventh ",
        "eighth ",
        "ninth ",
        "tenth ",
        "eleventh ",
        "twelfth ",
        "thirteenth ",
        "fourteenth ",
        "fifteenth ",
        "sixteenth ",
        "seventeenth ",
        "eighteenth ",
        "nineteenth ",
        "twentieth ",
        "twenty first ",
        "twenty second ",
        "twenty third ",
        "twenty fourth ",
        "twenty fifth ",
        "twenty sixth ",
        "twenty seventh ",
        "twenty eighth ",
        "twenty ninth ",
        "thirtieth ",
        "",
      ];
      for (var i = 1; i < shortForm.length; i++) {
        text = text.replace(
          MiscUtilities.constructReplaceUsingRegexFromStr(shortForm[i]),
          longForm[i]
        );
      }
    }

    text = text.replace(/(\d+)/g, " $1 "); // make sure numbers have spaces around them
    text = text.replace(/  +/g, " "); // remove repeated spaces

    return text;
  },
  removeLeadingAlefLam: function (strTxtNormalized) {
    //assumes normalized string
    let strRet = strTxtNormalized.replace(/ ال/g, " ");
    if (strRet.startsWith("ال")) {
      strRet = strRet.substring(2);
    }
    return strRet;
  },
  removeThe: function (strTxtNormalized) {
    //assumes normalized string
    let strRet = strTxtNormalized.replace(/ the /g, " ");
    if (strRet.startsWith("the")) {
      strRet = strRet.substring(3);
    }
    return strRet;
  },
  computeLevenshteinDist: function (strA, strB) {
    // for all i and j, d[i,j] will hold the Levenshtein distance between
    // the first i characters of s and the first j characters of t
    let m = strA.length;
    let n = strB.length;
    let d = Array(m + 1)
      .fill(null)
      .map(() => Array(n + 1));

    for (var i = 0; i <= m; i++) for (var j = 0; j <= n; j++) d[i][j] = 0;

    // source prefixes can be transformed into empty string by
    // dropping all characters
    for (var i = 0; i <= m; i++) d[i][0] = i;

    // target prefixes can be reached from empty source prefix
    // by inserting every character
    for (var j = 0; j <= n; j++) d[0][j] = j;

    for (var i = 1; i <= m; i++)
      for (var j = 1; j <= n; j++) {
        var substitutionCost = 1;
        if (strA[i - 1] == strB[j - 1]) substitutionCost = 0;

        d[i][j] = Math.min(
          Math.min(
            d[i - 1][j] + 1, // deletion
            d[i][j - 1] + 1
          ), // insertion
          d[i - 1][j - 1] + substitutionCost
        ); // substitution
      }

    return d[m][n];
  },
  lookupStrInArr: function (strNormalized, arrNormalized, nMaxErrDist) {
    for (var i = 0; i < arrNormalized.length; i++) {
      if (strNormalized == arrNormalized[i]) return { indx: i, dist: 0 };
    }
    if (nMaxErrDist == 0) return { indx: -1, dist: 1000 };
    var minDist = 1000;
    var minIndx = -1;
    for (var i = 0; i < arrNormalized.length; i++) {
      if (arrNormalized[i].length == 0) continue;
      var dist = MiscUtilities.computeLevenshteinDist(
        strNormalized,
        arrNormalized[i]
      );
      if (dist < minDist) {
        minDist = dist;
        minIndx = i;
      }
    }
    if (minDist <= nMaxErrDist) return { indx: minIndx, dist: minDist };
    return { indx: -1, dist: 1000 };
  },
  lookupStrIn2DArr: function (strNormalized, arrNormalized, nMaxErrDist) {
    for (var i = 0; i < arrNormalized.length; i++) {
      for (var j = 0; j < arrNormalized[i].length; j++) {
        if (strNormalized == arrNormalized[i][j]) return { indx: i, dist: 0 };
      }
    }
    if (nMaxErrDist == 0) return { indx: -1, dist: 1000 };
    var minDist = 1000;
    var minIndx = -1;
    for (var i = 0; i < arrNormalized.length; i++) {
      for (var j = 0; j < arrNormalized[i].length; j++) {
        if (arrNormalized[i][j].length == 0) continue;
        var dist = MiscUtilities.computeLevenshteinDist(
          strNormalized,
          arrNormalized[i][j]
        );
        if (dist < minDist) {
          minDist = dist;
          minIndx = i;
        }
      }
    }
    if (minDist <= nMaxErrDist) return { indx: minIndx, dist: minDist };
    return { indx: -1, dist: 1000 };
  },
};
export default MiscUtilities;
