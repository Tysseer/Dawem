import * as qstrings from "./QuranicAssistantStrings";
import QuranicAssistantStrings from "./QuranicAssistantStrings";
import * as msgs from "./Messages";
import SearchTextParser from "./SearchTextParser";
import allAyat from "./quranAyat";
export default class QuranicAssistant {
  constructor() {
    this.stringsManager = new QuranicAssistantStrings();
    // to do: define a map for each entry point and then do lookup to respond
    this.myLastMsg = -1;
    this.userResponses = []; //array of object UserResponse (myMsg,strUserTxt)
    this.assistantUser = null;
    this.humanUser = null;
    this.screen = null;
    this.revToBeDivided = null; //used in case of dividing the revision the user input
    this.queryParser = new SearchTextParser();
  }
  addCustomTextMessage(strMsg) {
    this.screen.messageReady(
      new msgs.TextMessage(this.msgId++, this.assistantUser, strMsg)
    );
  }
  addTextMessage(id) {
    this.screen.messageReady(
      new msgs.TextMessage(
        this.msgId++,
        this.assistantUser,
        this.stringsManager.getStr(id)
      )
    );
    this.myLastMsg = id;
  }
  addUserTextMessage(id, strTxt) {
    let msgTxt = id > 0 ? this.stringsManager.getStr(id) : strTxt;
    this.screen.messageReady(
      new msgs.TextMessage(this.msgId++, this.humanUser, msgTxt)
    );
    this.userResponses.push(msgTxt);
  }
  intializeConversation(screen) {
    this.screen = screen;
    this.assistantUser = this.screen.assistantUser;
    this.humanUser = this.screen.humanUser;
    this.msgId = 1;

    this.addTextMessage(qstrings.STR_GREETING_TO_USER);

    this.addTextMessage(qstrings.STR_ASSISTANT_INTRO);

    this.addTextMessage(qstrings.STR_ASSISTANT_MISSION);

    this.addTextMessage(qstrings.STR_ASSISTANT_ASK_EXPLAIN);

    this.addYesNoBtnsMsg(
      qstrings.STR_HUMAN_ACCEPT_EXPLAIN,
      qstrings.STR_HUMAN_REJECT_EXPLAIN
    );
  }
  addYesNoBtnsMsg(idYes, idNo) {
    this.screen.messageReady(
      new msgs.ButtonsMessage(this.msgId++, this.assistantUser, [
        {
          label: this.stringsManager.getStr(qstrings.STR_YES),
          onClick: () => {
            this.userRespondedYes.bind(this)(idYes);
          },
        },
        {
          label: this.stringsManager.getStr(qstrings.STR_NO),
          onClick: () => {
            this.userRespondedNo.bind(this)(idNo);
          },
        },
      ])
    );
  }
  userRespondedYes(id) {
    this.addUserTextMessage(id, "");
    this.getResponse(id, "");
  }
  userRespondedNo(id) {
    this.addUserTextMessage(id, "");
    this.getResponse(id, "");
  }

