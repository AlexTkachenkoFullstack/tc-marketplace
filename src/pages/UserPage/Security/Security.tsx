import React from 'react';
// import { Formik, ErrorMessage, Field } from 'formik';
// import * as Yup from 'yup';
import styles from './Security.module.scss';
// import { Form } from 'react-router-dom';

const Security: React.FC = () => {
  // const validationSchema = Yup.object({
  //   waterIntake: Yup.number().required('Required'),
  // });
  // const handleSubmit = (values, { resetForm }) => {
  //   const { waterIntake } = values;

  //   resetForm();
  // };
  return (
    <div className={styles.container}>
      <h3>Зміна паролю</h3>
      {/* <Formik
        initialValues={{ waterIntake: '' }}
        validationSchema={validationSchema}
        // onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <label
              htmlFor="waterIntake"
              // $showIcon={}
              // errors.waterIntake && touched.waterIntake ? 'block' : 'none'
              // }
            >
              Введіть поточний пароль
            </label>
            <Field
              autoFocus
              name="waterIntake"
              type="password"
              min={4}
              max={8}
              placeholder="Введіть пароль"
              // borderstyle={
              //   errors.waterIntake && touched.waterIntake ? '1px solid red' : ''
              // }
            />

            <ErrorMessage name="waterIntake">
              {msg => <div>{msg}</div>}
            </ErrorMessage>
            <button type="submit">Confirm</button>
          </Form>
        )}
      </Formik> */}
    </div>
  );
};

export default Security;
