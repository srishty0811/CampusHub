const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

export const endpoints = {
  LOGIN_API: BASE_URL + "/api/v1/auth/login",
  SIGNUP_API: BASE_URL + "/api/v1/auth/signup",
};

export const fileUploadEndpoints = {
  LOCAL_FILE_UPLOAD: BASE_URL + "/api/v1/upload/localFileUpload",
  FILE_UPLOAD_USING_DRIVE_LINK: BASE_URL + "/api/v1/upload/fileUploadUsingDriveLink",
  GET_SUBJECT_NAME_API: BASE_URL + "/api/v1/upload/getSubjectName",
  GET_FILES_BY_DEPARTMENT_AND_SUBJECT_API:
    BASE_URL + "/api/v1/upload/getFilesByDepartmentAndSubject",
  GET_USER_NOTES: BASE_URL + "/api/v1/upload/getUserNotes",
  DELETE_NOTE: BASE_URL + "/api/v1/upload/DeleteNote",
};

export const ProfileEndPoints = {
  GET_USER_DETAILS: BASE_URL + "/api/v1/profile/getUserDetails",
  UPDATE_USER_PROFILE: BASE_URL + "/api/v1/profile/updateProfile",   // new
  GET_USER_DOWNLOADS: BASE_URL + "/api/v1/profile/getUserDownloads", // new
};

export const feedbackFormEndPoints = {
  SEND_FEEDBACK: BASE_URL + "/api/v1/contact/sendFeedback",
};

