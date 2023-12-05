import * as Yup from 'yup';
export const signupValidationSchema = Yup.object({
  firstName:Yup.string(),
  lastName:Yup.string(),
  email: Yup.string().required("Email is a required field").email("Email is not valid!"),
  password: Yup.string().required('Password  is required').min(6,"Minimum length is 6 "),
  address:Yup.string(),
  confirmPassword:Yup.string().oneOf([Yup.ref("password")],"Passward must be match"),
  phoneNumber:Yup.number()
  .typeError("That doesn't look like a phone number")
  .positive("A phone number can't start with a minus")
  .integer("A phone number can't include a decimal point")
  .min(11)
  .required('A phone number is required'),
})

export const loginValidationSchema=Yup.object({
  email: Yup.string().required("Email is a required field").email("Email is not valid!"),
  password: Yup.string().required('Password  is required').min(6,"Minimum length is 6 "),
})