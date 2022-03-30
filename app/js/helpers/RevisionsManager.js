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

    bIsToday = bIsToday && this.m_loadedRevisions.length >= 5;
    bIsWeek = bIsWeek && this.m_loadedRevisions.length >= 7;
    bIsMonth = bIsMonth && this.m_loadedRevisions.length >= 10;
    return [bIsToday, bIsMonth, bIsWeek];
  }

  loadTestRevisions(bArabic) {
    // todo: load from DB
    this.m_loadedRevisions.push(
      new Revision(
        getNewRevisionId(),
        bArabic ? "الفاتحة" : "Fatiha",
        10,
        1,
        7,
        this.getPastDate(1000)
      )
    );
    this.m_loadedRevisions.push(
      new Revision(
        getNewRevisionId(),
        bArabic ? "النجم" : "Najm",
        0,
        4785,
        4846,
        this.getPastDate(0)
      )
    );
    this.m_loadedRevisions.push(
      new Revision(
        getNewRevisionId(),
        bArabic ? "الملك" : "Mulk",
        1,
        5242,
        5271,
        this.getPastDate(7)
      )
    );
    this.m_loadedRevisions.push(
      new Revision(
        getNewRevisionId(),
        bArabic ? "الكوثر" : "AlKawthar",
        50,
        6205,
        6207,
        this.getPastDate(5)
      )
    );
    this.m_loadedRevisions.push(
      new Revision(
        getNewRevisionId(),
        bArabic ? "الإخلاص" : "Ikhlas",
        80,
        6222,
        6225,
        this.getPastDate(12)
      )
    );
    this.m_loadedRevisions.push(
      new Revision(
        getNewRevisionId(),
        bArabic ? "الزمر" : "Az-Zumar",
        50,
        4059,
        4133,
        this.getPastDate(12)
      )
    );
    this.m_loadedRevisions.push(
      new Revision(
        getNewRevisionId(),
        bArabic ? "غافر" : "Ghaafir",
        30,
        4134,
        4218,
        this.getPastDate(3)
      )
    );
    this.m_loadedRevisions.push(
      new Revision(
        getNewRevisionId(),
        bArabic ? "فصـّلت" : "Fussilat",
        20,
        4219,
        4272,
        this.getPastDate(1)
      )
    );
    this.m_loadedRevisions.push(
      new Revision(
        getNewRevisionId(),
        bArabic ? "الشورى" : "Ash-Shura",
        0,
        4273,
        4325,
        this.getPastDate(0)
      )
    );
    this.m_loadedRevisions.push(
      new Revision(
        getNewRevisionId(),
        bArabic ? "الزخرف" : "Az-Zukhruf",
        70,
        4326,
        4414,
        this.getPastDate(2)
      )
    );
    this.m_loadedRevisions.push(
      new Revision(
        getNewRevisionId(),
        bArabic ? "الدخان" : "Ad-Dukhaan",
        35,
        4415,
        4473,
        this.getPastDate(22)
      )
    );
    this.m_loadedRevisions.push(
      new Revision(
        getNewRevisionId(),
        bArabic ? "الجاثية" : "Al-Jaathiya",
        48,
        4474,
        4510,
        this.getPastDate(5)
      )
    );
    this.m_loadedRevisions.push(
      new Revision(
        getNewRevisionId(),
        bArabic ? "الأحقاف" : "Al-Ahqaf",
        79,
        4511,
        4545,
        this.getPastDate(7)
      )
    );
    this.m_loadedRevisions.push(
      new Revision(
        getNewRevisionId(),
        bArabic ? "محمد" : "Muhammad",
        95,
        4546,
        4583,
        this.getPastDate(44)
      )
    );
    this.m_loadedRevisions.push(
      new Revision(
        getNewRevisionId(),
        bArabic ? "الفتح" : "Al-Fath",
        90,
        4584,
        4612,
        this.getPastDate(42)
      )
    );
    this.m_loadedRevisions.push(
      new Revision(
        getNewRevisionId(),
        bArabic ? "الحجرات" : "Al-Hujuraat",
        99,
        4613,
        4630,
        this.getPastDate(11)
      )
    );
    this.m_loadedRevisions.push(
      new Revision(
        getNewRevisionId(),
        bArabic
          ? "۱۲۳٤٥٦٧۸۹۱۲۳٤٥٦٧۸۹۱۲۳٤٥٦٧۸۹۱۲۳٤٥٦٧۸۹"
          : "123456789012345678901234567890",
        99,
        4613,
        4630,
        this.getPastDate(35)
      )
    );
    this.m_loadedRevisions.push(
      new Revision(
        getNewRevisionId(),
        bArabic ? "ق" : "Qaaf",
        13,
        4631,
        4675,
        this.getPastDate(4)
      )
    );
  }
  sortRevisions() {
    this.m_loadedRevisions.sort(function (a, b) {
      return b.numDays - a.numDays;
    });
  }
}
