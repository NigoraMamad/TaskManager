import React from 'react';
import AppFormTextField from '../UI/AppFormTextField/AppFormTextField';

type RegPasswordProps = {
  password: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  confirmPassword: string;
  onConfirmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}
const RegPassword = ({password, onPasswordChange, confirmPassword, onConfirmChange, error, helperText }: RegPasswordProps) => {
  // const [password, setPassword] = useState('');
  // const [confirm, setConfirm] = useState('');
  // const [error, setError] = useState('');
  // const [confirmError, setConfirmError] = useState('');

  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setPassword(value);

  //   if (value.length < 6) {
  //     setError('Password must be at least 6 characters');
  //   } else {
  //     setError('');
  //   }

  //   if (confirm && value !== confirm) {
  //     setConfirmError('Passwords do not match');
  //   } else {
  //     setConfirmError('');
  //   }
  // };

  // const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setConfirm(value);

  //   if (password !== value) {
  //     setConfirmError('Passwords do not match');
  //   } else {
  //     setConfirmError('');
  //   }
  // };

  return (
    <>
      <AppFormTextField
        label="Create password"
        type="password"
        id="reddit-password"
        fullWidth
        value={password}
        onChange={onPasswordChange}
        error={error}
        helperText={helperText}
      />
      <AppFormTextField
        label="Confirm password"
        type="password"
        id="reddit-confirm-password"
        fullWidth
        value={confirmPassword}
        onChange={onConfirmChange}
        error={error}
        helperText={helperText}
      />
    </>
  );
};

export default RegPassword;