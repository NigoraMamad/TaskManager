import React from "react";

type AppSpanProps = {
    children: React.ReactNode;
    className?: string;
};

const AppSpan: React.FC<AppSpanProps> = ({ children, className }) => {
    return <span className={className}>{children}</span>
};

export default AppSpan;