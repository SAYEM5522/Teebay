// components/ProductDescriptionPage.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Description = ({ onPrev, onNext,edit,onSelectInput,value }) => {
  const [productDescription, setProductDescription] = useState('');

  const handleNext = () => {
    if(productDescription===""){
    toast.warn("Description field is required")
    }else{
      onNext({productDescription:productDescription});

    }
  };
  const handleDescription=(e)=>{
    const updatedDescription = e.target.value;
    setProductDescription(updatedDescription)
    if(edit){
      onSelectInput(updatedDescription)
    }
  }

  return (
    <div>
      {
        edit?(
          <p className='font-sans font-semiold text-lg text-left'> Description</p>
        ):(
          <p className='font-sans font-bold text-xl m-5'>Select description</p>
        )
      }
      <textarea
        placeholder="Enter product description"
        value={productDescription||value}
        onChange={handleDescription}
        class="shadow appearance-none border rounded-md w-full min-h-[170px] p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

export default Description;
