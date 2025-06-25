import React, { useState } from 'react';
import './LoginPage.css';
import Phone from '../../components/AppForm/AppFormPhone';
import LogPassword from '../../components/AppForm/AppFormLogPassword';
import AppHeading from '../../components/UI/AppHeading/AppHeading';
import AppImage from '../../components/UI/AppImage/AppImage';
import AppButton from '../../components/UI/AppButton/AppButton';
import AppLink from '../../components/UI/AppLink/AppLink';


const LoginPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  

    return (
    <div className="registration-wrapper">
      <AppLink href="/" className="logo-link">
        <AppImage src="/regLogo.svg" alt="logo" className='logo' />
      </AppLink>
      <AppHeading level={1} children="Log in to your account" />
      <AppHeading level={3} children="Welcome back! Please enter your details." />
      <form className="input-form">
        <Phone value={phone} onChange={e => setPhone(e.target.value)} />
        <LogPassword value={password} onChange={e => setPassword(e.target.value)}/>
        <AppButton className="getStarted" type="submit" children={
          <AppHeading level={3} className="button-text" children="Log In"/>
          }/>
      </form>
    <p>
      Already have an account? 
      <AppLink href="/register" className="login-link">
        Sign Up
      </AppLink>
    </p>
  </div>
);
};

export default LoginPage;
