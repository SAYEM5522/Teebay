import React, { useEffect, useState } from 'react'
import InputField from './InputField';
import { Formik } from 'formik';
import { loginValidationSchema } from './validationSchema';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_MUTATION } from '../graphql/Mutation';
import { useMutation } from '@apollo/client';
import Loader from '../product/Loader';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const initialValues = {
  email: '',
  password: '',
};
const Login = ({onLogin}) => {
  
  const [login, {loading}] = useMutation(LOGIN_MUTATION);
  const navigate=useNavigate()
const onSubmit = async(values) => {
  try {
    const {data}= await login({
      variables: {
        email: values.email,
        password: values.password,
      },
    });
    const token = data.login;
    onLogin(token);
    localStorage.setItem('authToken', token);
    navigate("/dashbord/myProduct")
  } catch (error) {
    if (error) {
      toast.error(error.message);
    }
  }
 
}; 
useEffect(()=>{
  const token=localStorage.getItem("authToken")
  if(token){
    navigate("/dashbord/myProduct")

  }else{
    navigate("/")
  }
},[])
  return (
    <div className='flex items-center flex-col justify-center h-screen'>
      <p className='font-serif font-medium text-lg mb-3'>SIGN IN</p>
      <div className='w-[30%] h-[60%] rounded-md border p-5'>
      <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div className='flex flex-wrap'>
            <InputField  name="email" type="text" placeholder="Enter Your Email.." />
            <InputField  name="password" type="password" placeholder="Enter Your Password.." />
          </div>
          <div className='h-full grid place-items-center  mt-10'>
            <button type="submit" className="bg-[#25224A] w-full text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline">
              {
                loading?(
                  <Loader size={25}/>
                ):(
                  <p>LOGIN</p>
                )
              }
              
            </button>
          </div>
        </form>
      )}
    </Formik>
    <div  className="flex flex-row mt-4 justify-center items-center" >
    <p className="font-serif text-md font-medium">Don't have an account?</p>
             <Link to={`/signup`}>
            <span className=" text-[#3E76F9] font-serif font-medium text-[16px]"> Signup</span>
            </Link>
            </div>
            <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      theme="light"
      />
    </div>
          
    </div>
  )
}

export default Login