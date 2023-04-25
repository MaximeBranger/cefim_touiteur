import React, { useState, useContext } from 'react';
import '../styles/SendMessageForm.css';
import { useForm } from "react-hook-form";
import API from '../data/API';
import Validation from '../utilities/Validation';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../App';
import localStorageUtil from '../utilities/LocalStorageUtil';

const SendMessageForm = () => {
    const { t, i18n } = useTranslation();

    const { username, setUsername } = useContext(AppContext);

    const {register, resetField, handleSubmit} = useForm()
    const [errors, setErrors] = useState(false);
    const [success, setSuccess] = useState(false);

    const onSubmit = data => {
        setErrors(false);
        setSuccess(false);
        const validation = Validation.sendTouit(data.name, data.message);

        if (!validation) {
            setErrors(validation);
        } else if (username === null) {
            API.sendTouit(
                data.name, 
                data.message, 
                () => {
                    setSuccess(t('success.touit'))
                }, 
                () => {
                    setErrors(['connection', t('error.unknown')])
                }
            )
            resetField('message')
        } else {
            API.sendTouitAuth(
                localStorageUtil.getItem('token'), 
                data.message, 
                () => {
                    setSuccess(t('success.touit'))
                }, 
                () => {
                    setErrors(['connection', t('error.unknown')])
                }
            )
            resetField('message')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="newTouitForm">
            
            <h2>{t('title.touit')}</h2>
            <label htmlFor="name">{t('username')}</label>

            <input type="text" name="name" {...register("name", {required: true, value: username})} />

            
            <label htmlFor="message">{t('message')}</label>
            <textarea name="message" {...register("message", {required: true})}>
            </textarea>
            <input type="submit" value={t('btn.send')} />

            {success.length > 0 && <p>{success}</p>}
            {errors.length > 0 && errors.map((e, i) => <p key={i}>{t(e[1])}</p>)}
        </form>
    );
};

export default SendMessageForm;