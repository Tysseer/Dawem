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
export const STR_INSTRUCTIONS1 = 22;
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
export const STR_WELCOME = 37;
export const STR_SELECT = 38;
export const STR_DAWEM = 39;
export const STR_AGREE = 40;
export const STR_ADD_KHATMAH = 41;
export const STR_BY_JUZUU = 42;
export const STR_BY_SURAH = 43;
export const STR_MOD_REV_LIST = 44;
export const STR_RESET_ALL = 45;
export const STR_DEL_ALL = 46;
export const STR_BACKUP_RESTORE = 47;
export const STR_BACKUP = 48;
export const STR_RESTORE = 49;
export const STR_REV_TOOLS = 50;
export const STR_QURAN = 51;
export const STR_JUZUU = 52;
export const STR_INSTRUCTIONS2 = 53;
export const STR_INSTRUCTIONS3 = 54;
export const STR_CHOOSE_BETWEEN = 55;
export const STR_RESTART_PROMPT = 56;
export const STR_ALHAMDULELLAH = 57;
export const STR_DAYBADGE_CONGRATS = 58;
export const STR_MONTHBADGE_CONGRATS = 59;
export const STR_WEEKBADGE_CONGRATS = 60;
export const STR_TWOBADGES_CONGRATS = 61;
export const STR_THREEBADGES_CONGRATS = 62;
export const STR_ALLBADGES_DONE_CONGRATS = 63;
export const STR_ALLREVS_DONE_CONGRATS = 64;
export const STR_ADD_REV_BY_TXT = 65;
export const STR_ADD_REV_BY_TXT_PROMPT = 66;
export const STR_CANT_UNDERSTAND = 67;
export const STR_ASSISTANT = 68;
export const STR_CLOSE = 69;

