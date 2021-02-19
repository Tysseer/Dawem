import RevisionsManager from "../helpers/RevisionsManager";
import * as allActions from "./reduxActions";
import INITIAL_STATE from "./reduxState";
const actionsReducer = (state = INITIAL_STATE, action) => {
  const { bSkipWelcome, strLang, revisions, curRevision } = state;
  switch (action.type) {
    case allActions.WELCOME_FLAG: {
      const newflag = action.payload;
      const newState = {
        bSkipWelcome: newflag,
        strLang: strLang,
        revisions: revisions,
        curRevision: curRevision,
      };
      return newState;
    }
    case allActions.LANGUAGE: {
      const newlang = action.payload;
      const newState = {
        bSkipWelcome: bSkipWelcome,
        strLang: newlang,
        revisions: revisions,
        curRevision: curRevision,
      };
      return newState;
    }
    case allActions.SET_CUR_REVISION: {
      const rev = action.payload;
      const newState = {
        bSkipWelcome: bSkipWelcome,
        strLang: strLang,
        revisions: revisions,
        curRevision: rev,
      };
      return newState;
    }
    case allActions.ADD_REVISION: {
      const rev = action.payload;
      var newRevArr = revisions.concat([rev]);
      var revisionsManager = new RevisionsManager();
      revisionsManager.m_loadedRevisions = newRevArr;
      revisionsManager.sortRevisions();
      newRevArr = revisionsManager.m_loadedRevisions;
      const newState = {
        bSkipWelcome: bSkipWelcome,
        strLang: strLang,
        revisions: newRevArr,
        curRevision: null,
      };

      return newState;
    }
    case allActions.UPDATE_REVISION:
    case allActions.DEL_REVISION: {
      // todo: replace push with splice or more efficient way
      const rev = action.payload;

      var newRevArr = [];
      for (var i = 0; i < revisions.length; i++) {
        if (revisions[i].id != rev.id) {
          newRevArr.push(revisions[i]); //currev[i].clone()
          continue;
        }
      }
      if (action.type == allActions.UPDATE_REVISION) newRevArr.push(rev); //rev.clone()

      var revisionsManager = new RevisionsManager();
      revisionsManager.m_loadedRevisions = newRevArr;
      revisionsManager.sortRevisions();
      newRevArr = revisionsManager.m_loadedRevisions;
      const newState = {
        bSkipWelcome: bSkipWelcome,
        strLang: strLang,
        revisions: newRevArr,
        curRevision: null,
      };

      return newState;
    }
    default:
      return state;
  }
};
export default actionsReducer;
