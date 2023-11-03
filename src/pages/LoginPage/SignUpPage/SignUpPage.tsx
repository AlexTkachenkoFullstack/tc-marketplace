import React, { FC, useRef, useReducer, useState } from 'react';
import styles from './SignUpPage.module.scss';
import line from '../../../assets/images/horizontal-line.png';
import eye from '../../../assets/icons/eye-open.svg';
import eyeClose from '../../../assets/icons/eye-close.svg';
import redEye from '../../../assets/icons/eye-open-red.svg';
import redEyeClose from '../../../assets/icons/eye-close-red.svg';
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
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [nameHasValue, setNameHasValue] = useState(false);
  const [emailHasValue, setEmailHasValue] = useState(false);
  const [passwordHasValue, setPasswordHasValue] = useState(false);
  const [confirmPasswordHasValue, setConfirmPasswordHasValue] = useState(false);

  const [activeField, setActiveField] = useState<FieldKey | null>(null);

  type FieldKey = 'name' | 'email' | 'password' | 'confirmPassword';

  const inputRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleFieldChange = (field: string, value: string) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field,
      value,
    });

    switch (field) {
    case 'name':
      setNameHasValue(!!value);
      break;
    case 'email':
      setEmailHasValue(!!value);
      break;
    case 'password':
      setPasswordHasValue(!!value);
      break;
    case 'confirmPassword':
      setConfirmPasswordHasValue(!!value);
      break;
    default:
      break;
  }

    // Перевірка на валідність та зняття помилок
    switch (field) {
      case 'name':
         (!(value.length >= 2 && value.length <= 50))
        ? setNameError('Ім\'я має містити від 2 до 50 символів')
        : setNameError('');
        break;

      case 'email':
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!(value && emailRegex.test(value))) {
          setEmailError('E-mail має містити @ і бути валідною адресою');
        } else {
          setEmailError('');
        }
        break;
      case 'password':
        !(passwordError && value.length >= 8 && value.length <= 50 && /\d/.test(value) && /[a-zA-Z]/.test(value))
        
        ? setPasswordError('Пароль має містити від 8 до 50 символів, хоча б одну букву і цифру')
        : setPasswordError('')
        
        break;
      case 'confirmPassword':
        !(confirmPasswordError && value === formData.password) 
         ? setConfirmPasswordError('Паролі не співпадають')
         : setConfirmPasswordError('')
        break;
      default:
        break;
    }
  };


  const handleBlur = (field: FieldKey) => {
    setActiveField(null);
  };
  
  const handleFocus = (field: FieldKey) => {
    setActiveField(field);
  };
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setNameError('');
    setPasswordError('');
    setConfirmPasswordError('');

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
        <div className={styles.input_container}>
        { nameHasValue ? (
            <label htmlFor="name" className={
              (activeField !== 'name' && nameError )
                ? `${styles.Login_label_red}`
                : `${styles.Login_label}`
            }>
             Введіть повне ім'я
            </label>
          ) : null}
          <input
            ref={inputRef}
            type="text"
            onBlur={() => handleBlur('name')}
            onFocus={() => handleFocus('name')}
            id="name"
            placeholder={`Введіть повне ім'я`}
            className={
              activeField !== 'name' && nameError
                ? `${styles.Login_field} ${styles.Login_field_warning} ${styles.Login_field_error}`
                : `${styles.Login_field}`
            }
            value={formData.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            required
          />
          
          {activeField !== 'name' && nameError.length > 0 && (
            <span className={styles.Login_label_errorMessage}>{nameError}</span>
          )}
        </div>

        <div className={styles.input_container}>
        { emailHasValue ? (
            <label htmlFor="email" className={
              (activeField !== 'email' && emailError )
                ? `${styles.Login_label_red}`
                : `${styles.Login_label}`
            }>
             E-mail
            </label>
          ) : null}

          <input
            ref={inputRef}
            type="email"
            id="email"
            placeholder="E-mail"
            className={
              activeField !== 'email' && emailError
                ? `${styles.Login_field} ${styles.Login_field_warning} ${styles.Login_field_error}`
                : styles.Login_field
            }
            
            value={formData.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            onFocus={() => handleFocus('email')}
            required
          />

        {activeField !== 'email' && emailError.length > 0 && <span className={styles.Login_label_errorMessage}>{emailError}</span>}
        </div>

        <div className={styles.input_container}>
          { passwordHasValue ? (
            <label htmlFor="password" className={
              (activeField !== 'password' && passwordError )
                ? `${styles.Login_label_red}`
                : `${styles.Login_label}`
            }>
             Введіть пароль
            </label>
          ) : null}
          <div >
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Введіть пароль"
              className={
                activeField !== 'password' && passwordError
                  ? `${styles.Login_field} ${styles.Login_field_warning} ${styles.Login_field_error}`
                  : `${styles.Login_field}`
              }
              value={formData.password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              onFocus={() => handleFocus('password')}
              required
            />
            <img
              
              src={showPassword ? (activeField !== 'password' && passwordError ? redEye : eye) : (activeField !== 'password' && passwordError ? redEyeClose : eyeClose)}
              alt={showPassword ? 'hide password' : 'show password' }
              className={styles.input_container_icon}
              onClick={togglePasswordVisibility}
            />
          </div>

          {activeField !== 'password' && passwordError.length > 0 && (
            <span className={styles.Login_label_errorMessage}>{passwordError}</span>

          )}
        </div>

        <div className={styles.input_container}>

          { confirmPasswordHasValue ? (
            <label htmlFor="password" className={
              ( confirmPasswordError )
                ? `${styles.Login_label_red}`
                : `${styles.Login_label}`
            }>
             Підтвердіть пароль
            </label>
          ) : null}
          
          <div >
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Підтвердіть пароль"
              className={
                confirmPasswordError
                  ? `${styles.Login_field} ${styles.Login_field_warning} ${styles.Login_field_error}`
                  : styles.Login_field
              }
              value={formData.confirmPassword}
              onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
              onBlur={() => handleBlur('confirmPassword')}
              onFocus={() => handleFocus('confirmPassword')}
              required
            />
            <img
              src={showConfirmPassword ? (confirmPasswordError ? redEye : eye) : (confirmPasswordError ? redEyeClose : eyeClose)}
              alt={showConfirmPassword ? 'hide password' : 'show password' }
              className={styles.input_container_icon}
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>

          {confirmPasswordError.length > 0 && (
            <span className={styles.Login_label_errorMessage}>{confirmPasswordError}</span>
          )}
        </div>

        <button type="submit" className={styles.Login_btn}>
          Зареєструватися
        </button>
        <img src={line} alt="" className={styles.Login_line} />
        <button className={styles.Login_googleBtn}>
          Зареєструватися через Google
          <img src={googleIcon} alt="" className={styles.Login_googleBtn_icon} />
        </button>
      </div>
    </form>
  );
};

