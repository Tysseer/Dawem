export const STR_ASSISTANT_NAME = 1;
export const STR_ASSISTANT_MISSION = 2;
export const STR_ASSISTANT_INTRO = 3;
export const STR_USER_NAME = 4;
export const STR_GREETING_TO_USER = 5;
export const STR_ASSISTANT_ASK_EXPLAIN = 6;
export const STR_YES = 7;
export const STR_NO = 8;
export const STR_HUMAN_ACCEPT_EXPLAIN = 9;
export const STR_HUMAN_REJECT_EXPLAIN = 10;
export const STR_EXPLAIN_1 = 11;
export const STR_EXPLAIN_2 = 12;
export const STR_ASSISTANT_ASK_CONTINUE = 13;
export const STR_ASSISTANT_ASK_FORGET_PAST = 14;
export const STR_ASSISTANT_ASK_FORGET_FUTURE = 15;
export const STR_ASSISTANT_ASK_WHY_FORGET = 16;
export const STR_ASSISTANT_ANSWER_WHY_FORGET = 17;
export const STR_ASSISTANT_EXPLAIN_SPACED_REPITION = 18;
export const STR_EXPLAIN_3 = 19;
export const STR_ASSISTANT_ASK_HELP_FILL = 20;
export const STR_ASSISTANT_BYE = 21;
export const STR_ASSISTANT_DIDNOT_UNDERSTAND = 22;
export const STR_HUMAN_ACCEPT_EXPLAIN_MORE = 23;
export const STR_HUMAN_REJECT_EXPLAIN_MORE = 24;
export const STR_EXPLAIN_STRT = 25;
export const STR_HUMAN_REJECT_THEY_FORGET = 26;
export const STR_HUMAN_AGREE_THEY_MAY_FORGET = 27;
export const STR_HUMAN_REJECT_THEY_MAY_FORGET = 28;
export const STR_ADD_YOUR_TXT = 29;
export const STR_HUMAN_ACCEPT_FILL = 30;
export const STR_HUMAN_REJECT_FILL = 31;
export const STR_ASSISTANT_EXPLAIN_SPACED_REPITION_1 = 32;
export const STR_ASSISTANT_EXPLAIN_SPACED_REPITION_2 = 33;
export const STR_ASSISTANT_EXPLAIN_FILL = 34;
export const STR_REVISION_ADDED = 35;
export const STR_REVISION_FAILED = 36;
export const STR_HUMAN_AGREE_THEY_FORGET = 37;
export const STR_ASSISTANT_ASK_HELP_FILL_AGAIN = 38;
export const STR_HUMAN_ACCEPT_FILL_AGAIN = 39;
export const STR_HUMAN_REJECT_FILL_AGAIN = 40;
export const STR_ASSISTANT_EXPLAIN_FILL_AGAIN = 41;
export default class QuranicAssistantStrings {
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
    if (nStrID == STR_ASSISTANT_INTRO) {
      let ret = "";
      if (strLang == "ar") ret = "أنا ";
      if (strLang == "en") ret = "I am ";
      ret += this.getStrLang(strLang, STR_ASSISTANT_NAME);
      return ret == "" ? "unsupported language" : ret;
    }
    if (nStrID == STR_GREETING_TO_USER) {
      let ret = "";
      if (strLang == "ar") ret = "مرحبا يا  ";
      if (strLang == "en") ret = "ًWelcome ";
      ret += this.getStrLang(strLang, STR_USER_NAME);
      return ret == "" ? "unsupported language" : ret;
    }
    if (nStrID == STR_ASSISTANT_NAME) {
      if (strLang == "ar") return "مُديم";
      if (strLang == "en") return "َModeem";
      return "unsupported language";
    }
    if (nStrID == STR_USER_NAME) {
      if (strLang == "ar") return "محب القرآن";
      if (strLang == "en") return "َQuran Lover";
      return "unsupported language";
    }
    if (nStrID == STR_ASSISTANT_MISSION) {
      if (strLang == "ar")
        return "مهمتي هي أن أساعدك على تحديد أهدافك القرآنية وتقسيم مراجعاتك بسهولة وسرعة...";
      if (strLang == "en")
        return "I'm here to help you set up your Quranic goals and fill your list of revisions quickly and easily";
      return "unsupported language";
    }
    if (nStrID == STR_ASSISTANT_ASK_EXPLAIN) {
      if (strLang == "ar")
        return "هل تريد أن أشرح لك سريعا ماهي فكرة تطبيق داوم؟";
      if (strLang == "en")
        return "Would you like me to briefly explain how Dawem app works?";
      return "unsupported language";
    }

