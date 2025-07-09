import React from 'react';
import styles from './RegisterPage.module.css';
import FullName from '../../components/AppForm/AppFormFullName';
import Phone from '../../components/AppForm/AppFormPhone';
import AppHeading from '../../components/UI/AppHeading/AppHeading';
import AppButton from '../../components/UI/AppButton/AppButton';
import AppImage from '../../components/UI/AppImage/AppImage';
import AppLink from '../../components/UI/AppLink/AppLink';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../components/AppForm/Validation/ErrorMessage';
import AppFormPassword from '../../components/AppForm/AppFormPassword';
import {
  fullNameValidation,
  phoneValidation,
  passwordValidation,
  confirmPasswordValidation,
} from '../../components/AppForm/Validation/AuthValidation';
import { toast } from 'react-toastify';
import type { RegistrationPropsInput } from '../../types';


const RegistrationPage: React.FC = () => {
  const { register, handleSubmit, formState, watch } = useForm<RegistrationPropsInput>({
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const phoneError = formState.errors['phoneNumber']?.message;
  const fullNameError = formState.errors['fullName']?.message;
  const passwordError = formState.errors['password']?.message;
  const confirmPasswordError = formState.errors['confirmPassword']?.message;

  const onSubmit = async (data: RegistrationPropsInput) => {
  try {
    const cleanPhone = data.phoneNumber.replace(/\D/g, ''); 
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: data.fullName,
        phoneNumber: cleanPhone, 
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
    });

    if (response.ok) {
      toast.success('New account successfully created');
      console.log("success", data);
      navigate('/main', { replace: true });
    } else {
      const error = await response.json();
      console.log(data);
      toast.error(error.message || 'Registration failed');
    }
  } catch (e) {
    toast.error('Server error');
  }
};

  return (
    <div className={styles['registration-wrapper']}>
      <AppLink href="/" className={styles['logo-link']}>
        <AppImage src="/regLogo.svg" alt="logo" className={styles.logo} />
      </AppLink>
      <AppHeading className={styles.headingOne} level={1}>Create an account</AppHeading>
      <AppHeading className={styles.headingTwo} level={3}>Start your planning today</AppHeading>
      <form className={styles["input-form"]} onSubmit={handleSubmit(onSubmit)}>
        <FullName {...register('fullName', fullNameValidation)}
          error={!!fullNameError} 
          />
        <ErrorMessage 
        error={fullNameError} 
        className={styles['error-message']}
        />
        <Phone {...register('phoneNumber', phoneValidation)}
          error={!!phoneError} />
        <ErrorMessage 
        error={phoneError} 
        className={styles['error-message']}
        />
        <AppFormPassword
          label="Create Password"
          {...register('password', passwordValidation)}
          error={!!passwordError}
        />
        <ErrorMessage 
        error={passwordError}
        className={styles['error-message']}
        />
        <AppFormPassword
          label="Confirm Password"
          {...register('confirmPassword', confirmPasswordValidation(watch))}
          error={!!confirmPasswordError}
        />
        <ErrorMessage 
        error={confirmPasswordError} 
        className={styles['error-message']}
        />
        <AppButton className={styles.getStarted} type="submit">
          <AppHeading level={3} className={styles["button-text"]}>
            Sign Up
          </AppHeading>
        </AppButton>
      </form>
      <div className={styles["login-text"]}>
        Already have an account?
        <AppLink href="/login" className={styles["login-link"]}>
          Sign up
        </AppLink>
      </div>
    </div>
  );
};

export default RegistrationPage;