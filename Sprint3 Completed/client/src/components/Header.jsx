import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate(); 


  const handleSubmit = (e) => {
    e.preventDefault();
   


 const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };


useEffect(() => {
  const urlParams = new URLSearchParams(location.search);
  const searchTermFromUrl = urlParams.get('searchTerm');
  if (searchTermFromUrl) {
    setSearchTerm(searchTermFromUrl);
  }


}, [location.search]);




  return (
    <header className='bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <Link to='/' className='text-white text-3xl font-bold'>
          <span className='text-yellow-300'>Air</span>bnb{' '}
          <span className='text-yellow-300'>Rent</span>
        </Link>
        <form onSubmit={handleSubmit} className='flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-white focus:outline-none p-2 rounded-l-md shadow-md'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className='bg-yellow-300 text-white p-3 rounded-r-md hover:bg-yellow-400 shadow-md'
          >
            <FaSearch />
          </button>
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='text-white hover:underline'>Home</li>
          </Link>
          <Link to='/about'>
            <li className='text-white hover:underline'>About</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' /> 
            ) : (
              <li className='text-white hover:underline'>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}