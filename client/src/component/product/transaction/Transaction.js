import React from 'react'
import { TransactionData } from '../data'
import { Link, Outlet, useLocation } from 'react-router-dom'

const Transaction = () => {
  let location = useLocation();

  return (
    <div className='flex items-center justify-center mt-3'>
    <div className='flex flex-row  justify-between w-[60%]'>
      <div className='flex flex-1 flex-col'>
      <div className=' flex flex-row items-center px-3 mb-5'>
     {
      TransactionData.map((item,index)=>{
        return(
          <Link key={index} className={`${location.pathname===item.link&&"border-b-[4px] border-b-black"} font-medium text-lg px-5 mr-5`} to={`${item.link}`}>
            {item.name}
          </Link>
        )
      })
     }
    </div>
    <Outlet />
      </div>
    </div>
  </div>
  )
}

export default Transaction