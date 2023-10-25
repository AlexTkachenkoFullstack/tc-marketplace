import { FC, useState } from 'react';
import styles from './NewPasswordPage.module.scss';
import eye from '../../../assets/icons/eye-open.svg';
import eyeClose from '../../../assets/icons/eye-close.svg';

export const NewPasswordPage: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleSubmit = () => {
  // логіка відправки і збереження + авторизація з новим паролем
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
