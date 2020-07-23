import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import { useLoginGoogle } from '../../graphql/users/users.hooks';
import getConfig from 'next/config';
import { LoginResponse, DiscourseSso } from '../../graphql/types';

const { publicRuntimeConfig } = getConfig();

export const GoogleAuthButton: React.FC<{
  buttonText: string;
  onSuccessfulLogin: (loginResponse: LoginResponse) => void;
  onFailedLogin: (googleUser: GoogleLoginResponse) => void;
  onFailure: (err: any) => void;
  discourseSSO?: DiscourseSso;
}> = ({ buttonText, onSuccessfulLogin, onFailedLogin, onFailure, discourseSSO }) => {
  const { loginGoogle, data } = useLoginGoogle({
    onCompleted(data) {
      onSuccessfulLogin(data.loginGoogle);
    },
  });
  return (
    <GoogleLogin
      clientId={publicRuntimeConfig.googleClientId || 'oups'}
      buttonText={buttonText}
      onSuccess={async (googleUser) => {
        googleUser = googleUser as GoogleLoginResponse;
        try {
          await loginGoogle({
            variables: { idToken: googleUser.getAuthResponse().id_token, discourseSSO },
          });
        } catch (err) {
          onFailedLogin(googleUser);
        }
      }}
      onFailure={(err) => {
        console.error('failure google log in');
        onFailure(err);
      }}
      cookiePolicy={'single_host_origin'}
      type="button"
      accessType="online"
    />
  );
};
