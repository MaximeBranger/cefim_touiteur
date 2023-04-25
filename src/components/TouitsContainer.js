import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../data/API';
import { Touit } from './Touit';
import '../styles/TouitsContainer.css';

const TouitsContainer = () => {
    const { t, i18n } = useTranslation();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [touits, setItems] = useState([]);
    const [timestamp, setTimestamp] = useState(0);

    const getTouits = () => {
        API.getAllTouits(
            timestamp, 
            (result) => {
                setIsLoaded(true);
                setItems(result.messages);
                setTimestamp(result.ts);
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

        return <div className="touitsContainer">Error: {error.message}</div>;

    } else if (!isLoaded) {

        return <div className="touitsContainer">{t('loading')}</div>;

    } else {

        return (
            <section className="touitsContainer">
            { 
                touits
                    .sort(
                        (t1, t2) => t2.ts - t1.ts 
                    )
                    .slice(0,200)
                    .map(
                        touit => (<Touit key={touit.id} {...touit} />)
                    )
            }
            </section>
        );

    }
};

export default TouitsContainer;