  askForExplanation() {
    this.addTextMessage(qstrings.STR_ASSISTANT_DIDNOT_UNDERSTAND);
  }
  addAppExplanation() {
    this.addTextMessage(qstrings.STR_EXPLAIN_STRT);
    this.addTextMessage(qstrings.STR_EXPLAIN_1);
    this.addTextMessage(qstrings.STR_EXPLAIN_2);
    this.addTextMessage(qstrings.STR_ASSISTANT_ASK_CONTINUE);

    this.addYesNoBtnsMsg(
      qstrings.STR_HUMAN_ACCEPT_EXPLAIN_MORE,
      qstrings.STR_HUMAN_REJECT_EXPLAIN_MORE
    );
  }
  addPrepQuestion(bFuture) {
    let id = bFuture
      ? qstrings.STR_ASSISTANT_ASK_FORGET_FUTURE
      : qstrings.STR_ASSISTANT_ASK_FORGET_PAST;
    let idY = bFuture
      ? qstrings.STR_HUMAN_AGREE_THEY_MAY_FORGET
      : qstrings.STR_HUMAN_AGREE_THEY_FORGET;
    let idN = bFuture
      ? qstrings.STR_HUMAN_REJECT_THEY_MAY_FORGET
      : qstrings.STR_HUMAN_REJECT_THEY_FORGET;
    this.addTextMessage(id);

    this.addYesNoBtnsMsg(idY, idN);
  }
  addPrepQuestion2() {
    this.addTextMessage(qstrings.STR_ASSISTANT_ASK_WHY_FORGET);
    this.screen.enableUserChat(true);
  }
  explainSpacedRep() {
    this.addTextMessage(qstrings.STR_ASSISTANT_ANSWER_WHY_FORGET);
    this.addTextMessage(qstrings.STR_ASSISTANT_EXPLAIN_SPACED_REPITION_1);
    this.addTextMessage(qstrings.STR_ASSISTANT_EXPLAIN_SPACED_REPITION_2);
    this.addTextMessage(qstrings.STR_EXPLAIN_3);
    this.promptForAddingRevs(qstrings.STR_EXPLAIN_3);
  }
  promptForAddingRevs(idPrev) {
    let idPrompt = qstrings.STR_ASSISTANT_ASK_HELP_FILL;
    let idY = qstrings.STR_HUMAN_ACCEPT_FILL;
    let idN = qstrings.STR_HUMAN_REJECT_FILL;
    if (
      idPrev == qstrings.STR_REVISION_ADDED ||
      idPrev == qstrings.STR_REVISION_FAILED
    ) {
      idPrompt = qstrings.STR_ASSISTANT_ASK_HELP_FILL_AGAIN;
      idY = qstrings.STR_HUMAN_ACCEPT_FILL_AGAIN;
      idN = qstrings.STR_HUMAN_REJECT_FILL_AGAIN;
    }
    this.addTextMessage(idPrompt);

    this.addYesNoBtnsMsg(idY, idN);
  }
  startFill() {
    this.addTextMessage(qstrings.STR_ASSISTANT_EXPLAIN_FILL);
    this.screen.enableUserChat(true);
  }
  continueFill() {
    this.addTextMessage(qstrings.STR_ASSISTANT_EXPLAIN_FILL_AGAIN);
    this.screen.enableUserChat(true);
  }
  addHeldRevision(bDivide) {
    if (this.revToBeDivided == null) return;
    let revs = [];
    if (bDivide) {
      this.addTextMessage(qstrings.STR_ASSISTANT_CONFIRM_DIVIDE_REVISION);

      // divide pages by Rukuu
      let iStrtRukuu = this.queryParser.quranInfo.getRukuuFromAyah(
        this.revToBeDivided.strtAyah
      );

      let iEndRukuu = this.queryParser.quranInfo.getRukuuFromAyah(
        this.revToBeDivided.endAyah
      );
      let rangeStrt = this.queryParser.quranInfo.getRukuuAyahRange(iStrtRukuu);
      let rangeEnd = this.queryParser.quranInfo.getRukuuAyahRange(iEndRukuu);
      let bIsAr = this.stringsManager.getLanguage() == "ar";

      for (let i = iStrtRukuu + 1; i < iEndRukuu; i++) {
        let range = this.queryParser.quranInfo.getRukuuAyahRange(i);
        revs.push({
          strtAyah: range[0],
          endAyah: range[1],
          title: this.queryParser.quranInfo.getAutoTitle(
            range[0],
            range[1],
            bIsAr
          ),
        });
      }
      if (revs.length == 0) {
        revs.push(this.revToBeDivided);
      } else {
        if ((rangeStrt[0] + rangeStrt[1]) / 2 < this.revToBeDivided.strtAyah) {
          // don't add it , join it to first rev
          revs[0].strtAyah = this.revToBeDivided.strtAyah;
          revs[0].title = this.queryParser.quranInfo.getAutoTitle(
            revs[0].strtAyah,
            revs[0].endAyah,
            bIsAr
          );
        } else {
          revs.unshift({
            strtAyah: this.revToBeDivided.strtAyah,
            endAyah: rangeStrt[1],
            title: this.queryParser.quranInfo.getAutoTitle(
              this.revToBeDivided.strtAyah,
              rangeStrt[1],
              bIsAr
            ),
          });
        }

        if ((rangeEnd[0] + rangeEnd[1]) / 2 < this.revToBeDivided.endAyah) {
          // don't add it , join it to last rev
          revs[revs.length - 1].endAyah = this.revToBeDivided.endAyah;
          revs[revs.length - 1].title = this.queryParser.quranInfo.getAutoTitle(
            revs[revs.length - 1].strtAyah,
            revs[revs.length - 1].endAyah,
            bIsAr
          );
        } else {
          revs.push({
            strtAyah: this.revToBeDivided.strtAyah,
            endAyah: rangeStrt[1],
            title: this.queryParser.quranInfo.getAutoTitle(
              this.revToBeDivided.strtAyah,
              rangeStrt[1],
              bIsAr
            ),
          });
        }
      }
    } else {
      revs.push(this.revToBeDivided);
    }
    if (bDivide) {
      this.addCustomTextMessage(
        this.stringsManager.getDivideRevisionSuccessMsg(revs.length)
      );
    }
    for (let i = 0; i < revs.length; i++) {
      this.screen.addNewRev(revs[i]);
    }
    let title = this.revToBeDivided.title;
    this.revToBeDivided = null;
    this.addTextMessage(qstrings.STR_REVISION_ADDED);
    this.addCustomTextMessage(title);
    this.promptForAddingRevs(qstrings.STR_REVISION_ADDED);
  }

