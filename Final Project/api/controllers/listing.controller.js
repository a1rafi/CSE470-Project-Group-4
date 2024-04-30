import Listing from "../database/listingdata.js";
import User from "../database/userdata.js";
import Review from "../database/reviewdata.js";
import { errorHandler } from "../utilities/errorhandle.js";

export const createListing = async (req, res, next) => {

    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req,res,next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404,'Listing not Found!'));
  }
  if (req.user.id !== listing.userRef){
     return next(errorHandler(401,'You can only delete your own listings!'));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
}; 

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};


export const getListings = async (req, res, next) => {


  try {


      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
     
      let offer = req.query.offer;


      if (offer === undefined || offer === 'false') {
          offer = {$in: [false, true] };
      }


      let furnished = req.query.furnished;


      if (furnished === undefined || furnished === 'false') {
          furnished = {$in: [false, true] };
      }


      let parking = req.query.parking;


      if (parking === undefined || parking === 'false') {
          parking = {$in: [false, true] };
      }


      let type = req.query.type;


      if (type === undefined || type === 'all') {
          type = {$in: ['sale', 'rent'] };
      }


      const searchTerm = req.query.searchTerm || '';


      const sort = req.query.sort || 'createdAt';


      const order = req.query.order || 'desc';


      const listings = await Listing.find({
          name: {$regex: searchTerm, $options: 'i'},
          offer,
          furnished,
          parking,
          type,
      }).sort(
          {[sort]: order}
      ).limit(limit).skip(startIndex);




      return res.status(200).json(listings);




  } catch (error) {
      next(error);
  }
}


export const getUserlist = async (req, res, next) => {
  try {
    const Userlist = await User.find({});
    if (!Userlist) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(Userlist);
  } catch (error) {
    next(error);
  }
};  

export const deleteAnyListing = async (req,res,next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404,'Listing not Found!'));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
}; 


export const addReviewToListing = async (req, res, next) => {
  try {
    const { userRef, rating, comment } = req.body;
    const listingRef = req.params.id;

    // Check if the listing exists
    const listing = await Listing.findById(listingRef);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }

    // Create the review
    const review = await Review.create({ userRef, listingRef, rating, comment });

    res.status(201).json({ success: true, review });
  } catch (error) {
    next(error);
  }
};

// export const getReviewsForListing = async (req, res, next) => {
//   try {
//     const listingRef = req.params.id;
//     const reviews = await Review.findById(listingRef).populate('userId', 'username');
//     res.json({ success: true, reviews });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getReviewsForListing = async (req, res, next) => {
//   try {
//     const listing = await Review.findById(req.params.id);
//     if (!listing) {
//       return next(errorHandler(404, 'Listing not found!'));
//     }
//     res.status(200).json(listing);
//   } catch (error) {
//     next(error);
//   }
// };

export const getReviewsForListing = async (req, res, next) => {

    try {
      const listings = await Review.find({ listingRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
};