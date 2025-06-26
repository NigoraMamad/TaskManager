import React from "react";

type Props = {
  error?: string;
  className?: string;
};

const ErrorMessage: React.FC<Props> = ({ error, className = "error-message" }) => {
  if (!error) return null;
  return <span className={className}>{error}</span>;
};

export default ErrorMessage;