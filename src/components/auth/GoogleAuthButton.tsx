import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import { useLoginGoogle } from '../../graphql/users/users.hooks';

export const GoogleAuthButton: React.FC<{
  buttonText: string;
  onSuccessfulLogin: () => void;
  onFailedLogin: (googleUser: GoogleLoginResponse) => void;
  onFailure: (err: any) => void;
}> = ({ buttonText, onSuccessfulLogin, onFailedLogin, onFailure }) => {
  const { loginGoogle, error: errorGoogle } = useLoginGoogle();
  return (
    <GoogleLogin
      clientId="390325140829-njk2aup9efs7tprmpmqmke93886q602i.apps.googleusercontent.com"
      buttonText={buttonText}
      onSuccess={async (googleUser) => {
        googleUser = googleUser as GoogleLoginResponse;
        try {
          await loginGoogle({
            variables: { idToken: googleUser.getAuthResponse().id_token },
          });
          onSuccessfulLogin();
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
