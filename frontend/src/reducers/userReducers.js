// src/reducers/userReducers.js
import { UPDATE_USER_PROFILE, UPLOAD_USER_PROFILE_IMAGE, UPDATE_USER_EMAIL, UPDATE_USER_CONTACT, UPDATE_USER_QUALIFICATION, UPDATE_USER_JOB_ROLE,} from '../constants/userConstants';
import { USER_UPDATE_SKILLS } from '../constants/userConstants';
import { USER_UPDATE_EXPERIENCE } from '../constants/userConstants';
import { USER_UPDATE_PREFERRED_JOB_LOCATION } from '../constants/userConstants';
import { USER_UPLOAD_RESUME } from '../constants/userConstants';

const initialState = {
  name: '',
  email: '',
  contact: '',
  linkedin: '',
  profileImage: null,
  qualification: '',
  otherQualification: '',
  jobRole: '',
  skills: '',
  experience: '',
  currentJobTitle: '',
  currentCompany: '',
  timePeriod: '',
  previousCompany: '',
  preferredJobLocation: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    case UPLOAD_USER_PROFILE_IMAGE:
      return {
        ...state,
        profileImage: action.payload,
      };
    case UPDATE_USER_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case UPDATE_USER_CONTACT:
      return {
        ...state,
        contact: action.payload,
      };
    case UPDATE_USER_QUALIFICATION:
      return {
        ...state,
        qualification: action.payload,
      };
    case UPDATE_USER_JOB_ROLE:
      return {
        ...state,
        jobRole: action.payload,
      };
      
          case USER_UPDATE_SKILLS:
            return {
              ...state,
              skills: action.payload,
            };
            case USER_UPDATE_EXPERIENCE:
      return {
        ...state,
        experience: action.payload,
      };
      case USER_UPDATE_PREFERRED_JOB_LOCATION:
        return {
          ...state,
          preferredJobLocation: action.payload,
        };
        case USER_UPLOAD_RESUME:
          return {
            ...state,
            resume: action.payload, 
          };
    default:
      return state;
  }
  
    
};

export default userReducer;