import { convertToArabicNumbers } from "./scripts.js";
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
      if (strLang == "ar") return "إضافة ورد جديد";
      if (strLang == "en") return "Add a Revision";
      return "unsupported language";
    }
    if (nStrID == STR_ADD_REV) {
      if (strLang == "ar") return "تأكيد الإضافة";
      if (strLang == "en") return "Confirm";
      return "unsupported language";
    }
    if (nStrID == STR_CANCEL) {
      if (strLang == "ar") return "إلغاء";
      if (strLang == "en") return "Cancel";
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
        return "The Initiative Badge Activates When You Finish at Least One Revision Daily.\nMake It a Habit and Visit Your List of Revisions Everyday!";
      return "unsupported language";
    }
    if (nStrID == STR_DAY_BADGE_MIN_REV) {
      if (strLang == "ar")
        return "لا ينفتح هذا الوسام إلا بعد إضافة ٣ مراجعات!";
      if (strLang == "en")
        return "This badge will be active after adding at least 3 revisions!";
      return "unsupported language";
    }
    if (nStrID == STR_DAY_BADGE_ACTIVE) {
      if (strLang == "ar")
        return "بارك الله فيك! لقد قمت بتفعيل وسام المبادرة.";
      if (strLang == "en")
        return "Great Job! You have activated the Initiative Badge.";
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
        return "The Companionship Badge Activates When You Finish All Revisions in 30 Days or Less.\nMake It a Habit and Visit All Your Revisions at Least Once a Month!";
      return "unsupported language";
    }
    if (nStrID == STR_MONTH_BADGE_MIN_REV) {
      if (strLang == "ar")
        return "لا ينفتح هذا الوسام إلا بعد إضافة ١٠ مراجعات!";
      if (strLang == "en")
        return "This badge will be active after adding at least 10 revisions!";
      return "unsupported language";
    }
    if (nStrID == STR_MONTH_BADGE_ACTIVE) {
      if (strLang == "ar")
        return " فتح الله عليك أبواب الخير! لقد قمت بتفعيل وسام المصاحبة, وصرت صاحبا للقرآن.";
      if (strLang == "en")
        return "Great Job! You have activated your Companionship Badge.";
      return "unsupported language";
    }
    if (nStrID == STR_MONTH_BADGE_INACTIVE) {
      if (strLang == "ar")
        return "لم تقم بتفعيل هذا الوسام بعد. اقرأ كل أورادك في ٣٠ يوما لينفتح الوسام!";
      if (strLang == "en")
        return "You Still Did Not Activate This Badge. Finish all revisions in 30 days to light it up!";
      return "unsupported language";
    }
    if (nStrID == STR_WEEK_BADGE_DESC) {
      if (strLang == "ar")
        return "وسام المثابرة ينفتح لك عندما تقوم بمراجعة كل أورادك في خلال أسبوع أو أقل. فهذا كان دأب الصحابة الكرام ومن تبعهم بإحسان.";
      if (strLang == "en")
        return "The Dedication Badge Activates When You Finish All Revisions in 7 Days or Less.\nMake It a Habit and Visit All Your Revisions at Least Once a Week!";
      return "unsupported language";
    }
    if (nStrID == STR_WEEK_BADGE_MIN_REV) {
      if (strLang == "ar")
        return "لا ينفتح هذا الوسام إلا بعد إضافة ٧ مراجعات!";
      if (strLang == "en")
        return "This badge will be active after adding at least ٧ revisions!";
      return "unsupported language";
    }
    if (nStrID == STR_WEEK_BADGE_ACTIVE) {
      if (strLang == "ar")
        return "زادك الله فضلا! لقد قمت بتفعيل وسام المثابرة, وصرت من أهل القرآن.";
      if (strLang == "en")
        return "Great Job! You have activated the dedication Badge.";
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
        return "ابدأ الآن رحلتك مع القرآن الكريم, وقم ببناء عادة تلاوة و مراجعة ما تعلمت منه.";
      if (strLang == "en")
        return "Embark on your journey with the Quran and become a consistent reciter.";
      return "unsupported language";
    }
    if (nStrID == STR_INSTRUCTIONS_TITLE) {
      if (strLang == "ar") return "إليك طريقة الاستخدام:";
      if (strLang == "en") return "Here's how it works:";
      return "unsupported language";
    }
    if (nStrID == STR_INSTRUCTIONS1) {
      if (strLang == "ar") return "١- قم بملء قائمة أورادك.";
      if (strLang == "en") return "1- Setup your list of revisions.";
      return "unsupported language";
    }
    if (nStrID == STR_INSTRUCTIONS2) {
      if (strLang == "ar") return "٢- قم بتحديث القائمة كلما راجعت وردا منها.";
      if (strLang == "en") return "2- Update the list as you revise.";
      return "unsupported language";
    }
    if (nStrID == STR_INSTRUCTIONS3) {
      if (strLang == "ar") return "٣- داوم على المراجعة وقم بتفعيل أوسمتك.";
      if (strLang == "en") return "3- Light up badges and stay on track.";
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
    if (nStrID == STR_AGREE) {
      if (strLang == "ar") return "حسنا";
      if (strLang == "en") return "OK";
      return "unsupported language";
    }
    if (nStrID == STR_DAYBADGE_NAME) {
      if (strLang == "ar") return "وسام المبادرة";
      if (strLang == "en") return "Initiative Badge";
      return "unsupported language";
    }
    if (nStrID == STR_WEEKBADGE_NAME) {
      if (strLang == "ar") return "وسام المثابرة";
      if (strLang == "en") return "Dedication Badge";
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
    if (nStrID == STR_WELCOME) {
      if (strLang == "ar") return "مرحبا بك";
      if (strLang == "en") return "Welcome";
      return "unsupported language";
    }
    if (nStrID == STR_SELECT) {
      if (strLang == "ar") return "اختيار";
      if (strLang == "en") return "Select";
      return "unsupported language";
    }
    if (nStrID == STR_DAWEM) {
      if (strLang == "ar") return "داوم";
      if (strLang == "en") return "Dawem";
      return "unsupported language";
    }
    if (nStrID == STR_DAWEM) {
      if (strLang == "ar") return "موافقة";
      if (strLang == "en") return "Accept";
      return "unsupported language";
    }
    if (nStrID == STR_ADD_KHATMAH) {
      if (strLang == "ar") return "إضافة ختمة";
      if (strLang == "en") return "Add Khatam";
      return "unsupported language";
    }
    if (nStrID == STR_BY_JUZUU) {
      if (strLang == "ar") return "إضافة ختمة (بالجزء)";
      if (strLang == "en") return "Add Khatam (by Juzuu)";
      return "unsupported language";
    }
    if (nStrID == STR_BY_SURAH) {
      if (strLang == "ar") return "إضافة ختمة (بالسورة)";
      if (strLang == "en") return "Add Khatam (by Suras)";
      return "unsupported language";
    }
    if (nStrID == STR_MOD_REV_LIST) {
      if (strLang == "ar") return "تعديل كل الأوراد";
      if (strLang == "en") return "Modify All Revisions";
      return "unsupported language";
    }
    if (nStrID == STR_RESET_ALL) {
      if (strLang == "ar") return "تحديث كل الأوراد";
      if (strLang == "en") return "Refresh All Revisions";
      return "unsupported language";
    }
    if (nStrID == STR_DEL_ALL) {
      if (strLang == "ar") return "حذف كل الأوراد";
      if (strLang == "en") return "Delete All Revisions";
      return "unsupported language";
    }
    if (nStrID == STR_BACKUP_RESTORE) {
      if (strLang == "ar") return "حفظ البيانات احتياطيا";
      if (strLang == "en") return "Data Backup";
      return "unsupported language";
    }
    if (nStrID == STR_BACKUP) {
      if (strLang == "ar") return "تخزين جميع الأوراد";
      if (strLang == "en") return "Save Revisions";
      return "unsupported language";
    }
    if (nStrID == STR_RESTORE) {
      if (strLang == "ar") return "استعادة الأوراد المخزنة";
      if (strLang == "en") return "Restore Revisions";
      return "unsupported language";
    }
    if (nStrID == STR_REV_TOOLS) {
      if (strLang == "ar") return "إدارة الأوراد";
      if (strLang == "en") return "Revisions Manager";
      return "unsupported language";
    }
    if (nStrID == STR_QURAN) {
      if (strLang == "ar") return "القرآن الكريم";
      if (strLang == "en") return "Holy Quran";
      return "unsupported language";
    }
    if (nStrID == STR_JUZUU) {
      if (strLang == "ar") return "الجزء";
      if (strLang == "en") return "Juzuu";
      return "unsupported language";
    }
    if (nStrID == STR_CHOOSE_BETWEEN) {
      if (strLang == "ar") return "اختر بين";
      if (strLang == "en") return "Select between";
      return "unsupported language";
    }
    if (nStrID == STR_RESTART_PROMPT) {
      if (strLang == "ar")
        return "ستتم إعادة تشغيل التطبيق لتفعيل كل التعديلات";
      if (strLang == "en") return "App will restart to apply all changes.";
      return "unsupported language";
    }
    if (nStrID == STR_ALHAMDULELLAH) {
      if (strLang == "ar") return "الحمد لله!";
      if (strLang == "en") return "Alhamdulellah!";
      return "unsupported language";
    }
    if (nStrID == STR_DAYBADGE_CONGRATS) {
      if (strLang == "ar") return "أحسنت صنعا! لقد قمت بتفعيل وسام المبادرة";
      if (strLang == "en") return "Good job! Initiative Badge activated";
      return "unsupported language";
    }
    if (nStrID == STR_MONTHBADGE_CONGRATS) {
      if (strLang == "ar")
        return "بارك الله فيك! لقد نجحت في تفعيل وسام المصاحبة";
      if (strLang == "en")
        return "May Allah bless you! Companionship Badge activated";
      return "unsupported language";
    }
    if (nStrID == STR_WEEKBADGE_CONGRATS) {
      if (strLang == "ar") return "رائع جدا! لقد قمت بتفعيل وسام المثابرة";
      if (strLang == "en")
        return "ُExcellent! You have activated the Dedication Badge";
      return "unsupported language";
    }
    if (nStrID == STR_TWOBADGES_CONGRATS) {
      if (strLang == "ar")
        return "ضاعف الله لك أجرك! لقد قمت بتفعيل وسامين في وقت واحد, أحسنت!";
      if (strLang == "en")
        return "Wonderful effort! You have activated two badges simultaneously";
      return "unsupported language";
    }
    if (nStrID == STR_THREEBADGES_CONGRATS) {
      if (strLang == "ar")
        return "زادك الله قربا منه! لقد فعلت ثلاثة أوسمة في وقت واحد";
      if (strLang == "en")
        return "Amazing! You have activated three badges simultaneously";
      return "unsupported language";
    }
    if (nStrID == STR_ALLBADGES_DONE_CONGRATS) {
      if (strLang == "ar")
        return "رفعك الله في الدارين! لقد نجحت في تفعيل كل الأوسمة";
      if (strLang == "en")
        return "May Allah elevate you higher! You have activated all badges";
      return "unsupported language";
    }
    if (nStrID == STR_ALLREVS_DONE_CONGRATS) {
      if (strLang == "ar")
        return "أداؤك ممتاز, تبارك الله! لقد راجعت كل أوراد قائمتك";
      if (strLang == "en") return "Awesome! You have finished all revisions";
      return "unsupported language";
    }
    if (nStrID == STR_ADD_REV_BY_TXT) {
      if (strLang == "ar") return "البحث عن الورد";
      if (strLang == "en") return "Search for Revision";
      return "unsupported language";
    }
    if (nStrID == STR_ADD_REV_BY_TXT_PROMPT) {
      if (strLang == "ar") return "اكتب بداية ونهاية الورد هنا";
      if (strLang == "en") return "Write start & end of revision here";
      return "unsupported language";
    }
    if (nStrID == STR_CANT_UNDERSTAND) {
      if (strLang == "ar")
        return "المعذرة, لم أستطع فهم هذه الجملة. هل يمكنك كتابتها بشكل مختلف؟";
      if (strLang == "en")
        return "I'm sorry, I didn't get that. Can you rephrase your query?";
      return "unsupported language";
    }
    if (nStrID == STR_ASSISTANT) {
      if (strLang == "ar") return "المساعد القرآني";
      if (strLang == "en") return "َQuranic Assistant";
      return "unsupported language";
    }
    if (nStrID == STR_CLOSE) {
      if (strLang == "ar") return "إغلاق";
      if (strLang == "en") return "Close";
      return "unsupported language";
    }
    return "unkown string";
  }

  getNumDaysSinceRevMessage(numDays) {
    if (this.strLang == "ar") {
      if (numDays == 1) {
        return "يوم واحد منذ آخر مراجعة";
      }
      if (numDays == 2) {
        return "يومان منذ آخر مراجعة";
      }
      if (numDays <= 10) {
        return (
          convertToArabicNumbers(numDays.toString(), "rtl") +
          " أيام منذ آخر مراجعة"
        );
      }

      return (
        convertToArabicNumbers(numDays.toString(), "rtl") +
        " يوماً منذ آخر مراجعة"
      );
    }
    if (this.strLang == "en") {
      if (numDays == 1) {
        return "One day since last revision";
      }
      return numDays + " days since last revision";
    }
    return "unsupported language";
  }
}
