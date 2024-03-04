import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate(); 

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/search'); 
  };

  return (
    <header className='bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <Link to='/' className='text-white text-3xl font-bold'>
          <span className='text-yellow-300'>Air</span>bnb{' '}
          <span className='text-yellow-300'>Rent</span>
        </Link>
        <form className='flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-white focus:outline-none p-2 rounded-l-md shadow-md'
          />
          <button
            onClick={handleSearch}
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
              <img src={currentUser.avatar} alt='profile' /> 
            ) : (
              <li className='text-white hover:underline'>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
