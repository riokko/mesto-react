import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SIGNIN, SIGNUP, MAIN } from '../utils/routes';

function Header({
    loggedIn, setLoggedIn, userProfile, setUserProfile,
}) {
    const { email } = userProfile;
    const currentLocation = useLocation();

    const { pathname } = currentLocation;
    const path = currentLocation.pathname === SIGNIN ? SIGNUP : SIGNIN;

    return (
        <header className="header">
            <div className="logo header__logo"></div>
            <div className="header__nav">
                {email && <div className="header__email">{pathname === MAIN ? email : ''}</div>}
                {loggedIn ? (
                    <Link
                        to={MAIN}
                        onClick={() => {
                            localStorage.setItem('token', '');
                            setLoggedIn(false);
                            setUserProfile('');
                        }}
                        className="authform__link"
                    >
                        Выйти
                    </Link>
                ) : (
                    <Link to={path} className="authform__link">
                        {pathname === SIGNIN ? 'Регистрация' : 'Войти'}
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;
