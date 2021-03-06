export const APP_FIRST_RUN_FLAG = "APP_FIRST_RUN_FLAG";
export const WELCOME_FLAG = "WELCOME_FLAG";
export const LANGUAGE = "LANGUAGE";
export const ADD_REVISION = "ADD_REVISION";
export const UPDATE_REVISION = "UPDATE_REVISION";
export const DEL_REVISION = "DEL_REVISION";
export const SET_CUR_REVISION = "SET_CUR_REVISION";

export const reduxActionSetFirstRunFlag = (bIsFirstRun) => ({
  type: APP_FIRST_RUN,
  payload: bIsFirstRun,
});
export const reduxActionSetWelcomeFlag = (bIsChecked) => ({
  type: WELCOME_FLAG,
  payload: bIsChecked,
});
export const reduxActionSetLanguage = (strCurLang) => ({
  type: LANGUAGE,
  payload: strCurLang,
});
export const reduxActionAddRevision = (revision) => ({
  type: ADD_REVISION,
  payload: revision,
});
export const reduxActionUpdateRevision = (revision) => ({
  type: UPDATE_REVISION,
  payload: revision,
});
export const reduxActionDelRevision = (revision) => ({
  type: DEL_REVISION,
  payload: revision,
});
export const reduxActionSetCurRevision = (revision) => ({
  type: SET_CUR_REVISION,
  payload: revision,
});
