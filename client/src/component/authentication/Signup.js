import React, { useState } from 'react'
import InputField from './InputField';
import { Formik } from 'formik';
import {signupValidationSchema} from "./validationSchema"
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Loader from '../product/Loader';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { SIGNUP_MUTATION } from '../graphql/Mutation';
const initialValues = {
  firstName:"",
  lastName:"",
  address:"",
  email: "",
  phoneNumber:null,
  password: "",
  confirmPassword:""
};
const Signup = () => {
  const [signup, {loading,error}] = useMutation(SIGNUP_MUTATION);
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const onSubmit = async(values) => {
    try {
        await signup({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password,
        },
      });
      navigate("/");
    } catch (error) {
      if (error) {
        console.log(error)
        toast.error(error.message);
      }
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className='flex flex-col items-center justify-center py-10'>
      <p className='font-serif font-medium text-lg mb-3'>SIGN UP</p>

      <div className='w-[40%]  rounded-md border p-5'>
      <Formik
      initialValues={initialValues}
      validationSchema={signupValidationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div className='flex flex-row'>
            <InputField  name="firstName" type="text" placeholder="First Name.." />
            <InputField  name="lastName" type="text" placeholder="Last Name.." />
          </div>
          <InputField label="Address" name="address" type="text" placeholder="Address.." />
          <div className='flex flex-row'>
            <InputField  name="email" type="email" placeholder="Email.." />
            <InputField  name="phoneNumber" type="text" placeholder="Phone Number.." />
          </div>
  
                <InputField name="password" show={true} type={showPassword ? "text" : "password"} togglePasswordVisibility={togglePasswordVisibility} showPassword={showPassword} placeholder="Password.." />
                <InputField name="confirmPassword" show={true} type={showConfirmPassword ? "text" : "password"} togglePasswordVisibility={toggleConfirmPasswordVisibility} showPassword={showConfirmPassword} placeholder="Confirm Password.." />

          <div className='h-full grid place-items-end mt-5'>
          <button type="submit" className="bg-[#25224A] w-full text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline">
              {
                loading?(
                  <Loader size={25}/>
                ):(
                  <p>REGISTER</p>
                )
              }
              
            </button>
          </div>
        </form>
      )}
    </Formik>
    <div  className="flex flex-row mt-4 justify-center items-center" >
             <p className="font-serif text-md font-medium">Already have an account? </p>
             <Link to={"/"}>
            <span className=" text-[#3E76F9] font-serif font-medium text-[16px]"> Signin</span>
            </Link>
            </div>
            <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </div>
    </div>
  )
}

export default Signup