import  { useEffect, useState } from 'react';
import { singletonHook } from 'react-singleton-hook';
import API from '../data/API';

const init = { loading: true };

const useReactionsImpl = () => {
    const [reactions, setReactions] = useState(init);
    useEffect(() => {
        API.getAvailableReactions(
            (response) => {
                setReactions(response)
            },
            (error) => {
                console.error(error)
            }
        )
    }, []);

    return reactions;
};


export const useReactions = singletonHook(init, useReactionsImpl);