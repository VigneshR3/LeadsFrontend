import * as Yup from 'yup'

const LoginSchema = Yup.object({
     
    email:Yup.string().email("Invalid email address").required("email is requied"),
    password:Yup.string().required("password is required").min(8).max(8,"Maximum 8 character")
     
})
export default LoginSchema