// EditButton code
import { useMutation } from '@apollo/client';
import React from 'react';
import { toast } from 'react-toastify';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
import { EDIT_PRODUCT } from '../../graphql/Mutation';
import { GET_ALL_PRODUCTS, USER_PRODUCTS, GET_PRODUCT } from '../../graphql/Query';

const EditButton = ({ formData, id }) => {
  const navigate = useNavigate();
  const [editProduct, { loading }] = useMutation(EDIT_PRODUCT, {
    refetchQueries: [
      { query: USER_PRODUCTS },
      { query: GET_ALL_PRODUCTS },
      { query: GET_PRODUCT, variables: { getProductId: id } },
    ],
  });

  const EditProduct = async () => {
    try {
      const variables = {
        productId: id,
        editProductName2: formData.productName,
        description: formData.productDescription,
        categories: formData.categories,
        price:parseFloat(formData.price.price),
        rentDuration:formData.price.rentType,
        rentPrice:parseFloat(formData.price.rent),
      };

      await editProduct({
        variables,
      });

      navigate('/dashbord/myProduct');
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  return (
    <button onClick={EditProduct} className=' mt-5 px-3 py-2 bg-[#6558f5] text-white rounded-md'>
      {loading ? <Loader size={25} /> : <p>Edit Product</p>}
    </button>
  );
};

export default EditButton;
