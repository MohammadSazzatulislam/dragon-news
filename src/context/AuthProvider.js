import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.config';


export const AuthContext = createContext()
const auth = getAuth(app)


const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const googleProviderLogin = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }


    const createNewUser = (email, password) => {
        setLoading(true);
       return createUserWithEmailAndPassword(auth, email, password);
    }


    const signInUser = (email, password) => {
        setLoading(true);
         return signInWithEmailAndPassword(auth, email, password);
    }
    
    const userProfileUpdate = (profile) => {
        return updateProfile(auth.currentUser, profile );
        
    }

    const verifyEmail =()=>{
        return sendEmailVerification(auth.currentUser)
    }

    useEffect(() => {
        const unSubsCribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser === null || currentUser?.emailVerified ) {
                setUser(currentUser)
            }

            setLoading(false);
        })
        return () => unSubsCribe()
    },[])

    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }


    const authInfo = {
      user,
      googleProviderLogin,
      logOut,
      createNewUser,
      signInUser,
      loading,
      userProfileUpdate,
      verifyEmail,
      setLoading,
    };

    return (
        <AuthContext.Provider value ={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;