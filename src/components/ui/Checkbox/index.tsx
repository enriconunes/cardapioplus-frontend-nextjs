import React, { useState } from 'react';

export function Checkbox({children, ...rest}) {

  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div className='w-full mb-2 -mt-1'>
      <label className="inline-flex items-center">
        <input type="checkbox" className="border text-green-500 focus:ring-2 focus:ring-green-500" {...rest}/>
        <span className="ml-2">{children}</span>
      </label>
    </div>
  );
}
