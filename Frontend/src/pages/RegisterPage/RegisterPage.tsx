import React, { useState } from 'react';
import './RegisterPage.css';
import FullName from '../../components/AppForm/AppFormFullName';
import Phone from '../../components/AppForm/AppFormPhone';
import RegPassword from '../../components/AppForm/AppFormRegPassword';
import AppHeading from '../../components/UI/AppHeading/AppHeading';
import AppButton from '../../components/UI/AppButton/AppButton';
import AppImage from '../../components/UI/AppImage/AppImage';
import AppLink from '../../components/UI/AppLink/AppLink';


const RegistrationPage: React.FC = () => {
    const [value, setValue] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="registration-wrapper">
      <AppLink href="/" className="logo-link">
            <AppImage src="/regLogo.svg" alt="logo" className='logo' />
      </AppLink>
      <AppHeading level={1} children="Create an account" />
      <AppHeading level={3} children="Start your planning today" />
      <form className="input-form">
        <FullName value={value} onChange={e=> setValue(e.target.value)}/>
        <Phone value={phone} onChange={e => setPhone(e.target.value)} />
        <RegPassword
              password={password}
              confirmPassword={confirmPassword}
              onPasswordChange={e => setPassword(e.target.value)}
              onConfirmChange={e => setConfirmPassword(e.target.value)}
              />    
        <AppButton className="getStarted" type="submit" children={
        <AppHeading level={3} className="button-text" children="Log In"/>
        }/>
      </form>

      <p>
        Already have an account? 
        <AppLink href="/login" className="login-link">
          Log In
        </AppLink>
      </p>
    </div>
  )
};

export default RegistrationPage;
