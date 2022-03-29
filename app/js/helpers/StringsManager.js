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
export const STR_SEL_LANGUAGE = 26;
export const STR_REV_TITLE = 27;
export const STR_ADD_REV = 28;
export const STR_START_NOW = 29;
export const STR_CANCEL = 30;
export const STR_ADD_REV_TITLE = 31;
export const STR_LATEST_DONE = 32;
export const STR_DAYBADGE_NAME = 33;
export const STR_WEEKBADGE_NAME = 34;
export const STR_MONTHBADGE_NAME = 35;
export const STR_MY_GOALS = 36;

export default class StringsManager {
  constructor() {
    this.strLang = "ar";
  }
  setLanguage(strLang) {
    if (strLang == "ar" || strLang == "en") this.strLang = strLang;
    return this.strLang == strLang;
  }
  getLanguage() {
    return this.strLang;
  }
  getStr(nStrID) {
    return this.getStrLang(this.strLang, nStrID);
  }
  getStrLang(strLang, nStrID) {
    if (nStrID == STR_LATEST_DONE) {
      if (strLang == "ar") return "اخر الإنجازات";
      if (strLang == "en") return "Latest Accomplishments";
      return "unsupported language";
    }

    if (nStrID == STR_ADD_REV_TITLE) {
      if (strLang == "ar") return "ضع عنوانا لهذا الورد";
      if (strLang == "en") return "Enter a title for this revision";
      return "unsupported language";
    }

    if (nStrID == STR_REV_TITLE) {
      if (strLang == "ar") return "اضافة ورد جديد";
      if (strLang == "en") return "Add new Revision";
      return "unsupported language";
    }
    if (nStrID == STR_ADD_REV) {
      if (strLang == "ar") return "اضف";
      if (strLang == "en") return "Add";
      return "unsupported language";
    }
    if (nStrID == STR_CANCEL) {
      if (strLang == "ar") return "إلغاء";
      if (strLang == "en") return "+ Cancel";
      return "unsupported language";
    }
    if (nStrID == STR_SEL_AYAH) {
      if (strLang == "ar") return "رقم الآية";
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
        return "بارك الله فيك! لقد قمت بتفعيل وسام المبادرة.";
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
    if (nStrID == STR_SEL_LANGUAGE) {
      if (strLang == "ar") return "اختر اللغة";
      if (strLang == "en") return "Select Language";
      return "unsupported language";
    }

    if (nStrID == STR_START_NOW) {
      if (strLang == "ar") return "ابدأ الآن";
      if (strLang == "en") return "Start Now";
      return "unsupported language";
    }

    if (nStrID == STR_DAYBADGE_NAME) {
      if (strLang == "ar") return "وسام المبادرة";
      if (strLang == "en") return "Initiative Badge";
      return "unsupported language";
    }
    if (nStrID == STR_WEEKBADGE_NAME) {
      if (strLang == "ar") return "وسام المثابرة";
      if (strLang == "en") return "Perseverance Badge";
      return "unsupported language";
    }
    if (nStrID == STR_MONTHBADGE_NAME) {
      if (strLang == "ar") return "وسام المصاحبة";
      if (strLang == "en") return "Companionship Badge";
      return "unsupported language";
    }
    if (nStrID == STR_MY_GOALS) {
      if (strLang == "ar") return "إنجازاتي";
      if (strLang == "en") return "My Achievements";
      return "unsupported language";
    }
    return "unkown string";
  }
}
