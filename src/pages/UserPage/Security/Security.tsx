import React, { useEffect, useState } from 'react';
import { Formik, ErrorMessage, Field, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';
import styles from './Security.module.scss';
// import { ShowToast } from 'components/Notification/ShowToast';
import { ReactComponent as EyeCloseIcon } from '../../../assets/icons/eye-close.svg';
import { ReactComponent as EyeOpenIcon } from '../../../assets/icons/eye-open.svg';
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo } from 'services/services';
import { changeUserPassword } from 'redux/profile/operations';
import { useAppDispatch } from 'redux/hooks';

interface IPasswordForm {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

let userEmail: string = '';

const Security: React.FC = () => {
  const [isShowPassword, setIsShowPassword] = useState({
    oldPassword: false,
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .matches(
        /^[a-zA-Z0-9]+$/,
        'Пароль повинен містити лише англійські літери та цифри',
      )
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)/,
        'Пароль повинен містити хоча б одну англійську літеру та одну цифру',
      )
      .min(8, 'Пароль має бути від 8 до 50 символів')
      .max(50, 'Пароль має бути від 8 до 50 символів')
      .required("Обов'язкове поле"),
    password: Yup.string()
      .matches(
        /^[a-zA-Z0-9]+$/,
        'Пароль повинен містити лише англійські літери та цифри',
      )
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)/,
        'Пароль повинен містити хоча б одну англійську літеру та одну цифру',
      )
      .min(8, 'Пароль має бути від 8 до 50 символів')
      .max(50, 'Пароль має бути від 8 до 50 символів')
      .notOneOf(
        [Yup.ref('oldPassword')],
        'Новий пароль повинен відрізнятися від поточного',
      )
      .required("Обов'язкове поле"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Паролі не співпадають!')
      .required("Обов'язкове поле"),
  });

  const handleSubmit = (
    values: IPasswordForm,
    { resetForm }: FormikHelpers<IPasswordForm>,
  ) => {
    dispatch(changeUserPassword({ ...values, email: userEmail }));

    resetForm();
  };

  const handleRecoverPassword = () => {
    navigate('/login/recover', { state: userEmail });
  };

  const handleShowPassword = (key: string) => {
    setIsShowPassword(prev => ({
      ...prev,
      [key]: !prev[key as keyof IPasswordForm],
    }));
  };

  const isRedEye = (errors: any, touched: any, key: string) => {
    return errors[key] && touched[key] ? `${styles.eyeIconStyle}` : '';
  };

  useEffect(() => {
    (async () => {
      const data = await fetchUserInfo();
      userEmail = data?.email;
    })();
  }, []);
  
  return (
    <div className={styles.container}>
      <div className={styles.titleThumb}>
        <h3>Зміна паролю</h3>
        <button
          type="button"
          onClick={handleRecoverPassword}
          
        >
          Забули пароль?
        </button>
      </div>

      <Formik
        initialValues={{
          oldPassword: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldTouched }) => (
          <Form className={styles.form}>
            <label htmlFor="oldPassword">
              <span>Введіть поточний пароль</span>
              <div className={styles.fieldThumb}>
                <Field
                  name="oldPassword"
                  type={isShowPassword.oldPassword ? 'text' : 'password'}
                  placeholder="Поточний пароль"
                  style={
                    errors.oldPassword && touched.oldPassword
                      ? { border: '1px solid red' }
                      : {}
                  }
                  className={styles.inputField}
                  onFocus={() => setFieldTouched('oldPassword', false, false)}
                />
                <div
                  onClick={() => handleShowPassword('oldPassword')}
                  className={styles.eyeThumb}
                >
                  {isShowPassword.oldPassword ? (
                    <EyeOpenIcon
                      className={isRedEye(errors, touched, 'oldPassword')}
                    />
                  ) : (
                    <EyeCloseIcon
                      className={isRedEye(errors, touched, 'oldPassword')}
                    />
                  )}
                </div>
                <ErrorMessage name="oldPassword">
                  {msg => <div className={styles.errorMessage}>{msg}</div>}
                </ErrorMessage>
              </div>
            </label>

            <label htmlFor="password">
              <span>Введіть новий пароль</span>
              <div className={styles.fieldThumb}>
                <Field
                  name="password"
                  type={isShowPassword.password ? 'text' : 'password'}
                  placeholder="Новий пароль"
                  style={
                    errors.password && touched.password
                      ? { border: '1px solid red' }
                      : {}
                  }
                  className={styles.inputField}
                  onFocus={() => setFieldTouched('password', false, false)}
                />
                <div
                  onClick={() => handleShowPassword('password')}
                  className={styles.eyeThumb}
                >
                  {isShowPassword.password ? (
                    <EyeOpenIcon
                      className={isRedEye(errors, touched, 'password')}
                    />
                  ) : (
                    <EyeCloseIcon
                      className={isRedEye(errors, touched, 'password')}
                    />
                  )}
                </div>
                <ErrorMessage name="password">
                  {msg => <div className={styles.errorMessage}>{msg}</div>}
                </ErrorMessage>
              </div>
            </label>

            <label htmlFor="confirmPassword">
              <span>Повторіть новий пароль</span>
              <div className={styles.fieldThumb}>
                <Field
                  name="confirmPassword"
                  type={isShowPassword.confirmPassword ? 'text' : 'password'}
                  placeholder="Новий пароль"
                  style={
                    errors.confirmPassword && touched.confirmPassword
                      ? { border: '1px solid red' }
                      : {}
                  }
                  className={styles.inputField}
                  onFocus={() =>
                    setFieldTouched('confirmPassword', false, false)
                  }
                />
                <div
                  onClick={() => handleShowPassword('confirmPassword')}
                  className={styles.eyeThumb}
                >
                  {isShowPassword.confirmPassword ? (
                    <EyeOpenIcon
                      className={isRedEye(errors, touched, 'confirmPassword')}
                    />
                  ) : (
                    <EyeCloseIcon
                      className={isRedEye(errors, touched, 'confirmPassword')}
                    />
                  )}
                </div>
                <ErrorMessage name="confirmPassword">
                  {msg => <div className={styles.errorMessage}>{msg}</div>}
                </ErrorMessage>
              </div>
            </label>
            <button type="submit" className={styles.submitBtn}>
              Зберегти
            </button>
          </Form>
        )}
      </Formik>

      {/* <>
        {ShowToast({
          label: 'sdfsfhsfghfhfghfghddddddddddddddddddd',
          timer: 4500,
          backgroundColor: '#f1a9a9b7',
          color: '#ff3838',
          borderColor: '#ff3838',
        })}
      </> */}
    </div>
  );
};

export default Security;
