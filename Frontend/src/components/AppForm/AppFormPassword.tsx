import AppFormTextField from '../UI/AppFormTextField/AppFormTextField';

type PasswordProps = React.ComponentProps<typeof AppFormTextField>;

const AppFormPassword: React.FC<PasswordProps> = (props) => (
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
 
      <AppFormTextField
        type="password"
        fullWidth
        {...props} 
      />   
);

export default AppFormPassword;