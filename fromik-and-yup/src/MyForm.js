// src/MyForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './MyForm.css';

// Create validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .oneOf(['rishiME@199'], 'Password must be "rishiME@199"')
    .required('Password is required'),
});

// Form Component
const MyForm = () => {
  return (
    <div className="form-container">
      <h2>Login Form</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form submitted with values: ', values);
        }}
      >
        {({ isValid, dirty }) => (
          <Form>
            {/* Email Field */}
            <div className="form-field">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            {/* Password Field */}
            <div className="form-field">
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>

            {/* Submit Button */}
            <div className="form-field">
              <button
                type="submit"
                disabled={!(dirty && isValid)} // Button is disabled until form is valid
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MyForm;
