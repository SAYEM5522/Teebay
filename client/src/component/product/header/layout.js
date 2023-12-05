import React from 'react'
import { headerData } from '../data'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const navigate=useNavigate()
  let location = useLocation();
  const handleLogout=()=>{
    localStorage.removeItem("authToken")
    navigate("/")
  }
  return (
    <div className='flex items-center justify-center mt-3'>
      <div className='flex flex-row  justify-between w-[60%]'>
        <div className='flex flex-1 flex-col'>
        <div className=' flex flex-row items-center px-3 mb-5'>
       {
        headerData.map((item,index)=>{
          return(
            <Link key={index} className={`${location.pathname===item.link&&"border-b-[4px] border-b-black"} text-lg font-medium px-5 mr-5`} to={`${item.link}`}>
              {item.name}
            </Link>
          )
        })
       }
      </div>
      <Outlet />
        </div>
      <div>
        <div onClick={handleLogout} className='px-3 cursor-pointer py-2 bg-black rounded-md flex items-center justify-center'>
          <p className=' text-white'>Logout</p>
        </div>

      </div>
      </div>
    </div>
  )
}

export default Layout