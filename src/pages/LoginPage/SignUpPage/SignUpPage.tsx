import React, { FC, useReducer, useState } from 'react';
import styles from './SignUpPage.module.scss';
import line from '../../../assets/images/horizontal-line.png';
import eye from '../../../assets/icons/eye-open.svg';
import eyeClose from '../../../assets/icons/eye-close.svg';
import googleIcon from '../../../assets/icons/google.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { formReducer, initialState } from 'helpers/formReducer';
import axios from 'axios';

export const SignUpPage: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

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

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    setNameError('');
    setPasswordError('');
    setConfirmPasswordError('');

    const { name, email, password, confirmPassword } = formData;

    if (name.length < 2 || name.length > 50) {
      setNameError('Ім\'я має містити від 2 до 50 символів');
      return;
    }
    if (password.length < 8 || password.length > 50) {
      setPasswordError('Пароль має містити від 8 до 50 символів');
      return;
    }
    if (!/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      setPasswordError('Пароль не валідний');
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Паролі не співпадають');
      return;
    }

    try {
      const URL = 'https://backend-production-7a95.up.railway.app/api/v1/authorization/register';
      const response = await axios.post(URL, formData)
      navigate(`/login/finish-registration?email=${formData.email}`);
      dispatch({ type: 'RESET' });

      console.log('Успішно відправлено:', response.data);
    } catch (error) {
      console.error('Помилка відправки POST-запиту:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.Login_container}>
      <h2 className={styles.Login_title}>Реєстрація</h2>
      <span className={styles.Login_login}>
        Вже є акаунт?<NavLink to="/login/log-in" className={styles.Login_login_link}>Увійти</NavLink>
      </span>

      <div className={styles.Container}>
        {nameError.length > 0 && (
          <label
            htmlFor='name'
            className={styles.Login_label}
          >
            <span className={styles.Login_label_warning}>!</span>{nameError}
          </label>
        )}
        <input
          type='text'
          id='name'
          placeholder={`Введіть повне ім'я`}
          className={nameError ? `${styles.Login_field} ${styles.Login_field_warning}` : styles.Login_field}
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
          {passwordError.length > 0 && (
            <label
              htmlFor='password'
              className={styles.Login_label_password}
            >
              <span className={styles.Login_label_warning}>!</span>{passwordError}
            </label>
          )}
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            placeholder='Введіть пароль'
            className={(passwordError || confirmPasswordError) ? `${styles.Login_field} ${styles.Login_field_warning}` : styles.Login_field}
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
          {confirmPasswordError.length > 0 && (
            <label
              htmlFor='confirmPassword'
              className={styles.Login_label_password}
            >
              <span className={styles.Login_label_warning}>!</span>{confirmPasswordError}
            </label>
          )}
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id='confirmPassword'
            placeholder='Підтвердіть пароль'
            className={confirmPasswordError ? `${styles.Login_field} ${styles.Login_field_warning}` : styles.Login_field}
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
