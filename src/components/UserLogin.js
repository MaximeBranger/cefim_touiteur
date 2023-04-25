import React, { useState, useEffect, createContext, useContext } from 'react';
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import API from '../data/API';
import '../styles/UserLogin.css';
import { UserRegister } from './UserRegister';
import localStorageUtil from '../utilities/LocalStorageUtil';
import { AppContext } from '../App';

export const UserLoginContext = createContext();

export const UserLogin = () => {

    const {register, handleSubmit} = useForm()
    const { t, i18n } = useTranslation();

    const { username, setUsername } = useContext(AppContext);

    const [errors, setErrors] = useState(false);
    // const [username, setUsername] = useState(null);
    const [showRegister, setShowRegister] = useState(false);

    const onSubmit = data => {
        API.userLogin(
            data.username,
            data.password,
            (response) => {
                if (Object.keys(response).includes('error')) {
                    setErrors([['login', response.error]]);
                } else {
                    localStorageUtil.addItem('token', response.access_token);
                    setUsername(data.username);
                }
            },
            () => {
                setErrors([['connection', 'Une erreur est survenue.']]);
            }
        )
    }

    const getUserLoginUsingToken = () => {
        if (localStorageUtil.isKeyExists('token')) {
            API.getUserInformation(
                localStorageUtil.getItem('token'),
                (response) => {
                    if (Object.keys(response).includes('msg')) {
                        setErrors([['login', response.msg]]);
                        setUsername(null);
                        localStorageUtil.removeItem('token');
                    } else {
                        setUsername(response.logged_in_as.name);
                    }
                },
                () => {
                    setErrors([['connection', 'Une erreur est survenue.']]);
                }
            )
        }
    }

    const disconnectUser = () => {
        setUsername(null);
        localStorageUtil.removeItem('token');
    }

    useEffect(() => {
       getUserLoginUsingToken();
    }, [])

    if (username != null) {
        return (
            <div className="userLoginWelcome">
                <p>Vous êtes connecté en tant que</p> 
                <p className="username">{username}</p>
                <button onClick={disconnectUser}>Se déconnecter</button>
            </div>
        );
    } else {
        return (
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="userLoginForm">
                    <fieldset>
                        <label htmlFor="username">{t('username')}</label>
                        <input type="text" name="username" {...register("username", {required: true})} />
                    </fieldset>
                    
                    <fieldset>
                        <label htmlFor="password">{t('password')}</label>
                        <input type="password" name="password" {...register("password", {required: true})} />
                    </fieldset>

                    <button type="button" onClick={() => setShowRegister(true)}>{t('btn.register')}</button>
                    <input type="submit" value={t('btn.connect')}/>

                    {errors.length > 0 && errors.map((e, i) => <p key={i}>{t(e[1])}</p>)}
                </form>

                <UserLoginContext.Provider value={{ setShowRegister }}>
                    { showRegister && <UserRegister /> }
                </UserLoginContext.Provider>
            </div>

        );
    }

};