import React, { useState, useEffect } from 'react';
import '../styles/Keywords.css';
import API from '../data/API';
import { useTranslation } from 'react-i18next';

const Keywords = () => {
    const { t, i18n } = useTranslation();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [keywords, setKeywords] = useState([]);

    const getKeywords = () => {
        API.getKeywords(
            (result) => {
                setIsLoaded(true);
                setKeywords(result);
            }, 
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }

    useEffect(() => {
        getKeywords();
        
        const interval = setInterval(() => {
            getKeywords();
        }, 15000);

    }, [])

    if (error) {

        return <div className="keywords">{t('error.error_desc', {error: error})}</div>;

    } else if (!isLoaded) {

        return <div className="keywords">{t('loading')}</div>;

    } else {

        return (
            <section className="keywords">
                <h2>{t('title.keywords')}</h2>
                <div className="keywords-content">
                    { 
                        Object.keys(keywords)
                        .sort((k1, k2) => keywords[k2] - keywords[k1])
                        .slice(0, 25)
                        .map(k => <em key={k} className="keyword"> {k} </em>)
                    }
                </div>
            </section>
        );

    }
};

export default Keywords;