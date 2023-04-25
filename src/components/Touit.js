import React, { useState, useEffect, createContext } from 'react';
import '../styles/Touit.css';
import DateUtil from '../utilities/DateUtil';
import LocalStorageUtil from '../utilities/LocalStorageUtil';
import API from '../data/API';
import { Comments } from './Comments';
import { Reactions } from './Reactions';
import { useTranslation } from 'react-i18next';

export const TouitContext = createContext();

export const Touit = (props) => {
    const { t, i18n } = useTranslation();

    const [likes, setLikes] = useState(props.likes);
    const [reactions, setReactions] = useState(props.reactions);
    const [comments_count, setCommentsCount] = useState(props.comments_count);
    const [showComments, setShowComments] = useState(false);
    const [showReactions, setShowReactions] = useState(false);
    
    const [isLiked, setLiked] = useState(LocalStorageUtil.isStoredInList('like', props.id));


    const updateTouit = () => {
        API.getOneTouit(
            props.id,
            (result) => {
                setLikes(result.data.likes);
                setReactions(result.data.reactions);
                setCommentsCount(result.data.comments_count)
            }, 
            (error) => {
            }
        )
    }

    const updateLike = () => {
        if (!isLiked) {
            API.addLike(
                props.id,
                (response) => {
                    LocalStorageUtil.addItemToList('like', props.id);
                    setLiked(!isLiked);
                    updateTouit();
                },
                (error) => {
    
                }
            )
        } else {
            API.removeLike(
                props.id,
                (response) => {
                    LocalStorageUtil.removeItemFromList('like', props.id);
                    setLiked(!isLiked);
                    updateTouit();
                },
                (error) => {
    
                }
            )
        }
    }

    useEffect(() => {
        updateTouit();
    }, [showComments, showReactions])

    return (
        <article className="touit">
            <p className="message">
                    {'"' + props.message + '"'} 
            </p>
            
            <p className={"name " + (props.is_user_authenticated && "logged")}>
                <img src={API.apiURL + "/avatar/get?username=" + props.name+ "&size=50"}/>
                {props.name}
            </p>
            
            <p className="date">
                <DateUtil ts={props.ts}/>
            </p>

            <p className="likes">
                {!isLiked && <svg onClick={updateLike} viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg"><path d="M422.24 104.72c-25.762 0-50.961 8.398-72.238 25.199-20.719-16.801-46.48-25.199-72.238-25.199-29.68 0-59.359 11.199-81.762 33.602-42 42-44.801 107.52-8.96 152.88 2.8 3.36 5.6 7.281 8.96 10.641l154 136.64 153.44-137.2c3.36-3.36 6.16-6.719 8.96-10.641 16.239-20.719 24.642-45.922 24.642-71.121 0-29.68-11.2-59.359-33.602-81.762-22.402-21.836-52.082-33.598-81.203-33.039zm77.281 176.4c-2.238 2.8-4.48 5.602-7.281 8.398L350 416.078l-142.24-126.56c-2.801-2.8-5.04-5.601-7.281-8.398-30.801-39.199-27.441-95.762 7.84-131.04 18.48-18.48 43.68-29.121 70-29.121 22.397 0 44.237 7.84 61.601 21.281 2.801 2.238 6.72 3.922 10.641 3.922s7.282-1.121 10.641-3.922c17.36-14 39.2-21.281 61.602-21.281 26.32 0 50.961 10.078 70 29.121 18.48 18.48 29.121 43.68 29.121 70-1.125 21.84-8.406 43.68-22.406 61.039z"/></svg>}
                {isLiked && <svg onClick={updateLike} viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg"><path d="M422.24 104.72c-25.762 0-50.961 8.398-72.238 25.199-20.719-16.801-46.48-25.199-72.238-25.199-29.68 0-59.359 11.199-81.762 33.602-42 42-44.801 107.52-8.96 152.88 2.8 3.36 5.6 7.281 8.96 10.641l154 136.64 153.44-137.2c3.36-3.36 6.16-6.719 8.96-10.641 16.239-20.719 24.642-45.922 24.642-71.121 0-29.68-11.2-59.359-33.602-81.762-22.402-21.836-52.082-33.598-81.203-33.039z"/></svg> }
                {likes}
            </p>
            
            <p className="reactions">
                {Object.keys(reactions).map(r => r)}
            </p>

            <p className="comments">
                <button onClick={() => setShowReactions(!showReactions)} className="reaction-button">
                {t('btn.react')}
                </button>
                <button onClick={() => setShowComments(!showComments)} className="comment-button">
                    <svg viewBox="0 0 700 530" xmlns="http://www.w3.org/2000/svg"><path d="M568.46 404.84c33.789-38.484 51.582-83.949 51.582-132.08 0-60.633-28.555-117.42-80.406-159.9-50.816-41.625-118.16-64.543-189.63-64.543s-138.82 22.926-189.63 64.547c-51.852 42.477-80.41 99.258-80.41 159.9s28.555 117.42 80.406 159.9c50.816 41.621 118.16 64.543 189.63 64.543 37.621 0 73.898-6.262 107.96-18.617 39.09 20.023 83.816 31.434 129.9 33.078.219.004.43.012.64.012a17.929 17.929 0 0 0 15.012-27.723c-15.75-24.145-27.52-50.723-35.06-79.117zm-100.61 38.406a17.948 17.948 0 0 0-8.645-2.223c-2.222 0-4.456.41-6.578 1.25-32.102 12.656-66.633 19.078-102.63 19.078-129.12 0-234.18-84.602-234.18-188.59s105.05-188.59 234.18-188.59 234.18 84.602 234.18 188.59c0 41.84-16.738 81.496-48.406 114.69a17.93 17.93 0 0 0-4.496 16.406c5.567 24.113 13.801 47.16 24.57 68.852-31.418-4.808-61.37-14.797-88-29.46zm34.395-170.48c0 9.902-8.027 17.926-17.926 17.926h-17.051c-9.902 0-17.926-8.027-17.926-17.926 0-9.902 8.027-17.926 17.926-17.926h17.051c9.902 0 17.926 8.027 17.926 17.926zm-251.58 0c0 9.902-8.027 17.926-17.926 17.926h-17.051c-9.902 0-17.926-8.027-17.926-17.926 0-9.902 8.027-17.926 17.926-17.926h17.051c9.895 0 17.926 8.027 17.926 17.926zm125.79 0c0 9.902-8.027 17.926-17.926 17.926h-17.051c-9.902 0-17.926-8.027-17.926-17.926 0-9.902 8.027-17.926 17.926-17.926h17.051c9.902 0 17.926 8.027 17.926 17.926z"/></svg>
                    {comments_count}
                </button>
                
            </p>

            <TouitContext.Provider value={{ setShowReactions }}>
                { showReactions && <Reactions id={props.id} /> }
            </TouitContext.Provider>

            <TouitContext.Provider value={{ setShowComments }}>
                { showComments && <Comments id={props.id} /> }
            </TouitContext.Provider>
        </article>
    );
};