document.addEventListener(
    'DOMContentLoaded',
    () => {
        // TODO: Implement getParameterByName()

        // Get the action to complete.
        const mode = getParameterByName('mode');
        // Get the one-time code from the query parameter.
        const actionCode = getParameterByName('oobCode');
        // (Optional) Get the continue URL from the query parameter if available.
        const continueUrl = getParameterByName('continueUrl');
        // (Optional) Get the language code if available.
        const lang = getParameterByName('lang') || 'en';

        // Configure the Firebase SDK.
        // This is the minimum configuration required for the API to be used.
        const config = {
            apiKey: 'YOU_API_KEY', // Copy this key from the web initialization
            // snippet found in the Firebase console.
        };
        const app = firebase.initializeApp(config);
        const auth = app.auth();

        // Handle the user management action.
        switch (mode) {
            case 'resetPassword':
                // Display reset password handler and UI.
                handleResetPassword(auth, actionCode, continueUrl, lang);
                break;
            case 'recoverEmail':
                // Display email recovery handler and UI.
                handleRecoverEmail(auth, actionCode, lang);
                break;
            case 'verifyEmail':
                // Display email verification handler and UI.
                handleVerifyEmail(auth, actionCode, continueUrl, lang);
                break;
            default:
            // Error: invalid mode.
        }
    },
    false,
);
