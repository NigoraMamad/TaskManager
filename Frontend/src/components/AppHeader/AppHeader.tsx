import './AppHeader.css';
import AppImage from '../UI/AppImage/AppImage';
import AppBurgerMenu from '../UI/AppBurgerMenu/AppBurgerMenu';

const AppHeader: React.FC = () => {
    return (
        <header>
            <AppImage src="/logo.svg" alt="logo" className='logo' />
            <AppImage src='/loginbtn.svg' alt='login-button' className='login'/>
            <AppBurgerMenu />
        </header>
    );
};

export default AppHeader;