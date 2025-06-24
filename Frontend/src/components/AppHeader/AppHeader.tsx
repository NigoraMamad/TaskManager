import './AppHeader.css';
import logo from '../../../public/logo.svg';
import loginbtn from '../../../public/loginbtn.svg';
const AppHeader = () => {
    return (
        <>
            <header>
                <button><img src={logo} alt="logo"/></button>
                <button><img src={loginbtn} alt="loginbtn"/></button>
            </header>
        </>
    )
}

export default AppHeader;