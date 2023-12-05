import React, { useState } from 'react';
import Select from 'react-select';
import { rentTypeOption } from '../../data';
import { toast } from 'react-toastify';
const Price = ({ onPrev, onNext,edit,onSelectInput,value,rentValue,rentType }) => {
  const [productPrice, setProductPrice] = useState({
    price: null,
    rent: null,
    rentType: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductPrice((prevData) => ({
      ...prevData,
      [name]: value
    }));
    if(edit){
      onSelectInput({ ...productPrice, [name]: value });
    }
  };

  const handleSelectChange = (selectedOption) => {
    setProductPrice((prevData) => ({
      ...prevData,
      rentType: selectedOption
    }));
    if(edit){
      onSelectInput({ ...productPrice, rentType: selectedOption });
    }
  };
  const handleNext = () => {
    if((productPrice.price)===null||(productPrice.rent)===null||productPrice.rentType===null){
      toast.warn("All the fields are required ")
    } else{
      onNext({
        price: productPrice.price,
        rent: productPrice.rent,
        rentType: productPrice.rentType
      });
    }
   
  };

  return (
    <div>
      {
        edit?(
          <p className='font-sans font-semiold text-lg text-left'>Price</p>
        ):(
          <p className='font-sans font-bold text-xl m-5'>Select price</p>
        )
      }
      <div className={`${edit&&" flex flex-row "}`}>
      <input
        type="number"
        name="price"
        placeholder="Enter product price"
        value={productPrice.price||value}
        onChange={handleInputChange}
        className={`shadow appearance-none border rounded ${edit?"w-[50%]":"w-full"} py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      />
      <div className={`flex relative ${!edit&&"mt-10"} items-center flex-row`}>
        <label className="block absolute -top-5 text-gray-700 text-sm font-bold mb-2" htmlFor="rent">
          Rent
        </label>
        <div className='flex flex-row items-center'>
          <input
            type="number"
            name="rent"
            placeholder="Enter rent"
            onChange={handleInputChange}
            value={productPrice.rent||rentValue}
            className="shadow appearance-none border rounded w-[50%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div>
            <Select
              name="rentType"
              value={productPrice.rentType}
              options={rentTypeOption}
              className="basic-multi-select min-w-[200px]"
              classNamePrefix="select"
              onChange={handleSelectChange}
              defaultInputValue={rentType}
            />
          </div>
        </div>
      </div>
      </div>
     
      {
        !edit&&(
          <div className='flex items-center min-w-[400px] justify-between flex-row'>
        <button className='mt-5 px-3 py-2 bg-[#6558f5] text-white rounded-md' onClick={onPrev}>Back</button>
        <button className='self-end mt-5 px-3 py-2 bg-[#6558f5] text-white rounded-md' onClick={handleNext}>Next</button>
      </div>
        )
      }
      
    </div>
  );
};

export default Price;
