import React from 'react'
import ProductDetails from './ProductDetails'
import { useNavigate } from 'react-router-dom'
import { USER_PRODUCTS } from '../../graphql/Query'
import { useSuspenseQuery } from '@apollo/client'

const MyProduct = () => {
  const navigate=useNavigate()
  const { data } = useSuspenseQuery(USER_PRODUCTS);
  const userProducts = data?.userProducts || [];
  return (
    <div className='relative'>
      {
        userProducts?.length>0?(
          <div>
      {
            userProducts.map((item,index)=>(
              <div key={index}>
              <ProductDetails type={"myProduct"} product={item}/>
              </div>
            ))
          }
          </div>
        ):(
          <div className='flex items-center justify-center my-10 p-5 bg-white shadow-lg rounded-md'>
            <p className='font-sans font-medium text-lg'>No product has been created</p>
          </div>
        )
      }
     
      <div className='flex justify-end'>
      <button onClick={()=>navigate("/createProduct")} className='px-5  text-white w-fit rounded-md mb-3 py-2 cursor-pointer bg-blue-700' >
         Add Product
      </button>
      </div>
      

    </div>
  )
}

export default MyProduct