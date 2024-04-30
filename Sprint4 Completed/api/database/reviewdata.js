import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userRef:{
        type: String,
        required: true,
    },
    listingRef: {
        type: String,
        required: true,
        
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;