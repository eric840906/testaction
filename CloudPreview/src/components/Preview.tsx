import React, { useEffect } from 'react';
const basePath = process.env.NODE_ENV === 'production' ? '.' : '';

interface Props {
    xmlUrl: string;
    iframeSize: {
        width: number;
        height: number;
    };
    mode: string | null;
}

const Preview: React.FC<Props> = ({ xmlUrl, iframeSize, mode }) => {
    const [iframeUrl, setIframeUrl] = React.useState<string | null>(null);
    useEffect(() => {
        switch (mode) {
            case 'vastDesktop':
                setIframeUrl(`${basePath}/instreamPreview.html?ccloud=1&xml=${xmlUrl}`);
                break;
            case 'vastMobile':
                setIframeUrl(`${basePath}/instreamPreview.html?ccloud=1&xml=${xmlUrl}`);
                break;
            case 'mobile':
                setIframeUrl(`${basePath}/preview.html?ccloud=1&xml=${xmlUrl}`);
                break;
            default:
                setIframeUrl(`${basePath}/desktopPreview.html?ccloud=1&xml=${xmlUrl}`);
        }
    }, [xmlUrl]);
    return iframeUrl ? <iframe id="preview-window" src={iframeUrl} width={iframeSize.width} height={iframeSize.height}></iframe> : null;
};

export default Preview;
