// src/actions/userActions.js
import { UPDATE_USER_PROFILE, UPLOAD_USER_PROFILE_IMAGE, UPDATE_USER_EMAIL, UPDATE_USER_CONTACT, UPDATE_USER_QUALIFICATION, UPDATE_USER_JOB_ROLE,  } from '../constants/userConstants';
import { USER_UPDATE_SKILLS } from '../constants/userConstants';
import { USER_UPDATE_EXPERIENCE } from '../constants/userConstants';
import { USER_UPDATE_PREFERRED_JOB_LOCATION } from '../constants/userConstants';
import { USER_UPLOAD_RESUME } from '../constants/userConstants';

export const updateUserProfile = (profile) => ({
  type: UPDATE_USER_PROFILE,
  payload: profile,
});

export const uploadUserProfileImage = (image) => ({
  type: UPLOAD_USER_PROFILE_IMAGE,
  payload: image,
});

export const updateUserEmail = (email) => ({
  type: UPDATE_USER_EMAIL,
  payload: email,
});

export const updateUserContact = (contact) => ({
  type: UPDATE_USER_CONTACT,
  payload: contact,
});

export const updateUserQualification = (qualification) => ({
  type: UPDATE_USER_QUALIFICATION,
  payload: qualification,
});

export const updateUserJobRole = (jobRole) => ({
  type: UPDATE_USER_JOB_ROLE,
  payload: jobRole,
});
export const updateUserSkills = (skills) => (dispatch) => {
  dispatch({
    type: USER_UPDATE_SKILLS,
    payload: skills,
  });
};
export const updateUserExperience = (experience) => (dispatch) => {
  dispatch({
    type: USER_UPDATE_EXPERIENCE,
    payload: experience,
  });
};
export const updateUserPreferredJobLocation = (location) => (dispatch) => {
  dispatch({
    type: USER_UPDATE_PREFERRED_JOB_LOCATION,
    payload: location,
  });
};

export const uploadResume = (resumeData) => {
  return {
    type: USER_UPLOAD_RESUME,
    payload: resumeData,
  };
};