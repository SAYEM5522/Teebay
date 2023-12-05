import { useSuspenseQuery } from '@apollo/client';
import React from 'react'
import { MY_BOUGHT } from '../../graphql/Query';
import ProductDetails from '../createProduct/ProductDetails';

const Bought = () => {
  const { data } = useSuspenseQuery(MY_BOUGHT);
  const AllProducts = data?.myPurchases || [];
  return (
    <div>
      {
        AllProducts?.length>0?(
          <div>
           {
            AllProducts?.map((item,index)=>{
              return(
                <div key={index}>
                 <ProductDetails disable={true} product={item?.product}/>
                </div>
              )
            })
           }
          </div>
        ):(
          <div className='flex items-center justify-center my-10 p-5 bg-white shadow-lg rounded-md'>
            <p className='font-sans font-medium text-lg'>No product has been Bought</p>
          </div>
        )
      }
    </div>
  )
}

export default Bought