    if (nStrID == STR_YES) {
      if (strLang == "ar") return "نعم";
      if (strLang == "en") return "َYes";
      return "unsupported language";
    }
    if (nStrID == STR_NO) {
      if (strLang == "ar") return "لا";
      if (strLang == "en") return "َNo";
      return "unsupported language";
    }
    if (nStrID == STR_HUMAN_ACCEPT_EXPLAIN) {
      if (strLang == "ar") return "نعم أريد شرحا";
      if (strLang == "en") return "Yes, I'd like an explanation";
      return "unsupported language";
    }
    if (nStrID == STR_HUMAN_REJECT_EXPLAIN) {
      if (strLang == "ar") return "كلا, لا أريد شرحا";
      if (strLang == "en") return "No, I don't want an explanation";
      return "unsupported language";
    }
    if (nStrID == STR_EXPLAIN_1) {
      if (strLang == "ar")
        return "يهدف تطبيق داوم إلى مساعدتك على تكوين عادة يومية متكررة وهي تثبيت ومراجعة أهدافك من القرآن الكريم بتقسيمها إلى أوراد محددة في قائمتك ";
      if (strLang == "en")
        return "Dawem aims at helping you stay consistent with you goals in reciting thq Quran through dividing those goals into a concise list of specific parts";
      return "unsupported language";
    }
    if (nStrID == STR_EXPLAIN_2) {
      if (strLang == "ar")
        return "بعد بناء قائمة أهدافك القرآنية, يساعدك التطبيق على زيارة كل ورد منها مع متابعة عدد الأيام منذ آخر مراجعة لكل ورد, حتى لا تغفل أو تنسى أحدها";
      if (strLang == "en")
        return "After building your list of goals, Dawem helps you to visit the items on the list and keeps track of the number of days since last revision for each item";
      return "unsupported language";
    }
    if (nStrID == STR_ASSISTANT_ASK_CONTINUE) {
      if (strLang == "ar") return "هل تريد أن أستمر في شرح فكرة تطبيق داوم؟";
      if (strLang == "en")
        return "Do you want me to continue explaning how Dawem app works?";
      return "unsupported language";
    }
    if (nStrID == STR_ASSISTANT_ASK_FORGET_PAST) {
      if (strLang == "ar")
        return "بداية أود أن أسألك سؤالا: هل سبق لك أن حفظت شيئا من القرآن الكريم ثم نسيته بعد فترة؟";
      if (strLang == "en")
        return "Let me ask you this: Have you ever momerized parts ofthe Quran, only to forget it later on?";
      return "unsupported language";
    }
    if (nStrID == STR_ASSISTANT_ASK_FORGET_FUTURE) {
      if (strLang == "ar")
        return "حسنا، وهل تشعر أنه ربما تنسى مستقبلا ما تحفظه الآن من القرآن؟";
      if (strLang == "en")
        return "Ok, and do you think you might forget in the future what you already know of the Quran right now?";
      return "unsupported language";
    }
    if (nStrID == STR_ASSISTANT_ASK_WHY_FORGET) {
      if (strLang == "ar")
        return "برأيك ماهو سبب هذا النسيان؟ كيف يمكنك حماية ما تحفظه من القرآن في قلبك؟";
      if (strLang == "en")
        return "Why do you think we forget the Quran? How can we perserve the Quran that we memorize in our hearts?";
      return "unsupported language";
    }
    if (nStrID == STR_ASSISTANT_ANSWER_WHY_FORGET) {
      if (strLang == "ar")
        return "إن السبب الرئيسي للنسيان -والذي اتفق عليه محفظو القرآن وحتى علماء وظائف العقل- هو التقصير في طريقة التكرار المتباعد";
      if (strLang == "en")
        return "The main reason -stated by both Quran teachers and cognitive scientists- is the lack of practicing spaced repititon";
      return "unsupported language";
    }
    if (nStrID == STR_ASSISTANT_EXPLAIN_SPACED_REPITION) {
      if (strLang == "ar")
        return "تقوم تقنية التكرار المتباعد على أساس تقسيم أنشطة الحفظ إلى فترات زمنية قصيرة , على أن يكون هناك فاصل زمني بين هذه الفترات يزداد مع مرور الوقت، على عكس التكرار المتتالي الذي يقوم من خلاله الشخص بحشو المعلومات في الذاكرة في فترة زمنية قصيرة بالتكرار مرة تلو مرة تلو مرة";
      if (strLang == "en")
        return "Spaced repetition is a powerful technique that will help you memorize information in much less time than it would take otherwise. The idea of spaced repetition is to space out your repetitions, or review sessions, so that you are not trying to cram all the knowledge into your brain at once.";
      return "unsupported language";
    }
    if (nStrID == STR_EXPLAIN_3) {
      if (strLang == "ar")
        return "يساعدك داوم على تطبيق طريقة التكرار المتباعد, فكلما فتحت قائمة أهدافك القرآنية سترى كم يوما مر على مراجعة كل من هذه الأهداف, وحين تراجع أي من أورادك تقوم بوضع علامة صح لتسجل إنجازك ";
      if (strLang == "en")
        return "Dawem helps you apply spaced repitition to revise your Quranic goals. When you open your list of Quranic goals you get to see how many days it's been since you last revised each goal. As you revise and read them, you check the list and see your accomplishments on the list.";
      return "unsupported language";
    }
    if (nStrID == STR_ASSISTANT_ASK_HELP_FILL) {
      if (strLang == "ar")
        return "هل تريد أن أساعدك في ملء قائمة أورادك القرآنية؟";
      if (strLang == "en")
        return "Would like me to help you build your list of Quranic goals?";
      return "unsupported language";
    }
    if (nStrID == STR_ASSISTANT_BYE) {
      if (strLang == "ar") return "حسنا, أتركك في رعاية الله";
      if (strLang == "en") return "Ok, I leave you with best prayers, bye";
      return "unsupported language";
    }
    if (nStrID == STR_ASSISTANT_DIDNOT_UNDERSTAND) {
      if (strLang == "ar")
        return "المعذرة, لم أفهم هذا الجواب, هل يمكن أن تعيد صياغته بكلمات أخرى؟";
      if (strLang == "en")
        return "Sorry, I couldn't understant that answer. Could you please choose different wording?";
      return "unsupported language";
    }
    if (nStrID == STR_HUMAN_ACCEPT_EXPLAIN_MORE) {
      if (strLang == "ar") return "نعم أريد المزيد من الشرح";
      if (strLang == "en") return "Yes, I'd like more explanation";
      return "unsupported language";
    }
    if (nStrID == STR_HUMAN_REJECT_EXPLAIN_MORE) {
      if (strLang == "ar") return "كلا, لا أريد المزيد";
      if (strLang == "en") return "No, I don't want more explanation";
      return "unsupported language";
    }
    if (nStrID == STR_EXPLAIN_STRT) {
      if (strLang == "ar") return "حسنا, لنبدأ باسم الله";
      if (strLang == "en") return "Ok, let's start, Bismillah";
      return "unsupported language";
    }
    if (nStrID == STR_HUMAN_AGREE_THEY_FORGET) {
      if (strLang == "ar") return "بالفعل أنا أعاني من مشكلة النسيان";
      if (strLang == "en") return "Yes, I did have this problem";
      return "unsupported language";
    }
    if (nStrID == STR_HUMAN_REJECT_THEY_FORGET) {
      if (strLang == "ar") return "كلا, بحمد الله لم أنس ما حفظت";
      if (strLang == "en") return "No, thank Allah I don't have this problem";
      return "unsupported language";
    }
    if (nStrID == STR_HUMAN_AGREE_THEY_MAY_FORGET) {
      if (strLang == "ar") return "نعم, أنا قلق من أن أنسى مستقبلا";
      if (strLang == "en")
        return "Yes, I think I will face this problem in the future";
      return "unsupported language";
    }
    if (nStrID == STR_HUMAN_REJECT_THEY_MAY_FORGET) {
      if (strLang == "ar") return "كلا, بعون الله أعتقد أنني لن أنسى مستقبلا";
      if (strLang == "en")
        return "No, thank Allah I don't think I will have this problem";
      return "unsupported language";
    }
    if (nStrID == STR_ADD_YOUR_TXT) {
      if (strLang == "ar") return "اكتب رسالتك هنا";
      if (strLang == "en") return "Write your message here";
      return "unsupported language";
    }
    if (nStrID == STR_HUMAN_ACCEPT_FILL) {
      if (strLang == "ar") return "نعم, أريد أن أبني قائمة أهدافي القرآنية";
      if (strLang == "en")
        return "Yes, I want to start building my list of Quranic goals";
      return "unsupported language";
    }
    if (nStrID == STR_HUMAN_REJECT_FILL) {
      if (strLang == "ar") return "لا شكرا, لا أريد ذلك الآن";
      if (strLang == "en") return "No, thanks.";
      return "unsupported language";
    }
    if (nStrID == STR_ASSISTANT_EXPLAIN_SPACED_REPITION_1) {
      if (strLang == "ar")
        return "تقوم تقنية التكرار المتباعد على أساس تقسيم أنشطة الحفظ إلى فترات زمنية قصيرة , على أن يكون هناك فاصل زمني بين هذه الفترات يزداد مع مرور الوقت";
      if (strLang == "en")
        return "Spaced repetition is a powerful technique that will help you memorize information in much less time than it would take otherwise.";
      return "unsupported language";
    }
    if (nStrID == STR_ASSISTANT_EXPLAIN_SPACED_REPITION_2) {
      if (strLang == "ar")
        return "هذا التكرار مع ترك فواصل هو على عكس التكرار المتتالي الذي يقوم من خلاله الشخص بحشو المعلومات في الذاكرة في فترة زمنية قصيرة بالتكرار مرة تلو مرة تلو مرة ثم ينسى بعد ذلك بسرعة";
      if (strLang == "en")
        return "The idea of spaced repetition is to space out your repetitions, or review sessions, so that you are not trying to cram all the knowledge into your brain at once.";
      return "unsupported language";
    }
    if (nStrID == STR_ASSISTANT_EXPLAIN_FILL) {
      if (strLang == "ar")
        return "أستطيع أن أساعدك في تحديد أهدافك القرآنية, اكتب لي الأماكن التي تريد أن تراجعها بانتظام من القرآن الكريم. حدد لي جزءا أو صفحات أو سورا من القرآن الكريم";
      if (strLang == "en")
        return "I can help you build your list. Please tell me which Surah's (chapters) or Juzuu's (parts) or pages you want to add from the Quran";
      return "unsupported language";
    }
    if (nStrID == STR_REVISION_ADDED) {
      if (strLang == "ar") return "الحمد لله, لقد أضفت لك هذا الورد في قائمتك";
      if (strLang == "en")
        return "Alhamdulellah! I've added a new Quranic goal to your list";
      return "unsupported language";
    }
    if (nStrID == STR_REVISION_FAILED) {
      if (strLang == "ar")
        return "لم أستطع أن أضيف هذا الورد, هل يمكن أن تغير صياغته. اكتب لي مثلا (سورة كذا من آية كذا) أو (الجزء الخامس) أو ما يشابه";
      if (strLang == "en")
        return "I couldn't understand that, could you please write it in another way? e.g. write (from Surah AlBaqarah verse 10 to 20) or (the first juzuu) or (pages 3 to 5)";
      return "unsupported language";
    }

