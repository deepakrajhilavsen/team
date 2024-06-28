import { useState } from "react";

const CheckboxInput = ({ label, name, checked, onValueChange }) => {
  const [isChecked, setChecked] = useState(checked);
  const changeHanlder = (e) => {
    setChecked(!isChecked);
    onValueChange(e);
  };

  return (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={changeHanlder}
        className="mr-2"
      />
      <label className="text-sm font-medium text-gray-900">{label}</label>
    </div>
  );
};

export default CheckboxInput;
