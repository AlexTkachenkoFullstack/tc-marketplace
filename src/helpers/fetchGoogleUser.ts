import { jwtDecode } from "jwt-decode";
import { authGoogle } from "redux/auth/operations";

declare const google: any;
export const fetchGoogleUser=(dispatch:any)=>{
    const initializeGoogleAPI = async () => {
        await new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://accounts.google.com/gsi/client";
          script.async = true;
          script.defer = true;
          script.onload = resolve;
          document.head.appendChild(script);
        });
  
        google.accounts.id.initialize({
          client_id: "160491221513-tb59k912vnbiraoj1hlor3o42hnnfn79.apps.googleusercontent.com",
          callback: handleCallbackResponse,
        });
  
        google.accounts.id.renderButton(
          document.getElementById("google_button"),
          { size: 'large', shape: 'circle', text: "signin_with", logo_alignment: "center" }
        );
        google.accounts.id.prompt()
      };
      initializeGoogleAPI();

      function handleCallbackResponse(response: any){
        const userObject=jwtDecode(response.credential);
        const name = (userObject as { name?: string })?.name; 
        const email = (userObject as { email?: string })?.email;
        const picture = (userObject as { picture?: string })?.picture;
        const password = (userObject as { sub?: string })?.sub;
        if(name && email && picture && password){
          dispatch(authGoogle({name, email, picture, password}))
        }  
    } 
}