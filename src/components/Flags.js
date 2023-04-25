import React, { useState, useContext, useEffect } from 'react';
import '../styles/Flags.css';
import { AppContext } from '../App';

const Flags = () => {
    const { lang, changeLang } = useContext(AppContext);

    const [langState, setLangState] = useState(lang);

    useEffect(() => {
        changeLang(langState);
     }, [langState])

    return (
        <div className="flags">
            { langState !== 'fr' &&
                <button onClick={() => {setLangState('fr')}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 3020 2020"><path fill="#002494" d="M0 0h1010v2000H0z"/><path fill="#F7F7F7" d="M1000 0h1010v2000H1000z"/><path fill="#ED2938" d="M2000 0h1000v2000H2000z"/><path fill="none" stroke="#8C8C8C" strokeWidth="10" d="M0 0h3000v2000H0z"/></svg>
                </button>
            }
            { langState !== 'en' &&
                <button onClick={() => {setLangState('en')}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 30"><clipPath id="a"><path d="M25 15h25v15zv15H0zH0V0zV0h25z"/></clipPath><path d="M0 0v30h50V0z" fill="#012169"/><path d="m0 0 50 30m0-30L0 30" stroke="#fff" strokeWidth="6"/><path d="m0 0 50 30m0-30L0 30" clipPath="url(#a)" stroke="#C8102E" strokeWidth="4"/><path d="M-1 11h22V-1h8v12h22v8H29v12h-8V19H-1z" fill="#C8102E" stroke="#FFF" strokeWidth="2"/></svg>
                </button>
            }
            </div>
    );
};

export default Flags;