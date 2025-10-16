'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        chatwootSDK: {
            run: (config: { websiteToken: string; baseUrl: string }) => void;
        };
    }
}

export default function ChatwootWidget() {
    useEffect(() => {
        const BASE_URL = "https://app.chatwoot.com";
        
        const script = document.createElement("script");
        script.src = BASE_URL + "/packs/js/sdk.js";
        script.defer = true;
        script.async = true;
        
        script.onload = () => {
            window.chatwootSDK.run({
                websiteToken: 'Sgur1ZEa2VUXvt5SJbYXo8rw',
                baseUrl: BASE_URL
            });
        };
        
        document.body.appendChild(script);

        // Cleanup function to remove the script when component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []); // Empty dependency array means this runs once when component mounts

    return null; // This component doesn't render anything visible
}
