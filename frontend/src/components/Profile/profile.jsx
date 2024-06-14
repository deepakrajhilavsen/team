import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserProfile,
  uploadUserProfileImage,
  updateUserEmail,
  updateUserContact,
  updateUserQualification,
  updateUserJobRole,
  updateUserSkills,
  updateUserExperience,
  updateUserPreferredJobLocation,
  uploadResume
} from '../../actions/userActions';

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const [email, setEmail] = useState(userInfo.email);
  const [contact, setContact] = useState(userInfo.contact);
  const [linkedin, setLinkedin] = useState(userInfo.linkedin || '');
  const [qualification, setQualification] = useState(userInfo.qualification || '');
  const [otherQualification, setOtherQualification] = useState(userInfo.otherQualification || '');
  const [jobRole, setJobRole] = useState(userInfo.jobRole || '');
  const [skills, setSkills] = useState(userInfo.skills || '');
  const [otherSkills, setOtherSkills] = useState('');
  const [experience, setExperience] = useState(userInfo.experience || '');
  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [previousCompany, setPreviousCompany] = useState('');
  const [preferredJobLocation, setPreferredJobLocation] = useState(userInfo.preferredJobLocation || '');
  const [otherJobLocation, setOtherJobLocation] = useState('');
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    // Simulate fetching user data
    const fetchedUserData = {
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      contact: '123-456-7890',
      linkedin: 'https://www.linkedin.com/in/janedoe/',
      profileImage: 'https://via.placeholder.com/150',
      jobRole: 'Full Stack Developer',
      skills: 'JavaScript, React, Node.js',
      experience: 'experienced',
      currentJobTitle: 'Software Engineer',
      currentCompany: 'Tech Corp',
      timePeriod: '2 years',
      previousCompany: 'Web Solutions',
      preferredJobLocation: 'California' // Simulated preferred job location
    };
    dispatch(updateUserProfile(fetchedUserData));
  }, [dispatch]);
  

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      dispatch(uploadUserProfileImage(URL.createObjectURL(e.target.files[0])));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    dispatch(updateUserEmail(e.target.value));
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
    dispatch(updateUserContact(e.target.value));
  };

  const handleLinkedinChange = (e) => {
    setLinkedin(e.target.value);
    dispatch(updateUserLinkedin(e.target.value));
  };

  const handleQualificationChange = (e) => {
    const value = e.target.value;
    setQualification(value);
    dispatch(updateUserQualification(value));
    if (value !== 'Other') {
      setOtherQualification('');
    }
  };

  const handleJobRoleChange = (e) => {
    setJobRole(e.target.value);
    dispatch(updateUserJobRole(e.target.value));
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    setSkills(value);
    dispatch(updateUserSkills(value));
    if (value !== 'Others') {
      setOtherSkills('');
    }
  };

  const handleOtherSkillsChange = (e) => {
    setOtherSkills(e.target.value);
  };

  const handleExperienceChange = (e) => {
    const value = e.target.value;
    setExperience(value);
    dispatch(updateUserExperience(value));
   
    if (value !== 'experienced') {
      setCurrentJobTitle('');
      setCurrentCompany('');
      setTimePeriod('');
      setPreviousCompany('');
    }
  };

  const handleCurrentJobTitleChange = (e) => {
    setCurrentJobTitle(e.target.value);
  };

  const handleCurrentCompanyChange = (e) => {
    setCurrentCompany(e.target.value);
  };

  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

  const handlePreviousCompanyChange = (e) => {
    setPreviousCompany(e.target.value);
  };

  const handlePreferredJobLocationChange = (e) => {
    const value = e.target.value;
    setPreferredJobLocation(value);
    dispatch(updateUserPreferredJobLocation(value));
    if (value !== 'Others') {
      setOtherJobLocation('');
    }
  };

  const handleOtherJobLocationChange = (e) => {
    setOtherJobLocation(e.target.value);
  };

  const handleResumeUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleUploadResume = () => {
    if (resumeFile) {
      dispatch(uploadResume(resumeFile));
    }
  };

  return (
    <div className="profile-page flex p-8 bg-gray-100">
      <div className="profile-image w-1/2 flex flex-col items-center">
        {userInfo.profileImage ? (
          <img src={userInfo.profileImage} alt="Profile" className="w-40 h-40 rounded-full object-cover" />
        ) : (
          <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          id="profileImage"
          onChange={handleImageChange}
          className="hidden-input"
        />
        <label htmlFor="profileImage" className="custom-file-label">
          Choose Profile
        </label>
      </div>
      <div className="user-info w-1/2">
        <h2 className="text-2xl font-bold mb-4">{userInfo.name}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Contact Number</label>
          <input
            type="text"
            value={contact}
            onChange={handleContactChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Please enter a valid email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">LinkedIn Profile</label>
          <input
            type="text"
            value={linkedin}
            onChange={handleLinkedinChange}
            placeholder="Enter your LinkedIn profile URL"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Qualification</label>
          <div className="flex items-center">
            <select
              value={qualification}
              onChange={handleQualificationChange}
              className="block appearance-none w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Qualification</option>
              <option value="UG">UG</option>
              <option value="PG">PG</option>
              <option value="Other">Other</option>
            </select>
            {qualification === 'Other' && (
              <input
                type="text"
                value={otherQualification}
                onChange={(e) => setOtherQualification(e.target.value)}
                placeholder="Enter Other Qualification"
                className="ml-2 p-2 border border-gray-300 rounded-md"
              />
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Job Role</label>
          <input
            type="text"
            value={jobRole}
            onChange={handleJobRoleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Skills</label>
          <div className="flex items-center">
            <select
              value={skills}
              onChange={handleSkillsChange}
              className="block appearance-none w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Skills</option>
              <option value="C">C</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="C++">C++</option>
              <option value="Others">Others</option>
            </select>
            {skills === 'Others' && (
              <input
                type="text"
                value={otherSkills}
                onChange={handleOtherSkillsChange}
                placeholder="Enter Other Skills"
                className="ml-2 p-2 border border-gray-300 rounded-md"
              />
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Experience</label>
          <div className="flex items-center">
            <select
              value={experience}
              onChange={handleExperienceChange}
              className="block appearance-none w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Experience</option>
              <option value="freshers">Freshers</option>
              <option value="students">Students</option>
              <option value="experienced">Experienced</option>
            </select>
          </div>
        </div>
        {experience === 'experienced' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">Current Job Title</label>
            <input
              type="text"
              value={currentJobTitle}
              onChange={handleCurrentJobTitleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <label className="block text-sm font-medium text-gray-900 mt-4">Current Company</label>
            <input
              type="text"
              value={currentCompany}
              onChange={handleCurrentCompanyChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <label className="block text-sm font-medium text-gray-900 mt-4">Time Period</label>
            <input
              type="text"
              value={timePeriod}
              onChange={handleTimePeriodChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <label className="block text-sm font-medium text-gray-900 mt-4">From Previous Company</label>
            <input
              type="text"
              value={previousCompany}
              onChange={handlePreviousCompanyChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Preferred Job Location</label>
          <div className="flex items-center">
            <select
              value={preferredJobLocation}
              onChange={handlePreferredJobLocationChange}
              className="block appearance-none w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Preferred Job Location</option>
              <option value="California">California</option>
              <option value="New York">New York</option>
              <option value="Texas">Texas</option>
              <option value="Florida">Florida</option>
              <option value="Illinois">Illinois</option>
              <option value="Others">Others</option>
            </select>
            {preferredJobLocation === 'Others' && (
              <input
                type="text"
                value={otherJobLocation}
                onChange={handleOtherJobLocationChange}
                placeholder="Enter Preferred Job Location"
                className="ml-2 p-2 border border-gray-300 rounded-md"
              />
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Upload Resume</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
      Upload
    </button>

        </div>
        
      </div>
    </div>
  );
};

export default Profile;

