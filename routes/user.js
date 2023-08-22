import express from 'express';
import { changePassword, forgetPassword, getMyProfile, logOut, login, resetPassword, signup, updatePic, updateProfile } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { singleUpload } from '../middlewares/multer.js';


const router = express.Router();

//* authentication route *//
// login route
router.post('/login', login);

// signup route
router.post('/new', singleUpload, signup);

// get my profile route
router.get('/me', isAuthenticated, getMyProfile)

// logout route
router.get('/logout', isAuthenticated, logOut);

// updating profile route
router.put('/updateprofile', isAuthenticated, updateProfile);
// update password route
router.put('/changepassword', isAuthenticated, changePassword);
// update profile pics
router.put('/updatepic', isAuthenticated, singleUpload, updatePic);

// Forget Password and Reset Password
router.route('/forgetpassword').post(forgetPassword).put(resetPassword);

//http://localhost:5000/api/user/me

export default router;
