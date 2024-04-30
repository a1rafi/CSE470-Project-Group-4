import { useSelector } from 'react-redux';
import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from 'react-icons/fa';


export default function Reserve() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [totalBill, setTotalBill] = useState(0);
  const [type, settype] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isTemporaryModalOpen, setIsTemporaryModalOpen] = useState(false); // New state for temporary booking modal
  const [temporaryBill, setTemporaryBill] = useState(0); // New state for temporary bill
  const [isPaymentConfirmationOpen, setIsPaymentConfirmationOpen] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/listing/get/${listingId}`);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setListing(data);
        } else {
          console.error('Failed to fetch listing:', data.message);
        }
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    fetchListing();
  }, [listingId]);

  useEffect(() => {
    if (checkInDate && checkOutDate && listing) {
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
      const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
      const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay));
      
      // if (endDate.getDate() >= startDate.getDate()) {
      //   numberOfMonths += 1;
      // }
      
      const totalPrice = (totalDays * (listing.regularPrice / 30) * numberOfPeople).toFixed(2);
      setTotalBill(parseFloat(totalPrice).toFixed(2));
      console.log(totalPrice);
    }
  }, [checkInDate, checkOutDate, listing]);
  

  const handleCheckInDateChange = (event) => {
    setCheckInDate(event.target.value);
    console.log(event.target.value);
  };

  const handleCheckOutDateChange = (event) => {
    setCheckOutDate(event.target.value);
    console.log(event.target.value);
  };

  const handleNumberOfPeopleChange = (event) => {
    setNumberOfPeople(event.target.value);
  };

  const togglePaymentModal = () => {
    setIsPaymentModalOpen(!isPaymentModalOpen);
  };

  const handleBookTemporary = () => {
    setTemporaryBill(totalBill / 2); // Calculate half the total bill
    setIsTemporaryModalOpen(true); // Open the temporary booking modal
  };

  const handlePaymentDone = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/reservations/createreserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listingRef: listingId,
          userRef: currentUser._id,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          numberOfPeople: numberOfPeople,
          type: type,
          listingname: listing.name,
          imageUrls: listing.imageUrls,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setIsPaymentModalOpen(false);
        setIsPaymentConfirmationOpen(true);
        setIsTemporaryModalOpen(false);
      } else {
        console.error('Failed to create reservation:', data.message);
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };
  
  
  
  
 

  // Function to close the payment confirmation message
  const closePaymentConfirmation = () => {
    setIsPaymentConfirmationOpen(false);
    setIsPaymentModalOpen(false);
    setIsTemporaryModalOpen(false);
    navigate(`/listing/${listingId}`);
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="w-1/2 border border-gray-300 rounded-lg p-4 mr-4">
        <h2 className="text-blue-950 text-lg font-bold mb-2">LISTING SUMMARY:</h2>
        {listing ? (
          <div>
            <img src={listing.imageUrls[0]} alt={listing.name} className="w-80 h-85 object-cover mb-4 rounded-lg" />
            <p className="text-gray-800 font-bold mb-2">{listing.name}</p>
            <p className="text-gray-800 font-semibold mb-2">{listing.address}</p>
            <p className="bg-green-900 max-w-[200px] text-white text-center p-1 rounded-md"> ${listing.regularPrice} / month</p>
            <div className="flex gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <FaBed className="text-xl" />
                <span>{listing.bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBath className="text-xl" />
                <span>{listing.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-2">
                <FaParking className="text-xl" />
                <span>{listing.parking ? 'Parking spot' : 'No Parking'}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaChair className="text-xl" />
                <span>{listing.furnished ? 'Furnished' : 'Unfurnished'}</span>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading listing summary...</p>
        )}
      </div>

      <div className="w-1/2 border border-gray-300 rounded-lg p-4 ml-4">
        <h2 className="text-blue-950 text-lg font-bold mb-2">RESERVATION OPTIONS:</h2>
        <div className="mb-4">
          <label htmlFor="checkInDate" className="block text-gray-700">Select Check-in Date:</label>
          <input
            type="date"
            id="checkInDate"
            value={checkInDate}
            onChange={handleCheckInDateChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="checkOutDate" className="block text-gray-700">Select Check-out Date:</label>
          <input
            type="date"
            id="checkOutDate"
            value={checkOutDate}
            onChange={handleCheckOutDateChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="numberOfPeople" className="block text-gray-700">Number of People:</label>
          <input
            type="number"
            id="numberOfPeople"
            value={numberOfPeople}
            onChange={handleNumberOfPeopleChange}
            max={10}
            min={1}
            className="border border-gray-300 rounded-md px-2 py-1"
          />
        </div>
        <div className="bg-green-900 max-w-[200px] text-white text-center p-1 rounded-md mb-4">
          <p>Total Bill: ${totalBill}</p>
        </div>
        <div className="flex justify-between">
          <button 
            ///value = 'temporary'
            onClick={() => {
              handleBookTemporary();
              settype('Temporary Booked');
            }} 
            className="bg-pink-700 hover:bg-pink-500 text-white font-semibold py-2 px-4 rounded">
            Book Temporary
          </button>
          <button 
            onClick={() => {
              handleBookTemporary();
              settype('Rented');
            }}
            className="bg-orange-700 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded">
            Rent Now
          </button>
        </div>
      </div>
      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" id="paymentModal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Payment Processing...</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Please Pay "${totalBill}" to this bank account:<br/>
                  XXX-XXX-XXXX<br/>
                  After completing the payment click on the Confirm button
                </p>
              </div>
              <div className="flex justify-between items-center px-4 py-3">
                <button onClick={togglePaymentModal} className="bg-gray-300 text-black text-base font-medium rounded-md py-2 px-4">
                  Close
                </button>
                <button onClick={handlePaymentDone} className="bg-blue-500 hover:bg-blue-700 text-white text-base font-medium rounded-md py-2 px-4">
                  Payment Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}  

      {isTemporaryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" id="paymentModal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Payment Processing...</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Please Pay "${temporaryBill}" to this bank account:<br/>
                  XXX-XXX-XXXX<br/>
                  After completing the payment click on the Confirm button
                </p>
              </div>
              <div className="flex justify-between items-center px-4 py-3">
                <button onClick={() => setIsTemporaryModalOpen(false)} className="bg-gray-300 text-black text-base font-medium rounded-md py-2 px-4">
                  Close
                </button>
                <button onClick={handlePaymentDone} className="bg-blue-500 hover:bg-blue-700 text-white text-base font-medium rounded-md py-2 px-4">
                  Payment Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPaymentConfirmationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" id="paymentConfirmationModal">
          <div className="relative top-1/4 mx-auto p-5 border w-1/3 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Thanks for your payment</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  We will verify your payment and confirm booking. Wait! will get back to you within 6 hours.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button onClick={closePaymentConfirmation} className="bg-blue-500 hover:bg-blue-700 text-white text-base font-medium rounded-md py-2 px-4">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

