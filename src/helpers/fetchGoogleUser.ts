import { jwtDecode } from 'jwt-decode';
import { authGoogle } from 'redux/auth/operations';
import { useGoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from 'redux/hooks';

declare const google: any;
export const fetchGoogleUser = (dispatch: any) => {
  const initializeGoogleAPI = async () => {
    await new Promise(resolve => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      document.head.appendChild(script);
    });

    google.accounts.id.initialize({
      client_id:
        '160491221513-tb59k912vnbiraoj1hlor3o42hnnfn79.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('google_button'), {
      size: 'large',
      shape: 'circle',
      text: 'signin_with',
      logo_alignment: 'center',
      // width: "280px",
    });
    google.accounts.id.prompt();
  };
  initializeGoogleAPI();

  function handleCallbackResponse(response: any) {
    const userObject = jwtDecode(response.credential);
    const name = (userObject as { name?: string })?.name;
    const email = (userObject as { email?: string })?.email;
    const picture = (userObject as { picture?: string })?.picture;
    const password = (userObject as { sub?: string })?.sub;
    if (name && email && picture && password) {
      dispatch(authGoogle({ name, email, picture, password }));
    }
  }
};

export function handleCallbackResponse(response: any, dispatch: any) {
  const name = (response as { name?: string })?.name;
  const email = (response as { email?: string })?.email;
  const picture = (response as { picture?: string })?.picture;
  const password = (response as { sub?: string })?.sub;
  if (name && email && picture && password) {
    dispatch(authGoogle({ name, email, picture, password }));
  }
}

export const useLogin = () => {
  const dispatchAuth = useAppDispatch();
  return useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        const userInfoResponse = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          },
        );
        if (userInfoResponse.ok) {
          const resp = await userInfoResponse.json();
          handleCallbackResponse(resp, dispatchAuth);
        } else {
          console.error('Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
  });
};
