import express from 'express';
import { deleteUser, test, updateUserInfo} from '../controllers/usercontroller.js';
import { verifyToken } from '../utilities/UserVerify.js';


const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUserInfo);
router.delete('/delete/:id', verifyToken,deleteUser);
export default router;

// import express from 'express';
// import { test, updateUser} from '../controllers/usercontroller.js';
// import { verifyToken } from '../utilities/UserVerify.js';


// const router = express.Router();

// router.get('/test', test);
// router.post('/update/:id', verifyToken, updateUser)

// export default router;