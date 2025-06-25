import React from "react";

type AppImageProps = {
    src: string;
    alt: string;
    className?: string;
};

const AppImage: React.FC<AppImageProps> = ({ src, alt, className }) => {
    return <img src={src} alt={alt} className={className} />;
}

export default AppImage;