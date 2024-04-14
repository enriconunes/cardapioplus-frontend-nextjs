import React, { useState } from 'react';

export function Checkbox({children, ...rest}) {

  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div className='w-full mb-2 -mt-1'>
      <label className="inline-flex items-center">
        <input type="checkbox" className="border text-red-700 focus:ring-2 focus:ring-red-700 rounded-sm" {...rest}/>
        <span className="ml-2">{children}</span>
      </label>
    </div>
  );
}
