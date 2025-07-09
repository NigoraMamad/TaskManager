import React from 'react';
import Phone from '../../components/AppForm/AppFormPhone';
import AppHeading from '../../components/UI/AppHeading/AppHeading';
import AppImage from '../../components/UI/AppImage/AppImage';
import AppButton from '../../components/UI/AppButton/AppButton';
import AppLink from '../../components/UI/AppLink/AppLink';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { phoneValidation, passwordValidation } from '../../components/AppForm/Validation/AuthValidation';
import  ErrorMessage  from '../../components/AppForm/Validation/ErrorMessage';
import AppFormPassword from '../../components/AppForm/AppFormPassword';
import { toast } from 'react-toastify';
import type { LoginPropsInput } from '../../types';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const {register, handleSubmit, formState} = useForm<LoginPropsInput>({
    mode: 'onChange',
  });
  const phoneError = formState.errors['phoneNumber']?.message;
  const passwordError = formState.errors['password']?.message;
  

  const onSubmit = async (data: LoginPropsInput) => {
    try {
      const cleanPhone = data.phoneNumber.replace(/\D/g, '');
      const response = await fetch('https://78bcd138945f.ngrok-free.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: cleanPhone,
          password: data.password,
        }),
      });

      if (response.ok) {
        const tokens = await response.json();
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        console.log("Login successful", tokens);
        toast.success('Login successful!');
        navigate('/main');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Login failed');
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
    <AppHeading className={styles.headingOne}level={1} children="Log in to your account" />
    <AppHeading className={styles.headingTwo} level={3} children="Welcome back! Please enter your details." />
    <form className={styles['input-form']} onSubmit={handleSubmit(onSubmit)}>
      <Phone {...register('phoneNumber', phoneValidation)}
      className={styles.phoneInput} 
      />
      <ErrorMessage 
      error={phoneError} 
      className={styles['error-message']}
      />
      <AppFormPassword
        label="Password"
        {...register('password', passwordValidation)}
        className={styles.passwordInput}
      />
      <ErrorMessage 
      error={passwordError} 
      className={styles['error-message']}
      />
      <AppButton className={styles.getStarted} type="submit" children={
        <AppHeading level={3} className={styles['button-text']} children="Log In"/>
      }/>
    </form>
    <div className={styles['login-text']}>
      Already have an account? 
      <AppLink href="/register" className={styles['login-link']}>
        Sign Up
      </AppLink>
    </div>
  </div>
);
};

export default LoginPage;
