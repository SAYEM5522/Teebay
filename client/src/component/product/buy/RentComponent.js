import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { RENT_PRODUCT } from '../../graphql/Mutation';
const RentComponent = ({open,handleOpen,id}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rentProduct] = useMutation(RENT_PRODUCT);
  const handleModel=()=>{
    handleOpen(false)
  }
  const conFirmRent=async()=>{
    if(startDate===null||endDate===null){
      toast.warn("All the fields are required")
    } else{
      try {

        const startTime=new Date(startDate).toISOString().slice(0, 19) + "Z"
        console.log(typeof(startTime))
        const endTime=new Date(endDate).toISOString().slice(0, 19) + "Z"
        const { data } = await rentProduct({
          variables: {
            productId:id,
            startTime: startTime,
            endTime:endTime,
          },
        });
         toast.success("successfully rent the product")
  
        // Close the modal
        handleModel();
      } catch (error) {
        toast.error(error.message)
        console.error('Rent error:', error);
      }
    }
  }
  return (
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {
        open&&(
          <div>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
     
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            
             <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Rent Period</h3>
              <div className="flex h-[300px] flex-row gap-4 p-4">
      <div className="flex flex-col">
        <label className="text-sm mb-1 text-md font-medium">From</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          placeholderText='11/06/23'
          endDate={endDate}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-md font-medium mb-1">To</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          placeholderText='122/06/23'
          endDate={endDate}
          minDate={startDate}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
            </div>
             
            
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          
        <button onClick={conFirmRent} type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Confirm Rent</button>
          
          <button onClick={handleModel} type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
        </div>
      </div>
    </div>
  </div>
          </div>
        )
        
      }
 

</div>

  )
}

export default RentComponent