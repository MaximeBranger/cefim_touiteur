import React, { useState, useContext } from 'react';
import '../styles/Reactions.css';
import API from '../data/API';
import { useReactions } from '../utilities/useReactions';
import Validation from '../utilities/Validation';
import { useTranslation } from 'react-i18next';

import { TouitContext } from './Touit';


export const Reactions = (props) => {
    const { t, i18n } = useTranslation();

    const { setShowReactions } = useContext(TouitContext);

    const reactionList =  useReactions();
    const [errors, setErrors] = useState(false);

    const setReaction = (ev) => {
        setErrors(false);
        const validation = Validation.sendReaction(ev.target.textContent, reactionList);

        if (validation === true) {
            API.addReaction(
                props.id,
                ev.target.textContent,
                (response) => {
                    setShowReactions(false);
                },
                (error) => {
                    setErrors(['error', error]);
                }
            );
        } else {
            setErrors(validation);
        }
    }

    // useEffect(() => {
        

    // }, [])

    return (
        <div className="modal" onClick={(ev) => { 
                if (ev.target.className === "modal") {
                    setShowReactions(false)
                }
            }}
        >
            <div className="reactions">
                <h2>{t('title.reactions')}</h2>
                <button onClick={() => {setShowReactions(false)}}>X</button>
                <p className='reactions-list'>
                    { 
                        reactionList.length > 0 && reactionList.map(r => 
                        <button key={r} onClick={setReaction}>
                            {r}
                        </button>
                        ) 
                    }
                </p>
                {errors.length > 0 && errors.map((e, i) => <p key={i}>{t(e[1])}</p>)}
            </div>
        </div>
    );
};
