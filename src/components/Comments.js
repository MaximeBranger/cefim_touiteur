import React, { useState, useEffect, useContext, createContext } from 'react';
import '../styles/Comments.css';
import API from '../data/API';
import DateUtil from '../utilities/DateUtil';
import SendCommentForm from './SendCommentForm';

import { TouitContext } from './Touit';
import { useTranslation } from 'react-i18next';

export const CommentsContext = createContext();

export const Comments = (props) => {
    const { t, i18n } = useTranslation();

    const { setShowComments } = useContext(TouitContext);

    const [comments, setComments] = useState([]);

    const getComments = () => {
        API.getComments(
            props.id,
            (response) => {
                setComments(response.comments)
            },
            (error) => {}
        )
    }

    useEffect(() => {
        getComments();
    }, [])

    return (
        <div className="modal" onClick={(ev) => { 
                if (ev.target.className === "modal") {
                    setShowComments(false)
                }
        }}>
           
            <div className="comments">
                <h2>{t('title.comments')}</h2>
                <button onClick={() => {setShowComments(false)}}>X</button>
                {
                    comments.map((c, i) => 
                        <div key={i} className="comment">
                            <img src={API.apiURL + "/avatar/get?username=" + c.name+ "&size=40"}/>
                            <p>
                                {c.name}
                            </p>
                            <p className="content">
                                {'"' + c.comment + '"'} 
                            </p>
                            <p className="date">
                                <DateUtil ts={c.ts} />
                            </p>
                        </div>
                    )
                }
                <CommentsContext.Provider value={{ getComments }}>
                    <SendCommentForm id={props.id}/>
                </CommentsContext.Provider>
            </div>
        </div>
    );
};
