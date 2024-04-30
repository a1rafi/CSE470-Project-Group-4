import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Listingitem from '../components/Listingitem';

export default function Search() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        furnished: false,
        parking: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    });

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const[showMore,setShowMore]=useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const furnishedFromUrl = urlParams.get('furnished');
        const parkingFromUrl = urlParams.get('parking');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (
            searchTermFromUrl || typeFromUrl || furnishedFromUrl || parkingFromUrl || offerFromUrl || sortFromUrl || orderFromUrl
        ) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                furnished: furnishedFromUrl === 'true',
                parking: parkingFromUrl === 'true',
                offer: offerFromUrl === 'true',
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc'
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            if (data.length>8){
                setShowMore(true);
            }else{
               setShowMore(false); 
            }
            setListings(data);
            setLoading(false);
        };

        fetchListings();
    }, [window.location.search]);

    const handleChange = (e) => {
        const { id, value, checked } = e.target;

        if (id === 'all' || id === 'rent' || id === 'sale') {
            setSidebardata({ ...sidebardata, type: id });
        }

        if (id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: value });
        }

        if (id === 'furnished' || id === 'parking' || id === 'offer') {
            setSidebardata({ ...sidebardata, [id]: checked });
        }

        if (id === 'sort_order') {
            const [sort, order] = value.split('_');
            setSidebardata({ ...sidebardata, sort, order });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length < 9) {
          setShowMore(false);
        }
        setListings([...listings, ...data]);
    };

    return (
        <div className='flex flex-col md:flex-row'>
            <div className="p-6 border-b-2 md:border-r-2 md:min-h-screen">
                <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            id='searchTerm'
                            placeholder='Search...'
                            className='bg-gray-100 focus:outline-none p-2.5 rounded-md shadow-lg border border-gray-300 w-full'
                            value={sidebardata.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex gap-3 flex-wrap items-center'>
                        <label className='font-medium'>Filter:</label>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                id="all"
                                className='w-4.1'
                                onChange={handleChange}
                                checked={sidebardata.type === "all"}
                            />
                            <span>Rent and Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                id="rent"
                                className='w-4.1'
                                onChange={handleChange}
                                checked={sidebardata.type === "rent"}
                            />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                id="sale"
                                className='w-4.1'
                                onChange={handleChange}
                                checked={sidebardata.type === "sale"}
                            />
                            <span>Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                id="offer"
                                className='w-4.1'
                                onChange={handleChange}
                                checked={sidebardata.offer}
                            />
                            <span>Offers</span>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-medium'>Amenities:</label>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                id="furnished"
                                className='w-4.1'
                                onChange={handleChange}
                                checked={sidebardata.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                id="parking"
                                className='w-4.1'
                                onChange={handleChange}
                                checked={sidebardata.parking}
                            />
                            <span>Parking</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <label className='font-medium'>Sort:</label>
                        <select
                            onChange={handleChange}
                            defaultValue={'created_at_desc'}
                            id="sort_order"
                            className='border rounded-lg p-2.5'
                        >
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                            <option value="regularPrice_desc">Price High to Low</option>
                            <option value="regularPrice_asc">Price Low to High</option>
                        </select>
                    </div>
                    <button className='bg-pink-500 text-white p-3 rounded-r-md rounded-l-md hover:bg-pink-500 shadow-md'>Search</button>
                </form>
            </div>
            <div className="p-7 flex flex-wrap gap-4">
                <h1 className='text-3xl font-semibold border-b p-4 text-indigo-800'>Listing Results: </h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {!loading && listings.length === 0 && (
                        <p className='text-xl text-slate-700'>No Listing Found!</p>
                    )}
                    {loading && (
                        <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
                    )}
                    {!loading &&
                      listings &&
                      listings.map((listing) => (
                        <Listingitem key={listing._id} listing={listing} />
                    ))}


                    {showMore && (
                        <button
                            onClick={onShowMoreClick}
                            className='text-green-700 hover:underline p-7 text-center w-full'>Show more</button>
                    )}

                </div>
            </div>
        </div>
    );
}
