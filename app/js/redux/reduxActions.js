export const WELCOME_FLAG = "WELCOME_FLAG";
export const LANGUAGE = "LANGUAGE";
export const ADD_REVISION = "ADD_REVISION";
export const UPDATE_REVISION = "UPDATE_REVISION";
export const DEL_REVISION = "DEL_REVISION";
export const reduxSetWelcomeFlag = (bIsChecked) => ({
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
