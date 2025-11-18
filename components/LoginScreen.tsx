import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { GoogleCredentialPayload } from '../types';

// In a real application, this would be stored securely in an environment variable.
const GOOGLE_CLIENT_ID = '682432418855-il0qbe373jn0aj92faavhugq69keicjh.apps.googleusercontent.com';

function parseJwt (token: string): GoogleCredentialPayload {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const LoginScreen: React.FC = () => {
    const { login } = useAppContext();
    const googleButtonRef = useRef<HTMLDivElement>(null);

    const handleCredentialResponse = (response: any) => {
        if (response.credential) {
            const payload = parseJwt(response.credential);
            login(payload);
        }
    };
    
    useEffect(() => {
        // FIX: Suppress TypeScript error for `window.google` which is loaded from an external script.
        // @ts-ignore
        if (typeof window.google === 'undefined') {
            console.error("Google Identity Services script not loaded.");
            return;
        }

        // @ts-ignore
        window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
        });

        if (googleButtonRef.current) {
            // @ts-ignore
            window.google.accounts.id.renderButton(
                googleButtonRef.current,
                { theme: "outline", size: "large", type: "standard", text: "signin_with", shape: "pill" }
            );
        }
        
        // Optional: Prompt for one-tap sign-in
        // window.google.accounts.id.prompt();

    }, [login]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-surface rounded-xl shadow-2xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-text-primary">Welcome to the Team Knowledge Base</h1>
                    <p className="mt-2 text-text-secondary">Sign in with your Google account to continue</p>
                </div>

                <div className="p-4 text-sm border-l-4 rounded-r-lg bg-slate-800 border-accent text-slate-300">
                    <p className="font-semibold">Note for Setup:</p>
                    <p>To enable Google Login, you must create a project in the Google Cloud Console, configure the OAuth consent screen, and get a Client ID. Replace the placeholder `YOUR_GOOGLE_CLIENT_ID` in `LoginScreen.tsx` with your actual ID.</p>
                </div>
                
                <div className="flex justify-center pt-4">
                     <div ref={googleButtonRef}></div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
