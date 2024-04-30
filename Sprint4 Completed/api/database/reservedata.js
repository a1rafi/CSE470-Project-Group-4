import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
    {
        listingRef: {
            type: String,
            required: true,
            
        },
        userRef:{
            type: String,
            required: true,
        },
        checkInDate: {
            type: Date,
            required: true
        },
        checkOutDate: {
            type: Date,
            required: true
        },
        numberOfPeople: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
