import React, { useState, useEffect, useContext, createContext } from 'react';
import './styles/App.css';
import Flags from './components/Flags';
import Styles from './components/Styles';
import Header from './components/Header';
import Trending from './components/Trending';
import TouitsContainer from './components/TouitsContainer';
import Message from './components/SendMessageForm';
import Keywords from './components/Keywords';
import Influencers from './components/Influencers';
import i18n from 'i18next';

export const AppContext = createContext();

export const App = () => {

    const lang = i18n.language;

    const [username, setUsername] = useState(null);

    const changeLang = (value) => {
      i18n.changeLanguage(value);
      // window.location.reload(false)
    }

    return (
    <div className="App">
      <AppContext.Provider value={{lang, changeLang, username, setUsername}}>
        <div className="actions">
          <Styles />
          <Flags />
        </div>
        <Header />
        <Trending />
        <Keywords />
        <Influencers />
        <Message />
        <TouitsContainer />
      </AppContext.Provider>
    </div>
  );
}
