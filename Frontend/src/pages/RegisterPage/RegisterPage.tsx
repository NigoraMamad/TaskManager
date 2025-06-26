import React from 'react';
import './RegisterPage.css';
import FullName from '../../components/AppForm/AppFormFullName';
import Phone from '../../components/AppForm/AppFormPhone';
import AppHeading from '../../components/UI/AppHeading/AppHeading';
import AppButton from '../../components/UI/AppButton/AppButton';
import AppImage from '../../components/UI/AppImage/AppImage';
import AppLink from '../../components/UI/AppLink/AppLink';
import { useNavigate } from 'react-router-dom';
import { confirmPasswordValidation, fullNameValidation, passwordValidation, phoneValidation } from '../../components/AppForm/Validation/AuthValidation';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../components/AppForm/Validation/ErrorMessage';
import AppFormPassword from '../../components/AppForm/AppFormPassword';

type RegistrationPropsInput = {
  fullName: string;
  phone: string;
  password: string; 
  confirmPassword: string;
};

const RegistrationPage: React.FC = () => {
    const {register, handleSubmit, formState} = useForm<RegistrationPropsInput>({
      mode: 'onChange',
    });
    const navigate = useNavigate();
      const phoneError = formState.errors['phone']?.message;
      const fullNameError = formState.errors['fullName']?.message;
      const passwordError = formState.errors['password']?.message;
      const confirmPasswordError = formState.errors['confirmPassword']?.message;
    const onSubmit = (data: RegistrationPropsInput) => {
      console.log('Registration successful!', data); 
      navigate('/', { replace: true }); 
    }

  return (
    <div className="registration-wrapper">
      <AppLink href="/" className="logo-link">
        <AppImage src="/regLogo.svg" alt="logo" className='logo' />
      </AppLink>
      <AppHeading level={1} children="Create an account" />
      <AppHeading level={3} children="Start your planning today" />
      <form className="input-form" onSubmit={handleSubmit(onSubmit)}>
        <FullName {...register('fullName', fullNameValidation)}/>
        <ErrorMessage error={fullNameError}/>
        <Phone {...register ('phone', phoneValidation)} />
        <ErrorMessage error={phoneError}/>
        <AppFormPassword
        label="Create Password"
        {...register('password', passwordValidation)}/>
        <ErrorMessage error={passwordError}/>
        <AppFormPassword
        label="Confirm Password"
        {...register('confirmPassword', confirmPasswordValidation)}/>
        <ErrorMessage error={confirmPasswordError}/> 
        <AppButton className="getStarted" type="submit" children={
        <AppHeading level={3} className="button-text" children="Log In"/>
        }/>
      </form>

      <div className="login-text">
        Already have an account? 
        <AppLink href="/login" className="login-link">
          Log In
        </AppLink>
      </div>
    </div>
  )
};

export default RegistrationPage;
