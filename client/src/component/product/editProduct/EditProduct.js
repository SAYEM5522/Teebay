import React, { useState } from 'react'
import Title from '../createProduct/productForm/Title'
import Categories from '../createProduct/productForm/Categories';
import Description from '../createProduct/productForm/Description';
import Price from '../createProduct/productForm/Price';
import { useSuspenseQuery } from '@apollo/client';
import { GET_PRODUCT } from '../../graphql/Query';
import { useParams } from 'react-router-dom';
import EditButton from './EditButton';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const EditProduct = () => {
  const {id}=useParams()
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    categories: [],
    price: {
      price: null,
      rent: null,
      rentType: null
    },
  });
  const { data } = useSuspenseQuery(GET_PRODUCT,{
    variables: { getProductId: id },
  });
  const productInfo = data?.getProduct || [];

  const handleSelectCategories = (categories) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      categories: categories.map((category) => category.value) // Assuming the value property contains the category value
    }));
  };
  // Function to handle changes in ProductTitle component
  const handleProductTitleChange = (title) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      productName: title
    }));
  };

  // Function to handle changes in ProductDescription component
  const handleProductDescriptionChange = (description) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      productDescription: description
    }));
  };
  const handlePriceChange = (updatedPrice) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      price: updatedPrice,
    }));
  };
 
  return (
    <div className='flex items-center justify-center'>
      <div className='w-[50%] my-10'>
        <div className='mt-4'>
        <Title value={productInfo?.name} edit={true} onSelectInput={handleProductTitleChange}/>
        </div>
        <div className='mt-4'>
        <Categories value={productInfo?.categories} edit={true} onSelectInput={handleSelectCategories}/>
        </div>
        <div className='mt-4'>
        <Description value={productInfo?.description} edit={true} onSelectInput={handleProductDescriptionChange} />
        </div>
        <div>
          <Price rentType={productInfo?.rents[0]?.durationType} rentValue={productInfo?.rents[0].price} value={productInfo?.price} edit={true} onSelectInput={handlePriceChange} />
        </div>
        <div className='flex justify-end'>
          <EditButton id={id} formData={formData}/>
        </div>
      </div>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      closeOnClick
      theme="light"
      />
    </div>
  )
}

export default EditProduct