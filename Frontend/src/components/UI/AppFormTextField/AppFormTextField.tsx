import { styled, alpha } from '@mui/material/styles';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import type { OutlinedInputProps } from '@mui/material/OutlinedInput';


const RedditTextField = styled((props: TextFieldProps) => (
  <TextField
    variant="filled"
    slotProps={{
      input: { disableUnderline: true } as Partial<OutlinedInputProps>,
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: 4,
    border: '1px solid',
    backgroundColor: '#F3F6F9',
    borderColor: '#E0E3E7',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: '#5847F1', // ваш цвет при наведении
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `${alpha('#5847F1', 0.25)} 0 0 0 2px`, // ваш цвет
      borderColor: '#5847F1', // ваш цвет при фокусе
    },
    ...(theme.applyStyles ? theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
      borderColor: '#2D3843',
    }) : {}),
  },
  '& label.Mui-focused': {
    color: '#5847F1', // цвет label при фокусе
  },
}));


export default RedditTextField;