import './AppHeader.css';
import AppImage from '../UI/AppImage/AppImage';
import AppBurgerMenu from '../UI/AppBurgerMenu/AppBurgerMenu';
import AppLink from '../UI/AppLink/AppLink';

const AppHeader: React.FC = () => {
    return (
        <header>
            <AppImage src="/logo.svg" alt="logo" className='logo' />
            <AppLink href="/login" className='logOut'>
            <AppImage src='/loginbtn.svg' alt='login-button' className='login'/>
            </AppLink>
            <AppBurgerMenu />
        </header>
    );
};

export default AppHeader;