import AppFormTextField from "../UI/AppFormTextField/AppFormTextField";
type FullNameProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FullName = ({value, onChange}: FullNameProps) => (
  <AppFormTextField
    label="Full Name"
    id="reddit-fullname"
    fullWidth
    value={value}
    onChange={onChange}
  />
);

export default FullName;