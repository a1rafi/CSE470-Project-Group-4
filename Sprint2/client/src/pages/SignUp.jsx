import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success === false) {
      setLoading(false);
      setError(data.message);
      
      return;
    }
    setLoading(false);
    setError(null);
    Navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='h-screen bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 flex items-center justify-center'>
      <div className='max-w-md mx-auto bg-white rounded-md shadow-md p-12'>
        <h1 className='text-4xl text-center font-bold mb-6 text-indigo-700'>
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='text'
            placeholder='Username'
            className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-indigo-500'
            id='username' onChange={handleChange}
          />
          <input
            type='email'
            placeholder='Email'
            className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-indigo-500'
            id='email' onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-indigo-500'
            id='password' onChange={handleChange}
          />

          <button disabled={loading} className='bg-indigo-700 text-white p-3 rounded-md uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <OAuth/>
        </form>
        <div className='flex items-center justify-center mt-5'>
          <p className='text-gray-600'>Have an account?</p>
          <Link to='/sign-in' className='text-indigo-700 ml-2 hover:underline'>
            Sign in
          </Link>
        </div>
        {error && <p className='text-red-500 mt-3 text-center'>{error}</p>}
      </div>
    </div>
  );
}
