export const phoneValidation = {
  required: 'Phone is required',
};

export const passwordValidation = {
  required: 'Password is required',
  minLength: {
    value: 6,
    message: 'Password must be at least 6 characters',
  },
};

export const fullNameValidation = {
  required: 'Full Name is required', 
};

export const confirmPasswordValidation =  {
  validate: (value: string, { password }: { password: string }) => {
    if (value !== password) {
      return 'Passwords do not match';
    }
    return true;
  },
};