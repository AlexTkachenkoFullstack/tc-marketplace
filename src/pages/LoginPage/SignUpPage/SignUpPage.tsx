import React, { FC, useReducer, useState } from 'react';
import styles from './SignUpPage.module.scss';
import line from '../../../assets/images/horizontal-line.png';
import eye from '../../../assets/icons/eye-open.svg';
import eyeClose from '../../../assets/icons/eye-close.svg';
import googleIcon from '../../../assets/icons/google.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { Logo } from 'components/Logo';
import { formReducer, initialState } from 'helpers/formReducer';

export const SignUpPage: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

        const { name, email, password, confirmPassword } = formData;

    if (name.length < 2 || name.length > 50) {
      alert('Ім\'я має містити від 2 до 50 символів');
      return;
    }

    if (password.length < 8 || password.length > 50) {
      alert('Пароль має містити від 8 до 50 символів');
      return;
    }

    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      alert('Пароль має містити принаймні одну букву та одну цифру');
      return;
    }

    if (password !== confirmPassword) {
      alert('Підтвердження пароля не співпадає');
      return;
    }

    console.log(formData);

    navigate('/login/finish-registration');
  }

  return (
    <form onSubmit={handleSubmit} className={styles.Login_container}>
      <h2 className={styles.Login_title}>Реєстрація</h2>
      <span className={styles.Login_login}>
        Вже є акаунт?<NavLink to="/login/log-in" className={styles.Login_login_link}>Увійти</NavLink>
      </span>

      <div>
        <input
          type='text'
          placeholder={`Введіть повне ім'я`}
          className={styles.Login_field}
          value={formData.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          required
        />

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

        <div className={styles.password_container}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Підтвердіть пароль'
            className={styles.Login_field}
            value={formData.confirmPassword}
            onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
            required
          />
          <img
              src={showConfirmPassword ? eye : eyeClose}
              alt={showConfirmPassword ? 'hide password' : 'show password'}
              className={styles.password_container_icon}
              onClick={toggleConfirmPasswordVisibility}
          />
        </div>

        <button type='submit' className={styles.Login_btn}>
          Зареєструватися
        </button>
        <img src={line} alt='' className={styles.Login_line}/>
        <button className={styles.Login_googleBtn}>
          Зареєструватися через Google
          <img src={googleIcon} alt='' className={styles.Login_googleBtn_icon}/>
        </button>
      </div>
    </form>
  );
};