  handleRevisionQuery(text) {
    var ret = this.queryParser.parseRevisionQuery(text);
    if (ret != null && ret.bIsSuccess) {
      ret.strtAyah = this.queryParser.quranInfo.getAyahGlobalIndx(
        ret.strtSurah,
        ret.strtAyah
      );
      ret.endAyah = this.queryParser.quranInfo.getAyahGlobalIndx(
        ret.endSurah,
        ret.endAyah
      );
      ret.title = this.queryParser.quranInfo.getAutoTitle(
        ret.strtAyah,
        ret.endAyah,
        this.stringsManager.getLanguage() == "ar"
      ); // or text?
      let iStrtPage = this.queryParser.quranInfo.getPageFromAyah(ret.strtAyah);
      let iEndPage = this.queryParser.quranInfo.getPageFromAyah(ret.endAyah);
      if (iEndPage - iStrtPage > 4) {
        this.revToBeDivided = ret;
        this.addTextMessage(qstrings.STR_ASSISTANT_ASK_DIVIDE_REVISION);
        this.addYesNoBtnsMsg(
          qstrings.STR_HUMAN_ACCEPT_DIVIDE,
          qstrings.STR_HUMAN_REJECT_DIVIDE
        );
      } else {
        this.screen.addNewRev(ret);
        this.addTextMessage(qstrings.STR_REVISION_ADDED);
        this.addCustomTextMessage(ret.title);
        this.promptForAddingRevs(qstrings.STR_REVISION_ADDED);
      }
    } else {
      this.addTextMessage(qstrings.STR_REVISION_FAILED);
      this.promptForAddingRevs(qstrings.STR_REVISION_FAILED);
    }
  }
  endConversation() {
    this.addTextMessage(qstrings.STR_ASSISTANT_BYE);
    this.screen.endConversation();
  }

  getResponse(id, strUserCustomMsg) {
    if (id == qstrings.STR_HUMAN_ACCEPT_EXPLAIN) this.addAppExplanation();
    else if (id == qstrings.STR_HUMAN_REJECT_EXPLAIN)
      this.promptForAddingRevs(id);
    else if (id == qstrings.STR_HUMAN_ACCEPT_EXPLAIN_MORE)
      this.addPrepQuestion(false); //did you forget
    else if (id == qstrings.STR_HUMAN_REJECT_EXPLAIN_MORE)
      this.promptForAddingRevs(id);
    else if (id == qstrings.STR_HUMAN_AGREE_THEY_FORGET)
      this.addPrepQuestion2(); // why do we forget
    else if (id == qstrings.STR_HUMAN_REJECT_THEY_FORGET)
      this.addPrepQuestion(true);
    else if (id == qstrings.STR_HUMAN_AGREE_THEY_MAY_FORGET)
      this.addPrepQuestion2();
    else if (id == qstrings.STR_HUMAN_REJECT_THEY_MAY_FORGET)
      this.promptForAddingRevs(id);
    else if (id == qstrings.STR_HUMAN_ACCEPT_FILL) this.startFill();
    else if (id == qstrings.STR_HUMAN_REJECT_FILL) this.endConversation();
    else if (id == qstrings.STR_HUMAN_ACCEPT_FILL_AGAIN) this.continueFill();
    else if (id == qstrings.STR_HUMAN_REJECT_FILL_AGAIN) this.endConversation();
    else if (id == qstrings.STR_HUMAN_ACCEPT_DIVIDE) this.addHeldRevision(true);
    else if (id == qstrings.STR_HUMAN_REJECT_DIVIDE)
      this.addHeldRevision(false);
    else {
      if (strUserCustomMsg != "") {
        this.addUserTextMessage(-1, strUserCustomMsg);
      }
      if (this.myLastMsg == qstrings.STR_ASSISTANT_ASK_WHY_FORGET) {
        this.explainSpacedRep();
      }
      if (
        this.myLastMsg == qstrings.STR_ASSISTANT_EXPLAIN_FILL ||
        this.myLastMsg == qstrings.STR_ASSISTANT_EXPLAIN_FILL_AGAIN
      ) {
        this.handleRevisionQuery(strUserCustomMsg);
      } else {
        this.askForExplanation();
        this.screen.enableUserChat(true);
      }
    }
  }
}
