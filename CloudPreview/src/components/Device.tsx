import React, { useEffect } from 'react';
import Preview from './Preview';

interface Props {
    xmlUrl: string;
}
const previewSize = {
    mobile: {
        width: 360,
        height: 740,
    },
    desktop: {
        width: 1080,
        height: 640,
    },
    vastMobile: {
        width: 740,
        height: 360,
    },
    vastDesktop: {
        width: 1080,
        height: 640,
    },
};

const border = {
    mobile: '70px 10px 50px',
    desktop: '70px 10px 50px',
    vastMobile: '10px 70px 10px 50px',
    vastDesktop: '70px 10px 50px',
};
const UserDevice: React.FC<Props> = ({ xmlUrl }) => {
    const [playerSize, setPlayerSize] = React.useState<{ width: number; height: number } | null>(null);
    const [previewMode, setPreviewMode] = React.useState<string | null>(null);
    const parseXML = async (url) => {
        const res = await fetch(url);
        const xmlText = await res.text();
        const xmlData = await new window.DOMParser().parseFromString(xmlText, 'text/xml');
        const playerMode = getXMLTagContent(xmlData, 'playerMode');
        const playerType = getXMLTagContent(xmlData, 'playerType');
        return {
            playerMode,
            playerType,
        };
    };
    const getXMLTagContent = (xmlData, tagName) => xmlData.getElementsByTagName(tagName)[0].textContent;
    const getRMPreviewInfo = async (xmlURL) => {
        const { playerMode } = await parseXML(xmlURL);
        return {
            playerMode,
        };
    };
    const getVastPreviewInfo = async (xmlURL) => {
        const res = await fetch(xmlURL);
        const xmlText = await res.text();
        const xmlData = await new window.DOMParser().parseFromString(xmlText, 'text/xml');
        return getXMLTagContent(xmlData, 'AdParameters');
    };
    useEffect(() => {
        const fetchData = async () => {
            if (!xmlUrl.includes('vast')) {
                const { playerMode } = await getRMPreviewInfo(xmlUrl);
                if (playerMode.includes('mobile')) {
                    setPlayerSize(previewSize.mobile);
                    setPreviewMode('mobile');
                } else {
                    setPlayerSize(previewSize.desktop);
                    setPreviewMode('desktop');
                }
            } else {
                const desc = await getVastPreviewInfo(xmlUrl);
                if (desc.includes('mobile')) {
                    setPreviewMode('vastMobile');
                    setPlayerSize(previewSize.vastMobile);
                } else {
                    setPreviewMode('vastDesktop');
                    setPlayerSize(previewSize.vastDesktop);
                }
            }
        };
        fetchData();
    }, [xmlUrl]);
    // Implement your component's logic here

    return (
        <div id="preview-frame" style={{ width: playerSize?.width, height: playerSize?.height, borderWidth: previewMode ? border[previewMode] : '' }}>
            {previewMode ? <Preview xmlUrl={xmlUrl} iframeSize={playerSize || { width: 0, height: 0 }} mode={previewMode} /> : 'Loading...'}
        </div>
    );
};

export default UserDevice;
