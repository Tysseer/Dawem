import * as allActions from "./reduxActions";
import INITIAL_STATE from "./reduxState";
const actionsReducer = (state = INITIAL_STATE, action) => {
  const { bSkipWelcome, strLang, revisions } = state;
  switch (action.type) {
    case allActions.WELCOME_FLAG: {
      const newflag = action.payload;
      const newState = {
        bSkipWelcome: newflag,
        strLang: strLang,
        revisions: revisions,
      };
      return newState;
    }
    case allActions.LANGUAGE: {
      const newlang = action.payload;
      const newState = {
        bSkipWelcome: bSkipWelcome,
        strLang: newlang,
        revisions: revisions,
      };
      return newState;
    }
    case allActions.ADD_REVISION: {
      const rev = action.payload;
      var newRevArr = currev.concat([rev]);
      const newState = {
        bSkipWelcome: bSkipWelcome,
        strLang: newlang,
        revisions: newRevArr,
      };
      return newState;
    }
    case allActions.UPDATE_REVISION:
    case allActions.DEL_REVISION: {
      // todo: replace push with splice or more efficient way
      const rev = action.payload;
      var newRevArr = [];
      for (var i = 0; i < currev.length; i++) {
        if (currev[i].id != rev.id) {
          newRevArr.push(currev[i]); //currev[i].clone()
          continue;
        }
        if (action.type == allActions.UPDATE_REVISION) newRevArr.push(rev); //rev.clone()
      }
      const newState = {
        bSkipWelcome: bSkipWelcome,
        strLang: newlang,
        revisions: newRevArr,
      };
      return newState;
    }
    default:
      return state;
  }
};
export default actionsReducer;