    if (nStrID == STR_ASSISTANT_EXPLAIN_FILL_AGAIN) {
      if (strLang == "ar")
        return "اكتب لي الأماكن التي تريد إضافتها لقائمتك. حدد لي جزءا أو صفحات أو سورا من القرآن الكريم";
      if (strLang == "en")
        return "Please tell me which Surah's (chapters) or Juzuu's (parts) or pages you want to add to your list";
      return "unsupported language";
    }

    if (nStrID == STR_ASSISTANT_ASK_HELP_FILL_AGAIN) {
      if (strLang == "ar") return "هل تريد مواصلة ملء قائمة أورادك القرآنية؟";
      if (strLang == "en")
        return "Would like me to continue building your list of Quranic goals?";
      return "unsupported language";
    }

    if (nStrID == STR_HUMAN_ACCEPT_FILL_AGAIN) {
      if (strLang == "ar")
        return "نعم, أريد أن أواصل بناء قائمة أهدافي القرآنية";
      if (strLang == "en")
        return "Yes, I want to continue building my list of Quranic goals";
      return "unsupported language";
    }
    if (nStrID == STR_HUMAN_REJECT_FILL_AGAIN) {
      if (strLang == "ar") return "لا شكرا, لا أريد ذلك الآن";
      if (strLang == "en") return "No, thanks.";
      return "unsupported language";
    }
    return "unkown string" + nStrID;
  }
}
