import express from "express";

import userController from "../controllers/user";

const userRouter = express.Router();

userRouter.route("/users/").post(userController.createUser);
userRouter.route("/users/sign-in").post(userController.signInUser);
userRouter.route("/users/sign-out").post(userController.signOut);
userRouter.route("/users/confirm").post(userController.confirmUser);
userRouter.route("/users/").patch(userController.updateUser);
userRouter.route("/users/forgot-password").post(userController.forgotPassword);
userRouter
  .route("/users/forgot-password-confirm")
  .post(userController.forgotPasswordConfirm);
userRouter
  .route("/users/forgot-password-change")
  .post(userController.forgotPasswordChange);

export default userRouter;
