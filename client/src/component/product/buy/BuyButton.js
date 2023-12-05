import React, { useState } from 'react'
import Model from '../Model'
import { useMutation } from '@apollo/client';
import { BUY_PRODUCT } from '../../graphql/Mutation';
import { toast } from 'react-toastify';
import Loader from '../Loader';
import { GET_ALL_PRODUCTS } from '../../graphql/Query';

const BuyButton = ({id}) => {
  const [openBuy,setOpenBuy]=useState(false)
  const [buyProduct, {loading}] = useMutation(BUY_PRODUCT,{
    refetchQueries: [
      { query: GET_ALL_PRODUCTS }
    ],
  });
  const handleBuyProduct=async()=>{
      try {
      await buyProduct({
          variables:{
            productId:id
          }
        }).then((res)=>{
          toast.success("You successfully bought the product")
          setOpenBuy(false)
        })

      } catch (error) {
          toast.error(error.message)
      }
  }
  const handleOpenBuy=(data)=>{
    setOpenBuy(data)
  }
  return (
    <div>
      <button onClick={()=>setOpenBuy(true)} className='self-end mt-5 px-5 py-2 bg-[#6558f5] text-white rounded-md' >Buy</button>
      {
        
          <Model
          open={openBuy}
          handleOpen={handleOpenBuy}
          text={"Buy"}
          description={"Are you sure you want to buy this product."}
          >
            <button onClick={handleBuyProduct}  type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
            {
                loading?(
                  <Loader size={25}/>
                ):(
                  <p>Buy</p>
                )
              }
            </button>
          </Model>
        
     }
    </div>
  )
}

export default BuyButton