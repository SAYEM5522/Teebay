// InputFieldComponent.js
import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
const InputField = ({ name, type, placeholder,showPassword,show,togglePasswordVisibility}) => {
  return (
    <div className='flex w-full flex-col mt-7 px-3'>
      <div className=' relative'>
      <Field
        className="appearance-none bg-transparent border  rounded-md w-full py-[10px] px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
        name={name}
        type={type}
        placeholder={placeholder}
      />
      {
        show&&(
          <div className=' absolute right-2 top-2 cursor-pointer' onClick={togglePasswordVisibility} >
           {showPassword ?<IoIosEye size={30} />: <IoIosEyeOff size={30}  /> }
          </div>
        )
      }
      
      </div>
      
      <div className='ml-right'>
      <ErrorMessage className='font-serif text-[#FF0000] text-left font-medium pl-1 pt-1' name={name} component="div" />
      </div>
    </div>
  );
};

export default InputField;
