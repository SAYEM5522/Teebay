import { useSuspenseQuery } from '@apollo/client';
import React from 'react'
import { MY_SALES } from '../../graphql/Query';

const Sold = () => {
  const { data } = useSuspenseQuery(MY_SALES);
  const AllProducts = data?.mySales || [];
  return (
    <div>
      {
        AllProducts.length>0?(
          <div>
          
          </div>
        ):(
          <div className='flex items-center justify-center my-10 p-5 bg-white shadow-lg rounded-md'>
            <p className='font-sans font-medium text-lg'>No product has been Sold</p>
          </div>
        )
      }
    </div>
  )
}

export default Sold