import MiscUtilities from "./MiscUtilities";
import QuranIndexer from "./QuranIndexer";
import QuranQueryDictionary from "./QuranQueryDictionary";
const tokenTypes = Object.freeze({
  unkown: 0,
  surahWord: 1, // the word "surah" or "chapter" or سورة
  juzuuWord: 2, // the word "juzuu" or "part" or جزء
  pageWord: 3, // the word "page" or صفحة
  ayahWord: 4,
  fromWord: 5,
  toWord: 6,
  endWord: 7,
  number: 8,
  surahID: 9, // index of surah
  juzuuID: 10, //index of juzuu
  pageID: 11,
  ayahID: 12,
  exactLocation: 13, //surah+ayah
  ignore: 1000,
});
const tokenTypesStr = [
  "ignore",
  "surahWord",
  "juzuuWord",
  "pageWord",
  "ayahWord",
  "fromWord",
  "toWord",
  "endWord",
  "number",
  "surahID",
  "juzuuID",
  "pageID",
  "ayahID",
  "exactLocation",
  "unkown",
];
class Token {
  constructor(tokType = tokenTypes.unkown, tokVal = null) {
    this.tokType = tokType;
    this.tokVal = tokVal;
  }
  getTokAsStr() {
    return "(" + tokenTypesStr[this.tokType] + " , " + this.tokVal + ")";
  }
}
class Chunk {
  constructor(id = -1, arr = []) {
    this.chunkID = id;
    this.chunkArr = arr;
  }
  getChunkAsStr() {
    let strRet =
      "chunk[" + this.chunkID + "] (" + this.chunkArr.length + " tokens): ";
    for (let j = 0; j < this.chunkArr.length; j++) {
      strRet += this.chunkArr[j].getTokAsStr() + "\t";
    }
    return strRet;
  }
}
class Location {
  constructor(surahIndx = -1, ayahIndx = -1) {
    this.surahIndx = surahIndx;
    this.ayahIndx = ayahIndx;
  }
}
class IndexInChunk {
  constructor(iChunk = -1, jTok = -1, tok = null) {
    this.iChunk = iChunk;
    this.jTok = jTok;
    this.tok = tok;
  }
}
class SearchTextParser {
  constructor() {
    this.quranInfo = new QuranIndexer();
    this.quranDictionary = new QuranQueryDictionary();
    this.quranDictionary.fillDictionary(this.quranInfo, tokenTypes);
    this.chunks = [];
  }

  getChunksArrAsStr() {
    let strRet = " " + this.chunks.length + " chunks\n";
    for (var i = 0; i < this.chunks.length; i++) {
      strRet += this.chunks[i].getChunkAsStr() + "\n";
    }
    return strRet;
  }

