import { useEffect, useState } from 'react';
import UserDevice from './components/Device';
import './App.css';

function App() {
    const [xmlUrl, setXmlUrl] = useState('');
    useEffect(() => {
        const regex = /xml=([^*]+)/;
        const xmlUrl = window.location.href?.match(regex) ? window.location.href?.match(regex)[1] : '';
        setXmlUrl(xmlUrl);
    }, []);

    return <>{xmlUrl ? <UserDevice xmlUrl={xmlUrl} /> : <div className="error">No XML URL provided</div>}</>;
}

export default App;
