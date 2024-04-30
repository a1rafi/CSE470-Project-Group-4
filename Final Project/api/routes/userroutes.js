import express from 'express';
import { deleteUser, test, updateUser,getUserListings,
getUser,deleteanyUser} from '../controllers/usercontroller.js';
import { verifyToken } from '../utilities/userVerify.js';


const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)

router.delete('/deleteany/:id', deleteanyUser)

export default router;