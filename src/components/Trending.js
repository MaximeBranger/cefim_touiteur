import React, { useState, useEffect } from 'react';
import API from '../data/API';
import { Touit } from './Touit';
import '../styles/Trending.css';
import { useTranslation } from 'react-i18next';

const Trending = () => {
    const { t, i18n } = useTranslation();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [touits, setTouits] = useState([]);

    const getTouits = () => {
        API.getTrendTouits(
            3, 
            (result) => {
                setIsLoaded(true);
                setTouits(result.top);
            }, 
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }

    useEffect(() => {
        getTouits();
        
        setInterval(() => {
            getTouits();
        }, 15000);

    }, [])

    if (error) {

        return <div className="trending">{t('error.error_desc', {error: error})}</div>;

    } else if (!isLoaded) {

        return <div className="trending">{t('loading')}</div>;

    } else {

        return (
            <section className="trending">
                <h2>{t('title.trending')}</h2>
                <div className="trending-content">
                { 
                    touits
                        .map(
                            touit => ( <Touit key={touit.id} {...touit} /> )
                        )
                }
                </div>
            </section>
        );

    }
};

export default Trending;