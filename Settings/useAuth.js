import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Firebase_Auth } from './firebase-config';

export default function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(Firebase_Auth, (user) => {
            console.log('user', user);
            if(user){
                setUser(user);
            }else{
                setUser(null);  
            }
        });
        return unsub;
    }, []);

    return { user }
}