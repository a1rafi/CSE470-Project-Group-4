import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart, signOutUserSuccess, signOutUserFailure } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';


export default function Userlist() {
    const [users, setUsers] = useState([]);
    const [alllisting, setAlllisting] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);
    //const { currentUser, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    useEffect(() => {
        // Fetch user list from the database
        const fetchUsers = async () => {
            try {
                const response = await fetch('api/listing/userlist'); // Replace with your API endpoint
                const data = await response.json();
                setUsers(data);
                fetchListings();
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchListings = async () => {
            try {
              const res = await fetch('/api/listing/get');
              const data = await res.json();
              setAlllisting(data);
            } catch (error) {
              console.log(error);
            }
          };

        fetchUsers();
    }, []);

    const deleteUser = async (userId) => {
        try {
            await fetch(`/api/user/deleteany/${userId}`, { method: 'DELETE' }); // Replace with your API endpoint
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSignOut = async () => {
        try {
          dispatch(signOutUserStart());
          const res = await fetch('/api/auth/adminsignout');
          const data = await res.json();
          if (data.success === false) {
            dispatch(signOutUserFailure(data.message));
            return;
          }
          dispatch(signOutUserSuccess());
            Navigate('/sign-in');
        } catch (error) {
          dispatch(signOutUserFailure(error.message));
        }
      };


      const deletelisting = async (listingId) => {
        try {
            await fetch(`/api/listing/deleteany/${listingId}`, { method: 'DELETE' }); // Replace with your API endpoint
            setAlllisting(alllisting.filter(listing => listing._id !== listingId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const openOverlay = (listing) => {
        setSelectedListing(listing);
    };

    const closeOverlay = () => {
        setSelectedListing(null);
    };



    return (
        <div>
            <div className="bg-gray-100 h-full flex justify-center items-center">
                <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-semibold mb-6 text-center">User List</h1>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-center">#</th>
                                <th className="px-4 py-2 text-center">Username</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className="border-b">
                                    <td className="px-4 py-2 text-center">{index + 1}</td>
                                    <td className="px-4 py-2 text-center">{user.username}</td>
                                    <td className="px-4 py-2 text-center">
                                        <button className='text-red-500' onClick={() => deleteUser(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-gray-100 h-full flex justify-center items-center p-6">
                <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-semibold mb-6 text-center">All Listings</h1>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-center">#</th>
                                <th className="px-4 py-2 text-center">Image</th>
                                <th className="px-4 py-2 text-center">Listing name</th>
                                <th className="px-4 py-2 text-center">View</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alllisting.map((listing, index) => (
                                <tr key={listing._id} className="border-b">
                                    <td className="px-4 py-2 text-center">{index + 1}</td>
                                    <td className="px-4 py-2 text-center">
                                        <div className="flex items-center">
                                            <img src={listing.imageUrls[0]} className="w-16 h-16 object-cover object-center mr-4" />
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-center">{listing.name}</td>
                                    <td className="px-4 py-2 text-center">
                                        <button className='text-blue-600 mr-2 text-center' onClick={() => openOverlay(listing)}>View</button>
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <button className='text-red-500' onClick={() => deletelisting(listing._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedListing && (
                console.log(selectedListing),
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">{selectedListing.name}</h2>
                        {/* Use Link from React Router to navigate */}
                        {/*<Link to={`/listing/${selectedListing._id}`} className="text-blue-500 mr-2">View Details</Link>*/}
                        <div>
                            <img src={selectedListing.imageUrls[0]} alt={selectedListing.name} className="w-full h-96 object-cover object-center" />
                            <p className="mt-4">{selectedListing.name}</p>
                            <ul className='text-green-700 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                            <li className='flex items-center gap-1 whitespace-nowrap'>
                            <p className='mt-4 gap-2'>
                                <FaMapMarkerAlt className='text-lg' /> {selectedListing.address}
                            </p>
                            </li>
                            </ul>
                            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaBed className='text-lg' />
                                    {selectedListing.bedrooms > 1
                                        ? `${selectedListing.bedrooms} beds `
                                        : `${selectedListing.bedrooms} bed `}
                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaBath className='text-lg' />
                                    {selectedListing.bathrooms > 1
                                        ? `${selectedListing.bathrooms} baths `
                                        : `${selectedListing.bathrooms} bath `}
                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaParking className='text-lg' />
                                    {selectedListing.parking ? 'Parking spot' : 'No Parking'}
                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaChair className='text-lg' />
                                    {selectedListing.furnished ? 'Furnished' : 'Unfurnished'}
                                </li>
                            </ul>
                        </div>

                        <button onClick={closeOverlay} className="text-red-500">Close</button>
                    </div>
                </div>
            )}

            <div className='bg-gray-100 h-full flex justify-center items-center'>
                <button onClick={handleSignOut} className='text-red-600 mt-3 text-center hover:opacity-100 hover:underline'>Admin Sign out</button>
            </div>
        </div>
    );
};
