import React from "react";

type AppButtonProps = {
    children: React.ReactNode;
    className: string;
    type: "button" | "submit" | "reset";
};

const AppButton: React.FC<AppButtonProps> = ({ children, className, type }) => {
    return (
        <button type={type} className={`app-button ${className}`}>
            {children}
        </button>
    );
};

export default AppButton;