  findTokensInChunk(iC, arrTokTypes) {
    let retIndx = [],
      ret = [];
    for (var i = 0; i < this.chunks[iC].chunkArr.length; i++) {
      for (var j = 0; j < arrTokTypes.length; j++) {
        if (this.chunks[iC].chunkArr[i].tokType == arrTokTypes[j]) {
          retIndx.push(i);
          ret.push(arrTokTypes[j]);
        }
      }
    }
    return { types: ret, indeces: retIndx };
  }
  classifyToken(token) {
    let res = this.quranDictionary.lookup(token);
    if (res.bIsFound && res.distR < 0.4) {
      return new Token(res.type, res.val);
    } else {
      if (/^\d+$/.test(token))
        return new Token(tokenTypes.number, parseInt(token));
      return new Token(tokenTypes.unkown, "err");
    }
  }
  estimateLocationFromTok(bIsFrom, tok) {
    let location = new Location();
    if (tok.tokType == tokenTypes.surahID) {
      location.surahIndx = tok.tokVal;
      location.ayahIndx = bIsFrom
        ? 1
        : this.quranInfo.getSurahNumAyah(tok.tokVal);
    }
    if (tok.tokType == tokenTypes.juzuuID) {
      let [start, end] = this.quranInfo.getJuzuuAyahRange(tok.tokVal);
      let localStrt = this.quranInfo.getAyahLocalIndx(start);
      let localEnd = this.quranInfo.getAyahLocalIndx(end);
      location.surahIndx = bIsFrom
        ? localStrt.localSurahIndx
        : localEnd.localSurahIndx;
      location.ayahIndx = bIsFrom
        ? localStrt.localAyahIndx
        : localEnd.localAyahIndx;
    }
    if (tok.tokType == tokenTypes.pageID) {
      let [start, end] = this.quranInfo.getPageAyahRange(tok.tokVal);
      let localStrt = this.quranInfo.getAyahLocalIndx(start);
      let localEnd = this.quranInfo.getAyahLocalIndx(end);
      location.surahIndx = bIsFrom
        ? localStrt.localSurahIndx
        : localEnd.localSurahIndx;
      location.ayahIndx = bIsFrom
        ? localStrt.localAyahIndx
        : localEnd.localAyahIndx;
    }
    return new Token(tokenTypes.exactLocation, location);
  }
  constructIndxIfFound(toktypesArr, tokType, iC) {
    let j = toktypesArr.types.indexOf(tokType);
    if (j >= 0) {
      return new IndexInChunk(
        iC,
        toktypesArr.indeces[j],
        this.chunks[toktypesArr.indeces[j]]
      ); //{ iChnk: iC, jTok: toktypesArr.indeces[j] };
    }
    return null;
  }
  getFromToIndeces(iC) {
    let fromIndx = null;
    let toIndx = null;
    let exactIndx = null;

    const fromTo = [
      tokenTypes.fromWord,
      tokenTypes.toWord,
      tokenTypes.exactLocation,
    ];

    const locIDs = [tokenTypes.juzuuID, tokenTypes.pageID, tokenTypes.surahID];
    for (var i = 0; i < this.chunks[iC].chunkArr.length; i++) {
      let toktypesInChunk = this.findTokensInChunk(iC, fromTo);
      if (toktypesInChunk.types.length == 0) continue;
      if (toktypesInChunk.types.includes(tokenTypes.exactLocation)) {
        if (exactIndx == null) {
          exactIndx = this.constructIndxIfFound(
            toktypesInChunk,
            tokenTypes.exactLocation,
            iC
          );
        }
        continue;
      }
      if (fromIndx == null) {
        let locationsInChunk = this.findTokensInChunk(iC, locIDs);
        if (locationsInChunk.types.length != 0) {
          fromIndx = this.constructIndxIfFound(
            toktypesInChunk,
            tokenTypes.fromWord,
            iC
          );
          if (fromIndx != null) continue;
        }
      }
      if (toIndx == null) {
        let locationsInChunk = this.findTokensInChunk(iC, locIDs);
        if (locationsInChunk.types.length != 0) {
          toIndx = this.constructIndxIfFound(
            toktypesInChunk,
            tokenTypes.toWord,
            iC
          );
          if (toIndx != null) continue;
        }
      }
    }
    return [fromIndx, toIndx, exactIndx];
  }
  estimateLocationInTokArr(bIsStrt, locationToksArr) {
    let ret = [];
    for (var i = 0; i < locationToksArr.length; i++) {
      ret.push(this.estimateLocationFromTok(bIsStrt, locationToksArr[i].tok));
    }
    return ret;
  }
  matchTwoLocationArrays(locationTokFrom, locationTokTo) {
    if (locationTokFrom.length == 0 || locationTokTo.length == 0) return false;
    let locationsFrom = this.estimateLocationInTokArr(true, locationTokFrom);
    let locationsTo = this.estimateLocationInTokArr(false, locationTokTo);
    // find closest pair (most specific)
    let closestpair = { iF: -1, iT: -1, dist: 1000000 };
    for (var i = 0; i < locationsFrom.length; i++) {
      for (var j = 0; j < locationsTo.length; j++) {
        let dist = this.getDistanceBetLocations(
          locationsFrom[i],
          locationsTo[j]
        );
        if (dist > 0 && dist < closestpair.dist) {
          closestpair.dist = dist;
          closestpair.iF = i;
          closestpair.iT = j;
        }
      }
    }
    if (closestpair.iF != -1) {
      let iFromChnk = locationTokFrom[closestpair.iF].iChunk;
      let iFromLocTok = locationTokFrom[closestpair.iF].jTok;
      this.chunks[iFromChnk].chunkArr[iFromLocTok] =
        locationsFrom[closestpair.iF];

      let iToChnk = locationTokTo[closestpair.iT].iChunk;
      let iToLocTok = locationTokTo[closestpair.iT].jTok;
      this.chunks[iToChnk].chunkArr[iToLocTok] = locationsTo[closestpair.iT];
      return true;
    }
    return false;
  }
  collectLocationTokensFromChunk(iC) {
    const locIDs = [tokenTypes.juzuuID, tokenTypes.pageID, tokenTypes.surahID];
    let ret = [];
    for (var i = 0; i < this.chunks[iC].chunkArr.length; i++) {
      if (locIDs.includes(this.chunks[iC].chunkArr[i].tokType)) {
        ret.push(new IndexInChunk(iC, i, this.chunks[iC].chunkArr[i])); //{ iChnk: indx, jTok: i, tok:  this.chunks[iC].chunkArr[i] });
      }
    }
    return ret;
  }
  collectLocationTokens() {
    let ret = [];
    for (var i = 0; i < this.chunks.length; i++) {
      ret.push(...this.collectLocationTokensFromChunk(i));
    }
    return ret;
  }
  getDistanceBetLocations(loc1, loc2) {
    let ret =
      this.quranInfo.getAyahGlobalIndx(
        loc1.tokVal.surahIndx,
        loc1.tokVal.ayahIndx
      ) -
      this.quranInfo.getAyahGlobalIndx(
        loc2.tokVal.surahIndx,
        loc2.tokVal.ayahIndx
      );
    if (ret < 0) ret *= -1;
    return ret;
  }
  estimateLocation() {
    let fromIndx = null;
    let toIndx = null;
    let exactIndx = null;

    for (var i = 0; i < this.chunks.length; i++) {
      let [curFrom, curTo, curExact] = this.getFromToIndeces(i);
      if (curFrom) fromIndx = curFrom;
      if (curTo) toIndx = curTo;
      if (curExact) exactIndx = curExact;
    }
    // if exact location (comes only from end) then no need for the "to" any location is used as from (if more than one use the closest to exact location)
    // if (from and to) or (from and exact location) found then no need to do any more
    // if only "from" then search for any next location to use as "to"
    // if only "to" then search for any prev location to use as "from"
    // if not any then it should only be one chunk and the cases are either:
    // 1 location to use as start and end
    // 2 locations to use as "from" "to"
    // 3 or more locations (take the shortest -i.e. most specific- two and use them as start/end) // todo: determine if one location is "part" of another

    if (exactIndx != null) {
      let locations = this.collectLocationTokens(); // array of {iChnk,jTok,tok}
      let nearestLocation = null;
      let nearestDist = 1000000;
      let nearestIndx = -1;
      for (var i = 0; i < locations.length; i++) {
        let location = this.estimateLocationFromTok(true, locations[i].tok);
        let dist = this.getDistanceBetLocations(
          location,
          this.chunks[exactIndx.iChunk].chunkArr[exactIndx.jTok]
        );
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestLocation = location;
          nearestIndx = i;
        }
      }
      if (nearestLocation != null) {
        this.chunks[locations[nearestIndx].iChunk].chunkArr[
          locations[nearestIndx].jTok
        ] = nearestLocation;
        return true;
      }
      return false;
    }
    if (fromIndx != null && toIndx != null) {
      let locationTokFrom = this.collectLocationTokensFromChunk(
        fromIndx.iChunk
      ); // array of {iChnk,jTok,tok}
      let locationTokTo = this.collectLocationTokensFromChunk(toIndx.iChunk); // array of {iChnk,jTok,tok}
      return this.matchTwoLocationArrays(locationTokFrom, locationTokTo);
    }
    if (fromIndx != null) {
      let locationTokFrom = this.collectLocationTokensFromChunk(
        fromIndx.iChunk
      ); // array of {iChnk,jTok,tok}

      let locationTokTo = [];
      for (var iC = fromIndx.iChunk + 1; iC < this.chunks.length; iC++) {
        locationTokTo.push(...this.collectLocationTokensFromChunk(iC)); // array of {iChnk,jTok,tok}
      }
      if (locationTokTo.length == 0) {
        if (locationTokFrom.length > 1) {
          locationTokTo.push(locationTokFrom.pop());
        }
      }
      return this.matchTwoLocationArrays(locationTokFrom, locationTokTo);
    }
    if (toIndx != null) {
      let locationTokTo = this.collectLocationTokensFromChunk(toIndx.iChunk); // array of {iChnk,jTok,tok}
      let locationTokFrom = [];
      for (var iC = 0; iC < toIndx.iChunk; iC++) {
        locationTokFrom.push(...this.collectLocationTokensFromChunk(iC)); // array of {iChnk,jTok,tok}
      }
      return this.matchTwoLocationArrays(locationTokFrom, locationTokTo);
    }
    let locationToks = this.collectLocationTokens(); // array of {iChnk,jTok,tok}
    if (locationToks.length == 0) return false;
    let locationsFrom = this.estimateLocationInTokArr(true, locationToks);
    if (locationToks.length == 1) {
      let iFromChnk = locationToks[0].iChunk;
      let iFromLocTok = locationToks[0].jTok;
      this.chunks[iFromChnk].chunkArr[iFromLocTok] = locationsFrom[0];
      let locationsTo = this.estimateLocationInTokArr(false, locationToks);
      this.chunks[iFromChnk].chunkArr.push(locationsTo[0]);
      return true;
    }
    // estimate the closest non identical locations
    function compare(a, b) {
      if (a.surahIndx < b.surahIndx) return -1;
      if (a.surahIndx > b.surahIndx) return 1;
      if (a.ayahIndx < b.ayahIndx) return -1;
      if (a.ayahIndx > b.ayahIndx) return 1;
      return 0;
    }
    for (var i = 0; i < locationsFrom.length; i++) {
      locationsFrom[i].originalTok = locationToks[i];
    }
    locationsFrom.sort(compare);
    let iMinDist = -1;
    let minDist = 0;
    for (var i = 1; i < locationsFrom.length; i++) {
      let dist = this.getDistanceBetLocations(
        locationsFrom[i],
        locationsFrom[i - 1]
      );
      if (dist < minDist) {
        minDist = dist;
        iMinDist = i - 1;
      }
    }
    if (iMinDist == -1) return false; //should never happen!
    let iStrt = locationsFrom[iMinDist - 1].originalTok.iChunk;
    let jStrt = locationsFrom[iMinDist - 1].originalTok.jTok;
    let iEnd = locationsFrom[iMinDist].originalTok.iChunk;
    let jEnd = locationsFrom[iMinDist].originalTok.jTok;
    this.chunks[iStrt].chunkArr[jStrt] = this.estimateLocationFromTok(
      true,
      this.chunks[iStrt].chunkArr[jStrt]
    );
    this.chunks[iEnd].chunkArr[jEnd] = this.estimateLocationFromTok(
      false,
      this.chunks[iEnd].chunkArr[jEnd]
    );
    return true;
  }
  filterTokens(iC) {
    let bChange = false;
    // first search for location keywords (page,juzuu,surah)
    for (var i = 0; i < this.chunks[iC].chunkArr.length; i++) {
      if (this.chunks[iC].chunkArr[i].tokType == tokenTypes.ayahWord) {
        if (i < this.chunks[iC].chunkArr.length - 1) {
          if (
            this.chunks[iC].chunkArr[i + 1].tokType == tokenTypes.number ||
            this.chunks[iC].chunkArr[i + 1].tokType == tokenTypes.ayahID
          ) {
            this.chunks[iC].chunkArr[i + 1].tokType = tokenTypes.ayahID;
            this.chunks[iC].chunkArr.splice(i, 1);
            bChange = true;
            i--;
          }
        }
      } else if (this.chunks[iC].chunkArr[i].tokType == tokenTypes.surahWord) {
        if (i < this.chunks[iC].chunkArr.length - 1) {
          if (
            this.chunks[iC].chunkArr[i + 1].tokType == tokenTypes.number ||
            this.chunks[iC].chunkArr[i + 1].tokType == tokenTypes.surahID
          ) {
            this.chunks[iC].chunkArr[i + 1].tokType = tokenTypes.surahID;
            this.chunks[iC].chunkArr.splice(i, 1);
            bChange = true;
            i--;
          }
        }
      } else if (this.chunks[iC].chunkArr[i].tokType == tokenTypes.pageWord) {
        if (i < this.chunks[iC].chunkArr.length - 1) {
          if (
            this.chunks[iC].chunkArr[i + 1].tokType == tokenTypes.number ||
            this.chunks[iC].chunkArr[i + 1].tokType == tokenTypes.pageID
          ) {
            this.chunks[iC].chunkArr[i + 1].tokType = tokenTypes.pageID;
            this.chunks[iC].chunkArr.splice(i, 1);
            bChange = true;
            i--;
          }
        }
      } else if (this.chunks[iC].chunkArr[i].tokType == tokenTypes.juzuuWord) {
        if (i < this.chunks[iC].chunkArr.length - 1) {
          if (
            this.chunks[iC].chunkArr[i + 1].tokType == tokenTypes.number ||
            this.chunks[iC].chunkArr[i + 1].tokType == tokenTypes.juzuuID
          ) {
            this.chunks[iC].chunkArr[i + 1].tokType = tokenTypes.juzuuID;
            this.chunks[iC].chunkArr.splice(i, 1);
            bChange = true;
            i--;
          }
        }
      }
    }
    // 2nd search for surahID+number=ayahID
    for (var i = 0; i < this.chunks[iC].chunkArr.length - 1; i++) {
      if (
        this.chunks[iC].chunkArr[i].tokType == tokenTypes.surahID &&
        this.chunks[iC].chunkArr[i + 1].tokType == tokenTypes.number
      ) {
        // convert into location token
        this.chunks[iC].chunkArr[i + 1].tokType = tokenTypes.exactLocation;
        this.chunks[iC].chunkArr[i + 1].tokVal = new Location(
          this.chunks[iC].chunkArr[i].tokVal,
          this.chunks[iC].chunkArr[i + 1].tokVal
        );

        this.chunks[iC].chunkArr.splice(i, 1);
        bChange = true;
      }
    }
    return bChange;
  }
  filterChunks() {
    let bChange = false;
    // 1st filter for nummber tokens that are not identified
    for (var i = 0; i < this.chunks.length; i++) {
      for (var j = 0; j < this.chunks[i].chunkArr.length; j++) {
        if (this.chunks[i].chunkArr[j].tokType == tokenTypes.number) {
          // search backwards to see what the latest identifier is
          for (var iBefore = i; iBefore >= 0; iBefore--) {
            let jStrt =
              iBefore == i ? j - 1 : this.chunks[iBefore].chunkArr.length - 1;
            for (var jBefore = jStrt; jBefore >= 0; jBefore--) {
              let prvTokType = this.chunks[iBefore].chunkArr[jBefore].tokType;
              if (prvTokType == tokenTypes.surahID) {
                // convert into location token
                this.chunks[i].chunkArr[j].tokType = tokenTypes.exactLocation;
                this.chunks[i].chunkArr[j].tokVal = new Location(
                  this.chunks[iBefore].chunkArr[jBefore].tokVal,
                  this.chunks[i].chunkArr[j].tokVal
                );
                bChange = true;
                // break both loops
                iBefore = -1;
                break;
              }
              if (prvTokType == tokenTypes.exactLocation) {
                // convert into location token
                this.chunks[i].chunkArr[j].tokType = tokenTypes.exactLocation;
                this.chunks[i].chunkArr[j].tokVal = new Location(
                  this.chunks[iBefore].chunkArr[jBefore].tokVal.surahIndx,
                  this.chunks[i].chunkArr[j].tokVal
                );
                bChange = true;
                // break both loops
                iBefore = -1;
                break;
              }
              if (
                prvTokType == tokenTypes.pageWord ||
                prvTokType == tokenTypes.pageID
              ) {
                // convert to pageID
                this.chunks[i].chunkArr[j].tokType = tokenTypes.pageID;
                bChange = true;
                // break both loops
                iBefore = -1;
                break;
              }
              if (
                prvTokType == tokenTypes.juzuuWord ||
                prvTokType == tokenTypes.juzuuID
              ) {
                // convert to pageID
                this.chunks[i].chunkArr[j].tokType = tokenTypes.juzuuID;
                bChange = true;
                // break both loops
                iBefore = -1;
                break;
              }
              if (prvTokType == tokenTypes.surahWord) {
                // convert to pageID
                this.chunks[i].chunkArr[j].tokType = tokenTypes.surahID;
                bChange = true;
                // break both loops
                iBefore = -1;
                break;
              }
            }
          }
        }
      }
    }
    // 2nd replace the end with either the exact with id after or id before
    for (var i = 0; i < this.chunks.length; i++) {
      for (var j = 0; j < this.chunks[i].chunkArr.length; j++) {
        if (this.chunks[i].chunkArr[j].tokType == tokenTypes.endWord) {
          for (var iAfter = i; iAfter < this.chunks.length; iAfter++) {
            let jStrt = iAfter == i ? j + 1 : 0,
              jEnd = this.chunks[iAfter].chunkArr.length;
            for (var jAfter = jStrt; jAfter < jEnd; jAfter++) {
              let nxtTokType = this.chunks[iAfter].chunkArr[jAfter].tokType;
              if (nxtTokType == tokenTypes.surahID) {
                // convert into location token
                this.chunks[i].chunkArr[j].tokType = tokenTypes.exactLocation;
                this.chunks[i].chunkArr[j].tokVal = new Location(
                  this.chunks[iAfter].chunkArr[jAfter].tokVal,
                  this.quranInfo.getSurahNumAyah(
                    this.chunks[iAfter].chunkArr[jAfter].tokVal
                  )
                );

                // break both loops
                iAfter = this.chunks.length + 1;
                break;
              }
            }
          }
          if (this.chunks[i].chunkArr[j].tokType == tokenTypes.exactLocation)
            continue;
          // search backwards to see what the latest identifier is
          for (var iBefore = i; iBefore >= 0; iBefore--) {
            let jStrt =
              iBefore == i ? j - 1 : this.chunks[iBefore].chunkArr.length - 1;
            for (var jBefore = jStrt; jBefore >= 0; jBefore--) {
              let prvTokType = this.chunks[iBefore].chunkArr[jBefore].tokType;
              if (prvTokType == tokenTypes.exactLocation) {
                // convert into location token
                this.chunks[i].chunkArr[j].tokType = tokenTypes.exactLocation;
                this.chunks[i].chunkArr[j].tokVal = new Location(
                  this.chunks[iBefore].chunkArr[jBefore].tokVal.surahIndx,
                  this.quranInfo.getSurahNumAyah(
                    this.chunks[iBefore].chunkArr[jBefore].tokVal.surahIndx
                  )
                );
                // break both loops
                iBefore = -1;
                break;
              }
              if (prvTokType == tokenTypes.surahID) {
                this.chunks[i].chunkArr[j].tokType = tokenTypes.exactLocation;
                this.chunks[i].chunkArr[j].tokVal = new Location(
                  this.chunks[iBefore].chunkArr[jBefore].tokVal,
                  this.quranInfo.getSurahNumAyah(
                    this.chunks[iBefore].chunkArr[jBefore].tokVal
                  )
                );

                // break both loops
                iBefore = -1;
                break;
              }
            }
          }
        }
      }
    }
    return bChange;
  }
  checkStartEndFound() {
    let exacts = [];
    for (var i = 0; i < this.chunks.length; i++) {
      for (var j = 0; j < this.chunks[i].chunkArr.length; j++) {
        if (this.chunks[i].chunkArr[j].tokType == tokenTypes.exactLocation) {
          exacts.push(this.chunks[i].chunkArr[j]);
        }
      }
    }
    //console.log("num exacts: " + exacts.length);
    if (exacts.length < 2) return null;
    let quranInfo = this.quranInfo;
    let ret = {
      bIsSuccess: true,
      strtSurah: exacts[0].tokVal.surahIndx,
      strtAyah: exacts[0].tokVal.ayahIndx,
      endSurah: exacts[exacts.length - 1].tokVal.surahIndx,
      endAyah: exacts[exacts.length - 1].tokVal.ayahIndx,
      toString: function () {
        const indexer = quranInfo;
        let strRet = "success\n";
        strRet +=
          "Surah " +
          indexer.getSurahNameAr(this.strtSurah) +
          " Ayah " +
          this.strtAyah +
          "\n";
        strRet +=
          "Surah " +
          indexer.getSurahNameAr(this.endSurah) +
          " Ayah " +
          this.endAyah +
          "\n";
        return strRet;
      },
    };
    //console.log(ret);
    return ret;
  }
  parseRevisionQuery(text) {
    //console.log("parsing: \n" + text);
    var bIsEnglish = /[a-z]/.test(text);
    if (bIsEnglish) {
      text = MiscUtilities.normalizeString(text).replace(/-{1,}/g, " to ");
      text = MiscUtilities.normalizeString(text).replace(/[,]+/g, " to ");
      text = MiscUtilities.normalizeString(text).replace(/[;]+/g, " to ");
      text = MiscUtilities.normalizeString(text).replace(/[:]+/g, " to ");
    } else {
      text = MiscUtilities.normalizeString(text).replace(/-{1,}/g, " حتي ");
      text = MiscUtilities.normalizeString(text).replace(/[,]+/g, " حتي ");
      text = MiscUtilities.normalizeString(text).replace(/[;]+/g, " حتي ");
      text = MiscUtilities.normalizeString(text).replace(/[؛]+/g, " حتي ");
      text = MiscUtilities.normalizeString(text).replace(/[،]+/g, " حتي ");
      text = MiscUtilities.normalizeString(text).replace(/[:]+/g, " حتي ");
    }
    text = MiscUtilities.removeLeadingAlefLam(
      MiscUtilities.normalizeString(text).replace(/ الي /g, " حتي ")
    );
    //console.log("removeLeadingAlefLam: " + text);

    text = this.quranInfo.replaceJuzuuNamesFromString(text);
    //console.log("replaceJuzuuNamesFromString: " + text);
    var newStr = text;
    //console.log("nomalized: \n" + newStr);
    var tokens = newStr.split(" ");
    //console.log("raw tokens: " + tokens);
    var tokensClassified = [];
    for (var iTok = 0; iTok < tokens.length; iTok++) {
      var tokClass = this.classifyToken(tokens[iTok]);
      if (
        tokClass.tokType == tokenTypes.ignore ||
        tokClass.tokType == tokenTypes.unkown
      )
        continue;
      tokensClassified.push(tokClass);
    }
    this.chunks = [];
    var curArr = tokensClassified.slice(0); // copy of the arr
    var iTok = 1;
    var iChunk = 0;
    while (curArr.length > 1 && iTok < curArr.length - 1) {
      if (
        curArr[iTok].tokType == tokenTypes.toWord ||
        curArr[iTok].tokType == tokenTypes.fromWord ||
        curArr[iTok].tokType == tokenTypes.endWord
      ) {
        this.chunks.push(new Chunk(iChunk, curArr.slice(0, iTok)));
        iChunk++;
        curArr = curArr.slice(iTok);
        iTok = 1;
        continue;
      }
      iTok++;
    }
    if (curArr.length > 0) {
      this.chunks.push(new Chunk(iChunk, curArr));
      iChunk++;
    }

    let bRetry = true;
    while (bRetry) {
      bRetry = false;
      let bChange = true;
      while (bChange) {
        bChange = false;
        for (var i = 0; i < this.chunks.length; i++) {
          bChange = this.filterTokens(i) || bChange;
        }
        if (bChange) {
          let retFound = this.checkStartEndFound();
          if (retFound != null) return retFound;
        }
        bChange = this.filterChunks() || bChange;
        if (bChange) {
          let retFound = this.checkStartEndFound();
          if (retFound != null) return retFound;
        }
        bRetry = bRetry || bChange;
      }
      bChange = true;
      while (bChange) {
        bChange = this.estimateLocation();
        bRetry = bRetry || bChange;
        if (bChange) {
          let retFound = this.checkStartEndFound();
          if (retFound != null) return retFound;
        }
      }
    }

    let retFound = this.checkStartEndFound();
    if (retFound != null) return retFound;

    // now try to combine tokens of form
    return {
      bIsSuccess: false,
      err: "Couldn't interpret search",
      data: this.getChunksArrAsStr(),
      toString: function () {
        let strRet = "failed: \n" + this.data;
        return strRet;
      },
    };
  }
}
export default SearchTextParser;
