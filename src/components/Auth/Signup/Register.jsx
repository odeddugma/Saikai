import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import firebase from 'firebase/app';

const Register = () => {
    const { signup } = useAuth();
    const history = useHistory();

    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        var email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
            // User opened the link on a different device. To prevent session fixation
            // attacks, ask the user to provide the associated email again. For example:
            email = window.prompt('Please provide your email for confirmation');
        }
        // The client SDK will parse the code from the link for you.
        firebase
            .auth()
            .signInWithEmailLink(email, window.location.href)
            .then((result) => {
                console.log(result);
                // Clear email from storage.
                //window.localStorage.removeItem('emailForSignIn');
                if (result.additionalUserInfo.isNewUser && result.user.emailVerified) {
                    //
                    history.push('/');
                } else {
                    alert('something');
                    history.push('/');
                }
            })
            .catch((error) => {
                console.log('errorCode', error.code);
                console.log('errorMessage', error.message);
            });
    }

    return <div></div>;
};

export default Register;
