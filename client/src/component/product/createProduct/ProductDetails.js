import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Model from '../Model';
import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT, VIEW_PRODUCT } from '../../graphql/Mutation';
import { GET_ALL_PRODUCTS, USER_PRODUCTS } from '../../graphql/Query';
import moment from "moment"
const ProductDetails = ({type,product,disable}) => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [viewProduct] = useMutation(VIEW_PRODUCT);
  const day = moment.unix(Number(product?.createdAt)/1000).utc();
  const formatted = day.format('D MMMM YYYY');
  const [open,setOpen]=useState(false)
  const navigate=useNavigate()
  const handleOpen=(data)=>{
    setOpen(data)
  }
  const handleProduct = async () => {

    const navigatePath = (type === 'myProduct') ? `/editProduct/${product?.id}` : `/buyProduct/${product?.id}`;
    if(!disable){
      navigate(navigatePath);
    }
    try {
      await viewProduct({
        variables: {
          productId: product?.id,
        },
        update: (cache, { data: { viewProduct } }) => {
          // Read the cache for the list of all products
          const cachedAllProducts = cache.readQuery({
            query: GET_ALL_PRODUCTS,
          });
  
          // Update the cache by incrementing the view count for the viewed product
          cache.writeQuery({
            query: GET_ALL_PRODUCTS,
            data: {
              getAllproducts: cachedAllProducts.getAllproducts.map((p) =>
                p.id === viewProduct.id ? { ...p, view: p.view + 1 } : p
              ),
            },
          });
        },
      });
    } catch (error) {
      console.error('Error viewing product:', error.message);
    }
  };
  const handleDelete = async () => {
    try {
      // Perform the mutation
      await deleteProduct({
        variables: { productId:product?.id },
        update: (cache, { data }) => {
          // If the mutation is successful, manually update the cache
          if (data && data.deleteProduct) {
            const cachedUserProducts = cache.readQuery({
              query: USER_PRODUCTS,
            });
      
            cache.writeQuery({
              query: USER_PRODUCTS,
              data: {
                userProducts: cachedUserProducts.userProducts.filter(
                  (p) => p.id !== product?.id
                ),
              },
            });
            setOpen(false)
            // Update GET_ALL_PRODUCTS query in the cache
            const cachedAllProducts = cache.readQuery({
              query: GET_ALL_PRODUCTS,
            });
      
            cache.writeQuery({
              query: GET_ALL_PRODUCTS,
              data: {
                getAllproducts: cachedAllProducts.getAllproducts.filter(
                  (p) => p.id !== product?.id
                ),
              },
            });

          }
        },
      });
      

      // Handle success, navigate, or perform other actions
    } catch (error) {
      console.error('Error deleting product:', error);
      // Handle error, show a message, or perform other actions
    }
  };
  return (
    <div 
    
     className='w-full border h-[280px] relative rounded-md p-5 mb-5'>
      {
        type&&(
          <MdDelete onClick={()=>setOpen(true)} size={30} className='absolute cursor-pointer top-5 right-5' />
        )
      }
      <div onClick={handleProduct}>
      <p className=' font-sans text-lg font-medium cursor-pointer'>{product?.name}</p>
      <div className=' flex items-center flex-row my-1'>
            <p className='font-sans text-md font-medium text-[gray] cursor-pointer' >Categories: {product?.categories?.join(",")}</p>
       
      </div>
      <div className=' flex items-center flex-row my-1'>
        <p className=' font-sans text-md font-medium text-[gray]'>Price: ${product?.price} | Rent: {product?.rents[0]?.price} ${product?.rents[0]?.durationType} </p>
      </div>
      <div className='my-2'>
  <div className='font-sans text-[16px] font-normal cursor-pointer overflow-hidden '>
    <p className='line-clamp-4'>{product?.description}</p>
    <a href='#' className='text-blue-500'>More Details</a>
  </div>
</div>
      <div className='absolute  bottom-5 left-5'>
      <p className=' font-sans text-md font-medium text-[gray]'>Date posted: {formatted}</p>
      </div>
      <div className='absolute  bottom-5 right-5'>
      <p className=' font-sans text-md font-medium text-[gray]'>{product?.views} views</p>
      </div>
      </div>
      {
        <Model
        open={open}
        handleOpen={handleOpen}
        text={"Delete"}
        description={"Are you sure you want to delete your product."}
        >
          <button onClick={handleDelete}  type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Delete</button>
        </Model>
      }
    </div>
  )
}

export default ProductDetails