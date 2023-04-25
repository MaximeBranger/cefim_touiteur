import React, { useState, useContext } from 'react';
import '../styles/SendCommentForm.css';
import { useForm } from "react-hook-form";
import API from '../data/API';
import Validation from '../utilities/Validation';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../App';

import { CommentsContext } from './Comments';

const SendCommentForm = (props) => {
    const { t, i18n } = useTranslation();

    const { username, setUsername } = useContext(AppContext);

    const {register, resetField, handleSubmit} = useForm()
    const [errors, setErrors] = useState(false);
    const [success, setSuccess] = useState(false);

    const { getComments } = useContext(CommentsContext);

    const onSubmit = data => {
        setErrors(false);
        setSuccess(false);
        const validation = Validation.sendComment(data.name, data.message);
        
        if (validation === true) {
            API.sendComment(
                props.id,
                data.name, 
                data.message, 
                () => {
                    setSuccess(t('success.comment'))
                }, 
                () => {
                    setErrors(['connection', t('error.unknown')])
                }
            )
            resetField('message');
            getComments();
        } else {
            setErrors(validation);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="newCommentForm">
            <h3>{t('title.comment')}</h3>
            <label htmlFor="name">{t('username')}</label>
            <input type="text" name="name" {...register("name", {required: true})}  value={username != null ? username : ""}/>
            <label htmlFor="message">{t('message')}</label>
            <textarea name="message" {...register("message", {required: true})}>
            </textarea>
            <input type="submit" value={t('btn.send')} />
            
            {success.length > 0 && <p>{success}</p>}
            {errors.length > 0 && errors.map((e, i) => <p key={i}>{t(e[1])}</p>)}
        </form>
    );
};

export default SendCommentForm;