export const STR_SEL_AYAH = 1;
export const STR_SEL_SURAH = 2;
export const STR_STRT_AYAH = 3;
export const STR_END_AYAH = 4;
export const STR_TITLE = 5;
export const STR_REVS_PROMPT = 6;
export const STR_DAY_BADGE_DESC = 7;
export const STR_DAY_BADGE_MIN_REV = 8;
export const STR_DAY_BADGE_ACTIVE = 9;
export const STR_DAY_BADGE_INACTIVE = 10;
export const STR_MONTH_BADGE_DESC = 11;
export const STR_MONTH_BADGE_MIN_REV = 12;
export const STR_MONTH_BADGE_ACTIVE = 13;
export const STR_MONTH_BADGE_INACTIVE = 14;
export const STR_WEEK_BADGE_DESC = 15;
export const STR_WEEK_BADGE_MIN_REV = 16;
export const STR_WEEK_BADGE_ACTIVE = 17;
export const STR_WEEK_BADGE_INACTIVE = 18;
export const STR_GREETING = 19;
export const STR_MOTIVATION = 20;
export const STR_INSTRUCTIONS_TITLE = 21;
export const STR_INSTRUCTIONS = 22;
export const STR_SKIP_SCREEN = 23;
export const STR_DAYS_SINCE_REV = 24;
export const STR_REVISED = 25;
export default class StringsManager {
  constructor() {
    this.strLang = "ar";
  }
  setLanguage(strLang) {
    if (strLang == "ar" || strLang == "en") this.strLang = strLang;
    return this.strLang == strLang;
  }
  getStr(nStrID) {
    return this.getStrLang(this.strLang, nStrID);
  }
  getStrLang(strLang, nStrID) {
    if (nStrID == STR_SEL_AYAH) {
      if (strLang == "ar") return "اختر الآية";
      if (strLang == "en") return "Select Ayah";
      return "unsupported language";
    }
    if (nStrID == STR_SEL_SURAH) {
      if (strLang == "ar") return "اختر السورة";
      if (strLang == "en") return "Select Surah";
      return "unsupported language";
    }
    if (nStrID == STR_STRT_AYAH) {
      if (strLang == "ar") return "البداية";
      if (strLang == "en") return "Start Ayah";
      return "unsupported language";
    }
    if (nStrID == STR_END_AYAH) {
      if (strLang == "ar") return "النهاية";
      if (strLang == "en") return "End Ayah";
      return "unsupported language";
    }
    if (nStrID == STR_TITLE) {
      if (strLang == "ar") return "العنوان";
      if (strLang == "en") return "Title";
      return "unsupported language";
    }

    if (nStrID == STR_REVS_PROMPT) {
      if (strLang == "ar")
        return "لم تقم بإضافة أي أوراد لقائمتك حتى الآن. \nأضف أورادك وابدأ في رحلتك القرآنية ...";
      if (strLang == "en")
        return "You didn't add any revisions!\nStart your journey with the Quran now...";
      return "unsupported language";
    }
    if (nStrID == STR_DAY_BADGE_DESC) {
      if (strLang == "ar")
        return "هذا الوسام ينفتح لك عندما تقوم بأداء مراجعة واحدة على الأقل يوميا.\nداوم على زيارة أورادك القرآنية كل يوم, وقم ببناء هذه العادة المحببة";
      if (strLang == "en")
        return "This Badge Activates When You Finish at Least One Revision Daily.\nMake It a Habit and Visit Your List of Revisions Everyday!";
      return "unsupported language";
    }
    if (nStrID == STR_DAY_BADGE_MIN_REV) {
      if (strLang == "ar")
        return "لا ينفتح هذا الوسام إلا بعد إضافة 5 مراجعات!";
      if (strLang == "en")
        return "This badge will be active after adding at least 5 revisions!";
      return "unsupported language";
    }
    if (nStrID == STR_DAY_BADGE_ACTIVE) {
      if (strLang == "ar")
        return "بارك الله فيك! لقد قمت بتفعيل وسام المداومة.";
      if (strLang == "en") return "Great Job! You activated your Dawem Badge.";
      return "unsupported language";
    }
    if (nStrID == STR_DAY_BADGE_INACTIVE) {
      if (strLang == "ar")
        return "لم تقم بتفعيل هذا الوسام بعد. اقرأ وردا من قائمة أورادك اليوم لينفتح!";
      if (strLang == "en")
        return "You Still Did Not Activate This Badge. Finish a revision today to light it up!";
      return "unsupported language";
    }
    if (nStrID == STR_MONTH_BADGE_DESC) {
      if (strLang == "ar")
        return "وسام المصاحبة ينفتح لك عندما تقرأ كل أورادك في شهر أو أقل. فلتتعود مصاحبة القرآن وتتأسى بالصالحين في تلاوته آناء الليل وأطراف النهار.";
      if (strLang == "en")
        return "This Badge Activates When You Finish All Revisions in 30 Days or Less.\nMake It a Habit and Visit All Your Revisions at Least Once a Month!";
      return "unsupported language";
    }
    if (nStrID == STR_MONTH_BADGE_MIN_REV) {
      if (strLang == "ar")
        return "لا ينفتح هذا الوسام إلا بعد إضافة 10 مراجعات!";
      if (strLang == "en")
        return "This badge will be active after adding at least 10 revisions!";
      return "unsupported language";
    }
    if (nStrID == STR_MONTH_BADGE_ACTIVE) {
      if (strLang == "ar")
        return " فتح الله عليك أبواب الخير! لقد قمت بتفعيل وسام المصاحبة, وصرت صاحبا للقرآن.";
      if (strLang == "en") return "Great Job! You activated your Dawem Badge.";
      return "unsupported language";
    }
    if (nStrID == STR_MONTH_BADGE_INACTIVE) {
      if (strLang == "ar")
        return "لم تقم بتفعيل هذا الوسام بعد. اقرأ كل أورادك في 30 يوما لينفتح الوسام!";
      if (strLang == "en")
        return "You Still Did Not Activate This Badge. Finish all revisions in 30 days to light it up!";
      return "unsupported language";
    }
    if (nStrID == STR_WEEK_BADGE_DESC) {
      if (strLang == "ar")
        return "وسام المثابرة ينفتح لك عندما تقوم بمراجعة كل أورادك في خلال أسبوع أو أقل. فهذا كان دأب الصحابة الكرام ومن تبعهم بإحسان.";
      if (strLang == "en")
        return "This Badge Activates When You Finish All Revisions in 7 Days or Less.\nMake It a Habit and Visit All Your Revisions at Least Once a Week!";
      return "unsupported language";
    }
    if (nStrID == STR_WEEK_BADGE_MIN_REV) {
      if (strLang == "ar")
        return "لا ينفتح هذا الوسام إلا بعد إضافة 7 مراجعات!";
      if (strLang == "en")
        return "This badge will be active after adding at least 7 revisions!";
      return "unsupported language";
    }
    if (nStrID == STR_WEEK_BADGE_ACTIVE) {
      if (strLang == "ar")
        return "زادك الله فضلا! لقد قمت بتفعيل وسام المثابرة, وصرت من أهل القرآن.";
      if (strLang == "en")
        return "Great Job! You activated your Ultimate Dawem Badge.";
      return "unsupported language";
    }
    if (nStrID == STR_WEEK_BADGE_INACTIVE) {
      if (strLang == "ar")
        return "لم تقم بتفعيل هذا الوسام بعد. اقرأ كل أورادك أسبوعيا لينفتح الوسام!";
      if (strLang == "en")
        return "You Still Did Not Activate This Badge. Finish all revisions in 7 days to light it up!";
      return "unsupported language";
    }

    if (nStrID == STR_GREETING) {
      if (strLang == "ar") return "مرحبا يا باغي القرآن!";
      if (strLang == "en") return "Welcome, Seeker of the Quran!";
      return "unsupported language";
    }
    if (nStrID == STR_MOTIVATION) {
      if (strLang == "ar")
        return "ابدأ الآن رحلتك مع القرآن الكريم, وقم ببناء عادة تلاوة و مراجعة ما تعلمت منه.\n";
      if (strLang == "en")
        return "Embark on your journey with the holy Quran and build the habit of consistently reviewing what you have learned.\n";
      return "unsupported language";
    }
    if (nStrID == STR_INSTRUCTIONS_TITLE) {
      if (strLang == "ar") return "إليك طريقة الاستخدام:\n";
      if (strLang == "en") return "Here's how it works:\n";
      return "unsupported language";
    }
    if (nStrID == STR_INSTRUCTIONS) {
      if (strLang == "ar")
        return "1- قم بملء قائمة أورادك.                           \n2- قم بتحديث القائمة كلما راجعت وردا منها.\n3- داوم على المراجعة وقم بتفعيل أوسمتك. \n";
      if (strLang == "en")
        return "1- Setup your list of revisions.             \n2- Update the list as you revise.          \n3- Light up badges and stay on track.\n";
      return "unsupported language";
    }
    if (nStrID == STR_SKIP_SCREEN) {
      if (strLang == "ar") return "لا تظهر هذه الشاشة";
      if (strLang == "en") return "Don't show again";
      return "unsupported language";
    }
    if (nStrID == STR_DAYS_SINCE_REV) {
      if (strLang == "ar") return "يوما منذ آخر مراجعة!";
      if (strLang == "en") return "Days Since Last Revision!";
      return "unsupported language";
    }
    if (nStrID == STR_REVISED) {
      if (strLang == "ar") return "أحسنت صنعا! لقد راجعت هذا الورد اليوم.";
      if (strLang == "en") return "Good Job! You revised this today.";
      return "unsupported language";
    }
    return "unkown string";
  }
}
