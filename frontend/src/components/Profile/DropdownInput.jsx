import React from "react";

const DropdownInput = ({ label, name, value, onValueChange, options }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onValueChange({
      target: {
        name,
        value: selectedValue,
      },
    });
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-900">{label}</label>
      <select
        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        name={name}
        value={value || ""} // Ensure value is a string or empty string
        onChange={handleChange}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownInput;
