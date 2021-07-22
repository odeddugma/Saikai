import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import firebase from 'firebase/app';

const Register = () => {
    const { signup } = useAuth();
    const history = useHistory();
    console.log('register');

    // Confirm the link is a sign-in with email link.
    try {
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            console.log('email confirmed');
            const email = window.localStorage.getItem('emailForSignIn');
            firebase
                .auth()
                .signInWithEmailLink(email, window.location.href)
                .then((result) => {
                    console.log('result', result);
                    const { user, additionalUserInfo } = result;
                    console.log('user', user);
                    console.log('additionalUserInfo', additionalUserInfo);
                    // Clear email from storage.
                    //window.localStorage.removeItem('emailForSignIn');
                    if (result.user.emailVerified) {
                        firebase.firestore().collection('users').doc(user.uid).set({
                            /* firstName: userInfo.profile.given_name,
                            lastName: userInfo.profile.family_name, */
                        });
                        const batch = firebase.firestore().batch();
                        const initData = [
                            { Applied: { positionIds: [], title: 'Applied' } },
                            { Contract: { positionIds: [], title: 'Contract' } },
                            { Denied: { positionIds: [], title: 'Denied' } },
                            { InProgress: { positionIds: [], title: 'In Progress' } },
                            { ReceivedTask: { positionIds: [], title: 'Received Task' } },
                        ];
                        initData.forEach((doc) => {
                            const docRef = firebase
                                .firestore()
                                .collection('users')
                                .doc(user.uid)
                                .collection('columns')
                                .doc(Object.keys(doc)[0]);
                            batch.set(docRef, Object.values(doc)[0]);
                        });
                        const batchCommit = batch.commit();
                        return batchCommit;
                        //return batchCommit;
                    } else {
                        alert('something went wrong');
                    }
                })
                .then(() => {
                    history.push('/');
                })
                .catch((error) => {
                    console.log('errorCode', error.code);
                    console.log('errorMessage', error.message);
                });
        } else {
            console.log('error');
        }
    } catch (error) {
        console.log(error);
    }

    return <div>Please wait</div>;
};

export default Register;
