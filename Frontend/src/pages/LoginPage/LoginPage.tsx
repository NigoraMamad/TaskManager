import React from 'react';
import './LoginPage.css';
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
      const response = await fetch('http://localhost:8080/api/auth/login', {
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
        navigate('/');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Login failed');
      }
    } catch (e) {
      toast.error('Server error');
    }
  };
  
    return (
    <div className="registration-wrapper">
      <AppLink href="/" className="logo-link">
        <AppImage src="/regLogo.svg" alt="logo" className='logo' />
      </AppLink>
      <AppHeading level={1} children="Log in to your account" />
      <AppHeading level={3} children="Welcome back! Please enter your details." />
      <form className="input-form" onSubmit={handleSubmit(onSubmit)}>
        <Phone {...register ('phoneNumber', phoneValidation)} />
        <ErrorMessage error={phoneError}/>
        <AppFormPassword
        label="Password"
        {...register ('password', passwordValidation)}/>
        <ErrorMessage error={passwordError}/>
        <AppButton className="getStarted" type="submit" children={
          <AppHeading level={3} className="button-text" children="Log In"/>
          }/>
      </form>
    <div className="login-text">
      Already have an account? 
      <AppLink href="/register" className="login-link">
        Sign Up
      </AppLink>
    </div>
  </div>
);
};

export default LoginPage;
