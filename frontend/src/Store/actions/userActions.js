// userActions.js

import * as types from '../../utils/constants/userConstants';

export const updateUserProfile = (userData) => ({
  type: types.UPDATE_USER_PROFILE,
  payload: userData
});

export const uploadUserProfileImage = (imageURL) => ({
  type: types.UPLOAD_USER_PROFILE_IMAGE,
  payload: imageURL
});

export const updateUserEmail = (email) => ({
  type: types.UPDATE_USER_EMAIL,
  payload: email
});

export const updateUserContact = (contact) => ({
  type: types.UPDATE_USER_CONTACT,
  payload: contact
});

export const updateUserQualification = (qualification) => ({
  type: types.UPDATE_USER_QUALIFICATION,
  payload: qualification
});

export const updateOtherQualification = (otherQualification) => ({
  type: types.UPDATE_USER_OTHER_QUALIFICATION,
  payload: otherQualification
});

export const updateUserJobRole = (jobRole) => ({
  type: types.UPDATE_USER_JOB_ROLE,
  payload: jobRole
});

export const updateUserSkills = (skills) => ({
  type: types.UPDATE_USER_SKILLS,
  payload: skills
});

export const updateUserExperience = (experience) => ({
  type: types.UPDATE_USER_EXPERIENCE,
  payload: experience
});

export const updateUserPreferredJobLocation = (preferredJobLocation) => ({
  type: types.UPDATE_USER_PREFERRED_JOB_LOCATION,
  payload: preferredJobLocation
});

export const uploadResume = (resumeFile) => ({
  type: types.UPLOAD_RESUME,
  payload: resumeFile
});
