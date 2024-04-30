
import { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart , signInSuccess, signInFailure} from '../redux/user/userSlice';


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/adminSignin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //console.log(data);
      if(data.success === false) {
        dispatch(signInFailure(data.message));
        
        return;
      }
      dispatch(signInSuccess(data));
      Navigate('/alluser');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    
    <div className='h-screen bg-gradient-to-r from-green-600 to-red-600 flex items-center justify-center'>
      <div className='max-w-md mx-auto bg-lime-100 rounded-md shadow-md p-12'>
        <h1 className='text-4xl text-center font-bold mb-6 text-red-600'>
          Admin Sign In
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='email'
            placeholder='Email'
            className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-red-500'
            id='email' onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-red-500'
            id='password' onChange={handleChange}
          />

          <button disabled={loading} className='bg-red-500 text-white p-3 rounded-md uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
        <div className='flex items-center justify-center mt-5'>
          <p className='text-gray-600'>Not an admin?</p>
          <Link to= {'/sign-in'}> 
            <span className='text-indigo-700 ml-2 hover:underline'>
            User Sign In
            </span>
          </Link>
        </div>
        {error && <p className='text-red-500 mt-3 text-center'>{error}</p>}
        </div>
        
    </div>
  );
}
