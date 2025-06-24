import './AppHeader.css';
import logo from '/logo.svg';
import loginbtn from '/loginbtn.svg';

const AppHeader = () => {
    return (
        <header>
            <button><img src={logo} alt="logo" /></button>
            <button className='login'><img src={loginbtn} alt="loginbtn" /></button>
            <input type="checkbox" id="burger-checkbox" className="burger-checkbox" />
            <label className="burger" htmlFor="burger-checkbox"></label>
        </header>
    );
};

export default AppHeader;