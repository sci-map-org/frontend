import { GoogleLogin } from '@react-oauth/google';
import { decode } from 'querystring';

import { DiscourseSso } from '../../graphql/types';
import { LoginResponseDataFragment } from '../../graphql/users/users.fragments.generated';
import { useLoginGoogle } from '../../graphql/users/users.hooks';
import { decodeJWT } from '../../util/utils';

// https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse
export interface DecodedGoogleAuthJWT {
  // "iss": "https://accounts.google.com", // The JWT's issuer
  // "nbf":  161803398874,
  // "aud": "314159265-pi.apps.googleusercontent.com", // Your server's client ID
  sub: string; // The unique ID of the user's Google Account
  // "hd": "gmail.com", // If present, the host domain of the user's GSuite email address
  email: string; // The user's email address
  // "email_verified": true, // true, if Google has verified the email address
  // "azp": "314159265-pi.apps.googleusercontent.com",
  name: string;
  // If present, a URL to user's profile picture
  // "picture": "https://lh3.googleusercontent.com/a-/e2718281828459045235360uler",
  // given_name: 'Elisa';
  // family_name: 'Beckett';
  // "iat": 1596474000, // Unix timestamp of the assertion's creation time
  // "exp": 1596477600, // Unix timestamp of the assertion's expiration time
  // "jti": "abc161803398874def"
}
export const GoogleAuthButton: React.FC<{
  onSuccessfulLogin: (loginResponse: LoginResponseDataFragment) => void;
  onFailedLogin: (decodedJWT: DecodedGoogleAuthJWT, token: string) => void;
  onFailure: (err: any) => void;
  discourseSSO?: DiscourseSso;
}> = ({ onSuccessfulLogin, onFailedLogin, onFailure, discourseSSO }) => {
  const { loginGoogle, data } = useLoginGoogle({
    onCompleted(data) {
      onSuccessfulLogin(data.loginGoogle);
    },
  });
  return (
    <GoogleLogin
      size="large"
      onSuccess={async (credentialResponse) => {
        if (!credentialResponse.credential) throw new Error('no credential');
        const credential = credentialResponse.credential;
        try {
          await loginGoogle({
            variables: { idToken: credentialResponse.credential, discourseSSO },
          });
        } catch (err) {
          const decoded = decodeJWT<DecodedGoogleAuthJWT>(credential);
          if (!!decoded) onFailedLogin(decoded, credential);
        }
      }}
      onError={() => {
        console.error('failure google log in');
        onFailure(new Error('Error while logging in'));
      }}
    />
  );
};
