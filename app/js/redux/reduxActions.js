export const APP_FIRST_RUN_FLAG = "APP_FIRST_RUN_FLAG";
export const SKIP_WELCOME_FLAG = "SKIP_WELCOME_FLAG";
export const DAILY_NOTIFICATION_FLAG = "DAILY_NOTIFICATION_FLAG";
export const LANGUAGE = "LANGUAGE";
export const ADD_REVISION = "ADD_REVISION";
export const UPDATE_REVISION = "UPDATE_REVISION";
export const DEL_REVISION = "DEL_REVISION";
export const SET_CUR_REVISION = "SET_CUR_REVISION";
export const DEL_ِِALL_REVISIONS = "DEL_ِِALL_REVISIONS";
export const RESET_ِِALL_REVISIONS = "RESET_ِِALL_REVISIONS";
export const ADD_MULTIPLE_REVISIONS = "ADD_MULTIPLE_REVISIONS";

export const reduxActionSetFirstRunFlag = (bIsFirstRun) => ({
  type: APP_FIRST_RUN_FLAG,
  payload: bIsFirstRun,
});
export const reduxActionSetWelcomeFlag = (bIsChecked) => ({
  type: SKIP_WELCOME_FLAG,
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
export const reduxActionDelAllRevisions = () => ({
  type: DEL_ِِALL_REVISIONS,
  payload: null,
});
export const reduxActionResetAllRevisions = () => ({
  type: RESET_ِِALL_REVISIONS,
  payload: null,
});
export const reduxActionAddMultipleRevisions = (revisions) => ({
  type: ADD_MULTIPLE_REVISIONS,
  payload: revisions,
});
export const reduxActionSetNotifFlag = (bIsNotify) => ({
  type: DAILY_NOTIFICATION_FLAG,
  payload: bIsNotify,
});
