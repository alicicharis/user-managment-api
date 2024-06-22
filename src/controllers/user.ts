import { Request, Response } from "express";
import {
  CognitoIdentityProviderClient,
  GetUserCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
  UpdateUserAttributesCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  ChangePasswordCommand,
  GlobalSignOutCommand,
} from "@aws-sdk/client-cognito-identity-provider";

import { getAccessToken } from "../helpers/utils";

const cognitoClient = new CognitoIdentityProviderClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const signupParams = new SignUpCommand({
      ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
      Username: req.body.username,
      Password: req.body.password,
      UserAttributes: [{ Name: "email", Value: req.body.email }],
    });

    const response = await cognitoClient.send(signupParams);

    res.status(200).json({ response, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating user", success: false });
  }
};

export const confirmUser = async (req: Request, res: Response) => {
  try {
    const confirmParams = new ConfirmSignUpCommand({
      ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
      Username: req.body.username,
      ConfirmationCode: req.body.confirmationCode,
    });

    const response = await cognitoClient.send(confirmParams);

    res.status(200).json({ response, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error confirming user", success: false });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const accessToken = await getAccessToken(
      req.body.username,
      req.body.password
    );

    if (accessToken) {
      const signUpParams = new GetUserCommand({
        AccessToken: accessToken,
      });

      const response = await cognitoClient.send(signUpParams);

      res.status(200).json({ response, success: true });
      return;
    }

    res.status(401).json({ message: "Wrong credentials!", success: false });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error signin in", success: false });
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    const accessToken = await getAccessToken(
      req.body.username,
      req.body.password
    );

    if (!accessToken) {
      res.status(401).json({ message: "Wrong credentials!", success: false });
      return;
    }

    const signOutParams = new GlobalSignOutCommand({
      AccessToken: accessToken,
    });

    const response = await cognitoClient.send(signOutParams);

    res.status(200).json({ response, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error signing out", success: false });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const accessToken = await getAccessToken(
      req.body.username,
      req.body.password
    );

    if (!accessToken) {
      res.status(401).json({ message: "Wrong credentials!", success: false });
      return;
    }

    const updateParams = new UpdateUserAttributesCommand({
      AccessToken: accessToken,
      UserAttributes: [{ Name: "picture", Value: req.body.picture }],
    });

    const response = await cognitoClient.send(updateParams);

    res.status(200).json({ response, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating user", success: false });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const forgotPasswordParams = new ForgotPasswordCommand({
      ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
      Username: req.body.username,
    });

    const response = await cognitoClient.send(forgotPasswordParams);

    res.status(200).json({ response, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error forgot password", success: false });
  }
};

export const forgotPasswordConfirm = async (req: Request, res: Response) => {
  try {
    const forgotPasswordConfirmParams = new ConfirmForgotPasswordCommand({
      ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
      Username: req.body.username,
      ConfirmationCode: req.body.confirmationCode,
      Password: req.body.password,
    });

    const response = await cognitoClient.send(forgotPasswordConfirmParams);

    res.status(200).json({ response, success: true });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error confirming forgot password", success: false });
  }
};

export const forgotPasswordChange = async (req: Request, res: Response) => {
  try {
    const accessToken = await getAccessToken(
      req.body.username,
      req.body.password
    );

    if (!accessToken) {
      res.send(401).json({ message: "Wrong credentials!" });
      return;
    }

    const forgotPasswordChangeParams = new ChangePasswordCommand({
      AccessToken: accessToken,
      PreviousPassword: req.body.password,
      ProposedPassword: req.body.newPassword,
    });

    const response = await cognitoClient.send(forgotPasswordChangeParams);

    res.status(200).json({ response, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error forgot password", success: false });
  }
};

const userController = {
  createUser,
  signInUser,
  signOut,
  confirmUser,
  updateUser,
  forgotPassword,
  forgotPasswordConfirm,
  forgotPasswordChange,
};

export default userController;
