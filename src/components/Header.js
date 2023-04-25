import React from 'react';
import '../styles/Header.css';
import { UserLogin } from './UserLogin';
import { useTranslation } from 'react-i18next';

const Header = () => {
    
    const { t, i18n } = useTranslation();

    return (
        <header>
            <h1>
                {t('app.title')}
            </h1>
            <UserLogin />
        </header>
    );
};

export default Header;