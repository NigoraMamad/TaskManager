import './AppHeader.css';
import AppImage from '../UI/AppImage/AppImage';
import AppBurgerMenu from '../UI/AppBurgerMenu/AppBurgerMenu';
import { Link } from 'react-router-dom';


const AppHeader: React.FC = () => {
    return (
        <header>
            <AppImage src="/logo.svg" alt="logo" className='logo' />
            <Link to="/register">
            <AppImage src='/loginbtn.svg' alt='login-button' className='login'/>
            </Link>
            <AppBurgerMenu />
        </header>
    );
};

export default AppHeader;