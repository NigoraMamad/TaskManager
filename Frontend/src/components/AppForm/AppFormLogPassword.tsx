import AppFormTextField from '../UI/AppFormTextField/AppFormTextField';

type LogPasswordProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}
const LogPassword = ({value, onChange, error, helperText}: LogPasswordProps) => {
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setPassword(value);

  //   if (value.length < 6) {
  //     setError('Password must be at least 6 characters');
  //   } else {
  //     setError('');
  //   }
  // };

  return (   
      <AppFormTextField
        label="Password"
        type="password"
        id="reddit-password"
        fullWidth
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
      />   
  );
};

export default LogPassword;