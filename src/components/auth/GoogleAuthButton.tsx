import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import { env } from '../../env';
import { DiscourseSso } from '../../graphql/types';
import { LoginResponseDataFragment } from '../../graphql/users/users.fragments.generated';
import { useLoginGoogle } from '../../graphql/users/users.hooks';

export const GoogleAuthButton: React.FC<{
  buttonText: string;
  onSuccessfulLogin: (loginResponse: LoginResponseDataFragment) => void;
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
      clientId={env.GOOGLE_CLIENT_ID || 'oups'}
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
        console.error(err);
        onFailure(err);
      }}
      cookiePolicy={'single_host_origin'}
      type="button"
      accessType="online"
    />
  );
};
