import React from 'react'
import ProductInfo from './ProductInfo'
import { useParams } from 'react-router-dom'
import { useSuspenseQuery } from '@apollo/client'
import { GET_PRODUCT } from '../../graphql/Query'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const BuyProduct = () => {
  const {id}=useParams()
  const { data } = useSuspenseQuery(GET_PRODUCT,{
    variables: { getProductId: id },
  });
  const productInfo = data?.getProduct || [];

  return (
    <div className='flex items-center justify-center'>
      <div className='w-[45%] my-10'>
       <ProductInfo id={id} info={productInfo}/>
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

export default BuyProduct