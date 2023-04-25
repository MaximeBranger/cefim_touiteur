import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import '../styles/UserRegister.css';
import API from '../data/API';
import Validation from '../utilities/Validation';
import { useTranslation } from 'react-i18next';

import { UserLoginContext } from './UserLogin';


export const UserRegister = (props) => {
    const { t, i18n } = useTranslation();

    const {register, handleSubmit} = useForm()
    const [errors, setErrors] = useState(false);

    const { setShowRegister } = useContext(UserLoginContext);

    const onSubmit = data => {
        setErrors(false);
        const validation = Validation.userRegister(data.username, data.password, data.password_confirmation);

        if (validation === true) {
            API.userCreate(
                data.username,
                data.password,
                () => {
                    setShowRegister(false);
                }, 
                () => {
                    setErrors(['connection', t('error.unknown')]);
                }
            )
        } else {
            setErrors(validation);
        }
    }

    return (
        <div className="modal" onClick={(ev) => { 
                if (ev.target.className === "modal") {
                    setShowRegister(false)
                }
            }}
        >
            <div className="register">
                <h2>{t('title.register')}</h2>
                <button onClick={() => {setShowRegister(false)}}>X</button>
                <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                    <label htmlFor="username">{t('username')}</label>
                    <input type="text" name="username" {...register("username", {required: true})} />
                    <label htmlFor="password">{t('password')}</label>
                    <input type="password" name="password_confirmation" {...register("password", {required: true})} />
                    <label htmlFor="password">{t('password_confirmation')}</label>
                    <input type="password" name="password_confirmation" {...register("password_confirmation", {required: true})} />
                    <input type="submit" value="S'inscrire"/>

                    {errors.length > 0 && errors.map((e, i) => <p key={i}>{t(e[1])}</p>)}
                </form>
            </div>
        </div>
    );
};
