// components/ProductNamePage.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Title = ({ onNext,edit,onSelectInput,value }) => {
  const [productName, setProductName] = useState("");

  const handleNext = () => {
    if(productName===""){
      toast.warn("Title field is required")
    }else{
      onNext({productName:productName});

    }
  };
  const handleInputChange=(e)=>{
    const updatedProductName = e.target.value;
    setProductName(updatedProductName)
    if(edit){
      onSelectInput(updatedProductName)

    }
  }

  return (
    <div className='flex  flex-col'>
      {
        edit?(
          <p className='font-sans font-semibold text-lg text-left'>Title</p>
        ):(
          <p className='font-sans font-bold text-xl m-5'>Select a title for your product</p>
        )
      }
      <input
      type="text"
      placeholder="Enter product name"
      value={productName||value}
      onChange={handleInputChange}
      class="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
      {
        !edit&&(
          <button className='self-end mt-5 px-3 py-2 bg-[#6558f5] text-white rounded-md' onClick={handleNext}>Next</button>

        )
      }
    </div>
  );
};

export default Title;
