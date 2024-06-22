import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";

export const getAccessToken = async (username: string, password: string) => {
  try {
    const cognitoClient = new CognitoIdentityProviderClient();

    const authParams = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    });

    const response = await cognitoClient.send(authParams);

    return response.AuthenticationResult?.AccessToken;
  } catch (err) {
    console.log(err);
    return null;
  }
};
