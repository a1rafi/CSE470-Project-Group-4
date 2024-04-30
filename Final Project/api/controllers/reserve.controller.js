import Reservation from '../database/reservedata.js';
import Listing from '../database/listingdata.js';
import { errorHandler } from '../utilities/errorhandle.js';

export const createReservation = async (req, res, next) => {
  try {
    const { listingRef, checkInDate, checkOutDate, numberOfPeople, userRef, type, listingname, imageUrls } = req.body;

    // const listing = await Listing.findById(listingRef);
    // if (!listing) {
    //   return next(errorHandler(404, 'Listing not found!'));
    // }


    const reservation = await Reservation.create({
      listingRef,
      userRef, 
      checkInDate,
      checkOutDate,
      numberOfPeople,
      type,
      listingname,
      imageUrls
    });

    return res.status(201).json({success: true,reservation});
  } catch (error) {
    console.error('Error creating reservation:', error);
    return next(error);
  }
};

export const getReservationHistory = async (req, res, next) => {
  try {
    //const { userId } = req.params.id;

    const reservations = await Reservation.find({ userRef: req.params.id })

    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching reservation history:', error);
    return next(error);
  }
};

export const deleteReservation = async (req,res,next) => {
  const Reserve = await Reservation.findById(req.params.id);

  if (!Reserve) {
    return next(errorHandler(404,'Reservation not Found!'));
  }
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json('Reservation has been cancelled!');
  } catch (error) {
    next(error);
  }
}; 
