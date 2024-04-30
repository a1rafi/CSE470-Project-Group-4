import Reservation from '../database/reservedata.js';
import Listing from '../database/listingdata.js';
import User from '../database/userdata.js'; 
import { errorHandler } from '../utilities/errorhandle.js';


export const createReservation = async (req, res, next) => {
    try {
      const { listingRef, checkInDate, checkOutDate, numberOfPeople } = req.body;
  
      const listing = await Listing.findById(listingRef);
      if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
      }

        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }

  
      const reservation = await Reservation.create({
        listingRef: listing._id, 
        userRef: userId,
        checkInDate,
        checkOutDate,
        numberOfPeople
      });
  
      return res.status(201).json(reservation);
    } catch (error) {
      console.error('Error creating reservation:', error);
      return next(error);
    }
  };
  