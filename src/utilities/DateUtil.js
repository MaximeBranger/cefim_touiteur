import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const DateUtil = (props) => {
    
    const { t, i18n } = useTranslation();

    const [value, setValue] = useState(null);
    const [unit, setUnit] = useState(null);

    const convertTsToForFormat = () => {
        let date = new Date(props.ts);
        let today = new Date();
        let seconds = (today.getTime() - date.getTime()) / 1000;
        let d = Math.floor(seconds / (3600*24));
        let h = Math.floor(seconds % (3600*24) / 3600);
        let m = Math.floor(seconds % 3600 / 60);
        let s = Math.floor(seconds % 60);
        let t_value;
        let t_unit;
        if ( d > 0 ) {
            t_value = d;
            t_unit = d > 1 ? t('date.days') : t('date.day');
        } else if ( h > 0 ) {
            t_value = h;
            t_unit = h > 1 ? t('date.hours') : t('date.hour');
        } else if ( m > 0 ) {
            t_value = m;
            t_unit = m > 1 ? t('date.minutes') : t('date.minute');
        } else {
            t_value = s;
            t_unit = s > 1 ? t('date.seconds') : t('date.second');
        }
        setValue(t_value);
        setUnit(t_unit);
    }

    useEffect(() => {
        convertTsToForFormat();
    }, [])

    const sentence = t('date.for', {value: value, unit: unit})

    return (
        <span> {sentence} </span>
    );
};

export default DateUtil;