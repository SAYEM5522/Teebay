// components/ProductDescriptionPage.js
import React, { useState } from 'react';
import Select from 'react-select';
import { CategoriesOptions } from '../../data';
import { toast } from 'react-toastify';

const Categories = ({ onPrev, onNext,edit,onSelectInput,value }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedValues(selectedOptions);
    if(edit){
      onSelectInput(selectedOptions); 
    }
  };

  const handleNext = () => {
    if(selectedValues.length>0){
    onNext({ categories: selectedValues });
      
    }else{
      toast.warn("Categories field is required")
    }
  };


  return (
    <div className='flex flex-col'>
      {
        edit?(
          <p className='font-sans font-semiold text-lg text-left'>Categories</p>
        ):(
          <p className='font-sans font-bold text-xl m-5'>Select categories</p>
        )
      }
      <Select
    isMulti
    name="colors"
    options={CategoriesOptions}
    className="basic-multi-select min-w-[400px]"
    classNamePrefix="select"
    onChange={handleChange}
    defaultValue={value?.map(item => ({
      label: item,
      value: item
    }))}
    
  />
  {
    !edit&&(
      <div className=' flex items-center min-w-[400px] justify-between flex-row'>
      <button className=' mt-5 px-3 py-2 bg-[#6558f5] text-white rounded-md' onClick={onPrev}>Back</button>
          <button className='self-end mt-5 px-3 py-2 bg-[#6558f5] text-white rounded-md' onClick={handleNext}>Next</button>
      </div>
    )
  }
 
    </div>
  );
};

export default Categories;
