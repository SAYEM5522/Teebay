import React from 'react'
import ProductDetails from '../createProduct/ProductDetails'
import {  useSuspenseQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../../graphql/Query';

const AllProduct = () => {
  const { data } = useSuspenseQuery(GET_ALL_PRODUCTS);
  const AllProducts = data?.getAllproducts || [];
  return (
    <div >
      {
        AllProducts?.length>0?(
          <div>
        {
              AllProducts.map((item,index)=>(
                <div key={index}>
                <ProductDetails  product={item}/>
                </div>
              ))
            }
          </div>
        ):(
        <div className='flex items-center justify-center my-10 p-5 bg-white shadow-lg rounded-md'>
            <p className='font-sans font-medium text-lg'>No product has found</p>
          </div>
        )
      }
     
    </div>
  )
}

export default AllProduct