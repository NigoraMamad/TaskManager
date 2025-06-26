import AppFormTextField from "../UI/AppFormTextField/AppFormTextField";
import React from "react";

type PhoneProps = React.ComponentProps<typeof AppFormTextField>;

const Phone: React.FC<PhoneProps> = (props) => (
  <AppFormTextField
    label="Phone Number"
    fullWidth
    {...props}
  />
);

export default Phone;