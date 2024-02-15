import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='p-6 max-w-md mx-auto bg-white rounded-md shadow-md'>
      <h1 className='text-4xl text-center font-extrabold mb-6 text-indigo-700'>
        Sign Up
      </h1>
      <form className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Username'
          className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-indigo-500'
          id='username'
        />
        <input
          type='email'
          placeholder='Email'
          className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-indigo-500'
          id='email'
        />
        <input
          type='password'
          placeholder='Password'
          className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-indigo-500'
          id='password'
        />

        <button className='bg-indigo-700 text-white p-3 rounded-md uppercase hover:opacity-95 disabled:opacity-80'>
          Sign Up
        </button>
      </form>
      <div className='flex items-center justify-center mt-5'>
        <p className='text-gray-600'>Have an account?</p>
        <Link to='/sign-in' className='text-indigo-700 ml-2 hover:underline'>
          Sign in
        </Link>
      </div>
    </div>
  );
}
