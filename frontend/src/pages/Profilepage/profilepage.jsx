import React, { useState } from "react";
import TextInput from "../../components/Profile/TextInput";
import CheckboxInput from "../../components/Profile/CheckboxInput";
import DropdownInput from "../../components/Profile/DropdownInput";
import { IoMdCloseCircle, IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { initialState } from "../../Store/slices/userSlice";
import ButtonInput from "../../components/Profile/ButtonInput";

const Profile = () => {
  const [userData, setUserData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split(".");
    let currentData = { ...userData };

    keys.reduce((acc, key, index) => {
      if (index === keys.length - 1) {
        if (Array.isArray(acc[key])) {
          acc[key] = [...acc[key], value];
        } else {
          acc[key] = type === "checkbox" ? checked : value;
        }
      } else if (Array.isArray(acc[key])) {
        acc[key] = [...acc[key]];
      } else {
        acc[key] = { ...acc[key] };
      }
      return acc[key];
    }, currentData);

    console.log(currentData);
    setUserData(currentData);
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = userData.skills.filter(
      (skill) => skill !== skillToRemove
    );
    setUserData((prevState) => ({
      ...prevState,
      skills: updatedSkills,
    }));
  };

  const addJobHistoryEntry = () => {
    const newJobHistoryEntry = initialState.experience.jobHistory[0];
    setUserData((prevState) => ({
      ...prevState,
      experience: {
        ...prevState.experience,
        jobHistory: [...prevState.experience.jobHistory, newJobHistoryEntry],
      },
    }));
  };

  const removeJobHistoryEntry = (index) => {
    const updatedJobHistory = [...userData.experience.jobHistory];
    updatedJobHistory.splice(index, 1);
    setUserData((prevState) => ({
      ...prevState,
      experience: {
        ...prevState.experience,
        jobHistory: updatedJobHistory,
      },
    }));
  };

  return (
    <div className="profile-page flex p-8 bg-gray-100 flex-col items-center">
      {/* Profile Picture */}
      <TextInput
        label="Profile Picture"
        name="profilePhoto"
        value={userData.profilePhoto}
        onValueChange={handleChange}
      />

      {/* Personal Information */}
      <TextInput
        label="Name"
        value={userData.name}
        name="name"
        onValueChange={handleChange}
        placeholder="Enter Name"
      />
      <TextInput
        label="Email"
        name="username"
        value={userData.username}
        onValueChange={handleChange}
        placeholder="Enter email"
      />
      <TextInput
        label="Contact Number"
        name="mobile_no"
        value={userData.mobile_no}
        onValueChange={handleChange}
        placeholder="Enter contact number"
      />
      <TextInput
        label="Linkedin Profile"
        name="linkedIn"
        value={userData.linkedIn}
        onValueChange={handleChange}
        placeholder="Enter Linked In profile"
      />

      {/* Qualification */}
      <DropdownInput
        label="Qualification"
        name="qualifications.qualification"
        value={userData.qualifications.qualification}
        onValueChange={handleChange}
        options={["UG", "PG", "Other"]}
      />
      {userData.qualifications.qualification && (
        <TextInput
          name="qualifications.specification"
          value={userData.qualifications.specification}
          onValueChange={handleChange}
          placeholder="Enter qualification details"
        />
      )}

      {/* Skills */}
      <DropdownInput
        label="Skills"
        name="skills"
        value={userData.skills}
        onValueChange={handleChange}
        options={[
          "React",
          "Node.js",
          "JavaScript",
          "Python",
          "Java",
          "C#",
          "PHP",
          "Ruby",
          "Swift",
          "TypeScript",
          "SQL",
          "HTML",
          "CSS",
        ]}
      />
      {Array.isArray(userData.skills) && userData.skills.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">
            Selected Skills
          </label>
          <div className="selected-skills flex flex-wrap mb-2">
            {userData.skills.map((skill, index) => (
              <div
                key={index}
                className="selected-skill bg-gray-200 text-gray-900 rounded-full px-2 py-1 m-1 flex items-center"
              >
                <span className="ml-2">{skill}</span>
                <button
                  className="ml-2 text-red-600"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  <IoMdCloseCircle />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preferred Job Role */}
      <TextInput
        label="Preferred Job Role"
        name="jobRole"
        value={userData.jobRole}
        onValueChange={handleChange}
        placeholder="Enter Job Role"
      />

      {/* Preferred Job Location */}
      <DropdownInput
        label="Preferred Job Location"
        name="preferredLocations"
        value={userData.preferredLocations}
        onValueChange={handleChange}
        options={["California", "New York", "Texas", "Washington", "Others"]}
      />

      {/* Experience */}
      <DropdownInput
        label="Experience"
        name="experience.experience"
        value={userData.experience.experience}
        onValueChange={handleChange}
        options={["Fresher", "Student", "Experienced"]}
      />

      {/* Job History */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">
          Job History
        </label>
        <div className="job-history">
          {userData.experience.jobHistory.map((job, index) => (
            <div key={index}>
              <TextInput
                label="Job Title"
                name={`experience.jobHistory.${index}.role`}
                value={job.role}
                onValueChange={handleChange}
                placeholder="Job Title"
              />
              <TextInput
                label="Company Name"
                name={`experience.jobHistory.${index}.company`}
                value={job.company}
                onValueChange={handleChange}
                placeholder="Company Name"
              />
              <CheckboxInput
                label="Currently Working"
                checked={job.current}
                name={`experience.jobHistory.${index}.current`}
                onValueChange={handleChange}
              />
              <input
                type="date"
                label="Start Date"
                name={`experience.jobHistory.${index}.startDate`}
                value={job.startDate}
                onChange={(e) => handleChange(e)}
              />
              {!job.current && (
                <input
                  type="date"
                  label="End Date"
                  name={`experience.jobHistory.${index}.endDate`}
                  value={job.endDate}
                  onChange={(e) => handleChange(e)}
                />
              )}
              <div className="flex items-center mb-2">
                <FaMinus
                  className="text-red-600 cursor-pointer"
                  onClick={() => removeJobHistoryEntry(index)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center mb-2">
          <IoMdAdd
            className="text-blue-600 cursor-pointer"
            onClick={addJobHistoryEntry}
          />
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <ButtonInput
          // onClick={handleSave}
          text="Save"
          colorClass="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-4"
        />
        <ButtonInput
          onClick={() => setUserData(initialState)}
          text="Clear"
          colorClass="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
        />
      </div>
    </div>
  );
};

export default Profile;
