// components/MultiPageForm.js
import React, { useState } from 'react';
import Title from './productForm/Title';
import Description from './productForm/Description';
import Summary from './productForm/Summary';
import Categories from './productForm/Categories';
import Price from './productForm/Price';
import {  ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT } from '../../graphql/Mutation';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_PRODUCTS, USER_PRODUCTS } from '../../graphql/Query';
const CreateProduct = () => {
  const navigate=useNavigate()
  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT, {
    update: (cache, { data: { createProduct } }) => {
      // Update the USER_PRODUCTS query in the cache with the new product
      const cachedUserProducts = cache.readQuery({
        query: USER_PRODUCTS,
      });
      const existingUserProducts = cachedUserProducts?.userProducts || [];

      cache.writeQuery({
        query: USER_PRODUCTS,
        data: {
          userProducts: [...existingUserProducts, createProduct],
        },
      });
      const cachedAllUserProducts = cache.readQuery({
        query: GET_ALL_PRODUCTS,
      });
     const existingAllUserProducts= cachedAllUserProducts?.getAllproducts || [];
      
    cache.writeQuery({
      query: GET_ALL_PRODUCTS,
      data: {
        getAllproducts: [...existingAllUserProducts, createProduct],
      },
    });
    },
  });
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    categories:[],
    price:null,
    rent:null,
    rentType:null
  });

  const handleNext = (data) => {
    setPage(page + 1);
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  const handlePrev = () => {
    setPage(page - 1);
  };
  const handleSubmit = async() => {
    try {
      const { data } = await createProduct({
        variables: {
          name:formData.productName,
          categories:formData.categories.map((category) => category.value),
          description:formData.productDescription,
          price:parseFloat(formData.price),
          rentPrice:parseFloat(formData.rent),
          rentDuration:formData.rentType?.value,
        },
      }).then((res)=>{
        navigate("/dashbord/myProduct")
      });

    } catch (error) {
      toast.error(error.message)
      console.error('Error creating product:', error.message);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div>
      {page === 1 && <Title onNext={handleNext} />}
      {page === 2 && (
        <Categories onPrev={handlePrev} onNext={handleNext} />
      )}
      {page === 3 && (
        <Description onPrev={handlePrev} onNext={handleNext} />
      )}
      {page === 4 && (
        <Price onPrev={handlePrev} onNext={handleNext} />
      )}
      {page === 5 && (
        <Summary
          onPrev={handlePrev}
          onSubmit={handleSubmit}
          productName={formData.productName}
          productDescription={formData.productDescription}
          productCategories={formData.categories}
          price={formData.price}
          rent={formData.rent}
          rentType={formData.rentType?.value}
          loading={loading}
        />
      )}
      </div>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      theme="light"
      />
    </div>
  );
};

export default CreateProduct;
