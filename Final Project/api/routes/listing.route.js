import expresss from 'express';
import {createListing,deleteListing,updateListing,getListing, getListings, getUserlist, deleteAnyListing,
    addReviewToListing, getReviewsForListing} from '../controllers/listing.controller.js';
import { verifyToken } from '../utilities/userVerify.js';

const router = expresss.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id',verifyToken,deleteListing);
router.post('/update/:id',verifyToken,updateListing);
router.get('/get/:id',getListing); 
router.get('/get', getListings); 

router.delete('/deleteany/:id',deleteAnyListing);
router.get('/userlist', getUserlist)

router.post('/reviews/:id', verifyToken, addReviewToListing);
router.get('/getreviews/:id', getReviewsForListing);

export default router; 