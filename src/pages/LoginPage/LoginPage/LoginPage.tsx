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
  const [messageError, setMessageError] = useState('');
  const dispatchLogin = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [emailHasValue, setEmailHasValue] = useState(false);
  const [passwordHasValue, setPasswordHasValue] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      const email = searchParams.get('email');
      const token = searchParams.get('token');
      if (email && token) {
        try {
          const response = await axios(
            `http://138.68.113.54:8080/api/v1/authorization/register/verify-account?email=${email}&token=${token}`
          );
          if (response.status === 200) {
            console.log('Account has been verified');
          }
        } catch (error) {
          console.log("Account didn't verify");
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

    // Перевірка на валідність та зняття помилок
    switch (field) {

      case 'email':
        setEmailHasValue(!!value);
        break;

      case 'password':
        setPasswordHasValue(!!value);
        break;

    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { email, password } = formData;
    setMessageError('');


    const result = await dispatchLogin(loginThunk({ email, password }));
    const response = result.payload;

    if (!response) {
      setMessageError('Упс, сталася помилка. Спробуйте пізніше.')
    } else if (response.status === 404) {
      setMessageError('Помилка входу: Акаунту з вказаною адресою електронної пошти не існує.');
    } else if (response.status === 403) {
      setMessageError('Невірний пароль або електронна пошта. Будь ласка, спробуйте ще раз.');
    }

      setTimeout(() => setMessageError(''), 4500);
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

      <div className={styles.input_container}>
      {emailHasValue ? (
            <label
              htmlFor="email"
              className={


                  styles.Login_label
              }
            >
              E-mail
            </label>
          ) : null}

        <input
          type="email"
          placeholder="E-mail"
          id="name"
          className={styles.Login_field}

          value={formData.email}
          onChange={(e) => handleFieldChange('email', e.target.value)}

          required
        />
        </div>


        <div className={styles.input_container}>
        {passwordHasValue ? (
            <label
              htmlFor="password"
              className={

                styles.Login_label
              }
            >
              Введіть пароль
            </label>
          ) : null}

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
          {messageError.length > 0 &&
            ShowToast({
              label: messageError,
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

    </form>
  );
};
