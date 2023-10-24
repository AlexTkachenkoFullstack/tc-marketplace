import React, { FC, useReducer, useState } from 'react';
import styles from './LoginPage.module.scss';
import line from '../../../assets/images/horizontal-line.png';
import eye from '../../../assets/icons/eye-open.svg';
import eyeClose from '../../../assets/icons/eye-close.svg';
import googleIcon from '../../../assets/icons/google.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { formReducer, initialState } from 'helpers/formReducer';

export const LoginPage: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleFieldChange = (field: string, value: string) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field,
      value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

        const { email, password } = formData;

    console.log(formData);

    // navigate('/login/finish-registration');
  }

  return (
    <form onSubmit={handleSubmit} className={styles.Login_container}>
      <h2 className={styles.Login_title}>Увійти</h2>
      <span className={styles.Login_login}>
        Новий користувач?<NavLink to="/login/sign-up" className={styles.Login_login_link}>Створити акаунт</NavLink>
      </span>

      <div>
        <input
          type='email'
          placeholder='E-mail'
          className={styles.Login_field}
          value={formData.email}
          onChange={(e) => handleFieldChange('email', e.target.value)}
          required
        />

        <div className={styles.password_container}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Введіть пароль'
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

        <button type='submit' className={styles.Login_btn}>
          Увійти
        </button>

        <NavLink to="/login/recover" className={styles.Login__reset_password}>
          Забули пароль?
        </NavLink>

        <img src={line} alt='' className={styles.Login_line}/>
        <button className={styles.Login_googleBtn}>
          Увійти через Google
          <img src={googleIcon} alt='' className={styles.Login_googleBtn_icon}/>
        </button>
      </div>
    </form>
  );
};
