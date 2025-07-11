import React from 'react';
import AppImage from '../AppImage/AppImage';
import './AppBurgerMenu.css';

type BurgerMenuPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  phoneNumber: string;
  userRole: string;
  onLogout: () => void;
};

const BurgerMenuPanel: React.FC<BurgerMenuPanelProps> = ({
  isOpen,
  onClose,
  username,
  phoneNumber,
  userRole,
  onLogout,
}) => {
  if (!isOpen) return null;

  return (
    <div className="burger-menu-panel">
        <div className='burger-menu-panel-wrapper'>
            <div className='header-btn'>
                <AppImage src="/logo.svg" alt="logo" className="logo" />
                <button onClick={onClose} className="close-btn">×</button>
            </div>
        <div className="user-info">
            <h2>{username} <span className="role">{userRole}</span></h2>
            <p>{phoneNumber}</p>
        </div>
        <button onClick={onLogout} className="logout-btn">
            <AppImage src="/loginbtn.svg" alt="logout" className="logout-icon" />
            <p>Log Out</p>
            </button> 
        </div>
    </div>
  );
};

export default BurgerMenuPanel;