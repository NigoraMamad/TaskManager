export const phoneValidation = {
  required: 'Phone is required',
  pattern: {
    value: /^\(\d{3}\) \d{3}-\d{2}-\d{2}$/,
    message: 'Enter phone number format should be (000) 000-00-00, and 10 digits.',
  },
};

export const passwordValidation = {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters',
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number. examle Winter123',
  },
};

export const fullNameValidation = {
  required: 'Full Name is required', 
  maxLength: {
    value: 30,
    message: 'Name must be under 30 characters',
  },
  pattern: {
    value: /^[a-zA-Zа-яА-ЯёЁ\s]+$/, 
    message: 'Name cannot include special symbols',
  }
};

export const confirmPasswordValidation = (watch: (name: string) => string) => ({
  required: 'Confirm password is required',
  validate: (value: string) =>
    value === watch('password') || 'Confirm password must exactly match the created password.',
});