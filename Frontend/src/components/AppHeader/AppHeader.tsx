import { useNavigate } from 'react-router-dom';
import AppImage from '../UI/AppImage/AppImage';
import AppBurgerMenu from '../UI/AppBurgerMenu/AppBurgerMenu';
import './AppHeader.css';

const AppHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // ❌ удаляем токен
    navigate('/login');                     // 🔁 редирект на login
  };

  return (
    <header>
      <AppImage src="/logo.svg" alt="logo" className="logo" />
      <button className="logOut" onClick={handleLogout}>
        <AppImage src="/loginbtn.svg" alt="login-button" className="login" />
      </button>
      <AppBurgerMenu />
    </header>
  );
};

export default AppHeader;
