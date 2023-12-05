import React, { useState } from 'react'
import Model from '../Model'
import RentComponent from './RentComponent'

const RentButton = ({id}) => {
  const [openRent,setOpenRent]=useState(false)

  const handleRentProduct=()=>{

  }
  const handleOpenRent=(data)=>{
    setOpenRent(data)
  }
  return (
    <div>
      <button onClick={()=>setOpenRent(true)} className='self-end mt-5 px-5 py-2 bg-[#6558f5] text-white rounded-md' >Rent</button>
      {
        
          <RentComponent
          id={id}
          open={openRent}
          handleOpen={handleOpenRent}
          > 
          <button onClick={handleRentProduct}  type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Rent</button>
          </RentComponent>
        
     }
    </div>
  )
}

export default RentButton