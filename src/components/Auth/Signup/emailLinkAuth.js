import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';

export const emailLinkAuth = async (user, history, signup) => {
    let actionCodeSettings = {
        //TODO: add page or button
        url: 'http://localhost:3000/register',
        handleCodeInApp: true,
    };

    firebase
        .auth()
        .sendSignInLinkToEmail(user.email, actionCodeSettings)
        .then(() => {
            alert('check your email');
            //TODO: Create sweet-alert/pop-up message ask the user to confirm his account via mail
            window.localStorage.setItem('emailForSignIn', user.email);
            console.log('emailLinkAuth success');
        })
        .then(() => {
            history.push('/login');
        })
        .catch((error) => {
            console.log('errorCode', error.code);
            console.log('errorMessage', error.message);
        });
};
