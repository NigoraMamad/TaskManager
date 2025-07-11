import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppImage from '../UI/AppImage/AppImage';
import BurgerMenuPanel from '../UI/AppBurgerMenu/AppBurgerMenu';
import { useAuth } from '../../hooks/useAuth';
import './AppHeader.css';

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const handleBurgerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuOpen(e.target.checked);
  };

  return (
    <header>
      <AppImage src="/logo.svg" alt="logo" className="logo" />
      <button className="logOut" onClick={handleLogout}>
        <AppImage src="/loginbtn.svg" alt="login-button" className="login" />
      </button>
      {}
      <input
        type="checkbox"
        id="burger-checkbox"
        className="burger-checkbox"
        checked={menuOpen}
        onChange={handleBurgerChange}
        style={{ display: 'none' }}
      />
      <label className="burger" htmlFor="burger-checkbox"></label>
      {}
      <BurgerMenuPanel
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        username={userInfo?.fullName || 'User'}
        phoneNumber={userInfo?.phoneNumber || ''}
        userRole={userInfo?.role || 'User'}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default AppHeader;