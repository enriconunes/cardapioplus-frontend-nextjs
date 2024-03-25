import React, { useState } from 'react';

export function Checkbox() {

    const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className="form-checkbox text-green-500 h-5 w-5"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span className="text-gray-700">Aceitar termos e condições</span>
    </label>
  );
}
