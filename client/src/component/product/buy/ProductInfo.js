import React, { useState } from 'react'
import Model from '../Model'
import BuyButton from './BuyButton'
import RentButton from './RentButton'

const ProductInfo = ({info,id}) => {
  return (
    <div>
      {
        info?.isBought?(
          <div className='flex items-center p-5 bg-white shadow-md justify-center'>
            <p className='font-medium text-lg font-sans'>This product has already been sold</p>
          </div>
        ):(
          <div className='relative border px-10 py-20 rounded-md' >
          <p className=' font-sans text-xl font-medium cursor-pointer'>{info?.name}</p>
          <div className=' flex items-center flex-row my-2'>
            <p className=' font-sans text-md font-medium text-[gray] cursor-pointer'>{info?.categories.join(", ")}</p>
          </div>
          <div className=' flex items-center flex-row my-2'>
            <p className=' font-sans text-md font-medium text-[gray]'>Price: ${info?.price} | Rent: ${info.rents[0]?.price} {info.rents[0]?.durationType} </p>
          </div>
          <div className='my-2'>
            <p className='font-sans text-[16px] font-normal cursor-pointer'>{info?.description}</p>
          </div>
          <div className='flex justify-end mt-10'>
          <div className=' flex items-center min-w-[180px] justify-between flex-row'>
          <RentButton id={id} />
          <BuyButton id={id} />
          </div>
          </div>
          
          </div>
        )
      }
     
     
    </div>
  )
}

export default ProductInfo