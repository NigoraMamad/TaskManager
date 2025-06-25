import AppFormTextField from "../UI/AppFormTextField/AppFormTextField";

type PhoneProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Phone = ({ value, onChange }: PhoneProps) => (
  <AppFormTextField
    label="Phone Number"
    fullWidth
    value={value}
    onChange={onChange}
  />
);

export default Phone;