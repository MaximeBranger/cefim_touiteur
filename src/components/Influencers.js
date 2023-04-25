import React, { useState, useEffect } from 'react';
import '../styles/Influencers.css';
import API from '../data/API';
import { useTranslation } from 'react-i18next';

const Influencers = () => {
    const { t, i18n } = useTranslation();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [influencers, setInfluencers] = useState([]);

    const getInfluencers = () => {
        API.getInfluencers(
            5,
            (result) => {
                setIsLoaded(true);
                setInfluencers(result.influencers);
            }, 
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }

    useEffect(() => {
        getInfluencers();
        
        setInterval(() => {
            getInfluencers();
        }, 15000);

    }, [])

    if (error) {
        return <div className="influencers">{t('error.error_desc', {error: error})}</div>;

    } else if (!isLoaded) {
        return <div className="influencers">{t('loading')}</div>;

    } else {
        return (
            <section className="influencers">
                <h2>{t('title.influencers')}</h2>
                <div className="influencers-content">
                    { 
                        Object.keys(influencers)
                        .map(i => <em key={i} className="influencer">{i}</em> )
                    }
                </div>
            </section>
        );

    }
};

export default Influencers;