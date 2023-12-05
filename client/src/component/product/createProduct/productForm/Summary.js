// components/SummaryPage.js
import React from 'react';
import Loader from '../../Loader';
const Summary = ({ onPrev, onSubmit, productName, productDescription,productCategories,price,rent,renType,loading }) => {
  return (
    <div className=' flex justify-center '>
      <div className='w-[60%]  border rounded-md px-5 py-10' >
      <p className='font-sans font-bold text-xl mb-1'>Summary</p>
      <div>
      <p className=' font-sans text-lg font-medium cursor-pointer'>Title: {productName}</p>
      <p className=' font-sans text-md font-medium text-[gray] cursor-pointer'>Categories: {productCategories.map((category) => category.value).join(", ")}</p>
      <p className='font-sans text-[16px] font-normal cursor-pointer'> Description: {productDescription}</p>
      <p className=' font-sans text-md font-medium text-[gray]'> Price: {price}, To rent: {rent} {renType} </p>
      </div>
      


      <div className=' flex items-center min-w-[400px] justify-between flex-row'>
        <button className=' mt-5 px-3 py-2 bg-[#6558f5] text-white rounded-md' onClick={onPrev}>Back</button>
      <button className='self-end mt-5 px-3 py-2 bg-[#6558f5] text-white rounded-md' onClick={onSubmit}>
      {
                loading?(
                  <Loader size={20}/>
                ):(
                  <p>Submit</p>
                )
              }
      </button>
  </div>
      </div>
      
    </div>
  );
};

export default Summary;
