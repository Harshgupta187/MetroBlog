import React from 'react'
import {Link , useNavigate} from 'react-router-dom'
import {login as authLogin} from "../store/authSlice.js" 
import {Button , Input , Logo} from "./index.js"
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth.js'
import {set, useForm} from 'react-hook-form'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register , handleSubmit} = useForm()
  const {error , setError} = useState("")
  
  const login = async(data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if(session){
        const userData = await authService.
        getCurrentUser()
        if(userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className='flex justify-center mb-2'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width="100%" />
          </span>
          
        </div>
        <h2 className='text-2xl font-bold text-center'>
          Sign in to your account
        </h2>
        <p>
          Don&apos;t have any account?&nbsp;
          <Link to="/signup"
          className='font-medium transition duration-200 text-primary-all hover:underline'>
            Sign Up
          </Link>
        </p>
        {error && <p className='mt-8 text-center text-red-600'>{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div className='space-y-5'>
            <input label= "Email: " placeholder='Enter your Email' type="email" {...register("email") , {
              required: true,
              validate: {
                matchPattern: (value) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)  || "Email address must be a valid address"
              }
            }} />
            <input label="Password" type="password" placeholder='Enter your password' {...register("password" , {
              required:true,
            })} />
            <Button type='submit' className='w-full'>Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login