import { Link } from "react-router-dom";


type AppLinkProps = {
    href: string;  
    children: React.ReactNode;
    className?: string; 
};


const AppLink: React.FC<AppLinkProps> = ({ href, children, className }) => {
    return (
        <Link to={href} className={className}>
            {children}
        </Link>
    );
}

export default AppLink;