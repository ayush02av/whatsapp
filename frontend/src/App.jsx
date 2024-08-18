import { useState, useEffect, useContext } from 'react';

import { getCookie } from './utilities/cookies';

import './App.css';
import ChatBoard from './components/chatBoard';
import AppContext from './context';
import Entry from './components/entry';

function App() {
    const { user, setUser } = useContext(AppContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserFromCookie = async () => {
            const token = getCookie('jwt')
            if (token)
                setUser(JSON.parse(getCookie('user')))
            setLoading(false);
        };
        loadUserFromCookie();
    }, [setUser]);

    if (loading) return <div>Loading...</div>
    else if (user) return <div className='h-screen'><ChatBoard /></div>
    else return <Entry />
}

export default App;
