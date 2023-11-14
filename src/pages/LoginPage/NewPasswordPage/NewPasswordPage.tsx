import { FC, useEffect, useState } from 'react';
import styles from './NewPasswordPage.module.scss';
import eye from '../../../assets/icons/eye-open.svg';
import eyeClose from '../../../assets/icons/eye-close.svg';
import { useAppDispatch } from 'redux/hooks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { loginThunk } from 'redux/auth/operations';

export const NewPasswordPage: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatchLogin = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const email = searchParams.get('email');
      const token = searchParams.get('token');
      if (email && token) {
        try {
          const response = await axios.get(
            `http://134.209.230.247:8080/api/v1/authorization/reset-password?email=${email}&token=${token}`
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
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
  };

  const handleSubmit = async () => {
    try {
      const URL = 'https://backend-production-7a95.up.railway.app/api/v1/authorization/reset-password';
      const email = searchParams.get('email') as string;
      const formData = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }

      await axios.post(URL, formData);

      const result = await dispatchLogin(loginThunk({ email, password }));
      const response = result.payload;

    if (!response) {
      console.log('Something went wrong')
    }

      navigate('/');
    } catch (error: any) {
      console.log('somithing went wrong')
    }
  }

  return (
    <div className={styles.Login_container}>
      <h2 className={styles.Login_title}>Новий пароль</h2>

      <div>
        <div className={styles.password_container}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Введіть новий пароль'
            className={styles.Login_field}
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
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
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            required
          />
          <img
              src={showConfirmPassword ? eye : eyeClose}
              alt={showConfirmPassword ? 'hide password' : 'show password'}
              className={styles.password_container_icon}
              onClick={toggleConfirmPasswordVisibility}
          />
        </div>

        <button onClick={handleSubmit} className={styles.Login_btn}>
          Підтвердити
        </button>
      </div>
    </div>
  );
};
