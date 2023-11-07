import React, { FC, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import styles from './LoginPage.module.scss';
import line from '../../../assets/images/horizontal-line.png';
import eye from '../../../assets/icons/eye-open.svg';
import eyeClose from '../../../assets/icons/eye-close.svg';
import googleIcon from '../../../assets/icons/google.svg';
import { NavLink, useSearchParams } from 'react-router-dom';
import { formReducer, initialState } from 'helpers/formReducer';
import { useAppDispatch } from 'redux/hooks';
import { loginThunk } from 'redux/auth/operations';
import ShowToast from '../../../components/Notification/Toast';

export const LoginPage: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [messageError, setMessageError] = useState(false);
  const dispatchLogin = useAppDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      const email = searchParams.get('email');
      const token = searchParams.get('token');
      if (email && token) {
        try {
          const response = await axios(
            `https://backend-production-7a95.up.railway.app/api/v1/authorization/register/verify-account?email=${email}&token=${token}`
          );
          if (response.status === 200) {
            console.log('Account has been verified');
          }
        } catch (error) {
          console.log("Account didn't verify");
          setMessageError(true);
        }
      }
    };
    verifyEmail();
  }, [searchParams]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFieldChange = (field: string, value: string) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field,
      value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { email, password } = formData;

    try {
      await dispatchLogin(loginThunk({ email, password }));
      setMessageError(false);
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 404) {
          setMessageError(true);
        }
      } else {
        setMessageError(true);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.Login_container}>
      <h2 className={styles.Login_title}>Увійти</h2>
      <span className={styles.Login_login}>
        Новий користувач?
        <NavLink to="/login/sign-up" className={styles.Login_login_link}>
          Створити акаунт
        </NavLink>
      </span>

      <div>
        <input
          type="email"
          placeholder="E-mail"
          className={styles.Login_field}
          value={formData.email}
          onChange={(e) => handleFieldChange('email', e.target.value)}
          required
        />

        <div className={styles.password_container}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Введіть пароль"
            className={styles.Login_field}
            value={formData.password}
            onChange={(e) => handleFieldChange('password', e.target.value)}
            required
          />
          <img
            src={showPassword ? eye : eyeClose}
            alt={showPassword ? 'hide password' : 'show password'}
            className={styles.password_container_icon}
            onClick={togglePasswordVisibility}
          />
        </div>

        <button type="submit" className={styles.Login_btn}>
          Увійти
        </button>

        <>
          {messageError &&
            ShowToast({
              label:
                'Невірний пароль або електронна пошта. Будь ласка, спробуйте ще раз.',
              timer: 4500,
              backgroundColor: '#f1a9a9b7',
              color: '#ff3838',
              borderColor: '#ff3838',
            })}
        </>

        <NavLink to="/login/recover" className={styles.Login__reset_password}>
          Забули пароль?
        </NavLink>

        <img src={line} alt="" className={styles.Login_line} />
        <button className={styles.Login_googleBtn}>
          Увійти через Google
          <img
            src={googleIcon}
            alt=""
            className={styles.Login_googleBtn_icon}
          />
        </button>
      </div>
    </form>
  );
};
