import React, { FC, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import styles from './LoginPage.module.scss';
import eye from '../../../assets/icons/eye-open.svg';
import eyeClose from '../../../assets/icons/eye-close.svg';
import { NavLink, useSearchParams } from 'react-router-dom';
import { formReducer, initialState } from 'helpers/formReducer';
import { useAppDispatch } from 'redux/hooks';
import { loginThunk } from 'redux/auth/operations';
import ShowToast from '../../../components/Notification/Toast';
import { ReactComponent as GoogleIcon } from '../../../assets/icons/google.svg';
import { useLogin } from 'helpers/fetchGoogleUser';

export const LoginPage: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [messageError, setMessageError] = useState('');
  const dispatchLogin = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [emailHasValue, setEmailHasValue] = useState(false);
  const [passwordHasValue, setPasswordHasValue] = useState(false);

  const [activeField, setActiveField] = useState<FieldKey | null>(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const login = useLogin();

  type FieldKey = 'email' | 'password';

  useEffect(() => {
    const verifyEmail = async () => {
      const email = searchParams.get('email');
      const token = searchParams.get('token');
      if (email && token) {
        try {
          const response = await axios.get(
            `https://api.pawo.space/api/v1/authorization/register/verify-account?email=${email}&token=${token}`,
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

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!(value && emailRegex.test(value))) {
          setEmailError('E-mail має містити @ і бути валідною адресою!');
        } else {
          setEmailError('');
        }
        break;

      case 'password':
        setPasswordHasValue(!!value);

        value.length < 8 ||
        value.length > 50 ||
        !/\d/.test(value) ||
        !/[a-zA-Z]/.test(value)
          ? setPasswordError(
              'Пароль має містити від 8 до 50 символів, хоча б одну букву і цифру',
            )
          : setPasswordError('');

        break;

      default:
        break;
    }
  };

  const handleBlur = (field: FieldKey) => {
    dispatch({ type: 'TRIM' });
    setActiveField(null);
  };

  const handleFocus = (field: FieldKey) => {
    setActiveField(field);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { email, password } = formData;
    setMessageError('');

    const result = await dispatchLogin(loginThunk({ email, password }));
    const response = result.payload;

    if (!response) {
      setMessageError('Упс, сталася помилка. Спробуйте пізніше.');
    } else if (response.status === 404) {
      setMessageError(
        'Помилка входу: Акаунту з вказаною адресою електронної пошти не існує.',
      );
    } else if (response.status === 403) {
      setMessageError(
        'Невірний пароль або електронна пошта. Будь ласка, спробуйте ще раз.',
      );
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
              activeField !== 'email' && emailError
                ? `${styles.Login_label_red}`
                : `${styles.Login_label}`
            }
          >
            E-mail
          </label>
        ) : null}

        <input
          type="email"
          placeholder="E-mail"
          id="name"
          className={
            activeField !== 'email' && emailError
              ? `${styles.Login_field} ${styles.Login_field_warning} ${styles.Login_field_error}`
              : styles.Login_field
          }
          value={formData.email}
          onChange={e => handleFieldChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          onFocus={() => handleFocus('email')}
          required
        />
        {activeField !== 'email' && emailError.length > 0 && (
          <span className={styles.Login_label_errorMessage}>{emailError}</span>
        )}
      </div>

      <div className={styles.input_container}>
        {passwordHasValue ? (
          <label
            htmlFor="password"
            className={
              activeField !== 'password' && passwordError
                ? `${styles.Login_label_red}`
                : `${styles.Login_label}`
            }
          >
            Введіть пароль
          </label>
        ) : null}

        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Введіть пароль"
          className={
            activeField !== 'password' && passwordError
              ? `${styles.Login_field} ${styles.Login_field_warning} ${styles.Login_field_error}`
              : `${styles.Login_field}`
          }
          value={formData.password}
          onChange={e => handleFieldChange('password', e.target.value)}
          onBlur={() => handleBlur('password')}
          onFocus={() => handleFocus('password')}
          required
        />
        <img
          src={showPassword ? eye : eyeClose}
          alt={showPassword ? 'hide password' : 'show password'}
          className={styles.password_container_icon}
          onClick={togglePasswordVisibility}
        />
        {activeField !== 'password' && passwordError.length > 0 && (
          <span className={styles.Login_label_errorMessage}>
            {passwordError}
          </span>
        )}
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

      <div className={styles.Login_googleBtn} onClick={() => login()}>
        Увійти через Google
        <GoogleIcon />
      </div>
    </form>
  );
};
