import AppFormTextField from "../UI/AppFormTextField/AppFormTextField";
type FullNameProps = React.ComponentProps<typeof AppFormTextField>

const FullName: React.FC<FullNameProps> = (props) => (
  <AppFormTextField
    label="Full Name"
    id="reddit-fullname"
    fullWidth
    {...props} 
  />
);

export default FullName;