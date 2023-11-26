// import {useEffect} from 'react';
// import { jwtDecode } from 'jwt-decode';
import { FC } from 'react';
import styles from './LoginLayout.module.scss';

import { NavLink, Outlet } from 'react-router-dom';
import { Logo } from 'components/Logo';
import googleIcon from './/..//..//assets/icons/google.svg';

// declare const google: any;

export const LoginLayout: FC = () => {

//   function handleCallbackResponse(response: any){
//     const userObject=jwtDecode(response.credential);
//     console.log(userObject)
//     const userName = (userObject as { name?: string })?.name; 
//     const userEmail = (userObject as { email?: string })?.email;
//     const userPicture = (userObject as { picture?: string })?.picture;
//     console.log(userName, userEmail, userPicture)
// }

//   useEffect(()=>{
//     google.accounts.id.initialize({
//         client_id: "160491221513-tb59k912vnbiraoj1hlor3o42hnnfn79.apps.googleusercontent.com",
//         callback: handleCallbackResponse,
        
//     })
//     google.accounts.id.renderButton(
//         document.getElementById("google_button"),
//         {theme:'outline', size:'large'}
//     )
//     google.accounts.id.prompt()
// }, [])

  return (
    <div className={styles.Container}>
      <nav className={styles.nav}>
        <NavLink to="/"><Logo className={styles.nav_logo} /></NavLink>
        <NavLink to="/" className={styles.nav_text}>Вихід</NavLink>
      </nav>

      <Outlet />
      {/* <button className={styles.Login_googleBtn} id='google_button'>
          Зареєструватися через Google
          <img
            src={googleIcon}
            alt="Google Icon"
            className={styles.Login_googleBtn_icon}
          />
        </button> */}
    </div>
  );
};
