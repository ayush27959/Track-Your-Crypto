import { Router } from 'express';
import { 
  createUser, 
  loginUser, 
  sendEmail, 
  verifyOTP, // 👈 Added verifyOTP import
  ForgotPassword, 
  verifyToken, 
  changePassword, 
  logout, 
  getAllUsers, 
  updateStatus 
} from './user.controller.js';

import { AdminUserGuard, verifyTokenGuard, AdminGuard } from '../middleware/guard.js';  

const userRouter = Router();

// @Post /api/user/signup
userRouter.post("/signup", createUser);

// @Post /api/user/login
userRouter.post("/login", loginUser);

// @get /api/user/logout
userRouter.get("/logout", logout);

// route for send user data to user 
userRouter.get("/get", AdminGuard, getAllUsers);

// route for send user data to user status
userRouter.put("/status/:id", AdminGuard, updateStatus);

// route for sending OTP email
userRouter.post("/send-mail", sendEmail);

// 🚀 Route for OTP verification (Triggers Welcome Email after success)
userRouter.post("/verify-otp", verifyOTP);

// @post /api/user/forgot-password
userRouter.post("/forgot-password", ForgotPassword);

// @post /api/user/verify-token
userRouter.post("/verify-token", verifyToken);

// @put /api/user/change-password
userRouter.put("/change-password", verifyTokenGuard, changePassword);

// @get /api/user/session
userRouter.get("/session", AdminUserGuard, (req, res) => {
  return res.json(req.user);
});

export default userRouter;