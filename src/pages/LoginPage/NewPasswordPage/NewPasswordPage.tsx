import { FC, useEffect, useReducer, useState } from 'react';
import styles from './NewPasswordPage.module.scss';
import eye from '../../../assets/icons/eye-open.svg';
import eyeClose from '../../../assets/icons/eye-close.svg';
import { useAppDispatch } from 'redux/hooks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { loginThunk } from 'redux/auth/operations';
import { formReducer, initialState } from 'helpers/formReducer';
import redEye from '../../../assets/icons/eye-open-red.svg';
import redEyeClose from '../../../assets/icons/eye-close-red.svg';

export const NewPasswordPage: FC = () => {
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordHasValue, setPasswordHasValue] = useState(false);
  const [confirmPasswordHasValue, setConfirmPasswordHasValue] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [activeField, setActiveField] = useState<FieldKey | null>(null);

  const navigate = useNavigate();
  const dispatchLogin = useAppDispatch();
  const [searchParams] = useSearchParams();

  type FieldKey = 'password' | 'confirmPassword';

  const handleBlur = (field: FieldKey) => {
    dispatch({ type: 'TRIM' });
    setActiveField(null);
  };

  const handleFocus = (field: FieldKey) => {
    setActiveField(field);
  };

  const handleFieldChange = (field: string, value: string) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field,
      value,
    });

    // Перевірка на валідність та зняття помилок
    switch (field) {
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

      case 'confirmPassword':
        setConfirmPasswordHasValue(!!value);

        value !== formData.password
          ? setConfirmPasswordError('Паролі не співпадають!')
          : setConfirmPasswordError('');

        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const verifyEmail = async () => {
      const email = searchParams.get('email');
      const token = searchParams.get('token');
      if (email && token) {
        try {
          const response = await axios.get(
            `https://api.pawo.space/api/v1/authorization/reset-password?email=${email}&token=${token}`,
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // const handlePasswordChange = (value: string) => {
  //   setPassword(value);
  // };

  // const handleConfirmPasswordChange = (value: string) => {
  //   setConfirmPassword(value);
  // };

  const handleSubmit = async () => {
    try {
      const URL = 'https://api.pawo.space/api/v1/authorization/reset-password';
      const email = searchParams.get('email') as string;
      const formDataParams = {
        email: email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      await axios.post(URL, formDataParams);

      const result = await dispatchLogin(
        loginThunk({ email, password: formData.password }),
      );
      const response = result.payload;

      if (!response) {
        console.log('Something went wrong');
      }

      navigate('/');
    } catch (error: any) {
      console.log('somithing went wrong');
    }
  };

  return (
    <div className={styles.Login_container}>
      <h2 className={styles.Login_title}>Новий пароль</h2>

      <div>
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
          <div className={styles.passwordThumb}>
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
              onChange={e => handleFieldChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              onFocus={() => handleFocus('password')}
              required
            />
            <img
              src={
                showPassword
                  ? activeField !== 'password' && passwordError
                    ? redEye
                    : eye
                  : activeField !== 'password' && passwordError
                  ? redEyeClose
                  : eyeClose
              }
              alt={showPassword ? 'hide password' : 'show password'}
              className={styles.input_container_icon}
              onClick={togglePasswordVisibility}
            />
          </div>

          {activeField !== 'password' && passwordError.length > 0 && (
            <span className={styles.Login_label_errorMessage}>
              {passwordError}
            </span>
          )}
        </div>

        <div className={styles.input_container}>
          {confirmPasswordHasValue ? (
            <label
              htmlFor="password"
              className={
                activeField !== 'confirmPassword' && confirmPasswordError
                  ? `${styles.Login_label_red}`
                  : `${styles.Login_label}`
              }
            >
              Підтвердіть пароль
            </label>
          ) : null}

          <div className={styles.passwordThumb}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Підтвердіть пароль"
              className={
                activeField !== 'confirmPassword' && confirmPasswordError
                  ? `${styles.Login_field} ${styles.Login_field_warning} ${styles.Login_field_error}`
                  : styles.Login_field
              }
              value={formData.confirmPassword}
              onChange={e =>
                handleFieldChange('confirmPassword', e.target.value)
              }
              onBlur={() => handleBlur('confirmPassword')}
              onFocus={() => handleFocus('confirmPassword')}
              required
            />
            <img
              src={
                showConfirmPassword
                  ? confirmPasswordError && activeField !== 'confirmPassword'
                    ? redEye
                    : eye
                  : confirmPasswordError && activeField !== 'confirmPassword'
                  ? redEyeClose
                  : eyeClose
              }
              alt={showConfirmPassword ? 'hide password' : 'show password'}
              className={styles.input_container_icon}
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>

          {activeField !== 'confirmPassword' &&
            confirmPasswordError.length > 0 && (
              <span className={styles.Login_label_errorMessage}>
                {confirmPasswordError}
              </span>
            )}
        </div>

        <button onClick={handleSubmit} className={styles.Login_btn}>
          Відновити
        </button>
      </div>
    </div>
  );
};
